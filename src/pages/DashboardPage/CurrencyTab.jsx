import Currency from '../../components/Currency/Currency';
import css from './CurrencyTab.module.css';

const CurrencyTab = () => (
  <div className={css.wrapper}>
    <h2 className={css.title}>Currency</h2>
    <Currency />
  </div>
);

export default CurrencyTab;
