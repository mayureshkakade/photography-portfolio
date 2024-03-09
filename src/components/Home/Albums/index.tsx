import Album from '@/components/Album';
import { FC } from 'react';
import { AlbumData } from '@/components/types';

interface AlbumsProps {
  parentFeature: 'home-page' | 'albums-page';
  albums: AlbumData[];
}

export const Albums: FC<AlbumsProps> = ({ albums, parentFeature }) => {
  return (
    <div
      style={{
        paddingTop: parentFeature === 'home-page' ? '0px' : '50px',
        paddingBottom: parentFeature === 'home-page' ? '0px' : '100px',
      }}
      className="gallery_area"
    >
      <div className="container-fluid p-0">
        <div
          style={{
            marginLeft: parentFeature === 'home-page' ? '7%' : '15%',
            marginRight: parentFeature === 'home-page' ? '7%' : '15%',
          }}
          className="row no-gutters "
        >
          {albums.map((category) => (
            <Album key={category.id} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};
