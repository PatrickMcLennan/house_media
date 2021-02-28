import { gql } from 'apollo-server-micro';

export const typeDefs = gql`
  type Movie {
    id: ID
    name: String
  }

  type FileContents {
    isDir: Boolean
    id: ID
    ext: String
    path: String
    streamUrl: String
    size: String
    name: String
  }

  type Query {
    hddMovies: [FileContents]
    hddMovieById(id: ID!): FileContents
    dbReIndexMovies: String
  }
`;
