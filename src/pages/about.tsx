import AboutUs from '@/components/AboutUs';
import { ABOUT_FOLDER_ID } from '@/components/Home/helper';
import { fetchSingleCoverImage } from '@/lib/google-drive-image';
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
      coverImage = await fetchSingleCoverImage(
        ABOUT_FOLDER_ID,
        API_KEY,
        'full'
      );
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
