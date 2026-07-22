import { NavLink } from 'react-router-dom';
import { MdHome, MdPieChart, MdAttachMoney } from 'react-icons/md';
import css from './Navigation.module.css';

const NAV_LINKS = [
  { to: '/home', label: 'Home', icon: MdHome },
  { to: '/statistics', label: 'Statistics', icon: MdPieChart },
  { to: '/currency', label: 'Currency', icon: MdAttachMoney, mobileOnly: true },
];

const Navigation = () => {
  return (
    <nav className={css.nav}>
      {NAV_LINKS.map(({ to, label, icon: Icon, mobileOnly }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            [css.navItem, isActive && css.active, mobileOnly && css.mobileOnly]
              .filter(Boolean)
              .join(' ')
          }
        >
          <Icon className={css.icon} />
          <span className={css.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default Navigation;
