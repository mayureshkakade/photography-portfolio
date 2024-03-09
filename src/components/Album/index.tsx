import React, { useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { displayTitle } from './helper';
import { AlbumData } from '../types';

export default function Album({
  name: title,
  thumbnail,
  displayName,
  count: imageCount,
}: AlbumData) {
  // Begin polling for the required lazy images tag and observe the images for intersection
  useEffect(() => {
    const albumThumbImagePoll = setInterval(() => {
      if (document.querySelectorAll('.lazy_album_image').length > 0) {
        clearInterval(albumThumbImagePoll);
        const observer = new IntersectionObserver((entry, imgObserver) => {
          entry.forEach((element) => {
            if (element.isIntersecting) {
              const lazyImage = element.target as HTMLImageElement;
              const originalImage = lazyImage.src.replace(
                'lazy-thumbnail/thumb.jpg',
                'thumbnail/thumb.jpg'
              );
              lazyImage.src = originalImage;
              lazyImage.classList.remove('lazy_album_image');
              imgObserver.unobserve(lazyImage);
            }
          });
        });

        const elementArray = document.querySelectorAll('.lazy_album_image');
        elementArray.forEach((element) => {
          observer.observe(element);
        });
      }
    }, 200);
  }, []);

  return (
    <div style={{ padding: '1%' }} className="col-xl-6 col-md-6">
      <div
        style={{
          height: '100%',
        }}
        className="single_photography"
      >
        <Link
          href={{
            pathname: '/gallery',
            query: {
              currentCategory: title,
              displayName: displayName,
              imageCount: imageCount,
            },
          }}
        >
          <div className={`thumb`}>
            <Image
              alt="Wedding Album Thumbnail"
              className="lazy_album_image"
              src={thumbnail}
              width={1000}
              height={1000}
              unoptimized
              style={{ height: '100%' }}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: '/gallery',
            query: {
              currentCategory: title,
              displayName: displayName,
              imageCount: imageCount,
            },
          }}
        >
          <div
            className="albums_text"
            style={{
              backgroundColor: 'white',
              textAlign: 'center',
              padding: '0.4em 0px 30px 0px',
            }}
          >
            <span>{`${displayTitle(displayName)[0]} `}</span>
            <h5>View More</h5>
          </div>
        </Link>
      </div>
    </div>
  );
}
