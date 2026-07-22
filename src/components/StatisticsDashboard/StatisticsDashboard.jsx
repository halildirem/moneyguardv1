import css from './StatisticsDashboard.module.css';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const StatisticsDashboard = ({ month, year, onMonthChange, onYearChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  return (
    <div className={css.dashboard}>
      <select
        className={css.select}
        value={month}
        onChange={(event) => onMonthChange(Number(event.target.value))}
      >
        {MONTHS.map((label, index) => (
          <option key={label} value={index + 1}>
            {label}
          </option>
        ))}
      </select>
      <select
        className={css.select}
        value={year}
        onChange={(event) => onYearChange(Number(event.target.value))}
      >
        {years.map((yearOption) => (
          <option key={yearOption} value={yearOption}>
            {yearOption}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatisticsDashboard;
