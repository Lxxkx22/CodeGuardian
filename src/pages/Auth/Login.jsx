import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Alert,
  Divider,
  Chip,
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
      
      // 跳转到首页
      navigate('/');
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

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: 'background.default',
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 400,
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="h1" color="primary.main" fontWeight="bold">
            CodeGuardian Edu
          </Typography>
          <Typography variant="h2" sx={{ mt: 2 }}>
            欢迎回来
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Alert severity="info" sx={{ mb: 2 }}>
            <Typography variant="body2" gutterBottom>
              <strong>测试账号：</strong>
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 1 }}>
              <Chip 
                label="学生账号 (student/123456)" 
                size="small" 
                onClick={() => handleQuickLogin('student')}
                clickable
                color="primary"
                variant="outlined"
              />
              <Chip 
                label="教师账号 (teacher/123456)" 
                size="small" 
                onClick={() => handleQuickLogin('teacher')}
                clickable
                color="secondary"
                variant="outlined"
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

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            登录
          </Button>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Link component={RouterLink} to="/forgot-password" underline="hover">
              忘记密码?
            </Link>
            <Link component={RouterLink} to="/register" underline="hover">
              没有账户? 注册
            </Link>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default Login;