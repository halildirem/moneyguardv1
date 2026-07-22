import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdCalendarToday, MdKeyboardArrowDown } from 'react-icons/md';
import { addTransaction } from '../../redux/finance/financeOperations';
import { refreshUser } from '../../redux/auth/authOperations';
import { selectCategories } from '../../redux/finance/financeSelectors';
import css from './AddTransactionForm.module.css';

const CategoryDropdown = ({ categories, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCategory = categories.find((category) => category.id === value);

  return (
    <div className={css.dropdown} ref={wrapperRef}>
      <button
        type="button"
        className={css.dropdownToggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className={selectedCategory ? undefined : css.dropdownPlaceholder}>
          {selectedCategory ? selectedCategory.name : 'Select a category'}
        </span>
        <MdKeyboardArrowDown
          className={isOpen ? css.dropdownArrowOpen : css.dropdownArrow}
        />
      </button>
      {isOpen && (
        <ul className={css.dropdownList}>
          {categories.map((category) => (
            <li key={category.id}>
              <button
                type="button"
                className={
                  category.id === value
                    ? css.dropdownItemActive
                    : css.dropdownItem
                }
                onClick={() => {
                  onChange(category.id);
                  setIsOpen(false);
                }}
              >
                {category.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
          className={css.switchTrack}
          onClick={toggleType}
          aria-label="Toggle transaction type"
        >
          <span
            className={isExpense ? css.switchCircleExpense : css.switchCircle}
          >
            +
          </span>
        </button>
        <span
          className={isExpense ? css.toggleLabelExpense : css.toggleLabelMuted}
        >
          Expense
        </span>
      </div>

      {isExpense && (
        <div className={css.field}>
          <Controller
            control={control}
            name="categoryId"
            render={({ field }) => (
              <CategoryDropdown
                categories={expenseCategories}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
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
