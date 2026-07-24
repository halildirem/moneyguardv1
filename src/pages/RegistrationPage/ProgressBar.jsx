import css from './ProgressBar.module.css';

const getPasswordStrength = (password) => {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
};

const ProgressBar = ({ password }) => {
  const strength = getPasswordStrength(password);
  const filled = (strength / 4) * 100;
  const isStrong = strength >= 3;

  return (
    <div className={css.track}>
      <div
        className={isStrong ? css.fillMatch : css.fillProgress}
        style={{ '--fill-width': `${filled}%` }}
      />
    </div>
  );
};

export default ProgressBar;
