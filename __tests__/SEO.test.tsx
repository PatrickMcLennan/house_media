import { render } from '@testing-library/react';
import SEO from '../components/SEO';

const mockTitle = `MOCK_TITLE`;
const mockDescription = `MOCK_DESCRIPTION`;

/**
 * Some weirdness here with Next Apps mounting Head component
 *
 * @see https://github.com/vercel/next.js/discussions/11060#discussioncomment-135865
 */
jest.mock('next/head', () => {
  return {
    __esModule: true,
    /* eslint-disable-next-line react/display-name*/
    default: ({ children }: { children: Array<React.ReactElement> }) => <>{children}</>,
  };
});

const { queryByTestId } = render(<SEO title={mockTitle} description={mockDescription} />);

const [metaTitle, metaDescription] = [queryByTestId(`og:title`), queryByTestId(`og:description`)];

test(`<SEO />`, () => {
  expect(document.title).toBe(mockTitle);
  expect(document.title).not.toBe(`${mockTitle}fdfsd`);

  expect(metaTitle.getAttribute(`content`)).toBe(mockTitle);
  expect(metaTitle.getAttribute(`content`)).not.toBe(`${mockTitle}fsfds`);

  expect(metaDescription.getAttribute(`content`)).toBe(mockDescription);
  expect(metaDescription.getAttribute(`content`)).not.toBe(`${mockDescription}gsfgdf`);
});
