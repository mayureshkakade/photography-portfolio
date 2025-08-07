import appData from '../../../data/metadata.json';
import { AlbumData } from '../types';

export const getInstagramSectionImages = () => {
  const { baseDir, totalImages } = appData.home.instagram;
  return [...Array(totalImages)].map((_, index) => {
    return {
      id: index + 1,
      image: `${baseDir}${index + 1}.png`,
    };
  });
};

export const getAlbums = (): Pick<AlbumData, 'id'>[] => {
  return appData.albums;
};

export const CAROUSEL_FOLDER_ID = appData.home.carousel.id;
