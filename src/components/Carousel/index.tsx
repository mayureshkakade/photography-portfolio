/* eslint-disable @next/next/no-img-element */
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { useEffect, useState } from 'react';
import { Carousel as ResponsiveCarousel} from 'react-responsive-carousel';
import { getCarouselImages } from './helper';

export default function Carousel() {
  const [state, setState] = useState({
    currentSlide: 0,
    firstLoad: true,
    isLoading: true,
  });

  const carouselImages = getCarouselImages();

  // Begin polling for the required lazy images tag and observe the images for intersection
  useEffect(() => {
    const lazyImagePoll = setInterval(() => {
      if (
        state.firstLoad &&
        document.querySelectorAll('img.lazy_load_image').length > 0
      ) {
        clearInterval(lazyImagePoll);
        const imageObserver = new IntersectionObserver((entry, imgObserver) => {
          entry.forEach((element) => {
            if (element.isIntersecting) {
              const lazyImage = element.target as HTMLImageElement;
              lazyImage.src = lazyImage.dataset.src ?? '';
              lazyImage.classList.remove('lazy_load_image');
              imgObserver.unobserve(lazyImage);
            }
          });
        });

        const arr = document.querySelectorAll('img.lazy_load_image');
        arr.forEach((v) => {
          imageObserver.observe(v);
        });
        setState((prev) => ({ ...prev, firstLoad: false }));
      }
    }, 200);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Callback fired on next image request in carousel
  const next = () => {
    setState((state) => ({
      ...state,
      currentSlide: state.currentSlide + 1,
    }));
  };

  // Callback fired on previous image request in carousel
  const prev = () => {
    setState((state) => ({
      ...state,
      currentSlide: state.currentSlide - 1,
    }));
  };

  // Callback fired after the slide is changed in carousel
  const updateCurrentSlide = (index: number) => {
    const { currentSlide } = state;

    if (currentSlide !== index) {
      setState((prev) => ({
        ...prev,
        currentSlide: index,
      }));
    }
  };

  // Callback fired when first image in carousel loads and carousel skeleton disappears
  const stopLoader = () => {
    setState((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <div
      className="padding_top"
      style={{
        maxWidth: '950px',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingTop: '125px',
      }}
    >
      <div onClick={prev} className="my-prev-arrow">
        <i
          className="fa fa-angle-left"
          style={{ fontSize: '1.5em', color: 'grey' }}
        />
      </div>
      <div onClick={next} className="my-next-arrow">
        <i
          className="fa fa-angle-right"
          style={{ fontSize: '1.5em', color: 'grey' }}
        />
      </div>

      <ResponsiveCarousel
        showIndicators={false}
        showStatus={false}
        showThumbs={true}
        thumbWidth={135}
        infiniteLoop
        stopOnHover={false}
        autoPlay={true}
        dynamicHeight
        showArrows={false}
        selectedItem={state.currentSlide}
        onChange={updateCurrentSlide}
      >
        {carouselImages.map((item) => {
          return (
            <div key={item.id} style={{ height: '100%' }}>
              <img
                className="lazy_load_image"
                style={{ height: '100%' }}
                alt="Carousel"
                onLoad={() => {
                  if (item.id === 1) stopLoader();
                }}
                data-src={item.image}
                src={item.thumbnail}
              />
            </div>
          );
        })}
      </ResponsiveCarousel>
      {/* TODO: Add Skeleton Component */}
      {state.isLoading && 'Loading...'}
    </div>
  );
}
