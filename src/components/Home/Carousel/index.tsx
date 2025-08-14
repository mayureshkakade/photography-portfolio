import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';

import { FC, useState } from 'react';

import Image from 'next/image';
import { Carousel as ResponsiveCarousel } from 'react-responsive-carousel';
import { AppImageData } from '@/components/types';
import { getBlurPlaceholder, imageDimensions } from '@/lib/google-drive-image';

interface CarouselProps {
  carouselImages: AppImageData[];
}

export const Carousel: FC<CarouselProps> = ({ carouselImages: images }) => {
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
    <div className={styles.carouselContainer}>
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
            <div key={item.id} className={styles.carouselImageWrapper}>
              <Image
                alt="Wedding Photograph"
                src={item.url}
                width={imageDimensions.cover.width}
                height={imageDimensions.cover.height}
                sizes="100vw"
                className={styles.carouselImage}
                placeholder="blur"
                blurDataURL={getBlurPlaceholder()}
                quality={100}
                priority
              />
            </div>
          );
        })}
      </ResponsiveCarousel>
    </div>
  );
};
