import { ThreeDots } from 'react-loader-spinner';
import css from './SuspenseFallback.module.css';

const SuspenseFallback = () => (
  <div className={css.wrapper}>
    <ThreeDots color="#F8A23A" height={80} width={80} />
  </div>
);

export default SuspenseFallback;
