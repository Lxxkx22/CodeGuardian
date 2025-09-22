import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Button,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
  Avatar,
  Badge,
  ListItemAvatar,
  IconButton,
} from '@mui/material';
import { 
  PlayArrow as PlayArrowIcon,
  EmojiEvents as TrophyIcon,
  Star as StarIcon,
  Announcement as AnnouncementIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import PageTransition from '../../components/PageTransition';
import StickyNote from '../../components/StickyNote';

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);
  const [animationTriggered, setAnimationTriggered] = useState(false);
  
  // PageTransition 相关状态
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardsMovedDown, setCardsMovedDown] = useState(false);
  const [auxiliaryCardsHidden, setAuxiliaryCardsHidden] = useState(false);
  const [mainCardTransitioning, setMainCardTransitioning] = useState(false);
  
  // 监听来自DockerBar的导航事件
  useEffect(() => {
    const handleDashboardTransition = (event) => {
      const { targetPath, options } = event.detail;
      startTransition(() => {
        // 通知导航上下文过渡完成
        const completeEvent = new CustomEvent('dashboardTransitionComplete');
        window.dispatchEvent(completeEvent);
      });
    };

    window.addEventListener('dashboardTransition', handleDashboardTransition);
    
    return () => {
      window.removeEventListener('dashboardTransition', handleDashboardTransition);
    };
  }, []);
  
  // 检查是否从登录页跳转过来
  const isFromLogin = location.state?.fromLogin || false;
  const user = {
    name: 'Alex',
  };

  // Mock recent scans data - in a real app, this would come from an API
  const [recentScans, setRecentScans] = useState([
    {
      id: '1',
      name: 'assignment5.zip',
      timestamp: '2小时前',
      risks: { high: 1, medium: 3, low: 0 },
    },
    {
      id: '2',
      name: 'project_final.cpp',
      timestamp: '昨天',
      risks: { high: 0, medium: 2, low: 1 },
    },
    {
      id: '3',
      name: 'homework3.zip',
      timestamp: '3天前',
      risks: { high: 0, medium: 0, low: 0 },
    },
    {
      id: '4',
      name: 'test_code.c',
      timestamp: '上周',
      risks: { high: 2, medium: 1, low: 3 },
    },
    {
      id: '5',
      name: 'practice.zip',
      timestamp: '2周前',
      risks: { high: 0, medium: 1, low: 2 },
    },
  ]);

  // Mock leaderboard data
  const [leaderboard, setLeaderboard] = useState([
    { id: 1, name: 'Alice Chen', points: 2850, rank: 1, avatar: 'A' },
    { id: 2, name: 'Bob Wang', points: 2720, rank: 2, avatar: 'B' },
    { id: 3, name: 'Charlie Li', points: 2650, rank: 3, avatar: 'C' },
    { id: 4, name: 'Diana Zhang', points: 2580, rank: 4, avatar: 'D' },
    { id: 5, name: 'Alex (你)', points: 2450, rank: 5, avatar: 'A', isCurrentUser: true },
  ]);

  // Mock achievements data
  const [recentAchievements, setRecentAchievements] = useState([
    {
      id: 1,
      title: '代码安全专家',
      description: '连续5次扫描无高危漏洞',
      icon: 'security',
      rarity: 'gold',
      unlockedAt: '2小时前',
      progress: 100,
    },
    {
      id: 2,
      title: '学习达人',
      description: '完成10个安全编程课程',
      icon: 'school',
      rarity: 'silver',
      unlockedAt: '昨天',
      progress: 100,
    },
    {
      id: 3,
      title: '代码审查员',
      description: '进行50次代码扫描',
      icon: 'code',
      rarity: 'bronze',
      unlockedAt: '3天前',
      progress: 100,
    },
  ]);

  // Mock announcements data
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: '新功能上线：AI代码建议',
      content: '我们推出了全新的AI代码建议功能，帮助你更好地修复安全漏洞。',
      author: '张教授',
      publishedAt: '1小时前',
      priority: 'high',
    },
    {
      id: 2,
      title: '期末项目提交截止时间提醒',
      content: '请注意，期末项目代码安全检查报告的提交截止时间为本周五晚上11:59。',
      author: '李助教',
      publishedAt: '6小时前',
      priority: 'medium',
    },
    {
      id: 3,
      title: '系统维护通知',
      content: '系统将在本周日凌晨2:00-4:00进行维护升级，期间可能无法访问。',
      author: '系统管理员',
      publishedAt: '1天前',
      priority: 'low',
    },
  ]);

  const handleStartNewScan = () => {
    startTransition(() => navigate('/new-scan'));
  };

  const handleViewReport = (reportId) => {
    startTransition(() => navigate(`/scan-report/${reportId}`));
  };

  // 启动特殊过渡效果
  const startTransition = (navigationCallback) => {
    setIsTransitioning(true);
    
    // 第一阶段：辅助卡片移动到主卡片下方 (500ms)
    setTimeout(() => {
      setCardsMovedDown(true);
    }, 100);
    
    // 第二阶段：隐藏辅助卡片 (300ms)
    setTimeout(() => {
      setAuxiliaryCardsHidden(true);
    }, 600);
    
    // 第三阶段：主卡片开始过渡 (400ms)
    setTimeout(() => {
      setMainCardTransitioning(true);
    }, 900);
    
    // 第四阶段：执行导航
    setTimeout(() => {
      navigationCallback();
    }, 1300);
  };

  const getRankColor = (rank) => {
    switch (rank) {
      case 1: return '#FFD700'; // Gold
      case 2: return '#C0C0C0'; // Silver
      case 3: return '#CD7F32'; // Bronze
      default: return '#757575'; // Gray
    }
  };

  const getAchievementIcon = (iconType) => {
    switch (iconType) {
      case 'security': return <SecurityIcon />;
      case 'school': return <SchoolIcon />;
      case 'code': return <CodeIcon />;
      default: return <StarIcon />;
    }
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'gold': return '#FFD700';
      case 'silver': return '#C0C0C0';
      case 'bronze': return '#CD7F32';
      default: return '#757575';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'info';
      default: return 'default';
    }
  };

  // 定义所有卡片数据
  const cards = [
    {
      id: 'welcome',
      title: '欢迎',
      content: (
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          height: '100%'
        }}>
          <Typography variant="h1" gutterBottom>
            你好, {user.name}!
          </Typography>
          <Typography variant="body1" paragraph>
            准备好让你的代码更安全了吗？
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={handleStartNewScan}
            sx={{ mt: 2 }}
          >
            开始新的扫描
          </Button>
        </Box>
      )
    },
    {
      id: 'recent-scans',
      title: '最近的扫描',
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, pb: 0 }}>
            <Typography variant="h2" gutterBottom>
              最近的扫描
            </Typography>
          </Box>
          <List sx={{ p: 0, flex: 1, overflow: 'auto' }}>
            {recentScans.slice(0, 3).map((scan, index) => (
              <Box key={scan.id}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 2,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <ListItemText
                    primary={
                      <Typography variant="body1" fontWeight="medium">
                        {scan.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {scan.timestamp}
                      </Typography>
                    }
                  />
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {scan.risks.high > 0 && (
                      <Chip
                        label={`高危: ${scan.risks.high}`}
                        size="small"
                        sx={{ bgcolor: 'semantic.high', color: 'white' }}
                      />
                    )}
                    {scan.risks.medium > 0 && (
                      <Chip
                        label={`中危: ${scan.risks.medium}`}
                        size="small"
                        sx={{ bgcolor: 'semantic.medium', color: 'white' }}
                      />
                    )}
                    {scan.risks.low > 0 && (
                      <Chip
                        label={`低危: ${scan.risks.low}`}
                        size="small"
                        sx={{ bgcolor: 'semantic.low', color: 'white' }}
                      />
                    )}
                    {scan.risks.high === 0 && scan.risks.medium === 0 && scan.risks.low === 0 && (
                      <Chip
                        label="无问题"
                        size="small"
                        sx={{ bgcolor: 'semantic.success', color: 'white' }}
                      />
                    )}
                    <Button
                      variant="text"
                      size="small"
                      onClick={() => handleViewReport(scan.id)}
                    >
                      查看报告
                    </Button>
                  </Box>
                </ListItem>
                {index < 2 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      )
    },
    {
      id: 'leaderboard',
      title: '积分排行榜',
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, pb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <TrophyIcon sx={{ color: '#FFD700' }} />
            <Typography variant="h2" gutterBottom>
              积分排行榜
            </Typography>
          </Box>
          <List sx={{ p: 0, flex: 1, overflow: 'auto' }}>
            {leaderboard.map((student, index) => (
              <Box key={student.id}>
                <ListItem
                  sx={{
                    py: 1.5,
                    px: 2,
                    bgcolor: student.isCurrentUser ? 'action.selected' : 'transparent',
                    '&:hover': { bgcolor: student.isCurrentUser ? 'action.selected' : 'action.hover' },
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      badgeContent={student.rank}
                      color="primary"
                      sx={{
                        '& .MuiBadge-badge': {
                          bgcolor: getRankColor(student.rank),
                          color: student.rank <= 3 ? '#000' : '#fff',
                          fontWeight: 'bold',
                        }
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {student.avatar}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography 
                        variant="body1" 
                        fontWeight={student.isCurrentUser ? 'bold' : 'medium'}
                      >
                        {student.name}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary">
                        {student.points.toLocaleString()} 积分
                      </Typography>
                    }
                  />
                  {student.rank <= 3 && (
                    <TrophyIcon sx={{ color: getRankColor(student.rank), ml: 1 }} />
                  )}
                </ListItem>
                {index < leaderboard.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      )
    },
    {
      id: 'achievements',
      title: '最新成就',
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, pb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <StarIcon sx={{ color: '#FFD700' }} />
            <Typography variant="h2" gutterBottom>
              最新成就
            </Typography>
          </Box>
          <List sx={{ p: 0, flex: 1, overflow: 'auto' }}>
            {recentAchievements.map((achievement, index) => (
              <Box key={achievement.id}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 2,
                    '&:hover': { bgcolor: 'action.hover' },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar 
                      sx={{ 
                        bgcolor: getRarityColor(achievement.rarity),
                        color: achievement.rarity === 'gold' ? '#000' : '#fff'
                      }}
                    >
                      {getAchievementIcon(achievement.icon)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight="medium">
                          {achievement.title}
                        </Typography>
                        <Chip
                          label={achievement.rarity}
                          size="small"
                          sx={{
                            bgcolor: getRarityColor(achievement.rarity),
                            color: achievement.rarity === 'gold' ? '#000' : '#fff',
                            fontSize: '0.7rem',
                            height: '20px',
                          }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                          {achievement.description}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          解锁于 {achievement.unlockedAt}
                        </Typography>
                      </Box>
                    }
                  />
                </ListItem>
                {index < recentAchievements.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      )
    },
    {
      id: 'announcements',
      title: '公告栏',
      content: (
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ p: 2, pb: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <AnnouncementIcon sx={{ color: 'primary.main' }} />
            <Typography variant="h2" gutterBottom>
              公告栏
            </Typography>
          </Box>
          <List sx={{ p: 0, flex: 1, overflow: 'auto' }}>
            {announcements.map((announcement, index) => (
              <Box key={announcement.id}>
                <ListItem
                  sx={{
                    py: 2,
                    px: 2,
                    '&:hover': { bgcolor: 'action.hover' },
                    alignItems: 'flex-start',
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 0.5 }}>
                        <Typography variant="body1" fontWeight="medium" sx={{ flex: 1 }}>
                          {announcement.title}
                        </Typography>
                        <Chip
                          label={announcement.priority === 'high' ? '重要' : announcement.priority === 'medium' ? '一般' : '通知'}
                          size="small"
                          color={getPriorityColor(announcement.priority)}
                          sx={{ fontSize: '0.7rem', height: '20px' }}
                        />
                      </Box>
                    }
                    secondary={
                      <Box>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {announcement.content}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="caption" color="text.secondary">
                            {announcement.author}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {announcement.publishedAt}
                          </Typography>
                        </Box>
                      </Box>
                    }
                  />
                </ListItem>
                {index < announcements.length - 1 && <Divider />}
              </Box>
            ))}
          </List>
        </Box>
      )
    }
  ];

  // 3D轮播控制函数
  // 触发动画
  useEffect(() => {
    if (isFromLogin) {
      // 延迟一点时间开始动画，让页面先渲染
      const timer = setTimeout(() => {
        setAnimationTriggered(true);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // 如果不是从登录页来的，直接显示
      setAnimationTriggered(true);
    }
  }, [isFromLogin]);

  const nextCard = () => {
    setCurrentCardIndex((prev) => (prev + 1) % cards.length);
  };

  const prevCard = () => {
    setCurrentCardIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // 键盘事件处理
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'ArrowLeft') {
        prevCard();
      } else if (event.key === 'ArrowRight') {
        nextCard();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  // 获取卡片样式 - 层叠式3D轮播效果 + 引入动画 + 过渡效果
  const getCardStyle = (index) => {
    let relativeIndex = index - currentCardIndex;

    // 调整 relativeIndex 以实现循环效果
    if (relativeIndex > cards.length / 2) {
      relativeIndex -= cards.length;
    } else if (relativeIndex < -cards.length / 2) {
      relativeIndex += cards.length;
    }

    const absIndex = Math.abs(relativeIndex);
    
    // 基础位移和缩放
    let translateX = 0;
    let translateZ = 0;
    let rotateY = 0;
    let scale = 1;
    let opacity = 1;
    let zIndex = 10;
    
    if (relativeIndex === 0) {
      // 中心卡片 - 最突出
      translateX = 0;
      translateZ = 100;
      rotateY = 0;
      scale = 1;
      opacity = 1;
      zIndex = 100;
      
      // 主卡片过渡效果
      if (mainCardTransitioning) {
        scale = 0.95;
        opacity = 0.8;
      }
    } else if (absIndex === 1) {
      // 左右两侧卡片 - 部分叠在中心卡片下方
      translateX = relativeIndex > 0 ? 200 : -200;
      translateZ = -50;
      rotateY = relativeIndex > 0 ? -25 : 25;
      scale = 0.85;
      opacity = 0.8;
      zIndex = 50;
      
      // 辅助卡片移动和隐藏效果
      if (cardsMovedDown) {
        translateX = 0; // 移动到中心
        translateZ = -200; // 移动到主卡片下方
        rotateY = 0;
        scale = 0.7;
      }
      if (auxiliaryCardsHidden) {
        opacity = 0;
        scale = 0.5;
      }
    } else if (absIndex === 2) {
      // 更外侧卡片 - 部分叠在左右两侧卡片下方
      translateX = relativeIndex > 0 ? 350 : -350;
      translateZ = -120;
      rotateY = relativeIndex > 0 ? -35 : 35;
      scale = 0.7;
      opacity = 0.6;
      zIndex = 25;
      
      // 辅助卡片移动和隐藏效果
      if (cardsMovedDown) {
        translateX = 0;
        translateZ = -250;
        rotateY = 0;
        scale = 0.6;
      }
      if (auxiliaryCardsHidden) {
        opacity = 0;
        scale = 0.4;
      }
    } else {
      // 更远的卡片 - 继续向后叠放
      const direction = relativeIndex > 0 ? 1 : -1;
      translateX = direction * (350 + (absIndex - 2) * 100);
      translateZ = -120 - (absIndex - 2) * 50;
      rotateY = direction * (35 + (absIndex - 2) * 10);
      scale = Math.max(0.5, 0.7 - (absIndex - 2) * 0.1);
      opacity = Math.max(0.3, 0.6 - (absIndex - 2) * 0.15);
      zIndex = Math.max(1, 25 - (absIndex - 2) * 5);
      
      // 辅助卡片移动和隐藏效果
      if (cardsMovedDown) {
        translateX = 0;
        translateZ = -300 - (absIndex - 2) * 50;
        rotateY = 0;
        scale = Math.max(0.3, 0.5 - (absIndex - 2) * 0.1);
      }
      if (auxiliaryCardsHidden) {
        opacity = 0;
        scale = Math.max(0.2, 0.3 - (absIndex - 2) * 0.1);
      }
    }

    // 如果是从登录页来的且动画还没触发，添加初始动画状态
    if (isFromLogin && !animationTriggered) {
      const animationDelay = index * 0.15; // 每个卡片延迟0.15秒
      return {
        transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale}) translateY(100px) scale(0.8)`,
        opacity: 0,
        zIndex,
        transition: `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${animationDelay}s`,
      };
    }
    
    // 过渡动画的时间设置
    let transitionDuration = '0.8s';
    if (isTransitioning) {
      if (cardsMovedDown && !auxiliaryCardsHidden) {
        transitionDuration = '0.5s'; // 移动阶段
      } else if (auxiliaryCardsHidden && !mainCardTransitioning) {
        transitionDuration = '0.3s'; // 隐藏阶段
      } else if (mainCardTransitioning) {
        transitionDuration = '0.4s'; // 主卡片过渡阶段
      }
    }
    
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
      transition: `all ${transitionDuration} cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    };
  };

  return (
    <PageTransition>
      {/* 便签组件 - 固定在左上角 */}
      <StickyNote />
      
      <Box sx={{ 
        height: '100vh', 
        width: '100vw',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        position: 'fixed',
        top: 0,
        left: 0,
        margin: 0,
        padding: 0,
        // 主卡片过渡时的模糊效果
        filter: mainCardTransitioning ? 'blur(8px)' : 'none',
        transition: 'filter 0.4s ease-in-out',
      }}>
      {/* 3D轮播容器 */}
      <Box
        sx={{
          position: 'relative',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1000px',
          perspectiveOrigin: 'center center',
          // 紫蓝色渐变背景
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          minHeight: '100vh',
        }}
      >
        {/* 左侧悬停区域 */}
        <Box
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '200px',
            height: '100%',
            zIndex: 50,
          }}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        />
        
        {/* 右侧悬停区域 */}
        <Box
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '200px',
            height: '100%',
            zIndex: 50,
          }}
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        />
        {/* 轮播场景 */}
         <Box
           sx={{
             position: 'relative',
             width: '800px',
             height: '500px',
             transformStyle: 'preserve-3d',
             transition: 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
           }}
         >
           {cards.map((card, index) => {
             const cardStyle = getCardStyle(index);
             return (
               <Card
                 key={card.id}
                 sx={{
                   position: 'absolute',
                   width: '690px',
                   height: '575px',
                   left: '50%',
                   top: '50%',
                   marginLeft: '-350px',
                   marginTop: '-275px',
                   transform: cardStyle.transform,
                   opacity: cardStyle.opacity,
                   zIndex: cardStyle.zIndex,
                   transition: cardStyle.transition,
                   // 毛玻璃效果
                   background: 'rgba(255, 255, 255, 0.1)',
                   backdropFilter: 'blur(10px)',
                   border: '1px solid rgba(255, 255, 255, 0.2)',
                   boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                   borderRadius: '16px',
                   // 防止内容溢出
                   overflow: 'hidden',
                   // 确保卡片可交互
                   pointerEvents: index === currentCardIndex ? 'auto' : 'none',
                   // 主卡片过渡时的额外效果
                   ...(index === currentCardIndex && mainCardTransitioning && {
                     filter: 'blur(4px)',
                     background: 'rgba(255, 255, 255, 0.15)',
                     backdropFilter: 'blur(15px)',
                     boxShadow: '0 12px 40px 0 rgba(31, 38, 135, 0.5)',
                   }),
                 }}
               >
                 {card.content}
               </Card>
             );
           })}
         </Box>

        {/* 左右切换按钮 */}
        <IconButton
          onClick={prevCard}
          sx={{
            position: 'absolute',
            left: '50px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            width: '60px',
            height: '60px',
            opacity: showArrows ? 1 : 0,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              opacity: 1,
            },
          }}
        >
          <ChevronLeftIcon sx={{ fontSize: '2rem' }} />
        </IconButton>

        <IconButton
          onClick={nextCard}
          sx={{
            position: 'absolute',
            right: '50px',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            width: '60px',
            height: '60px',
            opacity: showArrows ? 1 : 0,
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              opacity: 1,
            },
          }}
        >

          <ChevronRightIcon sx={{ fontSize: '2rem' }} />
        </IconButton>

        {/* 指示器 */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 1,
            zIndex: 100,
          }}
        >
          {cards.map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentCardIndex(index)}
              sx={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                backgroundColor: index === currentCardIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'white',
                },
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
    </PageTransition>
  );
};

export default Dashboard;