import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import { Heading } from './Heading';

const Home: FC = () => {
  return (
    <>
      <Carousel />;
      <Heading />
      <Albums />
    </>
  );
};

export default Home;
