import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

// 导入认证上下文
import { AuthProvider, useAuth } from './contexts/AuthContext'

// 导入布局组件
import Layout from './components/Layout/Layout'

// 导入错误处理组件
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import { PageLoading } from './components/LoadingSpinner/LoadingSpinner'
import { NotFoundError, ErrorMessage } from './components/ErrorMessage/ErrorMessage'

// 导入页面组件
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import NewScan from './pages/NewScan/NewScan'
import ScanReport from './pages/ScanReport/ScanReport'
import History from './pages/History/History'
import Learn from './pages/Learn/Learn'
import Settings from './pages/Settings/Settings'

function AppRoutes() {
  const { isAuthenticated, loading, error } = useAuth();

  if (loading) {
    return <PageLoading message="正在验证身份..." />;
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <ErrorMessage
          title="认证错误"
          message={error}
          onRetry={() => window.location.reload()}
          showRetry={true}
        />
      </Box>
    );
  }

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Routes>
        {/* 公共路由 */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        
        {/* 受保护路由 */}
        <Route path="/" element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="new-scan" element={<NewScan />} />
          <Route path="scan-report/:reportId" element={<ScanReport />} />
          <Route path="history" element={<History />} />
          <Route path="learn" element={<Learn />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        {/* 404 路由 */}
        <Route path="*" element={<NotFoundError />} />
      </Routes>
    </Box>
  )
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App
