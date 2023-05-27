import Image from 'next/image';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="copy-right_text">
        <div className="container">
          <div className="row">
            <div
              className="col-xl-4 col-md-4 contact-text"
              style={{ alignContent: 'start' }}
            >
              <p>Contact</p>
              <p style={{ fontSize: '13px' }}>
                <i className="fa fa-home mr-2" /> Pune, Maharshtra
              </p>
              <p style={{ fontSize: '13px' }}>
                <a
                  href="https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=photuphactory@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#ffffffa6' }}
                >
                  {' '}
                  <i className="fa fa-envelope mr-2" /> photuphactory@gmail.com{' '}
                </a>
              </p>

              <p style={{ fontSize: '13px' }}>
                <i className="fa fa-phone mr-2" /> +91 9545228983
              </p>
            </div>
            <div className="col-xl-4 col-md-4">
              <div className="socail_links" style={{ textAlign: 'center' }}>
                <p>Follow us</p>
                <ul>
                  <li>
                    <a
                      href="https://www.facebook.com/photu.phactory/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/omkarkalgude_photography/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.youtube.com/channel/UC1h8eH0D63z3kZWq5bzRocw?view_as=subscriber"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa fa-youtube-play"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-xl-4 col-md-4 about-text"
              style={{ textAlign: 'justify', paddingLeft: '10%' }}
            >
              <p>About us</p>
              <p style={{ fontSize: '13px' }}>
                Our team is a boutique wedding photography studio located in
                Pune, India. We specialise in fun and off-beat candid wedding
                photography and cinematography.
              </p>
            </div>
          </div>
        </div>

        <div className="copy-center-text">
          <div style={{ paddingBottom: '5px' }}>
            <Image
              src="/assets/images/header-footer/footerLogo.png"
              alt="omkar kalgude photography logo"
              width={40}
              height={40}
            />
          </div>
          @2020 OMKAR KALGUDE PHOTOGRAPHY
        </div>
        <p className="copy_right" style={{ fontSize: '8px' }}>
          Copyright © All rights reserved
          <a
            style={{ display: 'none' }}
            href="https://colorlib.com"
            rel="noopener noreferrer"
            target="_blank"
          >
            Colorlib
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
