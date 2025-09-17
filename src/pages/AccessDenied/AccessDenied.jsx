import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Alert
} from '@mui/material';
import { 
  Block as BlockIcon, 
  Home as HomeIcon, 
  ArrowBack as ArrowBackIcon 
} from '@mui/icons-material';

const AccessDenied = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <BlockIcon sx={{ fontSize: '4rem', color: 'error.main', mb: 2 }} />
        
        <Typography variant="h4" component="h1" gutterBottom>
          访问被拒绝
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          抱歉，您没有权限访问此页面。
        </Typography>
        
        <Alert severity="warning" sx={{ mt: 3, mb: 3, textAlign: 'left' }}>
          <Typography variant="body2">
            可能的原因：
          </Typography>
          <ul style={{ margin: '8px 0', paddingLeft: '20px' }}>
            <li>您的账号权限不足</li>
            <li>需要登录后才能访问</li>
            <li>页面仅对特定角色开放</li>
          </ul>
        </Alert>
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            component={RouterLink}
            to="/"
            variant="contained"
            startIcon={<HomeIcon />}
            size="large"
          >
            返回首页
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            size="large"
          >
            返回上页
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AccessDenied;