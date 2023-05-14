import Link from 'next/link';
import classes from './styles/index.module.css';

const Custom404: React.FC = () => {
  return (
    <div className={classes.notFoundContainer}>
      <div className={classes.notFoundContent}>
        <h2>404</h2>
        <h4>Oops! Page not found</h4>
        <p>
          The page you were looking for doesn&apos;t exist. You may have
          mistyped the address or the page may have moved
        </p>
        <Link href={'/'}>Back To Home</Link>
      </div>
    </div>
  );
};

export default Custom404;
