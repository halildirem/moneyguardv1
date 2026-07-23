import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { CHART_COLORS } from '../../utils/chartColors';
import { CURRENCY_SYMBOLS, formatMoney } from '../../utils/currency';
import css from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip);

const Chart = ({ categories, total, currency }) => {
  const symbol = CURRENCY_SYMBOLS[currency] ?? currency;

  const data = {
    labels: categories.map((category) => category.name),
    datasets: [
      {
        data: categories.map((category) => category.total),
        backgroundColor: categories.map(
          (_, index) => CHART_COLORS[index % CHART_COLORS.length],
        ),
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context) => ` ${context.label}: ${symbol} ${formatMoney(context.parsed)}`,
        },
      },
    },
  };

  return (
    <div className={css.wrapper}>
      <Doughnut data={data} options={options} />
      <div className={css.centerLabel}>
        {symbol} {formatMoney(total)}
      </div>
    </div>
  );
};

export default Chart;
