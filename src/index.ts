import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './generated/prisma-client'
import resolvers from './resolvers'

require("dotenv").config({ path: ".env" });

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma,
  }),
})
server.start(() => console.log(`Server is running on http://localhost:4000`))
