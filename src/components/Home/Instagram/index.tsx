import { FC } from 'react';
import Image from 'next/image';
import { AppImageData } from '@/components/types';
import {
  getBlurPlaceholder,
  imageDimensions,
  imageSizes,
} from '@/lib/google-drive-image';

interface InstagramSectionProps {
  instagramImages: AppImageData[];
}

const InstagramImages: FC<InstagramSectionProps> = ({
  instagramImages: images,
}) => {
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
                src={image.url}
                width={imageDimensions.thumbnail.width}
                height={imageDimensions.thumbnail.height}
                sizes={imageSizes.thumbnail}
                placeholder="blur"
                blurDataURL={getBlurPlaceholder()}
                style={{
                  aspectRatio: '1 / 1',
                  width: '100%',
                  height: 'auto',
                  objectFit: 'cover',
                }}
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

const InstagramSection: FC<InstagramSectionProps> = ({ instagramImages }) => {
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
        <InstagramImages instagramImages={instagramImages.slice(0, 6)} />
      </div>
    </>
  );
};

export default InstagramSection;
