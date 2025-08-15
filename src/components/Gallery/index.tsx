import Image from 'next/image';
import Masonry from 'react-masonry-css';
import React, { useEffect, useState } from 'react';
import { getCoverImage, getGalleryImages } from './helper';
import Lightbox, { GalleryImage } from '@/components/Lightbox';
import {
  getOptimizedGoogleDriveUrl,
  getBlurPlaceholder,
  imageSizes,
  imageDimensions,
} from '@/lib/google-drive-image';
import styles from './Gallery.module.css';

interface GalleryLayoutProps {
  images: GalleryImage[];
  title?: string;
}

export default function GalleryLayout({ images }: GalleryLayoutProps) {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const coverImage = getCoverImage(images, isMobileView);
  const galleryImages = getGalleryImages(images);
  const breakpointColumnsObj = {
    default: 3,
    1100: 3,
    700: 3,
    500: 2,
  };

  useEffect(() => {
    const isMobileView = window.innerWidth <= 768;
    setIsMobileView(isMobileView);
  }, []);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === galleryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? galleryImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <React.Fragment>
      <div className={styles.coverContainer}>
        <Image
          alt="cover"
          src={
            coverImage ? getOptimizedGoogleDriveUrl(coverImage.id, 'full') : ''
          }
          width={imageDimensions.cover.width}
          height={imageDimensions.cover.height}
          sizes="100vw"
          className={styles.coverImage}
          quality={100}
          priority
          placeholder="blur"
          blurDataURL={getBlurPlaceholder()}
        />

        <button
          onClick={() => {
            const galleryElement = document.getElementById('masonry-gallery');
            if (galleryElement) {
              galleryElement.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          className={styles.viewGalleryButton}
        >
          View Gallery
        </button>
      </div>
      <Masonry
        id="masonry-gallery"
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{ padding: '6% 5% 5%' }}
      >
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            className={styles.galleryImageContainer}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={getOptimizedGoogleDriveUrl(image.id, 'full')}
              alt={image.name}
              width={imageDimensions.gallery.width}
              height={imageDimensions.gallery.height}
              sizes={imageSizes.gallery}
              className={styles.galleryImage}
              placeholder="blur"
              blurDataURL={getBlurPlaceholder()}
              loading="lazy"
              quality={100}
            />
          </div>
        ))}
      </Masonry>

      <Lightbox
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrevious={goToPrevious}
      />
    </React.Fragment>
  );
}
