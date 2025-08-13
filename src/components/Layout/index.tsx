import React, { PropsWithChildren } from 'react';

import $ from 'jquery';
import Footer from './Footer';
import Header from './Header';

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  if (typeof window !== 'undefined') {
    // client-side-only code
    window.$ = window.jQuery = $;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
