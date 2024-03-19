/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from 'react';
import ReactPhotoGallery, { PhotoClickHandler } from 'react-photo-gallery';
import { getCoverImage, getLazyImagesDir, getRealImagesDir } from './helper';

interface ImgObjType {
  src: string;
  width: number;
  height: number;
  id: number;
  className: string;
  alt: string;
}

export interface LightBoxImageType {
  src: string;
  id: number;
}

type GalleryState = {
  category: string;
  imageCount: number;
  images: ImgObjType[];
  imagesForLightBox: LightBoxImageType[];
  isOpen: boolean;
  photoIndex: number;
  observerEnabledGallery: boolean;
};

export interface GalleryProps {
  currentCategory: string;
  imageCount: number;
  displayName: string;
}

//Lazyload the LightBox component on demand.
const MyLazyLightBox = React.lazy(() => import('./LightBox'));

export default function Gallery({ currentCategory, imageCount }: GalleryProps) {
  const [state, setState] = useState<GalleryState>({
    category: currentCategory,
    imageCount: imageCount,
    images: [],
    imagesForLightBox: [],
    isOpen: false,
    photoIndex: 0,
    observerEnabledGallery: false,
  });

  useEffect(() => {
    window.scrollTo(0, 0); //Always scroll to top of the page on mount

    //Logic to load images as per dimensions for the masonary gallery.
    [...Array(state.imageCount)].forEach((_, index) => {
      const img = new Image();
      img.src = `${getLazyImagesDir(state.category)}/${index + 1}.jpg`;

      img.onload = () => {
        const imgObj = {
          src: img.src,
          width: img.width,
          height: img.height,
          id: index + 1,
          className: 'lazy',
          alt: `${getRealImagesDir(state.category)}/${index + 1}.jpg`,
        };

        setState((prevState) => {
          if (!!!prevState.images.find((img) => img.id === imgObj.id)) {
            return {
              ...prevState,
              images: [...prevState.images, imgObj],
            };
          }
          return prevState;
        });
      };
    });

    //Logic to load the images for the lightBox component
    const lighBoxImages = [...Array(state.imageCount)].map((_, index) => {
      const imgObj = {
        src: `${getRealImagesDir(state.category)}/${index + 1}.jpg`,
        id: index + 1,
      };
      return imgObj;
    });

    setState((prev) => ({ ...prev, imagesForLightBox: lighBoxImages }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Poll for lazy images and begin observation on load.
    const imgTagPoll = setInterval(() => {
      if (
        document.querySelectorAll('img.lazy').length === state.imageCount &&
        !state.observerEnabledGallery
      ) {
        clearInterval(imgTagPoll);
        const imageObserver = new IntersectionObserver((entry, imgObserver) => {
          entry.forEach((element) => {
            if (element.isIntersecting) {
              const lazyImage = element.target as HTMLImageElement;
              const originalImage = lazyImage.src.replace(
                'lazy-images',
                'images'
              );
              lazyImage.src = originalImage;
              lazyImage.classList.remove('lazy');
              imgObserver.unobserve(lazyImage);
            }
          });
        });
        const arr = document.querySelectorAll('img.lazy');
        arr.forEach((v) => {
          imageObserver.observe(v);
        });

        setState((prev) => ({ ...prev, observerEnabledGallery: true }));
      }
    }, 200);
  }, [state.imageCount, state.observerEnabledGallery]);

  // Callback fired after lightBox is closed
  const onCloseRequest = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  // Callback fired after the previous lightbox image is requested
  const onMovePrevRequest = () => {
    setState((prev) => ({
      ...prev,
      photoIndex:
        (state.photoIndex + state.imagesForLightBox.length - 1) %
        state.imagesForLightBox.length,
    }));
  };

  // Callback fired after the next lightbox image is requested
  const onMoveNextRequest = () => {
    setState((prev) => ({
      ...prev,
      photoIndex: (state.photoIndex + 1) % state.imagesForLightBox.length,
    }));
  };

  // Callback fired after lightBox is requested to open
  const handleOpenLightbox: PhotoClickHandler = (e, { index }) => {
    setState((prev) => ({ ...prev, photoIndex: index, isOpen: true }));
  };

  // Specify the number of columns in the image gallery.
  const columns = (containerWidth: number) => {
    let columns = 1;
    if (containerWidth >= 500) columns = 2;
    if (containerWidth >= 900) columns = 2;
    if (containerWidth >= 1500) columns = 2;
    return columns;
  };

  const { images, imagesForLightBox, photoIndex, isOpen, category } = state;
  if (images.length > 0 && imagesForLightBox.length > 0) {
    return (
      <React.Fragment>
        {/* Display cover for gallery*/}
        <div className="padding_top">
          <img
            style={{ width: '100%' }}
            alt="cover"
            src={getCoverImage(category)}
          />
        </div>

        {/* Gallery Area */}
        <div style={{ padding: '6% 8% 8%' }}>
          <ReactPhotoGallery
            direction={'column'}
            photos={images.sort((a, b) => a.id - b.id)}
            onClick={handleOpenLightbox}
            columns={columns}
          />
        </div>

        {/* Lightbox for the gallery */}
        {isOpen && (
          <React.Suspense fallback={<div>Loading...</div>}>
            <MyLazyLightBox
              imagesForLightBox={imagesForLightBox}
              photoIndex={photoIndex}
              onCloseRequest={onCloseRequest}
              onMoveNextRequest={onMoveNextRequest}
              onMovePrevRequest={onMovePrevRequest}
            />
          </React.Suspense>
        )}
      </React.Fragment>
    );
  } else {
    //  TODO: Add loader component
    return <div>Loading...</div>;
  }
}
