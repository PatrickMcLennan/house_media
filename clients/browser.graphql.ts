import { ApolloClient, InMemoryCache } from '@apollo/client';

export const browserGraphqlClient = new ApolloClient({
  uri: '/api/v1/graphql',
  cache: new InMemoryCache(),
});
