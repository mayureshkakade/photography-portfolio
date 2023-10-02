import Album from '@/components/Album';
import { FC } from 'react';
import { getAlbums } from '../helper';

export const Albums: FC = () => {
  return (
    <div
      style={{ paddingTop: '0px', paddingBottom: '0px' }}
      className="gallery_area"
    >
      <div className="container-fluid p-0">
        <div
          style={{ marginLeft: '7%', marginRight: '7%' }}
          className="row no-gutters "
        >
          {getAlbums().map((category) => (
            <Album
              key={category.id}
              title={category.name}
              displayName={category.displayName}
              thumbnail={category.thumbnail}
              imageCount={category.count}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
