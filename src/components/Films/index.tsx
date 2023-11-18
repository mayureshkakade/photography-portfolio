import {
  filmPageContent,
  filmPageSubtitle1,
  filmPageSubtitle2,
  filmPageTitle,
} from '@/constants';

import { FC } from 'react';
import FilmPlayer from '../Home/FilmPlayer';
import { getFilmsData } from './helper';

const FilmsPage: FC = () => {
  const filmsData = getFilmsData();
  return (
    <>
      <div style={{ textAlign: 'center' }} className="col-lg-12 film_text">
        <h2 className="text-center film_title ">{filmPageTitle}</h2>
        <p>{filmPageContent}</p>
        <div className="text-center pt-4">
          <h2>{filmPageSubtitle1.toUpperCase()}</h2>
          <h2>{filmPageSubtitle2.toUpperCase()}</h2>
        </div>
      </div>
      <div className="film_body">
        {filmsData.map((item) => {
          return (
            <div className="film_area" key={item.id}>
              <FilmPlayer filmData={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default FilmsPage;
