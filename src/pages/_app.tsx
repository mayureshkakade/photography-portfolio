import type { AppProps } from 'next/app';
import '../../public/assets/css/style.css';
import Layout from '../../components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
