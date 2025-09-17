import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Share as ShareIcon } from '@mui/icons-material';

const SharedReport = () => {
  const { reportId } = useParams();

  // 模拟加载状态
  const [loading, setLoading] = React.useState(true);
  const [report, setReport] = React.useState(null);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    // 模拟API调用
    const timer = setTimeout(() => {
      // 模拟报告数据
      const mockReport = {
        id: reportId,
        title: `共享报告 ${reportId}`,
        description: '这是一个通过链接分享的代码审查报告',
        sharedBy: '李老师',
        sharedAt: '2024-01-15 10:30:00',
        scanResults: {
          totalIssues: 15,
          criticalIssues: 2,
          warningIssues: 8,
          infoIssues: 5
        },
        files: [
          {
            name: 'main.py',
            issues: 5,
            status: 'warning'
          },
          {
            name: 'utils.js',
            issues: 3,
            status: 'info'
          }
        ]
      };
      
      setReport(mockReport);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [reportId]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!report) {
    return <Navigate to="/404" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" alignItems="center" mb={3}>
          <ShareIcon sx={{ mr: 2, color: 'primary.main' }} />
          <Typography variant="h4" component="h1">
            {report.title}
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          此报告由 <strong>{report.sharedBy}</strong> 于 {report.sharedAt} 分享
        </Alert>

        <Typography variant="body1" paragraph>
          {report.description}
        </Typography>

        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            扫描结果概览
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            <Chip 
              label={`总问题: ${report.scanResults.totalIssues}`} 
              color="default" 
            />
            <Chip 
              label={`严重: ${report.scanResults.criticalIssues}`} 
              color="error" 
            />
            <Chip 
              label={`警告: ${report.scanResults.warningIssues}`} 
              color="warning" 
            />
            <Chip 
              label={`信息: ${report.scanResults.infoIssues}`} 
              color="info" 
            />
          </Box>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            文件列表
          </Typography>
          {report.files.map((file, index) => (
            <Paper key={index} variant="outlined" sx={{ p: 2, mb: 1 }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="body1">{file.name}</Typography>
                <Chip 
                  label={`${file.issues} 问题`} 
                  size="small"
                  color={file.status === 'warning' ? 'warning' : 'info'}
                />
              </Box>
            </Paper>
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default SharedReport;