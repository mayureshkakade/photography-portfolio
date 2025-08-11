import Image from 'next/image';
import React, { useEffect, useCallback, useState } from 'react';
import {
  getOptimizedGoogleDriveUrl,
  imageSizes,
  imageDimensions,
} from '@/lib/google-drive-image';
import Spinner from '@/components/Spinner';

interface GalleryImage {
  id: string;
  url: string;
  name: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  // Reset loading state when current index changes
  useEffect(() => {
    setIsImageLoading(true);
  }, [currentIndex]);

  // Get next 2 images for preloading
  const getNextImages = () => {
    const nextImages = [];
    for (let i = 1; i <= 2; i++) {
      const nextIndex = currentIndex + i;
      if (nextIndex < images.length) {
        nextImages.push({ image: images[nextIndex], index: nextIndex });
      }
    }
    return nextImages;
  };

  const nextImages = getNextImages();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          onPrevious();
          break;
        case 'ArrowRight':
          onNext();
          break;
      }
    },
    [isOpen, onClose, onNext, onPrevious]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    // Prevent body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [handleKeyDown, isOpen]);

  if (!isOpen || !images[currentIndex]) return null;

  const currentImage = images[currentIndex];

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.6)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 1001,
          transition: 'background-color 0.2s ease, opacity 0.2s ease',
          opacity: 0.7,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
          e.currentTarget.style.opacity = '1';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
          e.currentTarget.style.opacity = '0.7';
        }}
        aria-label="Close lightbox"
      >
        ×
      </button>

      {/* Previous button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          style={{
            position: 'absolute',
            left: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '24px',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1001,
            transition: 'background-color 0.2s ease, opacity 0.2s ease',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
            e.currentTarget.style.opacity = '0.7';
          }}
          aria-label="Previous image"
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {images.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '24px',
            color: 'white',
            cursor: 'pointer',
            zIndex: 1001,
            transition: 'background-color 0.2s ease, opacity 0.2s ease',
            opacity: 0.7,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
            e.currentTarget.style.opacity = '1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
            e.currentTarget.style.opacity = '0.7';
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Image container */}
      <div
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Show spinner while image is loading */}
        {isImageLoading && <Spinner />}

        <Image
          src={getOptimizedGoogleDriveUrl(currentImage.id, 'full')}
          alt={currentImage.name}
          width={imageDimensions.lightbox.width}
          height={imageDimensions.lightbox.height}
          className="lightbox-image"
          sizes={imageSizes.lightbox}
          style={{
            objectFit: 'contain',
            opacity: isImageLoading ? 0 : 1,
            transition: 'opacity 0.3s ease',
            boxShadow: '0 2px 16px rgba(0,0,0,0.7)',
          }}
          onLoad={() => setIsImageLoading(false)}
          onLoadingComplete={() => setIsImageLoading(false)}
          priority
          quality={100}
        />
      </div>

      {/* Preload next 2 images using hidden Next.js Image components */}
      {nextImages.map(({ image, index }) => (
        <div key={`preload-${index}`} style={{ display: 'none' }}>
          <Image
            src={getOptimizedGoogleDriveUrl(image.id, 'full')}
            alt={`Preload ${image.name}`}
            width={imageDimensions.lightbox.width}
            height={imageDimensions.lightbox.height}
            sizes={imageSizes.lightbox}
            priority
            quality={100}
          />
        </div>
      ))}
    </div>
  );
}

export type { LightboxProps, GalleryImage };
