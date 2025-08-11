import Home from '@/components/Home';
import {
  CAROUSEL_FOLDER_ID,
  INSTAGRAM_FOLDER_ID,
  getAlbums,
} from '@/components/Home/helper';
import { fetchAllAlbumsDetails } from '@/lib/google-drive-image';
import { AlbumData, AppImageData } from '@/components/types';
import { GetServerSideProps } from 'next';
import { fetchGoogleDriveCarouselImages } from '@/lib/google-drive-image';

interface HomePageProps {
  albums: AlbumData[];
  carouselImages: AppImageData[];
  instagramImages: AppImageData[];
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    let albums: AlbumData[] = [];
    let carouselImages: AppImageData[] = [];
    let instagramImages: AppImageData[] = [];

    if (API_KEY) {
      try {
        albums = await fetchAllAlbumsDetails(getAlbums(), API_KEY);
        carouselImages = await fetchGoogleDriveCarouselImages(
          CAROUSEL_FOLDER_ID,
          API_KEY
        );
        instagramImages = await fetchGoogleDriveCarouselImages(
          INSTAGRAM_FOLDER_ID,
          API_KEY
        );
      } catch (error) {
        console.error('Error fetching data from Google Drive:', error);
      }
    } else {
      console.warn(
        'GOOGLE_API_KEY or CAROUSEL_FOLDER_ID not found in environment variables. Using static album data and empty Carousel.'
      );
    }

    return {
      props: {
        albums,
        carouselImages,
        instagramImages,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        albums: [],
        carouselImages: [],
        instagramImages: [],
      },
    };
  }
};

export default function HomePage({
  albums,
  carouselImages,
  instagramImages,
}: HomePageProps) {
  return (
    <Home
      albums={albums}
      carouselImages={carouselImages}
      instagramImages={instagramImages}
    />
  );
}
