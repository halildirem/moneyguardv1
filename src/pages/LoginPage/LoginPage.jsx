import LogoIcon from '../../components/LogoIcon/LogoIcon';
import LoginForm from './LoginForm';
import css from './LoginPage.module.css';

const LoginPage = () => {
  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.logo}>
          <LogoIcon className={css.logoIcon} />
          <span>Money Guard</span>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
