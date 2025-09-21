import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AuthLayout from '../../components/AuthLayout/AuthLayout';
import LoginTransition from '../../components/LoginTransition/LoginTransition';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const { login, defaultAccounts } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);
  const [showTransition, setShowTransition] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // 调用认证上下文的login方法
      const result = login(formData.username, formData.password);
      
      // 显示过渡动画
      setShowTransition(true);
      
      // 延迟跳转，让动画播放完成
      setTimeout(() => {
        navigate('/', { state: { fromLogin: true } });
      }, 3000); // 3秒后跳转，让所有动画阶段完成
    } catch (err) {
      setError(err.message);
    }
  };

  const handleQuickLogin = (accountType) => {
    const account = defaultAccounts[accountType];
    setFormData({
      username: account.username,
      password: account.password,
    });
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 1) {
      navigate('/register');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      {showTransition ? (
         <LoginTransition 
           isActive={true}
           dashboardContent={
             <Box sx={{ 
               height: '100vh', 
               width: '100vw',
               overflow: 'hidden',
               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
               color: 'white'
             }}>
               <Typography variant="h3" sx={{ textAlign: 'center' }}>
                 欢迎回来！<br />
                 正在加载您的仪表板...
               </Typography>
             </Box>
           }
           dockerBarContent={
             <Box sx={{ 
               height: '100%',
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               px: 3
             }}>
               <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                 CodeGuardian Edu
               </Typography>
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                 <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                   {formData.username || 'User'}
                 </Typography>
               </Box>
             </Box>
           }
           onComplete={() => {
             // 动画完成后的回调
             console.log('过渡动画完成');
           }}
         />
      ) : (
        <AuthLayout>
      <Box sx={{ mb: 3 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange}
          variant="fullWidth"
          sx={{
            mb: 3,
            '& .MuiTabs-root': {
              background: 'rgba(241, 245, 249, 0.8)',
              borderRadius: '8px',
              border: '1px solid #e2e8f0',
            },
            '& .MuiTab-root': {
              color: '#64748b',
              fontWeight: 500,
              '&.Mui-selected': {
                 background: '#3b82f6',
                 color: 'white',
                 borderRadius: '6px',
                 boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)',
               },
              '&:hover:not(.Mui-selected)': {
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
              }
            },
            '& .MuiTabs-indicator': {
              display: 'none',
            }
          }}
        >
          <Tab label="登录" />
          <Tab label="注册" />
        </Tabs>
      </Box>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {/* 快速登录提示 */}
        <Alert 
          severity="info" 
          sx={{ 
            mb: 2,
            background: 'rgba(59, 130, 246, 0.1)',
            border: '1px solid rgba(59, 130, 246, 0.2)',
            '& .MuiAlert-message': {
              color: '#1e293b'
            }
          }}
        >
          <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
            快速登录演示账号：
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip 
              label="学生账号 (student/123456)" 
              size="small" 
              onClick={() => handleQuickLogin('student')}
              clickable
              sx={{
                background: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  background: 'rgba(59, 130, 246, 0.2)',
                }
              }}
            />
            <Chip 
              label="教师账号 (teacher/123456)" 
              size="small" 
              onClick={() => handleQuickLogin('teacher')}
              clickable
              sx={{
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#059669',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                '&:hover': {
                  background: 'rgba(16, 185, 129, 0.2)',
                }
              }}
            />
          </Box>
        </Alert>

        <TextField
          label="用户名"
          name="username"
          value={formData.username}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.9)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3b82f6',
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Box component="span" sx={{ fontSize: '1.2rem' }}>
                  👤
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="密码"
          name="password"
          type={showPassword ? 'text' : 'password'}
          value={formData.password}
          onChange={handleChange}
          fullWidth
          required
          sx={{
            '& .MuiOutlinedInput-root': {
              background: 'rgba(255, 255, 255, 0.9)',
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3b82f6',
                boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
              }
            },
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#3b82f6',
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleTogglePasswordVisibility} edge="end">
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ 
            mt: 2,
            py: 1.5,
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            fontWeight: 600,
            fontSize: '16px',
            '&:hover': {
              background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
            }
          }}
        >
          登录
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
          <Link 
            component={RouterLink} 
            to="/forgot-password" 
            underline="hover"
            sx={{ 
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              }
            }}
          >
            忘记密码?
          </Link>
          <Link 
            component={RouterLink} 
            to="/register" 
            underline="hover"
            sx={{ 
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              }
            }}
          >
            没有账户? 注册
          </Link>
        </Box>
      </Box>
    </AuthLayout>
        )}
      </>
    );
};

export default Login;