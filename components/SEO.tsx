import Head from 'next/head';

type Props = {
  description: string;
  title: string;
};

export default function SEO({ description, title }: Props): JSX.Element {
  return (
    <Head>
      <title>{title}</title>
      <meta data-testid="og:title" name="og:title" property="og:title" content={title} />

      <meta
        data-testid="og:description"
        name="og:description"
        property="og:description"
        content={description}
      />
    </Head>
  );
}
