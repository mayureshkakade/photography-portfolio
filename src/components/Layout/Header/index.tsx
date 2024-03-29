import { useEffect, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const brandLogo = '/assets/images/header-footer/logo.png';

const Header: React.FC = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const { pathname } = useRouter();

  useEffect(() => {
    const isMobileView = window.innerWidth <= 1000;
    setIsMobileView(isMobileView);
  }, []);

  const headerColor =
    pathname === '/albums' || pathname === '/films' ? 'header-color' : '';

  const logoPath = isMobileView || !!headerColor ? '' : brandLogo;

  return (
    <header>
      <div className="header-area ">
        <div id="sticky-header" className={`main-header-area ${headerColor}`}>
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-xl-3 col-lg-2">
                <div className="logo" style={{ paddingLeft: '30px' }}>
                  <Link href="/">
                    {logoPath ? (
                      <Image
                        className="logo_img"
                        src={logoPath}
                        alt="mylogo"
                        width={120}
                        height={63}
                      />
                    ) : (
                      <div
                        style={{ width: '120px', height: '63px' }}
                        className="logo_img"
                      ></div>
                    )}
                  </Link>
                </div>
              </div>
              <div
                className="col-xl-9 col-lg-10"
                style={{ paddingRight: '50px' }}
              >
                <div className="main-menu  d-none d-lg-block">
                  <nav className={!logoPath ? 'text-white' : ''}>
                    <ul id="navigation">
                      <li>
                        <Link className="active" href="/">
                          Home
                        </Link>
                      </li>
                      <li>
                        <a href="albums">Albums</a>
                      </li>
                      <li>
                        <a href="films">Films</a>
                      </li>
                      <li>
                        <a href="about">About us</a>
                      </li>
                      <li>
                        <a href="contact">Contact</a>
                      </li>

                      {!isMobileView ? (
                        <>
                          <li style={{ marginRight: '10px' }}>
                            <a
                              href="https://www.facebook.com/photu.phactory/"
                              target="_blank"
                              style={{ fontSize: '15px !important' }}
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-facebook" />
                            </a>
                          </li>
                          <li style={{ marginLeft: '0px' }}>
                            <a
                              href="https://www.instagram.com/omkarkalgude_photography/"
                              target="_blank"
                              style={{ fontSize: '15px !important' }}
                              rel="noopener noreferrer"
                            >
                              <i
                                className="fa fa-instagram"
                                style={{ fontSize: '15px !important' }}
                              />
                            </a>
                          </li>
                        </>
                      ) : (
                        <div
                          className="socail_links"
                          style={{ textAlign: 'center' }}
                        >
                          <ul
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              paddingTop: '33%',
                              fontSize: '0.9em',
                              marginLeft: '0px',
                            }}
                          >
                            <li style={{ paddingTop: '0px' }}>
                              <a
                                href="https://www.facebook.com/photu.phactory/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fa fa-facebook"></i>
                              </a>
                            </li>
                            <li style={{ paddingTop: '0px' }}>
                              <a
                                href="https://www.instagram.com/omkarkalgude_photography/"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fa fa-instagram"></i>
                              </a>
                            </li>
                            <li style={{ paddingTop: '0px' }}>
                              <a
                                href="https://youtu.be/yZ9fncxLn8Q"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <i className="fa fa-youtube-play"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-12">
                <div className="mobile_menu d-block d-lg-none" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
