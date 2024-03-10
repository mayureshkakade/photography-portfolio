import React, { FC } from 'react';
import ReactImageLightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { LightBoxImageType } from '.';

interface LighBoxProps {
  imagesForLightBox: LightBoxImageType[];
  photoIndex: number;
  onCloseRequest: () => void;
  onMoveNextRequest: () => void;
  onMovePrevRequest: () => void;
}

const LighBox: FC<LighBoxProps> = ({
  imagesForLightBox,
  photoIndex,
  onCloseRequest,
  onMovePrevRequest,
  onMoveNextRequest,
}) => {
  return (
    <ReactImageLightbox
      mainSrc={imagesForLightBox[photoIndex].src}
      nextSrc={
        imagesForLightBox[(photoIndex + 1) % imagesForLightBox.length].src
      }
      prevSrc={
        imagesForLightBox[
          (photoIndex + imagesForLightBox.length - 1) % imagesForLightBox.length
        ].src
      }
      onCloseRequest={onCloseRequest}
      onMovePrevRequest={onMovePrevRequest}
      onMoveNextRequest={onMoveNextRequest}
    />
  );
};

export default LighBox;
