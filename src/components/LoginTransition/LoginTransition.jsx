import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import './LoginTransition.css';

const LoginTransition = ({ 
  isActive, 
  onComplete, 
  children, 
  dashboardContent,
  dockerBarContent 
}) => {
  const [animationStage, setAnimationStage] = useState('idle'); // idle, stage1, stage2, stage3, stage4, complete
  const [showDashboard, setShowDashboard] = useState(false);
  const [showDockerBar, setShowDockerBar] = useState(false);

  useEffect(() => {
    if (isActive && animationStage === 'idle') {
      // 开始动画序列
      startTransitionAnimation();
    }
  }, [isActive, animationStage]);

  const startTransitionAnimation = async () => {
    // 阶段1: 右侧面板向右滑出，左侧内容消失
    setAnimationStage('stage1');
    
    setTimeout(() => {
      // 阶段2: 左侧渐变背景扩展至全屏
      setAnimationStage('stage2');
      
      setTimeout(() => {
        // 阶段3: 显示dashboard内容，卡片从中心放大
        setAnimationStage('stage3');
        setShowDashboard(true);
        
        setTimeout(() => {
          // 阶段4: DockerBar从上方滑下
          setAnimationStage('stage4');
          setShowDockerBar(true);
          
          setTimeout(() => {
            // 动画完成
            setAnimationStage('complete');
            if (onComplete) {
              onComplete();
            }
          }, 800); // DockerBar动画时间
        }, 600); // Dashboard卡片动画时间
      }, 500); // 背景扩展时间
    }, 800); // 右侧面板滑出时间
  };

  if (!isActive) {
    return children;
  }

  return (
    <Box className="login-transition-container">
      {/* 原始登录页面内容 */}
      <Box 
        className={`login-content ${animationStage !== 'idle' ? 'transitioning' : ''}`}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
        }}
      >
        {/* 左侧舞台区域 */}
        <Box 
          className={`stage-area ${animationStage}`}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: animationStage === 'stage2' || animationStage === 'stage3' || animationStage === 'stage4' || animationStage === 'complete' ? '100vw' : '70%',
            height: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            overflow: 'hidden',
          }}
        >
          {/* 左侧原始内容 - 代码演示区域 */}
          <Box 
            className={`stage-content ${animationStage}`}
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: animationStage === 'stage1' || animationStage === 'stage2' || animationStage === 'stage3' || animationStage === 'stage4' || animationStage === 'complete' ? 0 : 1,
              transform: animationStage === 'stage1' ? 'translateX(-50px)' : 'translateX(0)',
              transition: 'all 0.4s ease-out',
            }}
          >
            {/* 模拟代码块 */}
            <Box
              sx={{
                width: '80%',
                maxWidth: '600px',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                fontFamily: 'monospace',
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.9)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ color: '#64b5f6', mb: 1 }}>// 代码安全扫描演示</Box>
              <Box sx={{ color: '#81c784' }}>function validateInput(data) {'{'}</Box>
              <Box sx={{ color: '#ffb74d', pl: 2 }}>if (!data) return false;</Box>
              <Box sx={{ color: '#f06292', pl: 2 }}>// ⚠️ 潜在的SQL注入风险</Box>
              <Box sx={{ color: '#ffb74d', pl: 2 }}>const query = "SELECT * FROM users WHERE id = " + data;</Box>
              <Box sx={{ color: '#81c784' }}>{'}'}</Box>
            </Box>
          </Box>
        </Box>

        {/* 右侧登录面板 */}
        <Box 
          className={`auth-panel-area ${animationStage}`}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '30%',
            height: '100vh',
            background: 'rgba(255, 255, 255, 0.08)',
            backdropFilter: 'blur(25px) saturate(200%)',
            WebkitBackdropFilter: 'blur(25px) saturate(200%)',
            border: '1px solid rgba(255, 255, 255, 0.4)',
            borderLeft: '2px solid rgba(255, 255, 255, 0.5)',
            zIndex: 1001,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px',
            boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5), inset 0 2px 0 rgba(255, 255, 255, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)',
            // 添加滑出时的视觉效果
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: '-2px',
              width: '2px',
              height: '100%',
              background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2))',
              opacity: animationStage === 'stage1' ? 0 : 1,
              transition: 'opacity 0.3s ease-out',
            }
          }}
        >
          <Box sx={{ 
            width: '100%', 
            maxWidth: '350px',
            transform: animationStage === 'stage1' ? 'scale(0.95) translateX(20px)' : 'scale(1) translateX(0)',
            transition: 'all 0.4s ease-out',
            opacity: animationStage === 'stage1' ? 0.8 : 1,
          }}>
            {children}
          </Box>
        </Box>
      </Box>

      {/* Dashboard内容 */}
      {showDashboard && (
        <Box 
          className={`dashboard-content ${animationStage}`}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 999,
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          }}
        >
          {/* Dashboard卡片容器 */}
          <Box 
            className={`dashboard-cards ${animationStage}`}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '90%',
              height: '80%',
              paddingTop: showDockerBar ? '80px' : '0px',
              borderRadius: '16px',
              overflow: 'hidden',
              // 添加卡片出现时的光晕效果
              boxShadow: animationStage === 'stage3' || animationStage === 'stage4' || animationStage === 'complete' 
                ? '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)' 
                : 'none',
              // 添加背景毛玻璃效果
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              // 添加动画过程中的脉冲效果
              '&::before': {
                content: '""',
                position: 'absolute',
                top: '-2px',
                left: '-2px',
                right: '-2px',
                bottom: '-2px',
                background: 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
                borderRadius: '18px',
                opacity: animationStage === 'stage3' ? 1 : 0,
                animation: animationStage === 'stage3' ? 'cardGlow 0.6s ease-out' : 'none',
                zIndex: -1,
              }
            }}
          >
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              transform: animationStage === 'stage3' ? 'scale(1.02)' : 'scale(1)',
              transition: 'transform 0.3s ease-out 0.3s',
            }}>
              {dashboardContent}
            </Box>
          </Box>
        </Box>
      )}

      {/* DockerBar */}
      {showDockerBar && (
        <Box 
          className={`docker-bar ${animationStage}`}
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            height: '60px',
            // 添加滑入时的阴影效果
            boxShadow: animationStage === 'stage4' || animationStage === 'complete' 
              ? '0 8px 32px 0 rgba(31, 38, 135, 0.37)' 
              : 'none',
            // 添加背景毛玻璃效果
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
            // 添加滑入动画的弹性效果
            '&::before': {
              content: '""',
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              height: '2px',
              background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent)',
              opacity: animationStage === 'stage4' ? 1 : 0,
              animation: animationStage === 'stage4' ? 'dockerBarGlow 0.8s ease-out' : 'none',
            }
          }}
        >
          <Box sx={{ 
            height: '100%',
            opacity: animationStage === 'stage4' || animationStage === 'complete' ? 1 : 0,
            transition: 'opacity 0.4s ease-out 0.4s',
          }}>
            {dockerBarContent}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default LoginTransition;