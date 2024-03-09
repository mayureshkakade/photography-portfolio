import Carousel from '@/components/Carousel';
import { Albums } from '@/components/Home/Albums';
import { FeaturedAlbumsHeading } from '@/components/Home/Text';
import { getAlbums } from '@/components/Home/helper';

export default function GalleryAlbums() {
  return (
    <>
      <Carousel />
      <FeaturedAlbumsHeading />
      <Albums albums={getAlbums()} parentFeature="albums-page" />
    </>
  );
}
