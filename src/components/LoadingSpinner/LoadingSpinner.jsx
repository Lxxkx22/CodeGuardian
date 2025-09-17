import React from 'react';
import { Box, CircularProgress, Typography, Skeleton } from '@mui/material';

// 基础加载旋转器
export const LoadingSpinner = ({ size = 40, message = '加载中...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <CircularProgress size={size} />
      {message && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

// 页面级加载状态
export const PageLoading = ({ message = '页面加载中...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <LoadingSpinner size={60} message={message} />
    </Box>
  );
};

// 报告列表骨架屏
export const ReportListSkeleton = ({ count = 3 }) => {
  return (
    <Box sx={{ width: '100%' }}>
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            mb: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
          }}
        >
          {/* 风险标签骨架 */}
          <Skeleton
            variant="rectangular"
            width={60}
            height={24}
            sx={{ mr: 2, borderRadius: 1 }}
          />
          
          {/* 文件信息骨架 */}
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
            <Skeleton variant="text" width="40%" height={20} />
          </Box>
          
          {/* 操作按钮骨架 */}
          <Skeleton variant="rectangular" width={80} height={32} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

// 报告详情页骨架屏
export const ReportDetailSkeleton = () => {
  return (
    <Box sx={{ width: '100%' }}>
      {/* 摘要区域骨架 */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Box
            key={index}
            sx={{
              flex: 1,
              p: 2,
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: 1,
            }}
          >
            <Skeleton variant="circular" width={60} height={60} sx={{ mx: 'auto', mb: 2 }} />
            <Skeleton variant="text" width="80%" height={24} sx={{ mx: 'auto', mb: 1 }} />
            <Skeleton variant="text" width="60%" height={20} sx={{ mx: 'auto' }} />
          </Box>
        ))}
      </Box>
      
      {/* 问题列表表格骨架 */}
      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
        {/* 表头 */}
        <Box sx={{ display: 'flex', p: 2, bgcolor: 'grey.50' }}>
          <Skeleton variant="text" width="15%" height={20} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="40%" height={20} sx={{ mr: 2 }} />
          <Skeleton variant="text" width="25%" height={20} />
        </Box>
        
        {/* 表格行 */}
        {Array.from({ length: 4 }).map((_, index) => (
          <Box key={index} sx={{ display: 'flex', p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Skeleton variant="rectangular" width="12%" height={24} sx={{ mr: 2, borderRadius: 1 }} />
            <Skeleton variant="text" width="35%" height={20} sx={{ mr: 2 }} />
            <Skeleton variant="text" width="20%" height={20} />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

// 卡片网格骨架屏
export const CardGridSkeleton = ({ count = 6, columns = 3 }) => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: 2,
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <Box
          key={index}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 1,
            height: 200,
          }}
        >
          <Skeleton variant="text" width="70%" height={24} sx={{ mb: 2 }} />
          <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
          <Skeleton variant="text" width="80%" height={20} sx={{ mb: 2 }} />
          <Skeleton variant="rectangular" width="100%" height={80} sx={{ borderRadius: 1 }} />
        </Box>
      ))}
    </Box>
  );
};

export default LoadingSpinner;