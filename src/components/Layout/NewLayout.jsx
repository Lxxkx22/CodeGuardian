import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import DockerBar from '../DockerBar/DockerBar';

const NewLayout = () => {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        backgroundImage: 'url(/background.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Docker栏 */}
      <DockerBar />
      
      {/* 主内容区域 */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'rgba(255, 255, 255, 0.1)', // 半透明背景让毛玻璃效果更明显
          pt: '120px', // 为Docker栏留出空间（展开状态）
          px: 3,
          pb: 3,
          minHeight: '100vh',
          transition: 'padding-top 0.3s ease-in-out',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default NewLayout;