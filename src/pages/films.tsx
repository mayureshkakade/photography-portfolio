import FilmsPage from '@/components/Films';
import { GetStaticProps } from 'next';
import {
  fetchGoogleDriveFilesFromFolder,
  getOptimizedGoogleDriveUrl,
} from '@/lib/google-drive-image';
import { FILMS_FOLDER_ID } from '@/components/Home/helper';
import { FilmItem, FilmsPageProps } from '@/components/types';

// Make sure this is the correct env var name in your project
const API_KEY = process.env.GOOGLE_API_KEY as string;

export const getStaticProps: GetStaticProps<FilmsPageProps> = async () => {
  let films: FilmItem[] = [];

  if (API_KEY) {
    try {
      // 1. List all files in the folder
      const files = await fetchGoogleDriveFilesFromFolder(
        FILMS_FOLDER_ID,
        API_KEY
      );
      // 2. Find films.json and fetch its content
      const jsonFile = files.find((f) =>
        f.name.toLowerCase().includes('films.json')
      );
      let filmsJson: { url: string; imageName: string }[] = [];
      if (jsonFile) {
        const jsonUrl = `https://www.googleapis.com/drive/v3/files/${jsonFile.id}?alt=media&key=${API_KEY}`;
        const res = await fetch(jsonUrl);
        if (res.ok) {
          filmsJson = await res.json();
        }
      }
      // 3. Get all images in the folder (exclude json)
      const imageFiles = files.filter(
        (f) =>
          f.name !== jsonFile?.name && /\.(jpg|jpeg|png|webp)$/i.test(f.name)
      );
      // 4. Map filmsJson to FilmItem[]
      films = filmsJson.map((film) => {
        // Try to find image by name (allow for extension differences)
        const imageFile = imageFiles.find(
          (img) => img.name.split('.')[0] === film.imageName
        );
        const thumbnailUrl = imageFile
          ? getOptimizedGoogleDriveUrl(imageFile.id, 'full')
          : '';
        return { ...film, thumbnailUrl };
      });
    } catch (error) {
      console.error('Error fetching films data:', error);
    }
  }

  return {
    props: { films },
    revalidate: 3600, // 1 hour
  };
};

export default function Films({ films }: FilmsPageProps) {
  return <FilmsPage films={films} />;
}
