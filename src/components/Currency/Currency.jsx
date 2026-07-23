import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from 'chart.js';
import { fetchCurrencyRates } from '../../redux/finance/financeOperations';
import { selectCurrencyRates } from '../../redux/finance/financeSelectors';
import { tryPerUnit } from '../../utils/currency';
import css from './Currency.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
);

const DISPLAYED_CODES = ['USD', 'EUR', 'GBP'];

const Currency = () => {
  const dispatch = useDispatch();
  const rates = useSelector(selectCurrencyRates);

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  const rows = DISPLAYED_CODES.map((code) => {
    const rate = tryPerUnit(rates, code);
    if (!rate) return null;
    return { code, buy: rate, sell: rate };
  }).filter(Boolean);

  const chartData = {
    labels: rows.map((row) => row.code),
    datasets: [
      {
        data: rows.map((row) => row.sell),
        borderColor: '#efce4e',
        backgroundColor: 'rgba(184, 111, 17, 0.25)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  };

  return (
    <div className={css.currency}>
      <table className={css.table}>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Purchase</th>
            <th>Sale</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.code}>
              <td>{row.code}</td>
              <td>{row.buy.toFixed(2)}</td>
              <td>{row.sell.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length > 0 && (
        <div className={css.chart}>
          <Line data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
};

export default Currency;
