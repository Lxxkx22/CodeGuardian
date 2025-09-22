import { useState } from 'react';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

const StickyNote = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [noteText, setNoteText] = useState(
    '说明：\n本网页旨在构建项目初期的高保真原型，集成项目的设计理念和大体功能方向，因时间紧张有部分功能和效果未得到妥善处理，请谅解。'
  );

  const handleHide = () => {
    setIsVisible(false);
  };

  const handleTextChange = (event) => {
    const text = event.target.value;
    if (text.length <= 300) {
      setNoteText(text);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        top: 100,
        left: 20,
        width: 280,
        minHeight: 200,
        maxHeight: 300,
        zIndex: 1000,
        background: 'linear-gradient(135deg, #fff9c4 0%, #fff59d 100%)',
        border: '2px solid #f57f17',
        borderRadius: '8px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1)',
        transform: 'rotate(-2deg)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'rotate(0deg) scale(1.02)',
          boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15)',
        },
      }}
    >
      {/* 便签头部 */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 1,
          borderBottom: '1px solid #f57f17',
          background: 'rgba(245, 127, 23, 0.1)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#e65100',
            fontWeight: 'bold',
            fontSize: '0.75rem',
          }}
        >
          便签 ({noteText.length}/200)
        </Typography>
        <IconButton
          size="small"
          onClick={handleHide}
          sx={{
            color: '#e65100',
            padding: '2px',
            '&:hover': {
              backgroundColor: 'rgba(245, 127, 23, 0.2)',
            },
          }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* 便签内容区域 */}
      <Box sx={{ p: 2 }}>
        <textarea
          value={noteText}
          onChange={handleTextChange}
          placeholder="在这里记录您的想法..."
          style={{
            width: '100%',
            minHeight: '120px',
            maxHeight: '200px',
            border: 'none',
            outline: 'none',
            resize: 'vertical',
            backgroundColor: 'transparent',
            color: '#d32f2f',
            fontSize: '14px',
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            lineHeight: '1.5',
            padding: '8px 0',
          }}
        />
        
        {/* 字符计数提示 */}
        {noteText.length > 180 && (
          <Typography
            variant="caption"
            sx={{
              color: noteText.length >= 200 ? '#d32f2f' : '#ff9800',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              display: 'block',
              textAlign: 'right',
              mt: 1,
            }}
          >
            {noteText.length >= 200 ? '已达到字符限制' : `还可输入 ${200 - noteText.length} 字符`}
          </Typography>
        )}
      </Box>

      {/* 便签装饰元素 - 模拟图钉 */}
      <Box
        sx={{
          position: 'absolute',
          top: -8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #ff5722 0%, #d32f2f 100%)',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          '&::after': {
            content: '""',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 6,
            height: 6,
            borderRadius: '50%',
            backgroundColor: '#fff',
          },
        }}
      />
    </Paper>
  );
};

export default StickyNote;