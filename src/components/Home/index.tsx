import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';
import InstagramSection from './Instagram';

const Home: FC = () => {
  return (
    <>
      <Carousel />;
      <Heading />
      <Albums />
      <Info />
      <FilmPlayer />
      <Testimonials />
      <InstagramSection />
    </>
  );
};

export default Home;
