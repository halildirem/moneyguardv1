import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEmail, MdLock, MdPerson } from 'react-icons/md';
import { register as registerUser } from '../../redux/auth/authOperations';
import ProgressBar from './ProgressBar';
import buttons from '../../styles/buttons.module.css';
import css from './RegistrationForm.module.css';

const schema = yup.object({
  username: yup.string().trim().required('Name is required'),
  email: yup
    .string()
    .trim()
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be 6-12 characters')
    .max(12, 'Password must be 6-12 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm your password'),
});

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = async (values) => {
    try {
      await dispatch(
        registerUser({
          username: values.username,
          email: values.email,
          password: values.password,
        }),
      ).unwrap();
      reset();
      navigate('/home');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Registration failed');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={css.field}>
        <MdPerson className={css.icon} />
        <input
          className={css.input}
          type="text"
          placeholder="Name"
          {...register('username')}
        />
      </div>
      {errors.username && (
        <p className={css.error}>{errors.username.message}</p>
      )}

      <div className={css.field}>
        <MdEmail className={css.icon} />
        <input
          className={css.input}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
      </div>
      {errors.email && <p className={css.error}>{errors.email.message}</p>}

      <div className={css.field}>
        <MdLock className={css.icon} />
        <input
          className={css.input}
          type="password"
          placeholder="Password"
          {...register('password')}
        />
      </div>
      {errors.password && (
        <p className={css.error}>{errors.password.message}</p>
      )}

      <div className={css.field}>
        <MdLock className={css.icon} />
        <input
          className={css.input}
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
        />
      </div>
      <ProgressBar password={password} confirmPassword={confirmPassword} />
      {errors.confirmPassword && (
        <p className={css.error}>{errors.confirmPassword.message}</p>
      )}

      <div className={buttons.actions}>
        <button type="submit" className={buttons.primaryBtn}>
          Register
        </button>
        <Link to="/login" className={buttons.secondaryLinkBtn}>
          Log in
        </Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
