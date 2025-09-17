import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button
} from '@mui/material';
import { Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h1" component="h1" sx={{ fontSize: '6rem', fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          404
        </Typography>
        
        <Typography variant="h4" component="h2" gutterBottom>
          页面未找到
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          抱歉，您访问的页面不存在或已被移动。
        </Typography>
        
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

export default NotFound;