import React from 'react';
import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon, Home as HomeIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// 基础错误消息组件
export const ErrorMessage = ({ 
  title = '出现错误', 
  message = '请稍后重试', 
  severity = 'error',
  onRetry,
  showRetry = false 
}) => {
  return (
    <Alert severity={severity} sx={{ mb: 2 }}>
      {title && <AlertTitle>{title}</AlertTitle>}
      <Typography variant="body2">{message}</Typography>
      {showRetry && onRetry && (
        <Button
          size="small"
          startIcon={<RefreshIcon />}
          onClick={onRetry}
          sx={{ mt: 1 }}
        >
          重试
        </Button>
      )}
    </Alert>
  );
};

// 页面级错误状态
export const PageError = ({ 
  title = '页面加载失败', 
  message = '无法加载页面内容，请检查网络连接或稍后重试。',
  onRetry,
  showHomeButton = true 
}) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      <ErrorIcon
        sx={{
          fontSize: 64,
          color: 'error.main',
          mb: 2,
        }}
      />
      
      <Typography variant="h4" gutterBottom color="error">
        {title}
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
        {message}
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        {onRetry && (
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
          >
            重试
          </Button>
        )}
        {showHomeButton && (
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
          >
            返回首页
          </Button>
        )}
      </Box>
    </Box>
  );
};

// 扫描失败专用错误页面
export const ScanFailedError = ({ onRetry, onGoHome }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      {/* 破碎盾牌图标 */}
      <Box
        sx={{
          fontSize: 80,
          mb: 3,
          filter: 'grayscale(100%)',
        }}
      >
        🛡️💔
      </Box>
      
      <Typography variant="h1" gutterBottom color="error">
        扫描失败
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
        很抱歉，我们的安全分析引擎在处理您的代码时遇到了问题。这可能是由于文件格式不兼容、代码结构复杂或系统临时故障导致的。
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
        {onRetry && (
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={onRetry}
            size="large"
          >
            重新扫描
          </Button>
        )}
        {onGoHome && (
          <Button
            variant="outlined"
            startIcon={<HomeIcon />}
            onClick={onGoHome}
            size="large"
          >
            返回仪表盘
          </Button>
        )}
      </Box>

      <Typography variant="caption" color="text.secondary" sx={{ mt: 4 }}>
        如果问题持续存在，请联系技术支持团队
      </Typography>
    </Box>
  );
};

// 网络错误组件
export const NetworkError = ({ onRetry }) => {
  return (
    <ErrorMessage
      title="网络连接错误"
      message="无法连接到服务器，请检查网络连接后重试。"
      onRetry={onRetry}
      showRetry={!!onRetry}
    />
  );
};

// 404 错误页面
export const NotFoundError = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        p: 3,
        textAlign: 'center',
      }}
    >
      {/* 宇航员和404星球 */}
      <Box
        sx={{
          fontSize: 80,
          mb: 3,
        }}
      >
        🚀🪐
      </Box>
      
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      
      <Typography variant="h4" gutterBottom color="text.secondary">
        页面未找到
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
        抱歉，您访问的页面不存在或已被移动。请检查URL是否正确，或返回首页继续浏览。
      </Typography>

      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={handleGoHome}
        size="large"
        sx={{ mt: 2 }}
      >
        返回首页
      </Button>
    </Box>
  );
};

export default ErrorMessage;