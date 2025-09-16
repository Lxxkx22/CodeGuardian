import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Divider,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Avatar,
  IconButton,
  Tabs,
  Tab,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import {
  PhotoCamera as PhotoCameraIcon,
  Save as SaveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
};

const Settings = () => {
  const [tabValue, setTabValue] = useState(0);
  const [profileSaved, setProfileSaved] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // 用户配置文件表单状态
  const [profileForm, setProfileForm] = useState({
    name: 'Alex Chen',
    email: 'alex.chen@university.edu',
    institution: '计算机科学与工程学院',
    bio: '计算机科学专业大三学生，对软件安全和代码质量充满热情。',
  });
  
  // 通知设置状态
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    scanCompleted: true,
    weeklyDigest: true,
    securityUpdates: true,
    marketingEmails: false,
  });
  
  // 密码更改表单状态
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleProfileChange = (e) => {
    setProfileForm({
      ...profileForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleNotificationChange = (e) => {
    setNotifications({
      ...notifications,
      [e.target.name]: e.target.checked,
    });
  };
  
  const handlePasswordChange = (e) => {
    setPasswordForm({
      ...passwordForm,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // 模拟保存个人资料
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };
  
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    // 模拟密码更改
    alert('密码已更改');
    setPasswordForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };
  
  const handleDeleteAccount = () => {
    // 模拟账户删除
    alert('账户已删除');
    setDeleteDialogOpen(false);
  };
  
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        设置
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="设置选项卡">
            <Tab label="个人资料" />
            <Tab label="通知" />
            <Tab label="账户" />
          </Tabs>
        </Box>
        
        {/* 个人资料选项卡 */}
        <TabPanel value={tabValue} index={0}>
          {profileSaved && (
            <Alert severity="success" sx={{ mb: 3 }}>
              个人资料已保存成功！
            </Alert>
          )}
          
          <form onSubmit={handleProfileSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar
                  src="/avatar-placeholder.jpg"
                  sx={{ width: 120, height: 120, mb: 2 }}
                />
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="avatar-upload"
                  type="file"
                />
                <label htmlFor="avatar-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCameraIcon />}
                  >
                    更换头像
                  </Button>
                </label>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="姓名"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="电子邮箱"
                      name="email"
                      type="email"
                      value={profileForm.email}
                      onChange={handleProfileChange}
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="学院/机构"
                      name="institution"
                      value={profileForm.institution}
                      onChange={handleProfileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="个人简介"
                      name="bio"
                      value={profileForm.bio}
                      onChange={handleProfileChange}
                      multiline
                      rows={4}
                    />
                  </Grid>
                </Grid>
              </Grid>
              
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                >
                  保存更改
                </Button>
              </Grid>
            </Grid>
          </form>
        </TabPanel>
        
        {/* 通知选项卡 */}
        <TabPanel value={tabValue} index={1}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              电子邮件通知
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.emailNotifications}
                  onChange={handleNotificationChange}
                  name="emailNotifications"
                  color="primary"
                />
              }
              label="启用电子邮件通知"
            />
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              控制是否接收任何电子邮件通知。关闭此选项将禁用所有电子邮件通知。
            </Typography>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Typography variant="h6" gutterBottom>
              通知类型
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              选择您希望接收的通知类型。
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.scanCompleted}
                  onChange={handleNotificationChange}
                  name="scanCompleted"
                  color="primary"
                  disabled={!notifications.emailNotifications}
                />
              }
              label="扫描完成通知"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
              当您的代码扫描完成时接收通知。
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.weeklyDigest}
                  onChange={handleNotificationChange}
                  name="weeklyDigest"
                  color="primary"
                  disabled={!notifications.emailNotifications}
                />
              }
              label="每周摘要"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
              接收每周学习进度和安全提示摘要。
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.securityUpdates}
                  onChange={handleNotificationChange}
                  name="securityUpdates"
                  color="primary"
                  disabled={!notifications.emailNotifications}
                />
              }
              label="安全更新"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
              接收关于新发现的安全漏洞和最佳实践的更新。
            </Typography>
            
            <FormControlLabel
              control={
                <Switch
                  checked={notifications.marketingEmails}
                  onChange={handleNotificationChange}
                  name="marketingEmails"
                  color="primary"
                  disabled={!notifications.emailNotifications}
                />
              }
              label="营销邮件"
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 4, mb: 2 }}>
              接收关于新功能、活动和促销的信息。
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
            >
              保存通知设置
            </Button>
          </Box>
        </TabPanel>
        
        {/* 账户选项卡 */}
        <TabPanel value={tabValue} index={2}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              更改密码
            </Typography>
            <form onSubmit={handlePasswordSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="当前密码"
                    name="currentPassword"
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="新密码"
                    name="newPassword"
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    required
                    helperText="密码必须至少包含8个字符，包括大小写字母、数字和特殊字符"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="确认新密码"
                    name="confirmPassword"
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    required
                    error={passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword !== ''}
                    helperText={passwordForm.newPassword !== passwordForm.confirmPassword && passwordForm.confirmPassword !== '' ? '密码不匹配' : ''}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    更改密码
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Box>
            <Typography variant="h6" color="error" gutterBottom>
              危险区域
            </Typography>
            <Typography variant="body2" paragraph>
              删除您的账户将永久移除所有与您账户相关的数据，包括扫描历史和个人信息。此操作无法撤销。
            </Typography>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteIcon />}
              onClick={() => setDeleteDialogOpen(true)}
            >
              删除我的账户
            </Button>
            
            <Dialog
              open={deleteDialogOpen}
              onClose={() => setDeleteDialogOpen(false)}
              aria-labelledby="delete-account-dialog-title"
            >
              <DialogTitle id="delete-account-dialog-title">
                确认删除账户?
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  此操作将永久删除您的账户和所有相关数据。此操作无法撤销。请输入您的密码以确认删除。
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  label="密码"
                  type="password"
                  fullWidth
                  variant="standard"
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => setDeleteDialogOpen(false)}>
                  取消
                </Button>
                <Button onClick={handleDeleteAccount} color="error">
                  确认删除
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </TabPanel>
      </Card>
    </Box>
  );
};

export default Settings;