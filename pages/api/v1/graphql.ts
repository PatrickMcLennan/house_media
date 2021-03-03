import { ApolloServer } from 'apollo-server-micro';
import Knex from 'knex';
import { resolvers } from '../../../graphql/resolvers/resolvers';
import { typeDefs } from '../../../graphql/schemas/typeDefs';

import knexConfig from '../../../config/knexfile.config';
export const config = {
  api: {
    bodyParser: false,
  },
};

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({
    db: Knex(knexConfig),
  }),
  playground: true,
  introspection: true,
}).createHandler({
  path: `/api/v1/graphql`,
});
