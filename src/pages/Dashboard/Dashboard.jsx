import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Chip,
  Divider,
} from '@mui/material';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();
  // Mock user data - in a real app, this would come from authentication context
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

  const handleStartNewScan = () => {
    navigate('/new-scan');
  };

  const handleViewReport = (reportId) => {
    navigate(`/reports/${reportId}`);
  };

  // Empty state - no recent scans
  const renderEmptyState = () => (
    <Card sx={{ p: 4, textAlign: 'center', height: '100%' }}>
      <Box sx={{ mb: 3 }}>
        <Box
          component="img"
          src="/src/assets/empty-state.svg"
          alt="Welcome"
          sx={{ width: '150px', height: 'auto', mb: 2 }}
        />
      </Box>
      <Typography variant="h2" gutterBottom>
        欢迎来到 CodeGuardian!
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        你还没有进行任何扫描。点击"开始新的扫描"来检查你的第一个项目吧！
      </Typography>
    </Card>
  );

  return (
    <Box>
      <Grid container spacing={3}>
        {/* 左侧主区域 */}
        <Grid item xs={12} md={7}>
          <Card sx={{ p: 4, height: '100%' }}>
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
          </Card>
        </Grid>

        {/* 右侧次区域 */}
        <Grid item xs={12} md={5}>
          {recentScans.length > 0 ? (
            <Card sx={{ height: '100%' }}>
              <Box sx={{ p: 2, pb: 0 }}>
                <Typography variant="h2" gutterBottom>
                  最近的扫描
                </Typography>
              </Box>
              <List sx={{ p: 0 }}>
                {recentScans.map((scan, index) => (
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
                    {index < recentScans.length - 1 && <Divider />}
                  </Box>
                ))}
              </List>
            </Card>
          ) : (
            renderEmptyState()
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;