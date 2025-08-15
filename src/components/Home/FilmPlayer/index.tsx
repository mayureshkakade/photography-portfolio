import React from 'react';

import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';
import { FilmItem } from '@/components/types';
import Image from 'next/image';

interface FilmPlayerProps {
  filmData: FilmItem;
}

export default function FilmPlayer({ filmData }: FilmPlayerProps) {
  const { pathname } = useRouter();
  const { url, thumbnailUrl, imageName } = filmData;
  // Determine the css class based on current page location
  const isHomePage = pathname === '/home' || pathname === '/';

  return (
    <div
      style={{ margin: '20px 0px', padding: '0px' }}
      className="col-xl-12 col-md-12"
    >
      <div style={{ margin: '0 auto', position: 'relative' }}>
        <div className={isHomePage ? 'film-container' : 'film'}>
          <ReactPlayer
            src={url}
            autoPlay={true}
            volume={1}
            width="100%"
            className="film-player"
            height="34.9375rem"
            controls={true}
            muted={true}
            controlsList="nodownload"
            light={
              <Image
                src={thumbnailUrl}
                alt={imageName}
                width={1000}
                height={1000}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                quality={100}
                priority
              />
            }
          />
        </div>
      </div>
    </div>
  );
}
