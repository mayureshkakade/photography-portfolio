import { GetServerSideProps } from 'next';
import GalleryLayout from '@/components/Gallery';

/**
 * Type definition for a gallery image
 */
interface GalleryImage {
  id: string;
  name: string;
  url: string;
}

/**
 * Props for the Gallery page component
 */
interface GalleryPageProps {
  images: GalleryImage[];
  displayName?: string;
  error?: string;
}

/**
 * Server-side function to fetch images from Google Drive
 * This runs on the server before rendering the page
 */
export const getServerSideProps: GetServerSideProps<GalleryPageProps> = async (
  context
) => {
  try {
    // Extract displayName from query parameters
    const { displayName } = context.query;

    // Your secret API key, securely accessed from environment variables on the server.
    const API_KEY = process.env.GOOGLE_API_KEY;

    if (!API_KEY) {
      throw new Error('Google API key is not configured');
    }

    // The ID of your publicly shared Google Drive folder.
    const FOLDER_ID = '1J5R8qUSwihacteDunrY0oDi4hhC3-lcV'; // <-- IMPORTANT: Replace with your actual folder ID.

    const apiUrl = `https://www.googleapis.com/drive/v3/files?q='${FOLDER_ID}'+in+parents&key=${API_KEY}&fields=files(id,name)`;

    // Fetch data from Google Drive API
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(
        `Failed to fetch images from Google Drive. Status: ${response.status}`
      );
    }

    const data = await response.json();

    // Map the API response to a cleaner format.
    // The URL format provides a direct link to the image content.
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

/**
 * The main Gallery page component.
 * Receives pre-fetched data from getServerSideProps.
 */
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
        <p>Please check your Google Drive configuration and try again.</p>
      </div>
    );
  }

  // Pass the pre-fetched data to the Client Component
  return <GalleryLayout images={images} title={displayName} />;
}
