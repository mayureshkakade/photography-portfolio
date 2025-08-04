import Image from 'next/image';
import Masonry from 'react-masonry-css';
import React, { useState } from 'react';
import { getCoverImage, getGalleryImages } from './helper';
import Lightbox, { GalleryImage } from '@/components/Lightbox';
import {
  getOptimizedGoogleDriveUrl,
  getBlurPlaceholder,
  imageSizes,
  imageDimensions,
} from '@/lib/google-drive-image';

interface GalleryLayoutProps {
  images: GalleryImage[];
  title?: string;
}

export default function GalleryLayout({ images }: GalleryLayoutProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const coverImage = getCoverImage(images);
  const galleryImages = getGalleryImages(images);
  const breakpointColumnsObj = {
    default: 2,
    1100: 2,
    700: 2,
    500: 1,
  };

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
      <div>
        <Image
          style={{ width: '100%' }}
          alt="cover"
          src={
            coverImage ? getOptimizedGoogleDriveUrl(coverImage.id, 'large') : ''
          }
          width={imageDimensions.cover.width}
          height={imageDimensions.cover.height}
          sizes={imageSizes.cover}
          placeholder="blur"
          blurDataURL={getBlurPlaceholder()}
          priority
          quality={90}
        />
      </div>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
        style={{ padding: '6% 8% 8%' }}
      >
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            style={{
              cursor: 'pointer',
            }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={getOptimizedGoogleDriveUrl(image.id, 'large')}
              alt={image.name}
              width={imageDimensions.gallery.width}
              height={imageDimensions.gallery.height}
              sizes={imageSizes.gallery}
              style={{
                width: '100%',
                height: 'auto',
              }}
              placeholder="blur"
              blurDataURL={getBlurPlaceholder()}
              loading="lazy"
              quality={90}
              unoptimized
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
