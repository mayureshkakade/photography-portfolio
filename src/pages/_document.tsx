import { Head, Html, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Preconnect to Google Drive domains for faster image loading */}
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
        <link rel="dns-prefetch" href="https://lh3.googleusercontent.com" />
        <link rel="preconnect" href="https://www.googleapis.com" />
        <link rel="dns-prefetch" href="https://www.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <Script
          src="https://code.jquery.com/jquery-1.12.4.min.js"
          strategy="beforeInteractive"
        ></Script>
        <Script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"></Script>
      </body>
    </Html>
  );
}
