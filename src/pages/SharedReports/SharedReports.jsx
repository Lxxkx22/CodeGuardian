import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Grid,
  Button,
  Chip,
  IconButton,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Alert,
  Tabs,
  Tab,
  Menu,
  MenuList,
  MenuItem as MenuItemComponent,
  Paper,
  Tooltip,
} from '@mui/material';
import {
  Share as ShareIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
  Email as EmailIcon,
  Group as GroupIcon,
  Person as PersonIcon,
  Public as PublicIcon,
  Lock as LockIcon,
  MoreVert as MoreVertIcon,
  FileCopy as FileCopyIcon,
  Edit as EditIcon,
} from '@mui/icons-material';
import { CardGridSkeleton } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageError } from '../../components/ErrorMessage/ErrorMessage';

const SharedReports = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [sharedReports, setSharedReports] = useState([]);
  const [receivedReports, setReceivedReports] = useState([]);
  const [openShareDialog, setOpenShareDialog] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [shareSettings, setShareSettings] = useState({
    visibility: 'private',
    emails: '',
    allowDownload: true,
    expiryDate: '',
    password: ''
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuReport, setMenuReport] = useState(null);

  // 模拟共享报告数据
  const mockSharedReports = [
    {
      id: '1',
      fileName: 'homework5_security.c',
      scanDate: '2024-07-15',
      issuesCount: 8,
      highSeverity: 3,
      visibility: 'private',
      sharedWith: ['alice@example.com', 'bob@example.com'],
      shareLink: 'https://codereview.app/shared/abc123',
      views: 12,
      downloads: 3,
      expiryDate: '2024-08-15',
      hasPassword: true,
      createdAt: '2024-07-15T10:30:00Z'
    },
    {
      id: '2',
      fileName: 'pointer_analysis.cpp',
      scanDate: '2024-07-12',
      issuesCount: 5,
      highSeverity: 1,
      visibility: 'public',
      sharedWith: [],
      shareLink: 'https://codereview.app/shared/def456',
      views: 45,
      downloads: 8,
      expiryDate: null,
      hasPassword: false,
      createdAt: '2024-07-12T14:20:00Z'
    }
  ];

  // 模拟接收到的报告数据
  const mockReceivedReports = [
    {
      id: '3',
      fileName: 'team_project.c',
      scanDate: '2024-07-14',
      issuesCount: 12,
      highSeverity: 4,
      sharedBy: {
        name: 'Alice Wang',
        email: 'alice@example.com',
        avatar: 'A'
      },
      shareLink: 'https://codereview.app/shared/ghi789',
      receivedAt: '2024-07-14T16:45:00Z',
      isViewed: true
    },
    {
      id: '4',
      fileName: 'security_demo.cpp',
      scanDate: '2024-07-13',
      issuesCount: 6,
      highSeverity: 2,
      sharedBy: {
        name: 'Bob Chen',
        email: 'bob@example.com',
        avatar: 'B'
      },
      shareLink: 'https://codereview.app/shared/jkl012',
      receivedAt: '2024-07-13T09:15:00Z',
      isViewed: false
    }
  ];

  useEffect(() => {
    const loadReports = async () => {
      try {
        setLoading(true);
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSharedReports(mockSharedReports);
        setReceivedReports(mockReceivedReports);
        setError(null);
      } catch (err) {
        setError('加载共享报告失败');
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setSharedReports(mockSharedReports);
      setReceivedReports(mockReceivedReports);
      setLoading(false);
    }, 1000);
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleShareReport = (report) => {
    setSelectedReport(report);
    setShareSettings({
      visibility: 'private',
      emails: '',
      allowDownload: true,
      expiryDate: '',
      password: ''
    });
    setOpenShareDialog(true);
  };

  const handleSaveShare = () => {
    // 这里应该调用API保存分享设置
    console.log('保存分享设置:', shareSettings);
    setOpenShareDialog(false);
  };

  const handleCopyLink = (shareLink) => {
    navigator.clipboard.writeText(shareLink);
    // 这里可以显示一个成功提示
  };

  const handleMenuOpen = (event, report) => {
    setAnchorEl(event.currentTarget);
    setMenuReport(report);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuReport(null);
  };

  const handleDeleteShare = (reportId) => {
    if (window.confirm('确定要停止分享这个报告吗？')) {
      setSharedReports(sharedReports.filter(r => r.id !== reportId));
    }
    handleMenuClose();
  };

  const handleViewReport = (reportId) => {
    navigate(`/report/${reportId}`);
  };

  const getSeverityColor = (count) => {
    if (count >= 3) return 'error';
    if (count >= 1) return 'warning';
    return 'success';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h1" gutterBottom>
          共享报告
        </Typography>
        <CardGridSkeleton count={6} columns={2} />
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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h1" gutterBottom>
        共享报告
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label={`我分享的 (${sharedReports.length})`} />
          <Tab label={`收到的分享 (${receivedReports.length})`} />
        </Tabs>
      </Box>

      {/* 我分享的报告 */}
      {activeTab === 0 && (
        <Box>
          {sharedReports.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
              }}
            >
              <Box sx={{ fontSize: 80, mb: 3 }}>
                📤🔗
              </Box>
              <Typography variant="h4" gutterBottom>
                还没有分享过报告
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
                您可以在扫描报告页面点击分享按钮来分享报告给其他人。
              </Typography>
              <Button
                variant="contained"
                onClick={() => navigate('/history')}
              >
                查看历史报告
              </Button>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {sharedReports.map((report) => (
                <Grid item xs={12} md={6} key={report.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Typography variant="h3" sx={{ flex: 1 }}>
                          {report.fileName}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, report)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          icon={report.visibility === 'public' ? <PublicIcon /> : <LockIcon />}
                          label={report.visibility === 'public' ? '公开' : '私有'}
                          size="small"
                          color={report.visibility === 'public' ? 'success' : 'default'}
                        />
                        <Chip
                          label={`${report.issuesCount} 个问题`}
                          size="small"
                          color={getSeverityColor(report.highSeverity)}
                        />
                        {report.hasPassword && (
                          <Chip
                            icon={<LockIcon />}
                            label="密码保护"
                            size="small"
                            variant="outlined"
                          />
                        )}
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        扫描时间: {report.scanDate}
                      </Typography>

                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {report.views} 次查看 • {report.downloads} 次下载
                          </Typography>
                        </Box>
                        {report.expiryDate && (
                          <Typography variant="caption" color="warning.main">
                            {formatDate(report.expiryDate)} 到期
                          </Typography>
                        )}
                      </Box>

                      {report.sharedWith.length > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="caption" color="text.secondary">
                            分享给: {report.sharedWith.join(', ')}
                          </Typography>
                        </Box>
                      )}
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewReport(report.id)}
                      >
                        查看报告
                      </Button>
                      <Button
                        size="small"
                        startIcon={<LinkIcon />}
                        onClick={() => handleCopyLink(report.shareLink)}
                      >
                        复制链接
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* 收到的分享 */}
      {activeTab === 1 && (
        <Box>
          {receivedReports.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '50vh',
                textAlign: 'center',
              }}
            >
              <Box sx={{ fontSize: 80, mb: 3 }}>
                📥📋
              </Box>
              <Typography variant="h4" gutterBottom>
                还没有收到分享
              </Typography>
              <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
                当其他人分享报告给您时，会在这里显示。
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {receivedReports.map((report) => (
                <Grid item xs={12} md={6} key={report.id}>
                  <Card sx={{ opacity: report.isViewed ? 1 : 0.9, border: report.isViewed ? 'none' : '2px solid #1976d2' }}>
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                          {report.sharedBy.avatar}
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="h3">
                            {report.fileName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            来自 {report.sharedBy.name}
                          </Typography>
                        </Box>
                        {!report.isViewed && (
                          <Chip label="新" size="small" color="primary" />
                        )}
                      </Box>

                      <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                        <Chip
                          label={`${report.issuesCount} 个问题`}
                          size="small"
                          color={getSeverityColor(report.highSeverity)}
                        />
                        <Chip
                          label={`${report.highSeverity} 高危`}
                          size="small"
                          color="error"
                          variant="outlined"
                        />
                      </Box>

                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        扫描时间: {report.scanDate}
                      </Typography>

                      <Typography variant="caption" color="text.secondary">
                        收到时间: {formatDate(report.receivedAt)}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<VisibilityIcon />}
                        onClick={() => handleViewReport(report.id)}
                        variant={report.isViewed ? 'text' : 'contained'}
                      >
                        查看报告
                      </Button>
                      <Button
                        size="small"
                        startIcon={<LinkIcon />}
                        onClick={() => handleCopyLink(report.shareLink)}
                      >
                        复制链接
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* 操作菜单 */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItemComponent onClick={() => {
          handleShareReport(menuReport);
          handleMenuClose();
        }}>
          <EditIcon sx={{ mr: 1 }} />
          编辑分享设置
        </MenuItemComponent>
        <MenuItemComponent onClick={() => handleCopyLink(menuReport?.shareLink)}>
          <FileCopyIcon sx={{ mr: 1 }} />
          复制分享链接
        </MenuItemComponent>
        <Divider />
        <MenuItemComponent 
          onClick={() => handleDeleteShare(menuReport?.id)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          停止分享
        </MenuItemComponent>
      </Menu>

      {/* 分享设置对话框 */}
      <Dialog
        open={openShareDialog}
        onClose={() => setOpenShareDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          分享设置 - {selectedReport?.fileName}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>可见性</InputLabel>
              <Select
                value={shareSettings.visibility}
                onChange={(e) => setShareSettings({ ...shareSettings, visibility: e.target.value })}
                label="可见性"
              >
                <MenuItem value="private">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LockIcon sx={{ mr: 1 }} />
                    私有 - 仅指定用户可访问
                  </Box>
                </MenuItem>
                <MenuItem value="public">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PublicIcon sx={{ mr: 1 }} />
                    公开 - 任何人都可访问
                  </Box>
                </MenuItem>
              </Select>
            </FormControl>

            {shareSettings.visibility === 'private' && (
              <TextField
                fullWidth
                label="分享给 (邮箱地址，用逗号分隔)"
                value={shareSettings.emails}
                onChange={(e) => setShareSettings({ ...shareSettings, emails: e.target.value })}
                placeholder="user1@example.com, user2@example.com"
                sx={{ mb: 2 }}
              />
            )}

            <TextField
              fullWidth
              label="访问密码 (可选)"
              type="password"
              value={shareSettings.password}
              onChange={(e) => setShareSettings({ ...shareSettings, password: e.target.value })}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="到期日期 (可选)"
              type="date"
              value={shareSettings.expiryDate}
              onChange={(e) => setShareSettings({ ...shareSettings, expiryDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />

            <Alert severity="info" sx={{ mt: 2 }}>
              分享链接将允许其他人查看此扫描报告的详细信息。
            </Alert>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShareDialog(false)}>
            取消
          </Button>
          <Button
            onClick={handleSaveShare}
            variant="contained"
          >
            保存设置
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default SharedReports;