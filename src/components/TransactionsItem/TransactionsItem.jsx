import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEdit } from 'react-icons/md';
import { deleteTransaction } from '../../redux/finance/financeOperations';
import { refreshUser } from '../../redux/auth/authOperations';
import { convertFromBase, formatMoney } from '../../utils/currency';
import css from './TransactionsItem.module.css';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}.${month}.${date.getFullYear()}`;
};

const TransactionsItem = ({ transaction, categoryName, onEdit, currency, rates }) => {
  const dispatch = useDispatch();
  const isExpense = transaction.type === 'EXPENSE';
  const convertedAmount = convertFromBase(Math.abs(transaction.amount), currency, rates);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransaction(transaction.id)).unwrap();
      dispatch(refreshUser());
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to delete transaction',
      );
    }
  };

  return (
    <tr className={isExpense ? css.rowExpense : css.rowIncome}>
      <td data-label="Date" className={css.cell}>
        {formatDate(transaction.transactionDate)}
      </td>
      <td data-label="Type" className={css.cell}>
        {isExpense ? '-' : '+'}
      </td>
      <td data-label="Category" className={css.cell}>
        {categoryName}
      </td>
      <td data-label="Comment" className={css.cell}>
        {transaction.comment}
      </td>
      <td
        data-label="Sum"
        className={`${css.cell} ${isExpense ? css.sumExpense : css.sumIncome}`}
      >
        {formatMoney(convertedAmount)}
      </td>
      <td className={css.actions}>
        <button
          type="button"
          className={css.editBtn}
          onClick={() => onEdit(transaction)}
          aria-label="Edit transaction"
        >
          <MdEdit />
        </button>
        <button type="button" className={css.deleteBtn} onClick={handleDelete}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default TransactionsItem;
