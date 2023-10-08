import { FC } from 'react';
import Image from 'next/image';
import { getInstagramSectionImages } from '../helper';

const InstagramImages: FC = () => {
  const images = getInstagramSectionImages();
  return (
    <>
      {images.map((image) => {
        return (
          <div
            key={image.id}
            className="single_instagram col-xs-6 col-md-6 col-lg-12 col-xl-12 px-xl-0 px-lg-0"
          >
            <a
              href="https://www.instagram.com/omkarkalgude_photography/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                alt="instagram wedding photos"
                src={image.image}
                width={1000}
                height={1000}
                style={{ width: '100%', height: 'auto' }}
                unoptimized
              />
            </a>
            <div className="ovrelay">
              <a
                href="https://www.instagram.com/omkarkalgude_photography/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa fa-instagram" />
              </a>
            </div>
          </div>
        );
      })}
    </>
  );
};

const InstagramSection: FC = () => {
  return (
    <>
      <div className="instagram_text">
        <h3>Follow us on Instagram</h3>
        <div className="insta_link">
          <a
            href="https://www.instagram.com/omkarkalgude_photography/"
            target="_blank"
            rel="noopener noreferrer"
          >
            @omkarkalgude_photography
          </a>
        </div>
      </div>

      <div className="instragram_area">
        <InstagramImages />
      </div>
    </>
  );
};

export default InstagramSection;
