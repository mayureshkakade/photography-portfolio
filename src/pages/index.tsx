import Home from '@/components/Home';
import { CAROUSEL_FOLDER_ID, getAlbums } from '@/components/Home/helper';
import { fetchAllAlbumsDetails } from '@/lib/google-drive-image';
import { AlbumData } from '@/components/types';
import { GetServerSideProps } from 'next';
import { fetchGoogleDriveCarouselImages } from '@/lib/google-drive-image';

interface CarouselImage {
  id: string;
  url: string;
  name: string;
}

interface HomePageProps {
  albums: AlbumData[];
  carouselImages: CarouselImage[];
}

export const getServerSideProps: GetServerSideProps<
  HomePageProps
> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    let albums: AlbumData[] = [];
    let carouselImages: CarouselImage[] = [];

    if (API_KEY) {
      try {
        albums = await fetchAllAlbumsDetails(getAlbums(), API_KEY);
        carouselImages = await fetchGoogleDriveCarouselImages(
          CAROUSEL_FOLDER_ID,
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
      },
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

export default function HomePage({ albums, carouselImages }: HomePageProps) {
  return <Home albums={albums} carouselImages={carouselImages} />;
}
