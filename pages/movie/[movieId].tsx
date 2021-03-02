import { GetStaticPaths, GetStaticProps } from 'next';
import { GET_ALL_MOVIE_IDS, GET_MOVIE_BY_ID } from '../../graphql/queries/movies.queries';
import { nodeGraphqlClient } from '../../clients/node.graphql';
import SEO from '../../components/SEO';
import Video from '../../components/Video';
import { FileInfo } from '../../lib/getFileInfo.lib';

type ComponentProps = {
  movie: FileInfo;
};

type StaticProps = {
  params: {
    movieId: string;
  };
};

export default function MovieId({ movie }: ComponentProps): JSX.Element {
  return (
    <>
      <SEO title={movie?.name} description={`Watch ${movie?.name}`} />
      <h1 className="h1" data-testid="h1">
        {movie?.name}
      </h1>
      <Video url={movie?.streamUrl} />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () =>
  nodeGraphqlClient
    .request(GET_ALL_MOVIE_IDS)
    .then(({ hddMovies }) => ({
      paths: hddMovies.map(({ id }) => ({
        params: { movieId: id },
      })),
      fallback: false,
    }))
    .catch(() => ({
      paths: [{ params: { movieId: `404` } }],
      fallback: true,
    }));

export const getStaticProps: GetStaticProps = async ({ params }: StaticProps) =>
  nodeGraphqlClient
    .request(GET_MOVIE_BY_ID, { id: params.movieId })
    .then(({ hddMovieById }) => ({
      props: {
        movie: hddMovieById,
      },
    }))
    .catch((err) => ({
      props: {
        movie: {},
        error: JSON.stringify(err),
      },
    }));
