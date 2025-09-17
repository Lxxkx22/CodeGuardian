import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  Checkbox,
  InputAdornment,
  IconButton,
  LinearProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AuthLayout from '../../components/AuthLayout/AuthLayout';

const Register = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1); // 注册页面默认选中注册标签
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    agreeTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    label: '',
    color: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (formData.password) {
      calculatePasswordStrength(formData.password);
    } else {
      setPasswordStrength({ score: 0, label: '', color: '' });
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password) => {
    // 密码强度计算逻辑
    const hasLowerCase = /[a-z]/.test(password);
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const length = password.length;

    let score = 0;
    let label = '';
    let color = '';

    if (length < 8) {
      // 太弱: 密码长度少于8位
      score = 1;
      label = '太弱';
      color = '#E74C3C'; // 高危红色
    } else if (
      (hasLowerCase && hasUpperCase) ||
      (hasLowerCase && hasNumbers) ||
      (hasUpperCase && hasNumbers)
    ) {
      // 中等: 长度至少8位，且包含大小写字母和数字中的任意两种
      score = 2;
      label = '中等';
      color = '#F39C12'; // 中危橙色
    } else if (hasLowerCase && hasUpperCase && hasNumbers && hasSpecialChars) {
      // 强: 长度至少8位，且同时包含大小写字母、数字和特殊字符
      score = 4;
      label = '强';
      color = '#2ECC71'; // 成功绿色
    }

    setPasswordStrength({ score, label, color });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址';
    }
    
    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = '两次输入的密码不一致';
    }
    
    // Terms agreement validation
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = '请同意服务条款和隐私政策';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would call a registration API
      console.log('Registration submitted:', formData);
      navigate('/login');
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
    if (newValue === 0) {
      navigate('/login');
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
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
        <TextField
          label="姓名"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.name}
          helperText={errors.name}
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
        />

        <TextField
          label="邮箱"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.email}
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
        />

        <Box>
          <TextField
            label="密码"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            fullWidth
            required
            error={!!errors.password}
            helperText={errors.password}
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
          {formData.password && (
            <Box sx={{ mt: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                <Box sx={{ width: '100%', mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={(passwordStrength.score / 4) * 100}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      bgcolor: 'rgba(226, 232, 240, 0.8)',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: passwordStrength.color,
                      },
                    }}
                  />
                </Box>
                <Box sx={{ minWidth: 35 }}>
                  <Typography variant="body2" color={passwordStrength.color} sx={{ fontWeight: 500 }}>
                    {passwordStrength.label}
                  </Typography>
                </Box>
              </Box>
            </Box>
          )}
        </Box>

        <TextField
          label="确认密码"
          name="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={formData.confirmPassword}
          onChange={handleChange}
          fullWidth
          required
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword}
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
                <IconButton onClick={handleToggleConfirmPasswordVisibility} edge="end">
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <FormControl component="fieldset" sx={{ mt: 1 }}>
          <FormLabel 
            component="legend" 
            sx={{ 
              color: '#374151',
              fontWeight: 500,
              '&.Mui-focused': {
                color: '#3b82f6',
              }
            }}
          >
            您的角色是:
          </FormLabel>
          <RadioGroup
            row
            name="role"
            value={formData.role}
            onChange={handleChange}
            sx={{
              '& .MuiFormControlLabel-label': {
                color: '#374151',
                fontWeight: 500,
              },
              '& .MuiRadio-root.Mui-checked': {
                color: '#3b82f6',
              }
            }}
          >
            <FormControlLabel value="student" control={<Radio />} label="学生" />
            <FormControlLabel value="teacher" control={<Radio />} label="教师" />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Checkbox
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
            sx={{
              color: '#64748b',
              '&.Mui-checked': {
                color: '#3b82f6',
              }
            }}
          />
          <Typography variant="body2" color={errors.agreeTerms ? 'error' : '#374151'} sx={{ fontWeight: 400 }}>
            我同意
            <Link 
              href="#" 
              underline="hover" 
              sx={{ 
                mx: 0.5,
                color: '#3b82f6',
                '&:hover': {
                  color: '#2563eb',
                }
              }}
            >
              服务条款
            </Link>
            和
            <Link 
              href="#" 
              underline="hover" 
              sx={{ 
                mx: 0.5,
                color: '#3b82f6',
                '&:hover': {
                  color: '#2563eb',
                }
              }}
            >
              隐私政策
            </Link>
            。
          </Typography>
        </Box>
        {errors.agreeTerms && (
          <Typography variant="caption" color="error">
            {errors.agreeTerms}
          </Typography>
        )}

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
          注册
        </Button>

        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Link 
            component={RouterLink} 
            to="/login" 
            underline="hover"
            sx={{ 
              color: '#3b82f6',
              '&:hover': {
                color: '#2563eb',
              }
            }}
          >
            已经有账户了? 登录
          </Link>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default Register;