/* eslint-disable @next/next/no-img-element */
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import React, { useState } from 'react';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { AppImageData } from '../types';

interface CarouselProps {
  carouselImages: AppImageData[];
}

export default function Carousel({ carouselImages }: CarouselProps) {
  const [state, setState] = useState({
    currentSlide: 0,
    firstLoad: true,
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
    const { currentSlide } = state;

    if (currentSlide !== index) {
      setState((prev) => ({
        ...prev,
        currentSlide: index,
      }));
    }
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
                src={item.url}
              />
            </div>
          );
        })}
      </ResponsiveCarousel>
    </div>
  );
}
