import { useSelector } from 'react-redux';
import { selectTotalBalance } from '../../redux/finance/financeSelectors';
import css from './Balance.module.css';

const formatCurrency = (value) =>
  new Intl.NumberFormat('uk-UA', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value ?? 0);

const Balance = () => {
  const totalBalance = useSelector(selectTotalBalance);

  return (
    <div className={css.balance}>
      <p className={css.label}>Your balance</p>
      <p className={css.value}>₴ {formatCurrency(totalBalance)}</p>
    </div>
  );
};

export default Balance;
