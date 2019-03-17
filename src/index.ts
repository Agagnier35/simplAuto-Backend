import { GraphQLServer } from "graphql-yoga";
import { makeExecutableSchema } from "graphql-tools";
import { importSchema } from "graphql-import";
import * as jwt from "jsonwebtoken";
import { prisma, Permission } from "./generated/prisma-client";
import resolvers from "./resolvers";
import { Request } from "express";
import schemaDirectives from "./directives/index";
import cookie from "cookie";
import { AuthError } from "./errors/authErrors";
import { User } from "./generated/prisma-client/index";

const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

require("dotenv").config({ path: ".env" });

const typeDefs = importSchema("./src/schema.graphql");
export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers as any
});

const server = new GraphQLServer({
  schemaDirectives,
  schema,
  context: request => ({
    ...request,
    prisma
  })
});

// Use cookie-parser middleware to handle JWT
server.express.use(cookieParser());

interface JwtCookie {
  userId: string;
  permissions: string[];
}
// Decode the JWT token from the request
server.express.use((req: Request & JwtCookie, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId, permissions } = jwt.verify(
      token,
      process.env.APP_SECRET
    ) as JwtCookie;
    // Set the userId on the request
    req.userId = userId;
    req.permissions = permissions;
  }

  next();
});

server.express.use("/webhook", bodyParser.raw({ type: "*/*" }), (req, res) => {
  // Retrieve the request's body and parse it as JSON
  const stripeEvent = JSON.parse(req.body);

  switch (stripeEvent.type) {
    case "customer.source.deleted":
    case "customer.source.expiring":
      // Remove the premium permission from the user
      const email = stripeEvent.data.object.owner.email;
      prisma.user({ email }).then((user: User) => {
        const permissions = user.permissions.filter(
          (permission: Permission) => permission !== "PREMIUM"
        );

        prisma
          .updateUser({
            where: { email },
            data: {
              permissions: {
                set: permissions
              }
            }
          })
          .then(() => {
            res.sendStatus(200);
          });
      });

      break;
  }
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    },
    subscriptions: {
      onConnect: (connectionParams, webSocket) => {
        // TODO : test if connectionParams works outsite of playground
        const rawCookie = webSocket.upgradeReq.headers.cookie;
        const cookies = cookie.parse(rawCookie);

        if (cookies.token) {
          const { userId, permissions } = jwt.verify(
            cookies.token,
            process.env.APP_SECRET
          ) as JwtCookie;

          return { userId, permissions };
        }

        throw AuthError;
      }
    }
  },
  () => {
    console.log("Server is now running on port http://localhost:4000");
  }
);
