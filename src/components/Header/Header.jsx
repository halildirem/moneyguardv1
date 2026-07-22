import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { MdLogout } from 'react-icons/md';
import { selectUser } from '../../redux/auth/authSelectors';
import { logOut } from '../../redux/auth/authOperations';
import LogoIcon from '../LogoIcon/LogoIcon';
import Modal from '../Modal/Modal';
import css from './Header.module.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const displayName = user?.email ? user.email.split('@')[0] : user?.username;

  const handleLogout = async () => {
    try {
      await dispatch(logOut()).unwrap();
    } catch (error) {
      toast.error(typeof error === 'string' ? error : 'Logout failed');
    } finally {
      setShowLogoutModal(false);
    }
  };

  return (
    <header className={css.header}>
      <div className={css.logo}>
        <LogoIcon className={css.logoIcon} />
        <span>Money Guard</span>
      </div>

      <div className={css.userSection}>
        <span className={css.username}>{displayName}</span>
        <span className={css.divider} />
        <button
          type="button"
          className={css.exitBtn}
          onClick={() => setShowLogoutModal(true)}
          aria-label="Log out"
        >
          <MdLogout />
        </button>
      </div>

      {showLogoutModal && (
        <Modal onClose={() => setShowLogoutModal(false)}>
          <div className={css.logoutModal}>
            <div className={css.logo}>
              <LogoIcon className={css.logoIcon} />
              <span>Money Guard</span>
            </div>
            <p className={css.logoutText}>
              Are you sure you want to log out?
            </p>
            <div className={css.logoutActions}>
              <button
                type="button"
                className={css.primaryBtn}
                onClick={handleLogout}
              >
                Logout
              </button>
              <button
                type="button"
                className={css.secondaryBtn}
                onClick={() => setShowLogoutModal(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </header>
  );
};

export default Header;
