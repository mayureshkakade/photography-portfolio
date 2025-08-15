import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';
import InstagramSection from './Instagram';
import { AlbumData, AppImageData } from '../types';

interface HomeProps {
  albums: AlbumData[];
  carouselImages: AppImageData[];
  instagramImages: AppImageData[];
}

const Home: FC<HomeProps> = ({ albums, carouselImages, instagramImages }) => {
  return (
    <>
      <Carousel carouselImages={carouselImages} />
      <Heading />
      <Albums albums={albums.slice(0, 4)} parentFeature="home-page" />
      <Info />
      <FilmPlayer
        filmData={{
          url: '/films/film.mp4',
          imageName: 'film-thumbnail.jpg',
          thumbnailUrl: '/films/film-thumbnail.jpg',
        }}
      />
      <Testimonials />
      <InstagramSection instagramImages={instagramImages} />
    </>
  );
};

export default Home;
