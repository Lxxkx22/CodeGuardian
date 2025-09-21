import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigation } from '../../contexts/NavigationContext';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AddCircle as AddCircleIcon,
  Description as DescriptionIcon,
  Tune as TuneIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  School as SchoolIcon,
  Share as ShareIcon,
  Settings as SettingsIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
} from '@mui/icons-material';

const DockerBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { navigateWithTransition } = useNavigation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // 使用认证上下文中的用户数据
  const currentUser = user || {
    name: 'Alex',
    role: 'teacher', // or 'student'
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleProfileClick = () => {
    handleProfileMenuClose();
    navigateWithTransition('/settings');
  };

  const handleLogout = () => {
    logout();
    handleProfileMenuClose();
    navigate('/login');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
    { text: 'New Scan', icon: <AddCircleIcon />, path: '/new-scan' },
    { text: 'Reports', icon: <DescriptionIcon />, path: '/reports' },
    { text: 'Shared Reports', icon: <ShareIcon />, path: '/shared-reports' },
    { text: 'Learn', icon: <SchoolIcon />, path: '/learn' },
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  ];

  // Only show Rule Sets for teachers
  const teacherMenuItems = [
    { text: 'Rule Sets', icon: <TuneIcon />, path: '/rulesets' },
  ];

  const allMenuItems = currentUser.role === 'teacher' 
    ? [...menuItems, ...teacherMenuItems] 
    : menuItems;

  return (
    <AppBar
      position="fixed"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        color: 'text.primary',
        transition: 'all 0.3s ease-in-out',
        height: '60px',
        overflow: 'visible',
      }}
    >
      <Toolbar
        sx={{
          minHeight: '60px !important',
          px: 3,
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        {/* 左侧品牌标识 */}
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: '1.5rem',
            lineHeight: 1,
          }}
        >
          CodeGuardian Edu
        </Typography>

        {/* 中间导航按钮区域 */}
        <Box 
          sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s ease-in-out',
            pointerEvents: isHovered ? 'auto' : 'none',
          }}
        >
          {allMenuItems.map((item) => (
            <Button
              key={item.text}
              variant={location.pathname === item.path ? 'contained' : 'text'}
              startIcon={item.icon}
              onClick={() => navigateWithTransition(item.path)}
              size="small"
              sx={{
                minWidth: 'auto',
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: location.pathname === item.path ? 600 : 400,
                height: '32px',
                transform: isHovered ? 'translateY(0)' : 'translateY(-10px)',
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  backgroundColor: location.pathname === item.path 
                    ? 'primary.dark' 
                    : 'rgba(0, 0, 0, 0.04)',
                },
              }}
            >
              {item.text}
            </Button>
          ))}
        </Box>

        {/* 右侧控制区域 */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* 用户头像和菜单 */}
          <Tooltip title={currentUser.name}>
            <IconButton onClick={handleProfileMenuOpen} size="small">
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {currentUser.name.charAt(0)}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>

        {/* 用户菜单 */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <MenuItem onClick={handleProfileClick}>
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Profile</ListItemText>
          </MenuItem>
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default DockerBar;