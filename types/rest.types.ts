import { NextApiRequest, NextApiResponse } from 'next';

export type HandlerProps = {
  req: NextApiRequest;
  res: NextApiResponse;
};

export enum Method {
  POST = 'POST',
  GET = 'GET',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}
