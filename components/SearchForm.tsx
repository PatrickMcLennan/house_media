import { useForm } from 'react-hook-form';

type Props = {
  labelText?: string;
  onSubmit: (formValues: Record<string, any>) => any;
};

export default function SearchForm({ labelText, onSubmit }: Props): JSX.Element {
  const { register, handleSubmit } = useForm();

  return (
    <form
      className="search-form"
      data-testid="search-form"
      onSubmit={handleSubmit((values) => onSubmit(values))}
    >
      {labelText && (
        <label className="label" data-testid="search-label" htmlFor="search-input">
          {labelText}
        </label>
      )}
      <input
        aria-label="Enter your search here"
        className="search-input"
        data-testid="search-input"
        id="search-input"
        name="search-input"
        ref={register}
        type="search"
        title="Enter your search here"
      />
      <input data-testid="search-submit" type="submit" value="submit" />
    </form>
  );
}
