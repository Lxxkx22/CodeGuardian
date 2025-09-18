import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  Grid,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';
import { ReportListSkeleton } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageError } from '../../components/ErrorMessage/ErrorMessage';

const History = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 模拟数据加载
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1000));
        setError(null);
      } catch (err) {
        setError('加载扫描历史失败');
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // 重新加载数据
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h1" gutterBottom>
          我的报告
        </Typography>
        <ReportListSkeleton count={5} />
      </Box>
    );
  }

  if (error) {
    return (
      <PageError
        title="加载失败"
        message={error}
        onRetry={handleRetry}
      />
    );
  }
  
  // 模拟历史扫描数据
  const scanHistory = [
    {
      id: '1',
      fileName: 'assignment5.zip',
      scanDate: '2024-07-20 14:30',
      scanMode: '快速检查',
      riskScore: 43,
      issueCount: {
        high: 1,
        medium: 3,
        low: 1,
      },
    },
    {
      id: '2',
      fileName: 'project_final.zip',
      scanDate: '2024-07-18 09:15',
      scanMode: '深度分析',
      riskScore: 12,
      issueCount: {
        high: 0,
        medium: 1,
        low: 3,
      },
    },
    {
      id: '3',
      fileName: 'homework3.cpp',
      scanDate: '2024-07-15 16:45',
      scanMode: '快速检查',
      riskScore: 0,
      issueCount: {
        high: 0,
        medium: 0,
        low: 0,
      },
    },
    {
      id: '4',
      fileName: 'lab_exercise.py',
      scanDate: '2024-07-10 11:20',
      scanMode: '标准扫描',
      riskScore: 67,
      issueCount: {
        high: 2,
        medium: 4,
        low: 3,
      },
    },
    {
      id: '5',
      fileName: 'midterm_project.zip',
      scanDate: '2024-07-05 13:50',
      scanMode: '深度分析',
      riskScore: 28,
      issueCount: {
        high: 0,
        medium: 2,
        low: 5,
      },
    },
  ];

  // 筛选和搜索逻辑
  const filteredHistory = scanHistory.filter(scan => {
    // 搜索词筛选
    if (searchTerm && !scan.fileName.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // 严重性筛选
    if (filterSeverity !== 'all') {
      if (filterSeverity === 'high' && scan.issueCount.high === 0) return false;
      if (filterSeverity === 'medium' && scan.issueCount.medium === 0) return false;
      if (filterSeverity === 'low' && scan.issueCount.low === 0) return false;
      if (filterSeverity === 'clean' && (scan.issueCount.high > 0 || scan.issueCount.medium > 0 || scan.issueCount.low > 0)) return false;
    }
    
    // 日期筛选
    if (filterDate !== 'all') {
      const scanDateObj = new Date(scan.scanDate);
      const today = new Date();
      const lastWeek = new Date();
      lastWeek.setDate(today.getDate() - 7);
      const lastMonth = new Date();
      lastMonth.setMonth(today.getMonth() - 1);
      
      if (filterDate === 'today' && scanDateObj.toDateString() !== today.toDateString()) return false;
      if (filterDate === 'week' && (scanDateObj < lastWeek || scanDateObj > today)) return false;
      if (filterDate === 'month' && (scanDateObj < lastMonth || scanDateObj > today)) return false;
    }
    
    return true;
  });

  const handleViewReport = (reportId) => {
    navigate(`/scan-report/${reportId}`);
  };

  const handleDownloadReport = (reportId) => {
    // 模拟下载报告功能
    alert(`下载报告 ${reportId}`);
  };

  const handleDeleteScan = (scanId) => {
    // 模拟删除扫描记录功能
    alert(`删除扫描记录 ${scanId}`);
  };

  // 空状态 - 没有扫描历史
  const renderEmptyState = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" gutterBottom>
        暂无扫描历史
      </Typography>
      <Typography variant="body1" paragraph>
        您还没有进行过任何代码扫描。开始您的第一次扫描，了解您的代码安全状况。
      </Typography>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => navigate('/new-scan')}
      >
        开始新扫描
      </Button>
    </Box>
  );

  // 筛选后无结果状态
  const renderNoResultsState = () => (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h2" gutterBottom>
        未找到匹配结果
      </Typography>
      <Typography variant="body1" paragraph>
        尝试调整您的搜索条件或筛选器。
      </Typography>
      <Button
        variant="outlined"
        onClick={() => {
          setSearchTerm('');
          setFilterSeverity('all');
          setFilterDate('all');
        }}
      >
        清除所有筛选器
      </Button>
    </Box>
  );

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
      </Typography>
      
      <Card sx={{ 
        mb: 4,
        maxWidth: '960px',
        mx: 'auto',
        backdropFilter: 'blur(10px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px rgba(31, 38, 135, 0.37)',
        p: 4,
      }}>
        <Typography variant="h1" gutterBottom>
          扫描历史
        </Typography>

        {scanHistory.length > 0 ? (
          <>
            {/* 筛选和搜索工具栏 */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="搜索文件名..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="severity-filter-label">严重性</InputLabel>
                  <Select
                    labelId="severity-filter-label"
                    value={filterSeverity}
                    label="严重性"
                    onChange={(e) => setFilterSeverity(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">所有严重性</MenuItem>
                    <MenuItem value="high">包含高危问题</MenuItem>
                    <MenuItem value="medium">包含中危问题</MenuItem>
                    <MenuItem value="low">包含低危问题</MenuItem>
                    <MenuItem value="clean">无问题</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="date-filter-label">日期</InputLabel>
                  <Select
                    labelId="date-filter-label"
                    value={filterDate}
                    label="日期"
                    onChange={(e) => setFilterDate(e.target.value)}
                    startAdornment={
                      <InputAdornment position="start">
                        <FilterListIcon />
                      </InputAdornment>
                    }
                  >
                    <MenuItem value="all">所有时间</MenuItem>
                    <MenuItem value="today">今天</MenuItem>
                    <MenuItem value="week">本周</MenuItem>
                    <MenuItem value="month">本月</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {filteredHistory.length > 0 ? (
              <Card sx={{
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 16px rgba(31, 38, 135, 0.2)',
              }}>
                <TableContainer component={Paper} elevation={0} sx={{ backgroundColor: 'transparent' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>文件名</TableCell>
                        <TableCell>扫描日期</TableCell>
                        <TableCell>扫描模式</TableCell>
                        <TableCell>风险评分</TableCell>
                        <TableCell>问题数量</TableCell>
                        <TableCell align="right">操作</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {filteredHistory.map((scan) => (
                        <TableRow key={scan.id} hover>
                          <TableCell>{scan.fileName}</TableCell>
                          <TableCell>{scan.scanDate}</TableCell>
                          <TableCell>{scan.scanMode}</TableCell>
                          <TableCell>
                            <Box
                              sx={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: scan.riskScore > 50 ? 'semantic.high' : 
                                        scan.riskScore > 20 ? 'semantic.medium' : 
                                        scan.riskScore > 0 ? 'semantic.low' : 'semantic.success',
                                color: 'white',
                                fontWeight: 'bold',
                              }}
                            >
                              {scan.riskScore}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                              {scan.issueCount.high > 0 && (
                                <Chip
                                  label={`${scan.issueCount.high} 高危`}
                                  size="small"
                                  sx={{ bgcolor: 'semantic.high', color: 'white' }}
                                />
                              )}
                              {scan.issueCount.medium > 0 && (
                                <Chip
                                  label={`${scan.issueCount.medium} 中危`}
                                  size="small"
                                  sx={{ bgcolor: 'semantic.medium', color: 'white' }}
                                />
                              )}
                              {scan.issueCount.low > 0 && (
                                <Chip
                                  label={`${scan.issueCount.low} 低危`}
                                  size="small"
                                  sx={{ bgcolor: 'semantic.low', color: 'white' }}
                                />
                              )}
                              {scan.issueCount.high === 0 && scan.issueCount.medium === 0 && scan.issueCount.low === 0 && (
                                <Chip
                                  label="无问题"
                                  size="small"
                                  sx={{ bgcolor: 'semantic.success', color: 'white' }}
                                />
                              )}
                            </Box>
                          </TableCell>
                          <TableCell align="right">
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                              <Tooltip title="查看报告">
                                <IconButton onClick={() => handleViewReport(scan.id)}>
                                  <VisibilityIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="下载报告">
                                <IconButton onClick={() => handleDownloadReport(scan.id)}>
                                  <DownloadIcon />
                                </IconButton>
                              </Tooltip>
                              <Tooltip title="删除记录">
                                <IconButton onClick={() => handleDeleteScan(scan.id)}>
                                  <DeleteIcon />
                                </IconButton>
                              </Tooltip>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            ) : (
              renderNoResultsState()
            )}
          </>
        ) : (
          renderEmptyState()
        )}
      </Card>
    </Box>
  );
};

export default History;