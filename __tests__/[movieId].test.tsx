import { render } from '@testing-library/react';
import { FileInfo } from '../lib/getFileInfo.lib';
import MovieId from '../pages/movie/[movieId]';

const mockMovie: FileInfo = {
  name: `name`,
  isDir: false,
  size: `100`,
  path: `path`,
  id: `324`,
  ext: `ext`,
  streamUrl: `streamUrl`,
};

const { queryByTestId } = render(<MovieId movie={mockMovie} />);

const [h1] = [queryByTestId(`h1`)];

test(`<[movieId] />`, () => {
  expect(h1.textContent).toBe(mockMovie.name);
  expect(h1.textContent).not.toBe(`fdsfs${mockMovie.name}`);
});
