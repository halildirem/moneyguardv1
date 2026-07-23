import { useRef, useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import useClickOutside from '../../hooks/useClickOutside';
import css from './StatisticsDashboard.module.css';

const Dropdown = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const selected = options.find((option) => option.value === value);

  return (
    <div className={css.dropdown} ref={wrapperRef}>
      <button
        type="button"
        className={css.dropdownToggle}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span>{selected?.label}</span>
        <MdKeyboardArrowDown
          className={isOpen ? css.dropdownArrowOpen : css.dropdownArrow}
        />
      </button>
      {isOpen && (
        <ul className={css.dropdownList}>
          {options.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                className={
                  option.value === value
                    ? css.dropdownItemActive
                    : css.dropdownItem
                }
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

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
      <Dropdown
        options={MONTHS.map((label, index) => ({
          value: index + 1,
          label,
        }))}
        value={month}
        onChange={onMonthChange}
      />
      <Dropdown
        options={years.map((yearOption) => ({
          value: yearOption,
          label: String(yearOption),
        }))}
        value={year}
        onChange={onYearChange}
      />
    </div>
  );
};

export default StatisticsDashboard;
