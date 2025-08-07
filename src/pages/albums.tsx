import Carousel from '@/components/Carousel';
import { Albums } from '@/components/Home/Albums';
import { FeaturedAlbumsHeading } from '@/components/Home/Text';
import { getAlbums } from '@/components/Home/helper';
import { fetchAllAlbumsDetails } from '@/lib/google-drive-image';
import { AlbumData } from '@/components/types';
import { GetServerSideProps } from 'next';

interface GalleryAlbumsProps {
  albums: AlbumData[];
}

export const getServerSideProps: GetServerSideProps<
  GalleryAlbumsProps
> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;

    let albums: AlbumData[] = [];

    if (API_KEY) {
      try {
        albums = await fetchAllAlbumsDetails(getAlbums(), API_KEY);
      } catch (error) {
        console.error('Error fetching album details from Google Drive:', error);
      }
    } else {
      console.warn('GOOGLE_API_KEY not found in environment variables');
    }

    return {
      props: {
        albums,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        albums: [],
      },
    };
  }
};

export default function GalleryAlbums({ albums }: GalleryAlbumsProps) {
  return (
    <>
      <Carousel />
      <FeaturedAlbumsHeading />
      <Albums albums={albums} parentFeature="albums-page" />
    </>
  );
}
