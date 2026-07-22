import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  fetchTransactions,
  fetchCategories,
} from '../../redux/finance/financeOperations';
import TransactionsList from '../../components/TransactionsList/TransactionsList';
import ButtonAddTransactions from '../../components/ButtonAddTransactions/ButtonAddTransactions';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';

const HomeTab = () => {
  const dispatch = useDispatch();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <TransactionsList onEdit={setEditingTransaction} />
      <ButtonAddTransactions onClick={() => setIsAddOpen(true)} />

      {isAddOpen && (
        <ModalAddTransaction onClose={() => setIsAddOpen(false)} />
      )}
      {editingTransaction && (
        <ModalEditTransaction
          transaction={editingTransaction}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
};

export default HomeTab;
