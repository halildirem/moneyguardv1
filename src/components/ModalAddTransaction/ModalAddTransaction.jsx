import Modal from '../Modal/Modal';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';

const ModalAddTransaction = ({ onClose }) => (
  <Modal onClose={onClose}>
    <AddTransactionForm onClose={onClose} />
  </Modal>
);

export default ModalAddTransaction;
