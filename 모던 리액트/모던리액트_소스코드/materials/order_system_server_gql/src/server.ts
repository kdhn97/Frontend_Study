import express from "express";
import cors from "cors";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema";
import { root } from "./resolvers";

const server = express();
const corsOptions = {
  origin: '*', 
  credential: true, 
}
server.use(cors(corsOptions))
// GraphQL 설정
server.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

export default server;
