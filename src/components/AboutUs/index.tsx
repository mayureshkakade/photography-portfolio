import React, { FC } from 'react';
import Image from 'next/image';

import {
  getBlurPlaceholder,
  imageDimensions,
  imageSizes,
} from '@/lib/google-drive-image';
import { AppImageData } from '../types';

interface AboutUsProps {
  coverImage: AppImageData;
}

const H2TitleStyle = {
  fontSize: '1.6875rem',
  letterSpacing: '0.3em',
  wordSpacing: '0em',
  lineHeight: '1.34em',
  textTransform: 'uppercase',
  fontWeight: 'normal',
};

const ParagraphFontStyle = {
  fontFamily: 'Josefin Sans, sans-serif',
  fontSize: '0.875rem',
  wordSpacing: '0em',
  lineHeight: '1.625em',
  textTransform: 'none',
  fontWeight: 'normal',
};

const FAQQuestionStyle = {
  fontFamily: 'Josefin Sans',
  fontSize: '16px',
  wordSpacing: '0em',
  lineHeight: '1.49em',
  textTransform: 'none',
  fontWeight: '600',
  color: 'black',
};

const FAQAnswerStyle = {
  fontFamily: 'Josefin Sans',
  fontSize: '15px',
  wordSpacing: '0em',
  lineHeight: '1.625em',
  textTransform: 'none',
  fontWeight: 'normal',
  color: 'black',
};

const AboutUs: FC<AboutUsProps> = ({ coverImage }) => {
  return (
    <>
      <div className="padding_top">
        <Image
          style={{
            width: '100%',
            height: 'auto',
            aspectRatio: `${imageDimensions.cover.width} / ${imageDimensions.cover.height}`,
            objectFit: 'cover',
          }}
          alt="Wedding Photo Banner"
          src={coverImage.url}
          width={imageDimensions.cover.width}
          height={imageDimensions.cover.height}
          sizes={imageSizes.cover}
          placeholder="blur"
          blurDataURL={getBlurPlaceholder()}
          priority
          quality={100}
        />
      </div>

      <div className="contact-section">
        <div className="container">
          <div className="row">
            <div
              style={{ paddingBottom: '3%', textAlign: 'center' }}
              className="col-lg-12 about_header"
            >
              <h2
                style={{
                  ...H2TitleStyle,
                  textTransform: 'uppercase',
                }}
                className="text-center"
              >
                WHO ARE WE?
              </h2>

              <p>
                Hi there, welcome to Omkar Kalgude Photography & Films. We are
                an au fait squad of Candid Photographers and Cinematographers
                who love capturing your stories as much you love each other. Our
                zealous team is based in India, a land where weddings are a
                larger than life affair. Led by Omkar Kalgude, we started
                photographing weddings in 2018, and since then we’ve been on a
                roll capturing hundreds of love stories across India and
                overseas. It’ll be our crowning glory to be a part of your big
                day that embellishes a beautiful journey. We can’t wait to hear
                from you!
              </p>
            </div>
            <div
              style={{ paddingBottom: '5%', textAlign: 'center' }}
              className="col-lg-12 about_header"
            >
              <h2
                style={{ ...H2TitleStyle, textTransform: 'uppercase' }}
                className="text-center"
              >
                OUR PHILOSOPHY
              </h2>

              <p>
                We believe that it’s the little moments that make a wedding.
                They weave together into a memorable tale that you can cherish
                for a lifetime. With our cameras at work, we witness your love
                stories as they unfold and document them through a creative
                lens. It’s your wedding day and you deserve to indulge in an
                unobtrusive experience and bid adieu to awkward poses.
              </p>
            </div>
            <div
              className="col-lg-6 col-sm-12 about_img"
              style={{
                marginBottom: '1.25rem',
                width: '24.125rem',
              }}
            >
              <Image
                alt="Omkar kalgue wedding photographer"
                src="assets/images/about-page/omkar_kalgude.jpg"
                width={1000}
                height={1000}
                style={{
                  width: '100%',
                  height: '100%',
                  objectPosition: 'center',
                }}
                unoptimized
              />
            </div>
            <div className="col-lg-6" style={{ textAlign: 'justify' }}>
              <div
                className="about_text"
                style={{ ...ParagraphFontStyle, textTransform: 'none' }}
              >
                <h3 className="about_name">OMKAR KALGUDE</h3>
                <p>
                  Being a Software Engineer by profession, Omkar Kalgude has
                  worked in the IT industry for 5 years before switching
                  full-time to his photography career.
                </p>
                <p>
                  It all started with a passion to click photographs and a
                  desire to tell stories from a unique perspective. He always
                  had the knack for capturing emotions, stories, and colors
                  around him. He started with wedding photography and captured
                  the bittersweet moments by adding a personal touch to the
                  craft.
                </p>
                <p>
                  Together, Omkar and his team have worked with over 100 couples
                  and delivered heartwarming stories not only of the couples but
                  also of their families. They don&apos;t just shoot what it
                  looks like but also what it feels like. They continue to
                  capture the magic to gift you moments that stay with you
                  throughout your life.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-lg-12 pb-4 pb-sm-3">
        <h2
          style={{ ...H2TitleStyle, textTransform: 'uppercase' }}
          className="text-center"
        >
          We turn your dream wedding into a fairy tale.
        </h2>
        <h2
          style={{
            marginBottom: '5%',
            ...H2TitleStyle,
            textTransform: 'uppercase',
          }}
          className="text-center"
        >
          Talk to us today!
        </h2>
      </div>

      <div>
        <div className="container" style={{ marginBottom: '80px' }}>
          <div className="row" style={{ position: 'relative' }}>
            <div
              className="middle_line about-page-divider"
              style={{ marginTop: '35px', width: '1px' }}
            ></div>
            <div style={{ paddingBottom: '80px' }} className="col-lg-12">
              <h2
                style={{ ...H2TitleStyle, textTransform: 'uppercase' }}
                className="text-center"
              >
                FAQS
              </h2>
            </div>

            <div
              className="col-lg-6"
              style={{
                paddingLeft: '4.375rem',
                paddingRight: '3.1875rem',
                marginBottom: '1.75rem',
              }}
            >
              <h3 style={{ ...FAQQuestionStyle, textTransform: 'none' }}>
                • Where are you guys based out of, do you travel to different
                locations for weddings?
              </h3>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                We are based in Maharashtra, India and we travel across the
                globe for shoots.
              </h4>
            </div>
            <div
              className="col-lg-6"
              style={{
                paddingLeft: '4.375rem',
                paddingRight: '3.1875rem',
                marginBottom: '1.75rem',
              }}
            >
              <h3 style={{ ...FAQQuestionStyle, textTransform: 'none' }}>
                • What are the various services you offer?
              </h3>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                {' '}
                Wedding Photography
              </h4>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                {' '}
                Wedding Cinematography
              </h4>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                {' '}
                Pre & Post Wedding Shoot
              </h4>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                {' '}
                Couple & Family Portraits
              </h4>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                {' '}
                Kids Portraits
              </h4>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                {' '}
                Maternity Portraits
              </h4>
            </div>
            <div className="w-100"></div>
            <div
              className="col-lg-6"
              style={{
                paddingLeft: '4.375rem',
                paddingRight: '3.1875rem',
                marginBottom: '1.75rem',
              }}
            >
              <h3 style={{ ...FAQQuestionStyle, textTransform: 'none' }}>
                • What is the difference between candid and traditional
                Photography
              </h3>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                Candid Photography is shooting the event as it unfolds, it is
                shot very naturally without any posing elements. Traditional
                photography is documenting the entire day in a much more safer
                perspective. It involves crowd coverage, posed stage pictures
                and every generic element is covered.
              </h4>
            </div>
            <div
              className="col-lg-6"
              style={{
                paddingLeft: '4.375rem',
                paddingRight: '3.1875rem',
                marginBottom: '1.75rem',
              }}
            >
              <h3 style={{ ...FAQQuestionStyle, textTransform: 'none' }}>
                • When will we receive our images?
              </h3>
              <h4 style={{ ...FAQAnswerStyle, textTransform: 'none' }}>
                You will get all your proofs typically within two weeks.
                Immediately post wedding, or a few days after, we post some
                preview photos of your love story on Instagram. Your pictures
                will be colour-corrected, edited, and enhanced for effect. The
                package includes all these high-resolution pictures in a
                Pendrive or an album as requested by the couple.
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
