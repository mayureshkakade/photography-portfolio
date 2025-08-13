import ContactUs from '@/components/ContactUs';
import { CONTACT_FOLDER_ID } from '@/components/Home/helper';
import { fetchSingleCoverImage } from '@/lib/google-drive-image';
import { AppImageData } from '@/components/types';
import { GetStaticProps } from 'next';

interface ContactPageProps {
  coverImage: AppImageData;
}

export const getStaticProps: GetStaticProps<ContactPageProps> = async () => {
  try {
    const API_KEY = process.env.GOOGLE_API_KEY;
    let coverImage: AppImageData = {
      id: '',
      url: '',
      name: '',
    };

    if (API_KEY) {
      try {
        coverImage = await fetchSingleCoverImage(
          CONTACT_FOLDER_ID,
          API_KEY,
          'full'
        );
      } catch (error) {
        console.error('Error fetching ContactUs cover image:', error);
      }
    } else {
      console.warn(
        'GOOGLE_API_KEY not found in environment variables. Using empty cover image.'
      );
    }

    return {
      props: {
        coverImage,
      },
      revalidate: 30, // ISR: Revalidate every 30 seconds
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);
    return {
      props: {
        coverImage: {
          id: '',
          url: '',
          name: '',
        },
      },
    };
  }
};

export default function Contact({ coverImage }: ContactPageProps) {
  return (
    <>
      <ContactUs coverImage={coverImage} />
    </>
  );
}
