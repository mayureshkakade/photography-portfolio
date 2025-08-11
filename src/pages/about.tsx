import AboutUs from '@/components/AboutUs';
import { ABOUT_FOLDER_ID } from '@/components/Home/helper';
import { fetchGoogleDriveImages } from '@/lib/google-drive-image';
import { AppImageData } from '@/components/types';
import { GetServerSideProps } from 'next';

interface AboutPageProps {
  coverImage: AppImageData;
}

export const getServerSideProps: GetServerSideProps<
  AboutPageProps
> = async () => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  let coverImage: AppImageData = {
    id: '',
    url: '',
    name: '',
  };

  if (API_KEY) {
    try {
      const images = await fetchGoogleDriveImages(
        ABOUT_FOLDER_ID,
        API_KEY,
        'full'
      );
      if (images.length > 0) {
        coverImage = images[0];
      }
    } catch (error) {
      console.error('Error fetching AboutUs cover image:', error);
    }
  }
  return {
    props: {
      coverImage,
    },
  };
};

export default function About({ coverImage }: AboutPageProps) {
  return (
    <>
      <AboutUs coverImage={coverImage} />
    </>
  );
}
