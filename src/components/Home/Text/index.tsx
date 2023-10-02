import { FC } from 'react';
import { homePageTagLine } from '@/constants';

export const Heading: FC = () => {
  return (
    <div className="photography_skill_area">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-9 col-md-9">
            <div className="section_title text-center">
              <h3>{homePageTagLine}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Info: FC = () => {
  return (
    <div style={{ margin: '20px 0px 35px 0px' }}>
      <div className="container">
        <h2 className="text_header">
          INDIAN CANDID WEDDING PHOTOGRAPHER & FILMMAKER
        </h2>
        <div
          style={{ textAlign: 'center' }}
          className="row align-items-center text_content"
        >
          <p>
            Are you ready to experience a blend of magical emotions and relive
            them in the years to come? We&apos;ve got our lenses ready.
            <br />
            We creatively capture your precious moments in a photojournalistic
            style with a fun, upbeat, and quirky approach. With years of happy
            tears behind our cameras, we document an elaborate experience that
            starts before your wedding day and extends beyond the 7 pheras. Your
            big day is full of cherishable memories and it deserves to be
            captured in its full essence.
          </p>
        </div>
      </div>
    </div>
  );
};
