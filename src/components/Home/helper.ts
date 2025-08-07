import appData from '../../../data/metadata.json';
import { AlbumData } from '../types';

export const getCarouselImages = () => {
  const { baseDir, totalImages } = appData.home.carousel;
  return [...Array(totalImages)].map((_, index) => {
    return {
      id: index + 1,
      image: `${baseDir}banner${index + 1}.jpg`,
    };
  });
};

export const getInstagramSectionImages = () => {
  const { baseDir, totalImages } = appData.home.instagram;
  return [...Array(totalImages)].map((_, index) => {
    return {
      id: index + 1,
      image: `${baseDir}${index + 1}.png`,
    };
  });
};

export const getAlbums = (): AlbumData[] => {
  return appData.albums;
};

export const CAROUSEL_FOLDER_ID = appData.home.carousel.id;
