import ReactPlayer from 'react-player/lazy';

/**
 * Return later to config local storage settings for progress, etc
 *
 * @see https://www.npmjs.com/package/react-player
 */

type Props = {
  url: string;
};

export default function Video({ url }: Props): JSX.Element {
  return (
    <ReactPlayer url={url} controls volume={1} config={{ file: { forceAudio: true, forceVideo: true } }} />
  );
}
