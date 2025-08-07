import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { displayTitle } from './helper';
import { AlbumData } from '../types';
import {
  getOptimizedGoogleDriveUrl,
  getBlurPlaceholder,
  imageSizes,
  imageDimensions,
} from '@/lib/google-drive-image';

export default function Album({
  thumbnailUrl: thumbnail,
  displayName,
  id,
}: AlbumData) {
  // Extract file ID from Google Drive URL for optimization
  const getFileIdFromUrl = (url: string): string => {
    if (!url) return '';
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : url;
  };

  const fileId = getFileIdFromUrl(thumbnail);
  const optimizedThumbnail = fileId
    ? getOptimizedGoogleDriveUrl(fileId, 'medium')
    : thumbnail;

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
              id,
              displayName: displayName,
            },
          }}
        >
          <div className={`thumb`}>
            <Image
              alt="Wedding Album Thumbnail"
              src={optimizedThumbnail}
              width={imageDimensions.thumbnail.width}
              height={imageDimensions.thumbnail.height}
              sizes={imageSizes.thumbnail}
              placeholder="blur"
              blurDataURL={getBlurPlaceholder()}
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
              unoptimized
              quality={85}
            />
          </div>
        </Link>
        <Link
          href={{
            pathname: '/gallery',
            query: {
              id,
              displayName: displayName,
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
