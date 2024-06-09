const { createServer } = require("node:http");
const { createSchema, createYoga } = require("graphql-yoga");
const { pubsub } = require("./pubsub");

const resolvers = require("./graphql/resolvers");

const { db } = require("./data");
const typeDefs = require("./graphql/type-defs");

const yoga = createYoga({
  graphqlEndpoint: "/",

  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: { db, pubsub },
});

const server = createServer(yoga);
server.listen(4000, () => {
  console.info("Server is running on http://localhost:4000/");
});
