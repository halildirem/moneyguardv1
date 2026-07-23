import css from './ProgressBar.module.css';

const ProgressBar = ({ password, confirmPassword }) => {
  const filled = password
    ? Math.min((confirmPassword.length / password.length) * 100, 100)
    : 0;
  const matches = confirmPassword.length > 0 && confirmPassword === password;

  return (
    <div className={css.track}>
      <div
        className={matches ? css.fillMatch : css.fillProgress}
        style={{ '--fill-width': `${filled}%` }}
      />
    </div>
  );
};

export default ProgressBar;
