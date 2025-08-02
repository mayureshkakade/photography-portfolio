import Carousel from '@/components/Carousel';
import { Albums } from '@/components/Home/Albums';
import { FeaturedAlbumsHeading } from '@/components/Home/Text';
import { getAlbums } from '@/components/Home/helper';
import { fetchAllAlbumsDetails } from '@/components/Home/Albums/helper';
import { AlbumData } from '@/components/types';
import { GetServerSideProps } from 'next';

interface GalleryAlbumsProps {
  albums: AlbumData[];
}

export const getServerSideProps: GetServerSideProps<GalleryAlbumsProps> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    const staticAlbums = getAlbums();
    
    let albums = staticAlbums;
    
    if (API_KEY) {
      try {
        // Fetch album details from Google Drive for each album
        albums = await fetchAllAlbumsDetails(staticAlbums, API_KEY);
      } catch (error) {
        console.error('Error fetching album details from Google Drive:', error);
        // Fall back to static albums data if API call fails
        albums = staticAlbums;
      }
    } else {
      console.warn('GOOGLE_API_KEY not found in environment variables. Using static album data.');
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
        albums: getAlbums(),
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
