import React, { useState, useEffect } from 'react';
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
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
  Alert,
  Fab,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  FileCopy as FileCopyIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Code as CodeIcon,
  Memory as MemoryIcon,
  BugReport as BugReportIcon,
} from '@mui/icons-material';
import { CardGridSkeleton } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageError } from '../../components/ErrorMessage/ErrorMessage';

const RuleSets = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ruleSets, setRuleSets] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingRuleSet, setEditingRuleSet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'security',
    rules: []
  });

  // 模拟规则集数据
  const mockRuleSets = [
    {
      id: '1',
      name: '作业5-字符串安全',
      description: '专门针对字符串处理安全问题的规则集，包含缓冲区溢出、格式化字符串等检查',
      category: 'security',
      rulesCount: 12,
      isActive: true,
      isDefault: true,
      lastModified: '2024-07-15',
      rules: [
        { id: 'r1', name: '缓冲区溢出检查', enabled: true, severity: 'high' },
        { id: 'r2', name: '格式化字符串漏洞', enabled: true, severity: 'high' },
        { id: 'r3', name: '字符串长度验证', enabled: true, severity: 'medium' },
      ]
    },
    {
      id: '2',
      name: '指针安全检查',
      description: '检查指针使用相关的安全问题，包括空指针解引用、野指针等',
      category: 'memory',
      rulesCount: 8,
      isActive: true,
      isDefault: false,
      lastModified: '2024-07-10',
      rules: [
        { id: 'r4', name: '空指针检查', enabled: true, severity: 'high' },
        { id: 'r5', name: '野指针检测', enabled: true, severity: 'medium' },
      ]
    },
    {
      id: '3',
      name: '内存管理规范',
      description: '内存分配和释放的最佳实践检查',
      category: 'memory',
      rulesCount: 15,
      isActive: false,
      isDefault: false,
      lastModified: '2024-07-05',
      rules: [
        { id: 'r6', name: '内存泄漏检查', enabled: true, severity: 'medium' },
        { id: 'r7', name: '双重释放检测', enabled: true, severity: 'high' },
      ]
    }
  ];

  // 可用规则库
  const availableRules = [
    { id: 'r1', name: '缓冲区溢出检查', category: 'security', severity: 'high', description: '检测可能导致缓冲区溢出的代码模式' },
    { id: 'r2', name: '格式化字符串漏洞', category: 'security', severity: 'high', description: '检测格式化字符串相关的安全漏洞' },
    { id: 'r3', name: '字符串长度验证', category: 'security', severity: 'medium', description: '验证字符串操作的长度检查' },
    { id: 'r4', name: '空指针检查', category: 'memory', severity: 'high', description: '检测可能的空指针解引用' },
    { id: 'r5', name: '野指针检测', category: 'memory', severity: 'medium', description: '检测未初始化或已释放的指针使用' },
    { id: 'r6', name: '内存泄漏检查', category: 'memory', severity: 'medium', description: '检测可能的内存泄漏' },
    { id: 'r7', name: '双重释放检测', category: 'memory', severity: 'high', description: '检测重复释放内存的问题' },
    { id: 'r8', name: '整数溢出检查', category: 'logic', severity: 'medium', description: '检测整数运算溢出' },
  ];

  useEffect(() => {
    const loadRuleSets = async () => {
      try {
        setLoading(true);
        // 模拟API调用
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRuleSets(mockRuleSets);
        setError(null);
      } catch (err) {
        setError('加载规则集失败');
      } finally {
        setLoading(false);
      }
    };

    loadRuleSets();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    setTimeout(() => {
      setRuleSets(mockRuleSets);
      setLoading(false);
    }, 1000);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'security': return <SecurityIcon />;
      case 'memory': return <MemoryIcon />;
      case 'logic': return <CodeIcon />;
      default: return <BugReportIcon />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'security': return 'error';
      case 'memory': return 'warning';
      case 'logic': return 'info';
      default: return 'default';
    }
  };

  const handleCreateNew = () => {
    setEditingRuleSet(null);
    setFormData({
      name: '',
      description: '',
      category: 'security',
      rules: []
    });
    setOpenDialog(true);
  };

  const handleEdit = (ruleSet) => {
    setEditingRuleSet(ruleSet);
    setFormData({
      name: ruleSet.name,
      description: ruleSet.description,
      category: ruleSet.category,
      rules: ruleSet.rules
    });
    setOpenDialog(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('确定要删除这个规则集吗？')) {
      setRuleSets(ruleSets.filter(rs => rs.id !== id));
    }
  };

  const handleDuplicate = (ruleSet) => {
    const newRuleSet = {
      ...ruleSet,
      id: Date.now().toString(),
      name: ruleSet.name + ' (副本)',
      isDefault: false,
      lastModified: new Date().toISOString().split('T')[0]
    };
    setRuleSets([...ruleSets, newRuleSet]);
  };

  const handleToggleActive = (id) => {
    setRuleSets(ruleSets.map(rs => 
      rs.id === id ? { ...rs, isActive: !rs.isActive } : rs
    ));
  };

  const handleSave = () => {
    if (editingRuleSet) {
      // 编辑现有规则集
      setRuleSets(ruleSets.map(rs => 
        rs.id === editingRuleSet.id 
          ? { 
              ...rs, 
              ...formData, 
              rulesCount: formData.rules.length,
              lastModified: new Date().toISOString().split('T')[0]
            }
          : rs
      ));
    } else {
      // 创建新规则集
      const newRuleSet = {
        id: Date.now().toString(),
        ...formData,
        rulesCount: formData.rules.length,
        isActive: true,
        isDefault: false,
        lastModified: new Date().toISOString().split('T')[0]
      };
      setRuleSets([...ruleSets, newRuleSet]);
    }
    setOpenDialog(false);
  };

  const handleRuleToggle = (ruleId) => {
    setFormData({
      ...formData,
      rules: formData.rules.map(rule =>
        rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule
      )
    });
  };

  const handleAddRule = (rule) => {
    if (!formData.rules.find(r => r.id === rule.id)) {
      setFormData({
        ...formData,
        rules: [...formData.rules, { ...rule, enabled: true }]
      });
    }
  };

  const handleRemoveRule = (ruleId) => {
    setFormData({
      ...formData,
      rules: formData.rules.filter(rule => rule.id !== ruleId)
    });
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h1" gutterBottom>
          规则集管理
        </Typography>
        <CardGridSkeleton count={6} columns={3} />
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
    <Box>
      <Typography variant="h1" gutterBottom>
        规则集管理
      </Typography>
      
      <Card 
        sx={{ 
          p: 3,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h2">
            规则集列表
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
          >
            创建规则集
          </Button>
        </Box>

      {ruleSets.length === 0 ? (
        // 空状态
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <Box sx={{ fontSize: 80, mb: 3 }}>
            📝✅
          </Box>
          <Typography variant="h4" gutterBottom>
            还没有规则集
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 500 }}>
            规则集是一组检查规则的集合，用于定制化的代码安全扫描。创建您的第一个规则集来开始使用。
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AddIcon />}
            onClick={handleCreateNew}
          >
            创建第一个规则集
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {ruleSets.map((ruleSet) => (
            <Grid item xs={12} md={6} lg={4} key={ruleSet.id}>
              <Card 
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  opacity: ruleSet.isActive ? 1 : 0.7
                }}
              >
                <CardContent sx={{ flex: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    {getCategoryIcon(ruleSet.category)}
                    <Typography variant="h3" sx={{ ml: 1, flex: 1 }}>
                      {ruleSet.name}
                    </Typography>
                    {ruleSet.isDefault && (
                      <Chip label="默认" size="small" color="primary" />
                    )}
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {ruleSet.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                    <Chip
                      label={ruleSet.category === 'security' ? '安全' : 
                            ruleSet.category === 'memory' ? '内存' : '逻辑'}
                      size="small"
                      color={getCategoryColor(ruleSet.category)}
                      variant="outlined"
                    />
                    <Chip
                      label={`${ruleSet.rulesCount} 条规则`}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  
                  <Typography variant="caption" color="text.secondary">
                    最后修改: {ruleSet.lastModified}
                  </Typography>
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(ruleSet)}
                      title="编辑"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDuplicate(ruleSet)}
                      title="复制"
                    >
                      <FileCopyIcon />
                    </IconButton>
                    {!ruleSet.isDefault && (
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(ruleSet.id)}
                        title="删除"
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </Box>
                  
                  <Switch
                    checked={ruleSet.isActive}
                    onChange={() => handleToggleActive(ruleSet.id)}
                    size="small"
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      </Card>

      {/* 创建/编辑规则集对话框 */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {editingRuleSet ? '编辑规则集' : '创建规则集'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 1 }}>
            <TextField
              fullWidth
              label="规则集名称"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <TextField
              fullWidth
              label="描述"
              multiline
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>类别</InputLabel>
              <Select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                label="类别"
              >
                <MenuItem value="security">安全</MenuItem>
                <MenuItem value="memory">内存</MenuItem>
                <MenuItem value="logic">逻辑</MenuItem>
              </Select>
            </FormControl>
            
            <Typography variant="h6" gutterBottom>
              规则配置
            </Typography>
            
            {/* 已选择的规则 */}
            {formData.rules.length > 0 && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" gutterBottom>
                  已选择的规则 ({formData.rules.length})
                </Typography>
                <List dense>
                  {formData.rules.map((rule) => (
                    <ListItem key={rule.id}>
                      <ListItemText
                        primary={rule.name}
                        secondary={`严重性: ${rule.severity}`}
                      />
                      <ListItemSecondaryAction>
                        <Switch
                          checked={rule.enabled}
                          onChange={() => handleRuleToggle(rule.id)}
                          size="small"
                        />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveRule(rule.id)}
                          color="error"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 2 }} />
              </Box>
            )}
            
            {/* 可用规则 */}
            <Typography variant="subtitle2" gutterBottom>
              可用规则
            </Typography>
            <List dense sx={{ maxHeight: 200, overflow: 'auto' }}>
              {availableRules
                .filter(rule => !formData.rules.find(r => r.id === rule.id))
                .map((rule) => (
                  <ListItem key={rule.id}>
                    <ListItemText
                      primary={rule.name}
                      secondary={rule.description}
                    />
                    <ListItemSecondaryAction>
                      <Button
                        size="small"
                        onClick={() => handleAddRule(rule)}
                      >
                        添加
                      </Button>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>
            取消
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!formData.name.trim()}
          >
            {editingRuleSet ? '保存' : '创建'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default RuleSets;