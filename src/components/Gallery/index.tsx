// 'use client'; // This directive is essential. It marks this as a Client Component.
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import React, { useState, useEffect, useCallback } from 'react';

interface GalleryImage {
  id: string;
  url: string;
  name: string;
}

interface GalleryLayoutProps {
  images: GalleryImage[];
  title?: string;
}

interface LightboxProps {
  images: GalleryImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

/**
 * Lightbox component for viewing images in fullscreen with navigation
 */
function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  // Handle keyboard navigation
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
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          background: 'rgba(255, 255, 255, 0.8)',
          border: 'none',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          fontSize: '20px',
          cursor: 'pointer',
          zIndex: 1001,
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
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 1001,
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
            background: 'rgba(255, 255, 255, 0.8)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 1001,
          }}
          aria-label="Next image"
        >
          ›
        </button>
      )}

      {/* Image container */}
      <div
        style={{
          maxWidth: '90%',
          maxHeight: '90%',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.url}
          alt={currentImage.name}
          width={1200}
          height={800}
          style={{
            maxWidth: '100%',
            maxHeight: '90vh',
            width: 'auto',
            height: 'auto',
            objectFit: 'contain',
          }}
          unoptimized
        />

        {/* Image info */}
        <div
          style={{
            position: 'absolute',
            bottom: '-40px',
            left: '0',
            right: '0',
            textAlign: 'center',
            color: 'white',
            fontSize: '14px',
          }}
        >
          <p>{currentImage.name}</p>
          <p>
            {currentIndex + 1} of {images.length}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Renders the images in a masonry layout with lightbox functionality.
 * This component runs in the browser.
 */
export default function GalleryLayout({ images }: GalleryLayoutProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const coverImage = images.find((image) => image.name.includes('cover'));
  const galleryImages = images.filter((image) => !image.name.includes('cover'));

  // Configuration for responsive columns.
  const breakpointColumnsObj = {
    default: 2, // 4 columns for default screen size
    1100: 2, // 3 columns on screens 1100px and smaller
    700: 2, // 2 columns on screens 700px and smaller
    500: 1, // 1 column on screens 500px and smaller
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
          src={coverImage?.url ?? ''}
          width={1200}
          height={438}
          unoptimized
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
              transition: 'transform 0.2s ease',
            }}
            onClick={() => openLightbox(index)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <Image
              src={image.url}
              alt={image.name}
              width={1000}
              height={1000}
              style={{
                width: '100%',
                height: 'auto',
                borderRadius: '8px',
              }}
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
