import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { MdEmail, MdLock } from 'react-icons/md';
import { logIn } from '../../redux/auth/authOperations';
import css from './LoginForm.module.css';

const schema = yup.object({
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
});

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(logIn(values)).unwrap();
      reset();
      navigate('/home');
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Login failed');
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)} noValidate>
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

      <div className={css.actions}>
        <button type="submit" className={css.primaryBtn}>
          Log in
        </button>
        <Link to="/register" className={css.secondaryBtn}>
          Register
        </Link>
      </div>
    </form>
  );
};

export default LoginForm;
