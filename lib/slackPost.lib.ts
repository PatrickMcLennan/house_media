import { WebClient } from '@slack/web-api';

type Props = {
  bot: WebClient;
  channel: 'backgrounds' | `movies`;
  text: string;
};

export function slackPost({ bot, channel, text }: Props): Promise<void> {
  return new Promise((res) =>
    bot.chat
      .postMessage({ channel, text })
      .then(() => res())
      .catch((err) => {
        console.error(err);
        return res();
      })
  );
}
