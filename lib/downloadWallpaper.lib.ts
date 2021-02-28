import path from 'path';
import fs from 'fs';
import https from 'https';
import { ImageDto } from '../types/image.dto';

export function downloadWallpaper({
  name,
  ext,
  url,
}: ImageDto): Promise<{ message: string; error: boolean }> {
  return new Promise((res) => {
    const dest = path.join(process.env.BACKGROUNDS_DIR ?? `THROW_ERROR_HERE`, `${name}.${ext}`);

    if (dest.includes(`THROW_ERROR_HERE`))
      res({
        message: `Image path could not be made -- Attempted ${process.env.BACKGROUNDS_DIR}/${name}.${ext}`,
        error: true,
      });

    const file = fs.createWriteStream(dest);

    if (!file)
      res({
        message: `A writesteam for ${dest} could not be made.`,
        error: true,
      });

    return https.get(url, (response) => {
      response.pipe(file);

      file.on(`error`, (err) => fs.unlink(dest, () => res({ message: err.toString(), error: true })));

      file.on(`finish`, () => {
        file.close();
        return res({ message: `${name}.${ext} was created.`, error: false });
      });
    });
  });
}
