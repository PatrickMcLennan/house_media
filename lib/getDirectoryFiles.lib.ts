import fs from 'fs';

export function getDirectoryFiles(dir: string): Promise<string[]> {
  return new Promise((res, rej) => fs.readdir(dir, (err, files) => (err ? rej(err) : res(files))));
}
