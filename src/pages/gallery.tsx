import Gallery, { GalleryProps } from '@/components/Gallery';
import { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import { ParsedUrlQuery } from 'querystring';

interface GalleryParsedUrlQuery extends ParsedUrlQuery {
  currentCategory: string;
  imageCount: string;
  displayName: string;
}

export const getServerSideProps: GetServerSideProps<{
  galleryData: GalleryProps;
}> = async (context) => {
  const params = context.query as GalleryParsedUrlQuery;

  return {
    props: {
      galleryData: {
        currentCategory: params.currentCategory,
        displayName: params.displayName,
        imageCount: Number(params.imageCount),
      },
    },
  };
};

export default function ImageGallery(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
  const { galleryData } = props;

  return (
    <>
      <Gallery {...galleryData} />
    </>
  );
}
