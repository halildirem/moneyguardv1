import LogoIcon from '../../components/LogoIcon/LogoIcon';
import RegistrationForm from './RegistrationForm';
import css from './RegistrationPage.module.css';

const RegistrationPage = () => {
  return (
    <div className={css.page}>
      <div className={css.card}>
        <div className={css.logo}>
          <LogoIcon className={css.logoIcon} />
          <span>Money Guard</span>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
};

export default RegistrationPage;
