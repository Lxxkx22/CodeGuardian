import { Routes, Route, Navigate } from 'react-router-dom'
import { Box } from '@mui/material'

// 导入布局组件
import Layout from './components/Layout/Layout'

// 导入页面组件
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard/Dashboard'
import NewScan from './pages/NewScan/NewScan'
import ScanReport from './pages/ScanReport/ScanReport'
import History from './pages/History/History'
import Learn from './pages/Learn/Learn'
import Settings from './pages/Settings/Settings'

function App() {
  // 模拟用户认证状态
  const isAuthenticated = true; // 在实际应用中，这应该从认证系统获取

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
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Box>
  )
}

export default App
