import { useSelector } from 'react-redux';
import { ThreeDots } from 'react-loader-spinner';
import { selectIsLoading } from '../../redux/global/globalSelectors';
import css from './Loader.module.css';

const Loader = () => {
  const isLoading = useSelector(selectIsLoading);

  if (!isLoading) {
    return null;
  }

  return (
    <div className={css.overlay}>
      <ThreeDots color="#efce4e" height={80} width={80} />
    </div>
  );
};

export default Loader;
