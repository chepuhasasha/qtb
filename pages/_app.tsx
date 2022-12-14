import { AppProps } from 'next/dist/shared/lib/router/router';
import '../styles/main.sass';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return <Component {...pageProps} />;
}

export default MyApp;
