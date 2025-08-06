import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';
import InstagramSection from './Instagram';
import { getFilmsData } from '../Films/helper';
import { AlbumData } from '../types';

interface CarouselImage {
  id: string;
  url: string;
  name: string;
}

interface HomeProps {
  albums: AlbumData[];
  carouselImages: CarouselImage[];
}

const Home: FC<HomeProps> = ({ albums, carouselImages }) => {
  // Log the carousel images fetched from Google Drive
  console.log('Carousel Images fetched from Google Drive:', carouselImages);
  return (
    <>
      <Carousel />
      <Heading />
      <Albums albums={albums.slice(0, 4)} parentFeature="home-page" />
      <Info />
      <FilmPlayer filmData={getFilmsData()[0]} />
      <Testimonials />
      <InstagramSection />
    </>
  );
};

export default Home;
