import appData from '../../../data/metadata.json';

export const getCarouselImages = () => {
  const { baseDir, totalImages } = appData.home.carousel;
  return [...Array(totalImages)].map((_, index) => {
    return {
      id: index + 1,
      image: `${baseDir}banner${index + 1}.jpg`,
    };
  });
};
