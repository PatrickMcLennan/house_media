import { GetStaticProps } from 'next';
import Link from 'next/link';
import { nodeGraphqlClient } from '../clients/node.graphql';
import SEO from '../components/SEO';
import { GET_ALL_MOVIE_NAMES } from '../graphql/queries/movies.queries';
import { FileInfo } from '../lib/getFileInfo.lib';
import { timeStamp } from '../lib/timestamp.lib';

type ComponentProps = {
  movies: FileInfo[];
};

export default function Index({ movies }: ComponentProps): JSX.Element {
  return (
    <>
      <SEO title="Home | patflix" description="View all movies and shows" />
      <h1>hello</h1>
      {movies &&
        movies.map(({ id, name }) => (
          <Link href={`/movie/${id}`} key={id}>
            <a>{name}</a>
          </Link>
        ))}
    </>
  );
}

export const getStaticProps: GetStaticProps = async () =>
  nodeGraphqlClient
    .request(GET_ALL_MOVIE_NAMES)
    .then(({ hddMovies }) => ({
      props: { movies: hddMovies },
    }))
    .catch((err) => ({
      props: {
        movies: [],
        error: JSON.stringify(err),
      },
    }));
