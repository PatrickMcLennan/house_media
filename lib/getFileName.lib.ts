import { PathLike } from 'fs';
import getFileId from './getFileId';

export default function getFileName(filePath: PathLike): string {
  const id = getFileId(filePath.toString());
  return filePath.toString().replace(` [${id}]`, ``);
}
