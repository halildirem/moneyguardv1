import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';
import Loader from '../../components/Loader/Loader';
import css from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={css.page}>
      <div className={css.content}>
        <Header />
        <div className={css.body}>
          <aside className={css.sidebar}>
            <Navigation />
            <Balance />
            <div className={css.currencySlot}>
              <Currency />
            </div>
          </aside>
          <main className={css.main}>
            <Outlet />
          </main>
        </div>
        <Loader />
      </div>
    </div>
  );
};

export default DashboardPage;
