import { createBrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import NewLayout from '../components/Layout/NewLayout';
import Dashboard from '../pages/Dashboard/Dashboard';
import NewScan from '../pages/NewScan/NewScan';
import History from '../pages/History/History';
import RuleSets from '../pages/RuleSets/RuleSets';
import SharedReports from '../pages/SharedReports/SharedReports';
import ScanReport from '../pages/ScanReport/ScanReport';
import SharedReport from '../pages/SharedReport/SharedReport';
import Learn from '../pages/Learn/Learn';
import Settings from '../pages/Settings/Settings';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound/NotFound';
import AccessDenied from '../pages/AccessDenied/AccessDenied';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AuthProvider>
        <NewLayout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'new-scan',
        element: <NewScan />,
      },
      {
        path: 'reports',
        element: <History />,
      },
      {
        path: 'reports/:reportId',
        element: <ScanReport />,
      },
      {
        path: 'rulesets',
        element: <RuleSets />,
      },
      {
        path: 'shared-reports',
        element: <SharedReports />,
      },
      {
        path: 'learn',
        element: <Learn />,
      },
      {
        path: 'settings',
        element: <Settings />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <Login />
      </AuthProvider>
    ),
  },
  {
    path: '/register',
    element: (
      <AuthProvider>
        <Register />
      </AuthProvider>
    ),
  },
  {
    path: '/shared-report/:reportId',
    element: (
      <AuthProvider>
        <SharedReport />
      </AuthProvider>
    ),
  },
  {
    path: '/access-denied',
    element: (
      <AuthProvider>
        <AccessDenied />
      </AuthProvider>
    ),
  },
  {
    path: '*',
    element: (
      <AuthProvider>
        <NotFound />
      </AuthProvider>
    ),
  },
]);

export default router;