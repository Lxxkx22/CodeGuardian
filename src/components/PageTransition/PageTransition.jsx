import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

// 创建带过渡效果的容器
const TransitionContainer = styled(Box)(({ theme, isTransitioning, targetDimensions }) => ({
  position: 'relative',
  width: '100%',
  minHeight: '100vh',
  transition: isTransitioning ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
  transform: isTransitioning ? 'scale(0.99)' : 'scale(1)',
  opacity: isTransitioning ? 0.8 : 1,
}));

// 内容容器，用于模糊效果
const ContentContainer = styled(Box)(({ theme, isBlurred }) => ({
  filter: isBlurred ? 'blur(8px)' : 'blur(0px)',
  transition: 'filter 0.4s ease-in-out',
  width: '100%',
  height: '100%',
}));

// 毛玻璃卡片容器
const GlassCard = styled(Box)(({ theme, isTransitioning, cardDimensions }) => ({
  backdropFilter: 'blur(10px)',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  margin: '0 auto',
  maxWidth: cardDimensions?.maxWidth || '960px',
  width: cardDimensions?.width || '100%',
  minHeight: cardDimensions?.minHeight || 'auto',
  transition: isTransitioning 
    ? 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' 
    : 'all 0.3s ease-in-out',
  transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
}));

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [currentContent, setCurrentContent] = useState(children);
  const [nextContent, setNextContent] = useState(null);
  const previousLocation = useRef(location.pathname);
  const transitionTimeoutRef = useRef(null);

  // 根据路径确定卡片尺寸
  const getCardDimensions = (pathname) => {
    switch (pathname) {
      case '/new-scan':
        return {
          maxWidth: '960px',
          width: '100%',
          minHeight: '600px'
        };
      case '/learn':
        return {
          maxWidth: '1200px',
          width: '100%',
          minHeight: '800px'
        };
      case '/reports':
      case '/history':
        return {
          maxWidth: '1400px',
          width: '100%',
          minHeight: '700px'
        };
      case '/settings':
        return {
          maxWidth: '800px',
          width: '100%',
          minHeight: '600px'
        };
      case '/rulesets':
        return {
          maxWidth: '1200px',
          width: '100%',
          minHeight: '700px'
        };
      case '/shared-reports':
        return {
          maxWidth: '1400px',
          width: '100%',
          minHeight: '700px'
        };
      default:
        return {
          maxWidth: '960px',
          width: '100%',
          minHeight: '500px'
        };
    }
  };

  useEffect(() => {
    // 如果是Dashboard页面，不执行过渡效果
    if (location.pathname === '/' || location.pathname === '/dashboard') {
      setCurrentContent(children);
      return;
    }

    // 如果路径发生变化且不是初始加载
    if (previousLocation.current !== location.pathname) {
      // 清除之前的定时器
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }

      // 第一阶段：当前页面内容开始模糊 (200ms)
      setIsBlurred(true);
      setIsTransitioning(true);

      transitionTimeoutRef.current = setTimeout(() => {
        // 第二阶段：切换到新页面内容 (在模糊状态下)
        setCurrentContent(children);
        
        // 第三阶段：新页面内容逐渐清晰 (400ms)
        setTimeout(() => {
          setIsBlurred(false);
          
          // 第四阶段：完成过渡，恢复容器状态 (200ms)
          setTimeout(() => {
            setIsTransitioning(false);
          }, 200);
        }, 100);
      }, 200);

      // 更新上一个路径
      previousLocation.current = location.pathname;
    } else {
      // 初始加载或相同路径，直接显示内容
      setCurrentContent(children);
    }

    // 清理函数
    return () => {
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [location.pathname, children]);

  // 如果是Dashboard页面，直接渲染子组件
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return children;
  }

  const cardDimensions = getCardDimensions(location.pathname);

  return (
    <TransitionContainer
      isTransitioning={isTransitioning}
    >
      <ContentContainer isBlurred={isBlurred}>
        <GlassCard
          isTransitioning={isTransitioning}
          cardDimensions={cardDimensions}
        >
          <Fade in={!isTransitioning} timeout={300}>
            <Box>
              {currentContent}
            </Box>
          </Fade>
        </GlassCard>
      </ContentContainer>
    </TransitionContainer>
  );
};

export default PageTransition;