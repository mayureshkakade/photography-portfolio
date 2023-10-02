import React, { useEffect } from 'react';

import ReactPlayer from 'react-player';
import { useRouter } from 'next/router';

const filmData = {
  id: 1,
  url: 'https://youtu.be/zfy2U0ttszA',
  lightImg: '/assets/images/films-page/video-player/film1.jpg',
  lightImgLazy: '/assets/images/films-page/video-player/film1_lazy.jpg',
};

export default function FilmPlayer() {
  const { pathname } = useRouter();

  // Determine the css class based on current page location
  const isHomePage = pathname === '/home' || pathname === '/';

  // Begin polling for the required lazy images tag and observe the images for intersection
  useEffect(() => {
    if (isHomePage) {
      const reactPlayerImagePoll = setInterval(() => {
        if (document.querySelectorAll('.react-player__preview').length > 0) {
          clearInterval(reactPlayerImagePoll);
          const observer = new IntersectionObserver((entry, imgObserver) => {
            entry.forEach((element) => {
              if (element.isIntersecting) {
                const lazyImage = element.target as HTMLImageElement;
                lazyImage.style.backgroundImage = `url("${filmData.lightImg}")`;
                imgObserver.unobserve(lazyImage);
              }
            });
          });
          const elementArray = document.querySelectorAll(
            '.react-player__preview'
          );
          elementArray.forEach((element) => {
            observer.observe(element);
          });
        }
      }, 200);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHomePage, filmData.lightImg]);

  return (
    <div
      style={{ margin: '20px 0px', padding: '0px' }}
      className="col-xl-12 col-md-12"
    >
      <div style={{ margin: '0 auto', position: 'relative' }}>
        <div className={isHomePage ? 'film-container' : 'film'}>
          <ReactPlayer
            url={`"${filmData.url}"`}
            volume={1}
            width="100%"
            className="film-player"
            height="34.9375rem"
            controls={true}
            controlsList="nodownload"
            light={
              isHomePage
                ? `"${filmData.lightImgLazy}"`
                : `"${filmData.lightImg}"`
            }
          />
        </div>
      </div>
    </div>
  );
}
