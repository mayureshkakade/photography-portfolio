import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';
import InstagramSection from './Instagram';
import { getFilmsData } from '../Films/helper';
import { AlbumData } from '../types';

interface HomeProps {
  albums: AlbumData[];
}

const Home: FC<HomeProps> = ({ albums }) => {
  return (
    <>
      <Carousel />;
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
