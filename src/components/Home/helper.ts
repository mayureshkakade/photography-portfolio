import appData from '../../../data/metadata.json';
import { AlbumData } from '../types';

export const getAlbums = (): Pick<AlbumData, 'id'>[] => {
  return appData.albums;
};

export const CAROUSEL_FOLDER_ID = appData.home.carousel.id;
export const INSTAGRAM_FOLDER_ID = appData.home.instagram.id;
export const ABOUT_FOLDER_ID = appData.about.cover.id;
export const CONTACT_FOLDER_ID = appData.contact.cover.id;
export const ALBUM_CAROUSEL_FOLDER_ID = appData.album.carousel.id;
