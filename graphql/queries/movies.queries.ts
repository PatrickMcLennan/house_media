import { gql } from 'graphql-request';

export const GET_MOVIE_BY_ID = gql`
  query GetMovie($id: ID!) {
    hddMovieById(id: $id) {
      name
      id
      path
      streamUrl
      isDir
      ext
    }
  }
`;

export const GET_ALL_MOVIE_IDS = gql`
  query {
    hddMovies {
      id
    }
  }
`;

export const GET_ALL_MOVIE_NAMES = gql`
  query {
    hddMovies {
      name
      id
    }
  }
`;
