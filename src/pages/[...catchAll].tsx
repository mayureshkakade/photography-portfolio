import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: '/404',
      permanent: false,
    },
  };
};

export default function CatchAll() {
  // This component will never render because of the redirect
  return null;
}
