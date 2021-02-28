import { act, fireEvent, render } from '@testing-library/react';
import SearchForm from '../components/SearchForm';

const onSubmit = jest.fn();

const { queryByTestId } = render(<SearchForm onSubmit={onSubmit} />);

const mockSearch = `MOCK_SEARCH`;

const [form, label, input] = [
  queryByTestId(`search-form`) as HTMLFormElement,
  queryByTestId(`search-label`),
  queryByTestId(`search-input`) as HTMLInputElement,
];

test(`<SearchForm />`, async () => {
  expect(label).toBeNull();

  expect(input.value).toBe(``);

  await act(async () => {
    await fireEvent.change(input, { target: { value: mockSearch } });
  });

  await act(async () => {
    await fireEvent.submit(form);
  });

  expect(onSubmit).toBeCalledTimes(1);
  expect(onSubmit).toBeCalledWith({ 'search-input': mockSearch });
  expect(onSubmit).not.toBeCalledWith({ 'search-input123': mockSearch });
});
