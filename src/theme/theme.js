import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4A90E2', // 主色 - 沉稳而友好的蓝色
    },
    background: {
      // 移除默认背景色，让全局渐变背景生效
      paper: '#FFFFFF', // 卡片/容器背景 - 纯白
    },
    text: {
      primary: '#1D2129', // 标题 - 深灰黑
      secondary: '#495057', // 正文 - 中度灰
      disabled: '#868E96', // 辅助/次要信息 - 浅灰
    },
    semantic: {
      high: '#E74C3C', // 高危 - 红色
      medium: '#F39C12', // 中危 - 橙色
      low: '#3498DB', // 低危 - 蓝色
      info: '#95A5A6', // 信息 - 灰色
      success: '#2ECC71', // 成功 - 绿色
    },
  },
  typography: {
    fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
    },
    h2: {
      fontSize: '22px',
      fontWeight: 600,
    },
    h3: {
      fontSize: '18px',
      fontWeight: 600,
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
    },
    body2: {
      fontSize: '14px',
      fontWeight: 400,
    },
    code: {
      fontFamily: '"Fira Code", "JetBrains Mono", monospace',
    },
  },
  shape: {
    borderRadius: 6, // 按钮/输入框圆角
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // 卡片/容器圆角
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none', // 按钮文字不要全部大写
        },
      },
    },
  },
  spacing: 8, // 基础间距单位
});

export default theme;