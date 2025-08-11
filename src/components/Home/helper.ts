import appData from '../../../data/metadata.json';
import { AlbumData } from '../types';

export const getAlbums = (): Pick<AlbumData, 'id'>[] => {
  return appData.albums;
};

export const CAROUSEL_FOLDER_ID = appData.home.carousel.id;
export const INSTAGRAM_FOLDER_ID = appData.home.instagram.id;
