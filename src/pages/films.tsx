import FilmsPage from '@/components/Films';
import { GetStaticProps } from 'next';
import { fetchFilmData } from '@/lib/google-drive-image';
import { FILMS_FOLDER_ID } from '@/components/Home/helper';
import { FilmItem, FilmsPageProps } from '@/components/types';

export const getStaticProps: GetStaticProps<FilmsPageProps> = async () => {
  let films: FilmItem[] = [];

  const API_KEY = process.env.GOOGLE_API_KEY as string;
  if (API_KEY) {
    try {
      films = await fetchFilmData(FILMS_FOLDER_ID, API_KEY);
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
