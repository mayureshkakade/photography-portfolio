import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { FC, useState } from 'react';

import Image from 'next/image';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { getCarouselImages } from '../helper';

export const Carousel: FC = () => {
  const images = getCarouselImages();
  const [{ currentSlide }, setState] = useState({
    currentSlide: 0,
    isLoading: true,
  });

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
    if (currentSlide !== index) {
      setState((state) => ({
        ...state,
        currentSlide: index,
      }));
    }
  };

  return (
    <div
      className="padding_top"
      style={{
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <div onClick={prev} className="my-prev-arrow">
        <i
          className="fa fa-angle-left"
          style={{ fontSize: '1.7em', color: '#8080807a' }}
        />
      </div>
      <div onClick={next} className="my-next-arrow">
        <i
          className="fa fa-angle-right"
          style={{ fontSize: '1.7em', color: '#8080807a' }}
        />
      </div>

      <ResponsiveCarousel
        showIndicators={false}
        showStatus={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        stopOnHover={false}
        interval={3000}
        dynamicHeight
        showArrows={false}
        selectedItem={currentSlide}
        onChange={updateCurrentSlide}
      >
        {images.map((item) => {
          return (
            <div key={item.id}>
              <Image
                alt="Wedding Photograph"
                src={item.image}
                width={1000}
                height={1000}
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          );
        })}
      </ResponsiveCarousel>
    </div>
  );
};
