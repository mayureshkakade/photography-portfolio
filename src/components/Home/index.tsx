import { Heading, Info, Testimonials } from './Text';

import { Albums } from './Albums';
import { Carousel } from './Carousel';
import { FC } from 'react';
import FilmPlayer from './FilmPlayer';
import InstagramSection from './Instagram';
import { AlbumData, AppImageData, FilmItem, Nullable } from '../types';

interface HomeProps {
  albums: AlbumData[];
  carouselImages: AppImageData[];
  instagramImages: AppImageData[];
  filmData: Nullable<FilmItem>;
}

const Home: FC<HomeProps> = ({
  albums,
  carouselImages,
  instagramImages,
  filmData,
}) => {
  return (
    <>
      <Carousel carouselImages={carouselImages} />
      <Heading />
      <Albums albums={albums.slice(0, 4)} parentFeature="home-page" />
      <Info />
      {!!filmData && <FilmPlayer filmData={filmData} />}
      <Testimonials />
      <InstagramSection instagramImages={instagramImages} />
    </>
  );
};

export default Home;
