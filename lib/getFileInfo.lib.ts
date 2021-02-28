import fs, { PathLike } from 'fs';
import getFileId from './getFileId';
import getFileName from './getFileName.lib';

export type FileInfo = {
  isDir: boolean;
  id: string;
  ext: string;
  path: PathLike;
  streamUrl: string;
  name: string;
  size: string;
};

export function getFileInfo(filePath: PathLike): Promise<FileInfo> {
  const stats = fs.statSync(filePath);
  return new Promise((res) => {
    const isDir = stats?.isDirectory();
    const id = getFileId(filePath?.toString() ?? ``) ?? `-1`;
    const nameWithoutLocation = getFileName(
      filePath.toString().replace(process.env.MOVIES_DIR?.toString() ?? ``, ``)
    );
    const nameSplitLength = nameWithoutLocation.split(`.`).length;
    const ext = nameWithoutLocation.split(`.`)[nameSplitLength - 1];
    const name =
      nameWithoutLocation.charAt(0) === `/` ? nameWithoutLocation.substring(1) : nameWithoutLocation;
    return res({
      isDir,
      id,
      ext,
      name: name.replace(`.${ext}`, ``),
      path: filePath ?? ``,
      streamUrl: `${process.env.HOST}/api/v1/stream/${id}`,
      size: stats.size.toString(),
    });
  });
}
