import { CHART_COLORS } from '../../utils/chartColors';
import { formatMoney } from '../../utils/currency';
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
            <span className={css.total}>{formatMoney(category.total)}</span>
          </div>
        ))}
      </div>
      <div className={css.summary}>
        <div className={`${css.summaryRow} ${css.summaryRowExpense}`}>
          <span>Expenses:</span>
          <span>{formatMoney(expenseSummary)}</span>
        </div>
        <div className={`${css.summaryRow} ${css.summaryRowIncome}`}>
          <span>Income:</span>
          <span>{formatMoney(incomeSummary)}</span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
