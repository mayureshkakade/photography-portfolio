import appData from '../../../data/metadata.json';

export const getCarouselImages = () => {
  const { imageBaseDir, totalImages, thumbnailBaseDir } =
    appData.gallery.carousel;

  return [...Array(totalImages)].map((_, index) => {
    return {
      id: index + 1,
      image: `${imageBaseDir}/${index + 1}.jpg`,
      thumbnail: `${thumbnailBaseDir}/${index + 1}.jpg`,
    };
  });
};
