import { render } from '@testing-library/react';
import Header, { links } from '../components/Header';

const { queryByTestId } = render(<Header />);

test(`<Header />`, () => {
  const header = queryByTestId(`global-header`);
  const testLinks = links.map(({ testId }) => queryByTestId(testId));

  expect(header.classList).toContain(`global-header`);
  links.forEach(({ aria, text, href, testId }) => {
    const linkElement = testLinks.find((element) => element.getAttribute(`data-testid`) === testId);

    expect(linkElement.getAttribute(`href`)).toBe(href);
    expect(linkElement.getAttribute(`href`)).not.toBe(`${href}123`);

    [`title`, `aria-label`].forEach((attribute) => {
      expect(linkElement.getAttribute(attribute)).toBe(aria);
      expect(linkElement.getAttribute(attribute)).not.toBe(`${aria}123`);
    });

    expect(linkElement.textContent).toBe(text);
    expect(linkElement.textContent).not.toBe(`${text}456`);
  });
});
