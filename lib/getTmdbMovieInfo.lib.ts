import axios from 'axios';

export function getTmdbMovieInfo(
  id: string
): Promise<{ info: Record<string, any>; images: Record<string, any>; error?: Error }> {
  return Promise.all(
    [
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
      `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.TMDB_API_KEY}&language=en-US`,
    ].map((url) => axios.get(url))
  )
    .then(([info, images]) => ({
      info,
      images,
    }))
    .catch((err) => ({
      info: {},
      images: {},
      error: err,
    }));
}
