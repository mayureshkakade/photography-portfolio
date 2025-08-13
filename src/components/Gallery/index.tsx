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
    default: 4,
    1100: 4,
    700: 4,
    500: 2,
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
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Image
          alt="cover"
          src={
            coverImage ? getOptimizedGoogleDriveUrl(coverImage.id, 'full') : ''
          }
          width={imageDimensions.cover.width}
          height={imageDimensions.cover.height}
          sizes="100vw"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
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
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            borderRadius: '25px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(4px)',
            zIndex: 10,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 1)';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.6)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            e.currentTarget.style.transform = 'translateX(-50%) scale(1)';
          }}
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
            style={{
              cursor: 'pointer',
            }}
            onClick={() => openLightbox(index)}
          >
            <Image
              src={getOptimizedGoogleDriveUrl(image.id, 'full')}
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
