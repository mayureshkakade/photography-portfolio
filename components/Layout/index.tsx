import React, { PropsWithChildren } from 'react';

import $ from 'jquery';
import Footer from './Footer';
import Header from './Header';
import Script from 'next/script';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  if (typeof window !== 'undefined') {
    // client-side-only code
    window.$ = window.jQuery = $;
  }

  return (
    <>
      <Script src="assets/js/main.js" strategy="lazyOnload" />
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
