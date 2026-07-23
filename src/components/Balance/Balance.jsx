import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { fetchCurrencyRates } from '../../redux/finance/financeOperations';
import { setSelectedCurrency } from '../../redux/finance/financeSlice';
import {
  selectTotalBalance,
  selectCurrencyRates,
  selectSelectedCurrency,
} from '../../redux/finance/financeSelectors';
import { CURRENCIES, convertFromBase, formatMoney } from '../../utils/currency';
import useClickOutside from '../../hooks/useClickOutside';
import css from './Balance.module.css';

const CurrencySymbolDropdown = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useClickOutside(wrapperRef, () => setIsOpen(false));

  const selected = CURRENCIES.find((currency) => currency.code === value);

  return (
    <div className={css.dropdown} ref={wrapperRef}>
      <button
        type="button"
        className={css.dropdownToggle}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Select currency"
      >
        {selected?.symbol}
        <MdKeyboardArrowDown
          className={isOpen ? css.dropdownArrowOpen : css.dropdownArrow}
        />
      </button>
      {isOpen && (
        <ul className={css.dropdownList}>
          {CURRENCIES.map((currency) => (
            <li key={currency.code}>
              <button
                type="button"
                className={
                  currency.code === value
                    ? css.dropdownItemActive
                    : css.dropdownItem
                }
                onClick={() => {
                  onChange(currency.code);
                  setIsOpen(false);
                }}
              >
                {currency.symbol} {currency.code}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Balance = () => {
  const dispatch = useDispatch();
  const totalBalance = useSelector(selectTotalBalance);
  const rates = useSelector(selectCurrencyRates);
  const currency = useSelector(selectSelectedCurrency);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const convertedBalance = convertFromBase(totalBalance, currency, rates);

  return (
    <div className={css.balance}>
      <p className={css.label}>Your balance</p>
      <div className={css.value}>
        <CurrencySymbolDropdown
          value={currency}
          onChange={(code) => dispatch(setSelectedCurrency(code))}
        />
        {formatMoney(convertedBalance)}
      </div>
    </div>
  );
};

export default Balance;
