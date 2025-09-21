import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const NavigationContext = createContext();

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};

export const NavigationProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // 过渡状态管理
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStage, setTransitionStage] = useState('idle'); // idle, moving, hiding, transitioning, navigating
  
  // 特殊过渡导航函数
  const navigateWithTransition = useCallback((path, options = {}) => {
    // 如果不是从Dashboard页面导航，则使用普通导航
    if (location.pathname !== '/') {
      navigate(path, options);
      return;
    }
    
    // 如果已经在过渡中，忽略新的导航请求
    if (isTransitioning) {
      return;
    }
    
    setIsTransitioning(true);
    
    // 触发Dashboard的过渡效果
    const dashboardTransitionEvent = new CustomEvent('dashboardTransition', {
      detail: { targetPath: path, options }
    });
    window.dispatchEvent(dashboardTransitionEvent);
    
    // 监听Dashboard过渡完成事件
    const handleTransitionComplete = () => {
      navigate(path, options);
      setIsTransitioning(false);
      setTransitionStage('idle');
      window.removeEventListener('dashboardTransitionComplete', handleTransitionComplete);
    };
    
    window.addEventListener('dashboardTransitionComplete', handleTransitionComplete);
    
    // 设置超时保护，防止事件丢失
    setTimeout(() => {
      if (isTransitioning) {
        navigate(path, options);
        setIsTransitioning(false);
        setTransitionStage('idle');
        window.removeEventListener('dashboardTransitionComplete', handleTransitionComplete);
      }
    }, 2000);
  }, [navigate, location.pathname, isTransitioning]);
  
  // 普通导航函数
  const navigateNormal = useCallback((path, options = {}) => {
    navigate(path, options);
  }, [navigate]);
  
  // 设置过渡阶段
  const setStage = useCallback((stage) => {
    setTransitionStage(stage);
  }, []);
  
  const value = {
    // 导航函数
    navigateWithTransition,
    navigateNormal,
    
    // 状态
    isTransitioning,
    transitionStage,
    currentPath: location.pathname,
    
    // 控制函数
    setStage,
    setIsTransitioning,
  };
  
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export default NavigationContext;