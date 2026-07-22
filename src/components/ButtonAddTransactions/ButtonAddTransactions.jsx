import { MdAdd } from 'react-icons/md';
import css from './ButtonAddTransactions.module.css';

const ButtonAddTransactions = ({ onClick }) => (
  <button
    type="button"
    className={css.fab}
    onClick={onClick}
    aria-label="Add transaction"
  >
    <MdAdd />
  </button>
);

export default ButtonAddTransactions;
