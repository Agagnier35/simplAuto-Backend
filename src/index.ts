import { GraphQLServer } from "graphql-yoga";
import * as jwt from "jsonwebtoken";
import { prisma } from "./generated/prisma-client";
import resolvers from "./resolvers";
import { Request } from "express";
import schemaDirectives from "./directives/index";
import cookie from "cookie";
import { AuthError } from "./errors/authErrors";

const cookieParser = require("cookie-parser");

require("dotenv").config({ path: ".env" });

const server = new GraphQLServer({
  schemaDirectives,
  resolvers: resolvers as any,
  typeDefs: "./src/schema.graphql",
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
