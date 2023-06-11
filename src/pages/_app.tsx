import '../../public/assets/css/style.css';

import { pageDescription, pageTitle } from '@/constants';

import { AppProps } from 'next/app';
import Head from 'next/head';
import Layout from '../../components/Layout';
import Script from 'next/script';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script src="https://code.jquery.com/jquery-1.12.4.min.js"></Script>
      <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></Script>
      <Script src="assets/js/jquery.slicknav.min.js"></Script>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
