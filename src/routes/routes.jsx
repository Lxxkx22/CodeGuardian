import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import Dashboard from '../pages/Dashboard/Dashboard';
import NewScan from '../pages/NewScan/NewScan';
import Reports from '../pages/Reports/Reports';
import RuleSets from '../pages/RuleSets/RuleSets';
import ScanReport from '../pages/ScanReport/ScanReport';
import SharedReport from '../pages/SharedReport/SharedReport';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import NotFound from '../pages/NotFound/NotFound';
import AccessDenied from '../pages/AccessDenied/AccessDenied';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
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
        element: <Reports />,
      },
      {
        path: 'reports/:reportId',
        element: <ScanReport />,
      },
      {
        path: 'rulesets',
        element: <RuleSets />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/shared-report/:reportId',
    element: <SharedReport />,
  },
  {
    path: '/access-denied',
    element: <AccessDenied />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

export default router;