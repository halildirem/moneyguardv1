import { CHART_COLORS } from '../../utils/chartColors';
import css from './StatisticsTable.module.css';

const StatisticsTable = ({ categories, expenseSummary, incomeSummary }) => {
  return (
    <div className={css.table}>
      <div className={css.rows}>
        {categories.map((category, index) => (
          <div className={css.row} key={category.name}>
            <span
              className={css.colorBadge}
              style={{
                backgroundColor: CHART_COLORS[index % CHART_COLORS.length],
              }}
            />
            <span className={css.name}>{category.name}</span>
            <span className={css.total}>{category.total.toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className={css.summary}>
        <div className={css.summaryRow}>
          <span>Expenses:</span>
          <span>{expenseSummary.toFixed(2)}</span>
        </div>
        <div className={css.summaryRow}>
          <span>Income:</span>
          <span>{incomeSummary.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
