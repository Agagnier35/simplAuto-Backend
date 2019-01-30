import { GraphQLServer } from "graphql-yoga";
import { prisma } from "./generated/prisma-client";
import resolvers from "./resolvers";

const cookieParser = require("cookie-parser");

require("dotenv").config({ path: ".env" });

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: request => ({
    ...request,
    prisma
  })
});

// Use cookie-parser middleware to handle JWT
server.express.use(cookieParser());

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  () => {
    console.log("Server is now running on port http://localhost:4000");
  }
);
