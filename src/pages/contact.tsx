import ContactUs from '@/components/ContactUs';
import { CONTACT_FOLDER_ID } from '@/components/Home/helper';
import { fetchSingleCoverImage } from '@/lib/google-drive-image';
import { AppImageData } from '@/components/types';
import { GetServerSideProps } from 'next';

interface ContactPageProps {
  coverImage: AppImageData;
}

export const getServerSideProps: GetServerSideProps<ContactPageProps> = async () => {
  const API_KEY = process.env.GOOGLE_API_KEY;
  let coverImage: AppImageData = {
    id: '',
    url: '',
    name: '',
  };
  if (API_KEY) {
    try {
      coverImage = await fetchSingleCoverImage(CONTACT_FOLDER_ID, API_KEY, 'full');
    } catch (error) {
      console.error('Error fetching ContactUs cover image:', error);
    }
  }
  return {
    props: {
      coverImage,
    },
  };
};

export default function Contact({ coverImage }: ContactPageProps) {
  return (
    <>
      <ContactUs coverImage={coverImage} />
    </>
  );
}
