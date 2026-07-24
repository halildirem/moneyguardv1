import { lazy, Suspense, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';
import { refreshUser } from './redux/auth/authOperations';
import {
  selectIsLoggedIn,
  selectIsRefreshing,
} from './redux/auth/authSelectors';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import PublicRoute from './components/PublicRoute/PublicRoute';
import SuspenseFallback from './components/SuspenseFallback/SuspenseFallback';
import Loader from './components/Loader/Loader';

const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const RegistrationPage = lazy(
  () => import('./pages/RegistrationPage/RegistrationPage'),
);
const DashboardPage = lazy(() => import('./pages/DashboardPage/DashboardPage'));
const HomeTab = lazy(() => import('./pages/DashboardPage/HomeTab'));
const StatisticsTab = lazy(() => import('./pages/DashboardPage/StatisticsTab'));
const CurrencyTab = lazy(() => import('./pages/DashboardPage/CurrencyTab'));

const NotFoundRedirect = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);

  if (isRefreshing) {
    return null;
  }

  return <Navigate to={isLoggedIn ? '/home' : '/login'} replace />;
};

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    <>
      <Suspense fallback={<SuspenseFallback />}>
        <Routes>
          <Route
            path="/register"
            element={
              <PublicRoute restricted>
                <RegistrationPage />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute restricted>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomeTab />} />
            <Route path="statistics" element={<StatisticsTab />} />
            <Route path="currency" element={<CurrencyTab />} />
          </Route>
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </Suspense>
      <Loader />
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
}

export default App;
