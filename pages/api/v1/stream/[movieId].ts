import fs from 'fs';
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { getDirectoryFiles } from '../../../../lib/getDirectoryFiles.lib';
import { FileInfo, getFileInfo } from '../../../../lib/getFileInfo.lib';

function currentMoviesMap(): Promise<Map<string, FileInfo>> {
  return getDirectoryFiles(process.env.MOVIES_DIR)
    .then((files) =>
      Promise.all(files.map((file) => getFileInfo(path.resolve(process.env.MOVIES_DIR, file))))
    )
    .then((movies) => new Map(movies.map((movie) => [movie.id, movie])));
}

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { headers, query } = req;
  const id = query?.movieId;

  if (!id || id === `-1` || Array.isArray(id))
    return res.status(404).send(`${id} was received and is invalid.`);

  const hdMoviesMap = await currentMoviesMap().catch((err) => console.error(err));
  if (!hdMoviesMap) return res.status(500).send(`Error getting the current hd movies`);

  const movie = hdMoviesMap.get(id);
  if (!movie) return res.status(404).send(`${id} was not found`);
  if (movie?.isDir || !Object.prototype.hasOwnProperty.call(movie, `isDir`))
    return res.status(400).send(`${id} is not a streamable file.`);

  const range = headers?.range;
  const { path, size } = movie;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : Number(size) - 1;
    const chunksize = end - start + 1;
    const file = fs.createReadStream(path, { start, end });
    const head = {
      'Content-Range': `bytes ${start}-${end}/${size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': size,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(path).pipe(res);
  }
}
