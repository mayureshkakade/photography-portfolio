import { GalleryImage } from '../Lightbox';

export const getImageNumber = (name: string): number => {
  return Number(name.split('.')[0]);
};

export const getGalleryImages = (images: GalleryImage[]): GalleryImage[] => {
  return images
    .filter((image) => /^\d+\.jpg$/.test(image.name))
    .sort(
      (image1, image2) =>
        getImageNumber(image1.name) - getImageNumber(image2.name)
    );
};

export const getCoverImage = (images: GalleryImage[]): GalleryImage | null => {
  return images.find((image) => image.name.includes('cover')) || null;
};
