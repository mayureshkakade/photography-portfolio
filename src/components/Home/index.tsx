import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';

const Home: FC = () => {
  return (
    <>
      <Carousel />;
      <Heading />
      <Albums />
      <Info />
      <FilmPlayer />
      <Testimonials />
    </>
  );
};

export default Home;
