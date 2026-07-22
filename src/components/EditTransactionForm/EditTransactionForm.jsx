import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdCalendarToday } from 'react-icons/md';
import { updateTransaction } from '../../redux/finance/financeOperations';
import { refreshUser } from '../../redux/auth/authOperations';
import { selectCategories } from '../../redux/finance/financeSelectors';
import css from './EditTransactionForm.module.css';

const schema = yup.object({
  amount: yup
    .number()
    .typeError('Enter a valid sum')
    .positive('Sum must be greater than 0')
    .required('Sum is required'),
  transactionDate: yup.date().required('Date is required'),
  comment: yup.string().trim().required('Comment is required'),
});

const EditTransactionForm = ({ transaction, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const isExpense = transaction.type === 'EXPENSE';
  const categoryName =
    categories.find((category) => category.id === transaction.categoryId)
      ?.name ?? (isExpense ? '—' : 'Income');

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      amount: Math.abs(transaction.amount),
      transactionDate: new Date(transaction.transactionDate),
      comment: transaction.comment,
    },
  });

  const onSubmit = async (values) => {
    try {
      const signedAmount = isExpense
        ? -Math.abs(Number(values.amount))
        : Math.abs(Number(values.amount));

      await dispatch(
        updateTransaction({
          id: transaction.id,
          amount: signedAmount,
          transactionDate: values.transactionDate.toISOString(),
          comment: values.comment,
        }),
      ).unwrap();
      dispatch(refreshUser());
      onClose();
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to update transaction',
      );
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={css.title}>Edit transaction</h2>

      <p className={css.typeLabel}>
        <span className={isExpense ? css.muted : css.income}>Income</span>
        {' / '}
        <span className={isExpense ? css.expense : css.muted}>Expense</span>
      </p>

      <div className={css.field}>
        <span className={css.categoryDisplay}>{categoryName}</span>
      </div>

      <div className={css.row}>
        <div className={css.field}>
          <input
            className={css.input}
            type="number"
            step="0.01"
            placeholder="0.00"
            {...register('amount')}
          />
        </div>
        <div className={css.field}>
          <Controller
            control={control}
            name="transactionDate"
            render={({ field }) => (
              <DatePicker
                selected={field.value}
                onChange={field.onChange}
                dateFormat="dd.MM.yyyy"
                maxDate={new Date()}
                className={css.input}
              />
            )}
          />
          <MdCalendarToday className={css.calendarIcon} />
        </div>
      </div>
      {errors.amount && <p className={css.error}>{errors.amount.message}</p>}
      {errors.transactionDate && (
        <p className={css.error}>{errors.transactionDate.message}</p>
      )}

      <div className={css.field}>
        <input
          className={css.input}
          type="text"
          placeholder="Comment"
          {...register('comment')}
        />
      </div>
      {errors.comment && <p className={css.error}>{errors.comment.message}</p>}

      <div className={css.actions}>
        <button type="submit" className={css.primaryBtn}>
          Save
        </button>
        <button type="button" className={css.secondaryBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditTransactionForm;
