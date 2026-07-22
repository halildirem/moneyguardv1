import Modal from '../Modal/Modal';
import EditTransactionForm from '../EditTransactionForm/EditTransactionForm';

const ModalEditTransaction = ({ transaction, onClose }) => (
  <Modal onClose={onClose}>
    <EditTransactionForm transaction={transaction} onClose={onClose} />
  </Modal>
);

export default ModalEditTransaction;
