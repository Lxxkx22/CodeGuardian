import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';

// 过渡容器样式
const TransitionContainer = styled(Box)(({ theme, isTransitioning }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  opacity: isTransitioning ? 0.8 : 1,
  transform: isTransitioning ? 'scale(0.99)' : 'scale(1)',
}));

// 内容容器样式
const ContentContainer = styled(Box)(({ theme, isBlurred }) => ({
  width: '100%',
  height: '100%',
  transition: 'filter 0.4s ease-in-out',
  filter: isBlurred ? 'blur(8px)' : 'none',
}));

// 毛玻璃卡片样式
const GlassCard = styled(Box)(({ theme, isTransitioning, cardDimensions }) => ({
  position: 'relative',
  width: '100%',
  height: '100%',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  overflow: 'hidden',
  transition: isTransitioning 
    ? 'all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)'
    : 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  transform: isTransitioning ? 'scale(0.98)' : 'scale(1)',
}));

const DashboardTransition = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 过渡状态
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [currentContent, setCurrentContent] = useState(children);
  const [nextContent, setNextContent] = useState(null);

  // 监听路径变化
  useEffect(() => {
    if (nextContent && nextContent !== currentContent) {
      // 开始过渡序列
      startTransitionSequence();
    }
  }, [location.pathname]);

  // 更新内容
  useEffect(() => {
    if (!isTransitioning) {
      setCurrentContent(children);
    } else {
      setNextContent(children);
    }
  }, [children, isTransitioning]);

  // 开始过渡序列
  const startTransitionSequence = () => {
    setIsTransitioning(true);
    
    // 第一阶段：当前页面模糊 (200ms)
    setTimeout(() => {
      setIsBlurred(true);
    }, 100);
    
    // 第二阶段：切换内容 (瞬间)
    setTimeout(() => {
      setCurrentContent(nextContent);
      setNextContent(null);
    }, 300);
    
    // 第三阶段：新页面清晰 (400ms)
    setTimeout(() => {
      setIsBlurred(false);
    }, 400);
    
    // 第四阶段：完成过渡 (200ms)
    setTimeout(() => {
      setIsTransitioning(false);
    }, 800);
  };

  // 获取卡片尺寸
  const getCardDimensions = (pathname) => {
    const dimensionsMap = {
      '/new-scan': { width: '800px', height: '600px' },
      '/scan-report': { width: '1000px', height: '700px' },
      '/history': { width: '900px', height: '650px' },
      '/settings': { width: '700px', height: '500px' },
      '/learn': { width: '850px', height: '600px' },
      '/rule-sets': { width: '800px', height: '550px' },
    };
    
    return dimensionsMap[pathname] || { width: '800px', height: '600px' };
  };

  // 如果是Dashboard页面，直接渲染子组件
  if (location.pathname === '/' || location.pathname === '/dashboard') {
    return children;
  }

  const cardDimensions = getCardDimensions(location.pathname);

  return (
    <TransitionContainer isTransitioning={isTransitioning}>
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

export default DashboardTransition;