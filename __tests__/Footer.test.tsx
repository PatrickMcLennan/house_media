import { render } from '@testing-library/react';
import Footer from '../components/Footer';

const { queryByTestId } = render(<Footer />);
const [footer, copyright] = [queryByTestId(`global-footer`), queryByTestId(`copyright`)];

test(`<Footer />`, () => {
  expect(footer.classList).toContain(`global-footer`);

  expect(copyright.textContent).toContain(new Date().getFullYear());
  expect(copyright.textContent).not.toContain(new Date().getFullYear() + 1);
});
