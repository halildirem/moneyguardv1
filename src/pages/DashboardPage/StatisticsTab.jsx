import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStatistics } from '../../redux/finance/financeOperations';
import { selectStatistics } from '../../redux/finance/financeSelectors';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../../components/Chart/Chart';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';
import css from './StatisticsTab.module.css';

const StatisticsTab = () => {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  useEffect(() => {
    dispatch(fetchStatistics({ month, year }));
  }, [dispatch, month, year]);

  const categories = (statistics?.categoriesSummary ?? [])
    .filter((category) => category.type === 'EXPENSE')
    .map((category) => ({ ...category, total: Math.abs(category.total) }));
  const expenseSummary = Math.abs(statistics?.expenseSummary ?? 0);
  const incomeSummary = statistics?.incomeSummary ?? 0;

  return (
    <div className={css.wrapper}>
      <h2 className={css.title}>Statistics</h2>
      <div className={css.top}>
        <Chart categories={categories} total={expenseSummary} />
        <StatisticsDashboard
          month={month}
          year={year}
          onMonthChange={setMonth}
          onYearChange={setYear}
        />
      </div>
      <StatisticsTable
        categories={categories}
        expenseSummary={expenseSummary}
        incomeSummary={incomeSummary}
      />
    </div>
  );
};

export default StatisticsTab;
