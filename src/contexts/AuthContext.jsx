import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// 默认账号配置
const DEFAULT_ACCOUNTS = {
  student: {
    id: 'student001',
    username: 'student',
    password: '123456',
    name: '张三',
    email: 'student@example.com',
    role: 'student',
    avatar: null
  },
  teacher: {
    id: 'teacher001',
    username: 'teacher',
    password: '123456',
    name: '李老师',
    email: 'teacher@example.com',
    role: 'teacher',
    avatar: null
  }
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      // 检查本地存储中是否有认证信息
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');
      
      if (token && userData) {
        const parsedUserData = JSON.parse(userData);
        setIsAuthenticated(true);
        setUser(parsedUserData);
      }
    } catch (err) {
      console.error('Failed to load authentication data:', err);
      setError('认证数据加载失败');
      // 清除可能损坏的数据
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (username, password) => {
    try {
      if (!username || !password) {
        throw new Error('用户名和密码不能为空');
      }
      
      // 检查默认账号
      let userData = null;
      if (username === DEFAULT_ACCOUNTS.student.username && password === DEFAULT_ACCOUNTS.student.password) {
        userData = DEFAULT_ACCOUNTS.student;
      } else if (username === DEFAULT_ACCOUNTS.teacher.username && password === DEFAULT_ACCOUNTS.teacher.password) {
        userData = DEFAULT_ACCOUNTS.teacher;
      } else {
        throw new Error('用户名或密码错误');
      }
      
      // 生成简单的token
      const token = `token_${userData.id}_${Date.now()}`;
      
      localStorage.setItem('authToken', token);
      localStorage.setItem('userData', JSON.stringify(userData));
      setIsAuthenticated(true);
      setUser(userData);
      setError(null);
      
      return { success: true, user: userData };
    } catch (err) {
      console.error('Login failed:', err);
      setError('登录失败：' + err.message);
      throw err;
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      setIsAuthenticated(false);
      setUser(null);
      setError(null);
    } catch (err) {
      console.error('Logout failed:', err);
      setError('登出失败');
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    error,
    clearError,
    // 导出默认账号信息供登录页面使用
    defaultAccounts: DEFAULT_ACCOUNTS,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};