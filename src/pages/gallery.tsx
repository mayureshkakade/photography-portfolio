import { GetServerSideProps } from 'next';
import GalleryLayout from '@/components/Gallery';

interface GalleryImage {
  id: string;
  name: string;
  url: string;
}

interface GalleryPageProps {
  images: GalleryImage[];
  displayName?: string;
  error?: string;
}

export const getServerSideProps: GetServerSideProps<GalleryPageProps> = async (
  context
) => {
  try {
    const { displayName, id } = context.query;
    const API_KEY = process.env.GOOGLE_API_KEY;
    if (!API_KEY) {
      throw new Error('Google API key is not configured');
    }
    const FOLDER_ID = id;
    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch images from Google Drive. Status: ${response.status}`
      );
    }

    const data = await response.json();
    const imageFiles: GalleryImage[] = data.files.map(
      (file: { id: string; name: string }) => ({
        id: file.id,
        name: file.name,
        url: `https://lh3.googleusercontent.com/d/${file.id}`,
      })
    );

    return {
      props: {
        images: imageFiles,
        displayName: (displayName as string) || 'My Photography Portfolio',
      },
    };
  } catch (error) {
    console.error('Error fetching gallery images:', error);

    return {
      props: {
        images: [],
        error:
          error instanceof Error ? error.message : 'An unknown error occurred',
      },
    };
  }
};

export default function Gallery({
  images,
  displayName,
  error,
}: GalleryPageProps) {
  if (error) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Error Loading Gallery</h1>
        <p>{error}</p>
        <p>Please check your configuration and try again.</p>
      </div>
    );
  }

  return <GalleryLayout images={images} title={displayName} />;
}
