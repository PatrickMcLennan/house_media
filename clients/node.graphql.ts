import { GraphQLClient } from 'graphql-request';

export const nodeGraphqlClient = new GraphQLClient(process.env.V1_GRAPHQL);
