import Carousel from '@/components/Carousel';
import { Albums } from '@/components/Home/Albums';
import { FeaturedAlbumsHeading } from '@/components/Home/Text';
import { getAlbums, ALBUM_CAROUSEL_FOLDER_ID } from '@/components/Home/helper';
import {
  fetchAllAlbumsDetails,
  fetchGoogleDriveImages,
} from '@/lib/google-drive-image';
import { AlbumData, AppImageData } from '@/components/types';
import { GetStaticProps } from 'next';

interface GalleryAlbumsProps {
  albums: AlbumData[];
  carouselImages: AppImageData[];
}

export const getStaticProps: GetStaticProps<GalleryAlbumsProps> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    let albums: AlbumData[] = [];
    let carouselImages: AppImageData[] = [];

    if (API_KEY) {
      try {
        albums = await fetchAllAlbumsDetails(getAlbums(), API_KEY);
        carouselImages = await fetchGoogleDriveImages(
          ALBUM_CAROUSEL_FOLDER_ID,
          API_KEY,
          'large'
        );
      } catch (error) {
        console.error(
          'Error fetching album details or carousel images from Google Drive:',
          error
        );
      }
    } else {
      console.warn('GOOGLE_API_KEY not found in environment variables');
    }

    return {
      props: {
        albums,
        carouselImages,
      },
      revalidate: 30, // ISR: Revalidate every 30 secs
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        albums: [],
        carouselImages: [],
      },
    };
  }
};

export default function GalleryAlbums({
  albums,
  carouselImages,
}: GalleryAlbumsProps) {
  return (
    <>
      <Carousel carouselImages={carouselImages} />
      <FeaturedAlbumsHeading />
      <Albums albums={albums} parentFeature="albums-page" />
    </>
  );
}
