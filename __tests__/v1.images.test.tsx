import handler, { NO_CONTENT, supportedMethods, UNSUPPORTED_METHOD } from '../pages/api/v1/images';
import { createMocks } from 'node-mocks-http';
import { Method } from '../types/rest.types';

test(`/images`, async () => {
  const { req, res } = createMocks({
    method: Method.POST,
  });

  await handler(req, res);

  expect(res._getStatusCode()).toBe(204);
  expect(res._getStatusCode()).not.toBe(202);
  expect(res._getData()).toBe(NO_CONTENT);
  expect(res._getData()).not.toBe(`dsfds${NO_CONTENT}`);

  return Object.keys(Method)
    .filter((method: Method) => !supportedMethods.includes(method))
    .forEach(async (unsupportedMethod: Method) => {
      const { req, res } = createMocks({
        method: unsupportedMethod,
      });

      await handler(req, res);

      expect(res._getStatusCode()).toBe(404);
      expect(res._getStatusCode()).not.toBe(401);
      expect(res._getData()).toBe(UNSUPPORTED_METHOD(unsupportedMethod));
      expect(res._getData()).not.toBe(`rfdsf${UNSUPPORTED_METHOD(unsupportedMethod)}`);
    });
});
