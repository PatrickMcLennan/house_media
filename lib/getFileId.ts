export default function getFileId(filePath: string): string {
  const name = filePath?.split(`[`)[1] ?? ``;
  const id = Number(name.split(`]`)[0] ?? -1);
  return isNaN(id) || !id ? `-1` : id.toString();
}
