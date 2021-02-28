import { WebClient } from '@slack/web-api';
import { NextApiRequest, NextApiResponse } from 'next';
import { downloadWallpaper } from '../../../lib/downloadWallpaper.lib';
import { getDirectoryFiles } from '../../../lib/getDirectoryFiles.lib';
import { slackPost } from '../../../lib/slackPost.lib';
import { timeStamp } from '../../../lib/timestamp.lib';
import { ImageDto } from '../../../types/image.dto';
import { MockResponse, MockRequest } from 'node-mocks-http';
import { Method } from '../../../types/rest.types';

const Slackbot = new WebClient(process.env.LOGGER_SLACK_BOT);

export const supportedMethods: Method[] = [Method.POST];

export const NO_CONTENT = `Nothing was provided.`;

export const UNSUPPORTED_METHOD = (method: Method): string =>
  `${method} is not supported on /images, only ${supportedMethods.join(`, `)}.`;

export default function handler(
  { method, body }: NextApiRequest | MockRequest<any>,
  res: NextApiResponse | MockResponse<any>
): Promise<void> | void {
  const wallpapers: ImageDto[] = body.wallpapers;

  if (method !== Method.POST) return res.status(404).send(UNSUPPORTED_METHOD(method));

  if (!wallpapers?.length) return res.status(204).send(NO_CONTENT);

  return getDirectoryFiles(process.env.BACKGROUNDS_DIR)
    .then((currentImages) => {
      const imagesMap = new Map(currentImages.map((name) => [name, null]));
      const newWallpapers = wallpapers.filter(({ name, ext }) => !imagesMap.has(`${name}.${ext}`));

      return Promise.all(newWallpapers.map((image) => downloadWallpaper(image)));
    })
    .then((resultsArray) =>
      slackPost({
        bot: Slackbot,
        channel: `backgrounds`,
        text: !resultsArray.length
          ? `[${timeStamp()} -- No new images were found]`
          : resultsArray.map(({ message }) => `[${timeStamp()}] -- ${message}`).join('\n'),
      })
    )
    .then(() => res.status(200).send(`[${timeStamp()}] -- Images sent.`))
    .catch((err) =>
      slackPost({
        bot: Slackbot,
        channel: `backgrounds`,
        text: `[${timeStamp()}] -- ${err.toString()}`,
      })
    );
}
