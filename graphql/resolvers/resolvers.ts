import { getDirectoryFiles } from '../../lib/getDirectoryFiles.lib';
import path from 'path';
import { FileInfo, getFileInfo } from '../../lib/getFileInfo.lib';
import { ApolloError } from 'apollo-server-micro';
import { slackPost } from '../../lib/slackPost.lib';
import { WebClient } from '@slack/web-api';
import { timeStamp } from '../../lib/timestamp.lib';

const SlackBot = new WebClient(process.env.LOGGER_SLACK_BOT);

export const resolvers = {
  Query: {
    hddMovieById: (_, { id }): Promise<FileInfo | ApolloError> =>
      getDirectoryFiles(process.env.MOVIES_DIR)
        .then((files) =>
          Promise.all(files.map((file) => getFileInfo(path.join(process.env.MOVIES_DIR, file))))
        )
        .then((dirContents) => dirContents.find((movie) => movie.id === id))
        .catch((err) => new ApolloError(err.toString(), `500`)),

    hddMovies: (): Promise<FileInfo[] | ApolloError> =>
      getDirectoryFiles(process.env.MOVIES_DIR)
        .then((files) =>
          Promise.all(files.map((file) => getFileInfo(path.join(process.env.MOVIES_DIR, file))))
        )
        .then((dirContents) => dirContents.filter(({ isDir, id }) => !isDir || id === `-1`))
        .catch((err) => new ApolloError(err.toString(), `500`)),

    dbReIndexMovies: async (_, __, { db }) => {
      const currentFilesOnHdd = await getDirectoryFiles(process.env.MOVIES_DIR)
        .then((files) =>
          Promise.all(files.map((file) => getFileInfo(path.join(process.env.MOVIES_DIR, file))))
        )
        .then((dirContents) =>
          dirContents.reduce((all: FileInfo['id'][], current: FileInfo) => {
            if (current.isDir || current.id === `-1`) return all;
            return [...all, current.id];
          }, [])
        )
        .catch((err) =>
          slackPost({
            bot: SlackBot,
            channel: `movies`,
            text: `[${timeStamp()}] -- dbReIndexMovies Error in currentFilesOnHdd:\t ${err.toString()}`,
          })
            .then(() => null)
            .catch(() => null)
        );

      //   console.log(db.table(`movies`));

      if (!currentFilesOnHdd) return `bad`;
      return `good`;
    },
    //   getTmdbMovieInfo(id)
    //     .then((res) => {
    //       console.log(res);
    //       console.log(db);
    //       return `good`;
    //     })
    //     .catch((err) => {
    //       console.error(err);
    //       console.error(id);
    //       return err.toString();
    //     }),
  },
};
