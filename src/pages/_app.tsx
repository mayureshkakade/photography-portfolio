import '../../public/assets/css/style.css';

import { AppProps } from 'next/app';
import Layout from '../../components/Layout';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://code.jquery.com/jquery-1.12.4.min.js"></Script>
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></Script>
      <Script src="assets/js/jquery.slicknav.min.js"></Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
