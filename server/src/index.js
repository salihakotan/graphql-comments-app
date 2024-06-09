import { createServer } from "node:http";

import { createSchema, createYoga } from "graphql-yoga";

import { pubsub } from "./pubsub";

import resolvers from "@resolvers";

import { db } from "./data";

import typeDefs from "@type-defs";

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
