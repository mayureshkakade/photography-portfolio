import Home from '@/components/Home';
import {
  CAROUSEL_FOLDER_ID,
  FILMS_FOLDER_ID,
  INSTAGRAM_FOLDER_ID,
  getAlbums,
} from '@/components/Home/helper';
import { fetchAllAlbumsDetails, fetchFilmData } from '@/lib/google-drive-image';
import {
  AlbumData,
  AppImageData,
  FilmItem,
  Nullable,
} from '@/components/types';
import { GetStaticProps } from 'next';
import { fetchGoogleDriveImages } from '@/lib/google-drive-image';

interface HomePageProps {
  albums: AlbumData[];
  carouselImages: AppImageData[];
  instagramImages: AppImageData[];
  filmData: Nullable<FilmItem>;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    let albums: AlbumData[] = [];
    let carouselImages: AppImageData[] = [];
    let instagramImages: AppImageData[] = [];
    let filmData: Nullable<FilmItem> = null;

    if (API_KEY) {
      try {
        albums = await fetchAllAlbumsDetails(getAlbums(), API_KEY);
        carouselImages = await fetchGoogleDriveImages(
          CAROUSEL_FOLDER_ID,
          API_KEY
        );
        instagramImages = await fetchGoogleDriveImages(
          INSTAGRAM_FOLDER_ID,
          API_KEY
        );

        const films = await fetchFilmData(FILMS_FOLDER_ID, API_KEY);
        filmData =
          films.find((film) => film.imageName.toLowerCase() === 'home') ?? null;
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
        filmData,
      },
      revalidate: 30, // ISR: Revalidate every 30 secs
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        albums: [],
        carouselImages: [],
        instagramImages: [],
        filmData: null,
      },
    };
  }
};

export default function HomePage({
  albums,
  carouselImages,
  instagramImages,
  filmData,
}: HomePageProps) {
  return (
    <Home
      albums={albums}
      carouselImages={carouselImages}
      instagramImages={instagramImages}
      filmData={filmData}
    />
  );
}
