import appData from '../../../data/metadata.json';

 const getGalleryImagesBaseDir = () => {
  return appData.gallery.baseDir;
};

export const getCoverImage = (category:string)=>{
  return `${getGalleryImagesBaseDir()}/${category}/cover/1.jpg`;
}

export const getLazyImagesDir = (category:string)=>{
    return `${getGalleryImagesBaseDir()}/${category}/gallery/lazy-images`;
}

export const getRealImagesDir = (category:string)=>{
    return `${getGalleryImagesBaseDir()}/${category}/gallery/images`;
}