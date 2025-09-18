import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
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
} from '@mui/icons-material';

const drawerWidth = 240;

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  
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
    navigate('/settings');
  };

  const handleLogout = () => {
    // 调用认证上下文的logout方法
    logout();
    handleProfileMenuClose();
    navigate('/login');
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

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
          bgcolor: 'background.paper',
          color: 'text.primary',
          boxShadow: 1,
        }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {location.pathname === '/' && 'Dashboard'}
            {location.pathname === '/new-scan' && 'New Scan'}
            {location.pathname === '/reports' && 'Reports'}
            {location.pathname === '/shared-reports' && 'Shared Reports'}
            {location.pathname === '/learn' && 'Learn'}
            {location.pathname === '/rulesets' && 'Rule Sets'}
            {location.pathname === '/settings' && 'Settings'}
            {location.pathname.startsWith('/report/') && 'Scan Report'}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
          <Typography variant="h6" noWrap component="div" color="primary.main" fontWeight="bold">
            CodeGuardian Edu
          </Typography>
        </Toolbar>
        <Divider />
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        
        {/* Only show teacher menu items if user is a teacher */}
        {currentUser.role === 'teacher' && (
          <>
            <Divider />
            <List>
              {teacherMenuItems.map((item) => (
                <ListItem key={item.text} disablePadding>
                  <ListItemButton
                    selected={location.pathname === item.path}
                    onClick={() => navigate(item.path)}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </>
        )}
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <ListItem disablePadding>
          <ListItemButton onClick={handleProfileMenuOpen}>
            <ListItemIcon>
              <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                {currentUser.name.charAt(0)}
              </Avatar>
            </ListItemIcon>
            <ListItemText primary={currentUser.name} />
          </ListItemButton>
        </ListItem>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'bottom',
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
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;