import { pubsub } from "./pubsub";

import resolvers from "@resolvers";

//mongodb
import db from "./db";

//fake data
import { db as data } from "./data";

import typeDefs from "@type-defs";

import { createServer } from "node:http";
import { createYoga, createSchema } from "graphql-yoga";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/lib/use/ws";

db();

import User from "./models/User";

const yogaApp = createYoga({
  graphiql: {
    // Use WebSockets in GraphiQL
    subscriptionsProtocol: "WS",
  },
  graphqlEndpoint: "/",

  schema: createSchema({
    typeDefs,
    resolvers,
  }),
  context: {
    db: data,
    pubsub,
    _db: {
      User,
    },
  },
});

// Get NodeJS Server from Yoga
const httpServer = createServer(yogaApp);
// Create WebSocket server instance from our Node server
const wsServer = new WebSocketServer({
  server: httpServer,
  path: yogaApp.graphqlEndpoint,
});

// Integrate Yoga's Envelop instance and NodeJS server with graphql-ws
useServer(
  {
    execute: (args) => args.rootValue.execute(args),
    subscribe: (args) => args.rootValue.subscribe(args),
    onSubscribe: async (ctx, msg) => {
      const { schema, execute, subscribe, contextFactory, parse, validate } =
        yogaApp.getEnveloped({
          ...ctx,
          req: ctx.extra.request,
          socket: ctx.extra.socket,
          params: msg.payload,
        });

      const args = {
        schema,
        operationName: msg.payload.operationName,
        document: parse(msg.payload.query),
        variableValues: msg.payload.variables,
        contextValue: await contextFactory(),
        rootValue: {
          execute,
          subscribe,
        },
      };

      const errors = validate(args.schema, args.document);
      if (errors.length) return errors;
      return args;
    },
  },
  wsServer
);

httpServer.listen(4000, () => {
  console.log("Server is running on port 4000");
});
