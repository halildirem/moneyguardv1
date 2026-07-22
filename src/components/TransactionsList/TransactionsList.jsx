import { useSelector } from 'react-redux';
import {
  selectTransactions,
  selectCategories,
} from '../../redux/finance/financeSelectors';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import css from './TransactionsList.module.css';

const TransactionsList = ({ onEdit }) => {
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);

  const categoryNameById = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  if (transactions.length === 0) {
    return <p className={css.placeholder}>No transactions yet</p>;
  }

  return (
    <div className={css.wrapper}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionsItem
              key={transaction.id}
              transaction={transaction}
              categoryName={categoryNameById[transaction.categoryId] ?? '—'}
              onEdit={onEdit}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
