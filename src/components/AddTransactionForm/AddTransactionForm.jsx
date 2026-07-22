import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdCalendarToday } from 'react-icons/md';
import { addTransaction } from '../../redux/finance/financeOperations';
import { refreshUser } from '../../redux/auth/authOperations';
import { selectCategories } from '../../redux/finance/financeSelectors';
import css from './AddTransactionForm.module.css';

const schema = yup.object({
  type: yup.string().oneOf(['INCOME', 'EXPENSE']).required(),
  categoryId: yup.string().when('type', {
    is: 'EXPENSE',
    then: (s) => s.required('Category is required'),
    otherwise: (s) => s.notRequired(),
  }),
  amount: yup
    .number()
    .typeError('Enter a valid sum')
    .positive('Sum must be greater than 0')
    .required('Sum is required'),
  transactionDate: yup.date().required('Date is required'),
  comment: yup.string().trim().required('Comment is required'),
});

const AddTransactionForm = ({ onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      type: 'EXPENSE',
      categoryId: '',
      amount: '',
      transactionDate: new Date(),
      comment: '',
    },
  });

  const type = watch('type');
  const isExpense = type === 'EXPENSE';
  const expenseCategories = categories.filter((c) => c.type === 'EXPENSE');
  const incomeCategory = categories.find((c) => c.type === 'INCOME');

  useEffect(() => {
    if (!isExpense && incomeCategory) {
      setValue('categoryId', incomeCategory.id);
    }
    if (isExpense) {
      setValue('categoryId', '');
    }
  }, [isExpense, incomeCategory, setValue]);

  const toggleType = () => {
    setValue('type', isExpense ? 'INCOME' : 'EXPENSE');
  };

  const onSubmit = async (values) => {
    try {
      // API rejects expense transactions with a positive amount.
      const signedAmount =
        values.type === 'EXPENSE'
          ? -Math.abs(Number(values.amount))
          : Math.abs(Number(values.amount));

      await dispatch(
        addTransaction({
          transactionDate: values.transactionDate.toISOString(),
          type: values.type,
          categoryId: values.categoryId,
          comment: values.comment,
          amount: signedAmount,
        }),
      ).unwrap();
      dispatch(refreshUser());
      onClose();
    } catch (error) {
      toast.error(
        typeof error === 'string' ? error : 'Failed to add transaction',
      );
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className={css.title}>Add transaction</h2>

      <div className={css.toggleRow}>
        <span
          className={isExpense ? css.toggleLabelMuted : css.toggleLabelIncome}
        >
          Income
        </span>
        <button
          type="button"
          className={isExpense ? css.switchExpense : css.switchIncome}
          onClick={toggleType}
          aria-label="Toggle transaction type"
        >
          <span className={css.switchThumb}>{isExpense ? '-' : '+'}</span>
        </button>
        <span
          className={isExpense ? css.toggleLabelExpense : css.toggleLabelMuted}
        >
          Expense
        </span>
      </div>

      {isExpense && (
        <div className={css.field}>
          <select className={css.select} {...register('categoryId')}>
            <option value="">Select a category</option>
            {expenseCategories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
      {errors.categoryId && (
        <p className={css.error}>{errors.categoryId.message}</p>
      )}

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
          Add
        </button>
        <button type="button" className={css.secondaryBtn} onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddTransactionForm;
