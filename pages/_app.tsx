import { ThemeProvider } from 'styled-components';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { browserGraphqlClient } from '../clients/browser.graphql';
import { GlobalStyles, theme } from '../config/styleResets.config';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={browserGraphqlClient}>
        <GlobalStyles />
        <Header />
        <main className="main">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ApolloProvider>
    </ThemeProvider>
  );
}
