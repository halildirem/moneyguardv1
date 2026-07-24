import { useSelector } from 'react-redux';
import {
  selectTransactions,
  selectCategories,
  selectCurrencyRates,
  selectSelectedCurrency,
} from '../../redux/finance/financeSelectors';
import TransactionsItem from '../TransactionsItem/TransactionsItem';
import css from './TransactionsList.module.css';

const TransactionsList = ({ onEdit }) => {
  const transactions = useSelector(selectTransactions);
  const categories = useSelector(selectCategories);
  const rates = useSelector(selectCurrencyRates);
  const currency = useSelector(selectSelectedCurrency);

  const categoryNameById = categories.reduce((acc, category) => {
    acc[category.id] = category.name;
    return acc;
  }, {});

  if (transactions.length === 0) {
    return <p className={css.placeholder}>No transactions yet</p>;
  }

  return (
    <div>
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
              currency={currency}
              rates={rates}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsList;
