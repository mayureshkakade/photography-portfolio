import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';
import InstagramSection from './Instagram';
import { getFilmsData } from '../Films/helper';
import { getAlbums } from './helper';

const Home: FC = () => {
  return (
    <>
      <Carousel />;
      <Heading />
      <Albums albums={getAlbums().slice(0, 4)} parentFeature="home-page" />
      <Info />
      <FilmPlayer filmData={getFilmsData()[0]} />
      <Testimonials />
      <InstagramSection />
    </>
  );
};

export default Home;
