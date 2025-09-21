import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  InputLabel,
  Alert,
  LinearProgress,
  Paper,
} from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

// 步骤组件：上传代码
const UploadStep = ({ files, setFiles, onNext }) => {
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState([]);
  const [warnings, setWarnings] = useState([]);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    // 检查文件类型
    const validExtensions = ['.c', '.cpp', '.h', '.zip'];
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!validExtensions.includes(fileExtension)) {
      return { valid: false, error: '文件类型不支持' };
    }
    
    // 检查文件大小 (10MB 限制)
    if (file.size > 10 * 1024 * 1024) {
      return { valid: false, error: '文件超过 10MB 上限' };
    }
    
    // 如果是 zip 文件，模拟检查内部文件类型
    if (fileExtension === '.zip') {
      // 这里只是模拟，实际应用中需要真正解析 zip 文件
      const hasNonCodeFiles = Math.random() > 0.5; // 随机模拟是否有非代码文件
      if (hasNonCodeFiles) {
        return { 
          valid: true, 
          warning: '压缩包中的部分非代码文件 (如 .jpg, .docx) 已被忽略。' 
        };
      }
    }
    
    return { valid: true };
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList) => {
    const newFiles = [];
    const newErrors = [];
    const newWarnings = [];
    
    Array.from(fileList).forEach((file) => {
      const validation = validateFile(file);
      
      if (validation.valid) {
        newFiles.push(file);
        if (validation.warning) {
          newWarnings.push({ file: file.name, message: validation.warning });
        }
      } else {
        newErrors.push({ file: file.name, message: validation.error });
      }
    });
    
    setFiles([...files, ...newFiles]);
    setErrors([...errors, ...newErrors]);
    setWarnings([...warnings, ...newWarnings]);
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const isNextDisabled = files.length === 0 || errors.length > 0;

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        上传你的代码
      </Typography>
      
      {/* 拖放上传区域 */}
      <Box
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        sx={{
          border: '2px dashed',
          borderColor: dragActive ? 'primary.main' : 'grey.300',
          borderRadius: 2,
          p: 6,
          textAlign: 'center',
          bgcolor: dragActive ? 'action.hover' : 'background.paper',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          mb: 3,
        }}
        onClick={() => document.getElementById('file-upload').click()}
      >
        <input
          id="file-upload"
          type="file"
          multiple
          onChange={handleChange}
          accept=".c,.cpp,.h,.zip"
          style={{ display: 'none' }}
        />
        <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
        <Typography variant="h6" gutterBottom>
          拖拽 .c, .cpp, .h 文件或一个 .zip 包到这里
        </Typography>
        <Typography variant="body2" color="text.secondary">
          或点击选择文件
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1 }}>
          最大 10MB
        </Typography>
      </Box>

      {/* 错误提示 */}
      {errors.length > 0 && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errors.map((error, index) => (
            <Typography key={index} variant="body2">
              {error.file}: {error.message}
            </Typography>
          ))}
        </Alert>
      )}

      {/* 警告提示 */}
      {warnings.length > 0 && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {warnings.map((warning, index) => (
            <Typography key={index} variant="body2">
              {warning.message}
            </Typography>
          ))}
        </Alert>
      )}

      {/* 文件列表 */}
      {files.length > 0 && (
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            已上传文件:
          </Typography>
          <Paper variant="outlined" sx={{ p: 2 }}>
            {files.map((file, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 1,
                  borderBottom: index < files.length - 1 ? '1px solid' : 'none',
                  borderColor: 'divider',
                }}
              >
                <Typography variant="body2">{file.name}</Typography>
                <Button size="small" color="error" onClick={() => removeFile(index)}>
                  移除
                </Button>
              </Box>
            ))}
          </Paper>
        </Box>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={isNextDisabled}
        >
          下一步
        </Button>
      </Box>
    </Box>
  );
};

// 步骤组件：选择扫描模式
const ScanModeStep = ({ scanMode, setScanMode, ruleSet, setRuleSet, onBack, onNext }) => {
  // 模拟可用的规则集
  const availableRuleSets = [
    { id: '1', name: '作业5-字符串安全' },
    { id: '2', name: '指针安全检查' },
    { id: '3', name: '内存管理规范' },
  ];

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        选择扫描模式
      </Typography>
      
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <RadioGroup
          value={scanMode}
          onChange={(e) => setScanMode(e.target.value)}
        >
          <Card 
            sx={{
              mb: 2,
              border: scanMode === 'quick' ? '2px solid' : '1px solid',
              borderColor: scanMode === 'quick' ? 'primary.main' : 'divider',
            }}
          >
            <CardContent>
              <FormControlLabel
                value="quick"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="h6">🚀 快速检查</Typography>
                    <Typography variant="body2" color="text.secondary">
                      专注于最常见和高风险的漏洞，通常在1分钟内完成。
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
          
          <Card 
            sx={{
              mb: 2,
              border: scanMode === 'comprehensive' ? '2px solid' : '1px solid',
              borderColor: scanMode === 'comprehensive' ? 'primary.main' : 'divider',
            }}
          >
            <CardContent>
              <FormControlLabel
                value="comprehensive"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="h6">🔍 全面扫描</Typography>
                    <Typography variant="body2" color="text.secondary">
                      进行更深入的分析，可能需要几分钟时间。
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>
          
          <Card 
            sx={{
              mb: 2,
              border: scanMode === 'educational' ? '2px solid' : '1px solid',
              borderColor: scanMode === 'educational' ? 'primary.main' : 'divider',
            }}
          >
            <CardContent>
              <FormControlLabel
                value="educational"
                control={<Radio />}
                label={
                  <Box>
                    <Typography variant="h6">👨‍🏫 教学模式</Typography>
                    <Typography variant="body2" color="text.secondary">
                      使用你的老师指定的规则集进行检查。
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
            
            {scanMode === 'educational' && (
              <Box sx={{ pl: 4, pr: 4, pb: 2 }}>
                <FormControl fullWidth size="small">
                  <InputLabel id="ruleset-select-label">选择规则集</InputLabel>
                  <Select
                    labelId="ruleset-select-label"
                    value={ruleSet}
                    label="选择规则集"
                    onChange={(e) => setRuleSet(e.target.value)}
                  >
                    {availableRuleSets.map((rs) => (
                      <MenuItem key={rs.id} value={rs.id}>
                        {rs.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            )}
          </Card>
        </RadioGroup>
      </FormControl>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <Button onClick={onBack}>上一步</Button>
        <Button
          variant="contained"
          onClick={onNext}
          disabled={scanMode === 'educational' && !ruleSet}
        >
          开始扫描
        </Button>
      </Box>
    </Box>
  );
};

// 步骤组件：扫描中
const ScanningStep = () => {
  const [progress, setProgress] = useState(0);

  // 模拟进度更新
  useState(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          return 100;
        }
        const diff = Math.random() * 10;
        return Math.min(prevProgress + diff, 100);
      });
    }, 800);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Box
        sx={{
          width: '150px',
          height: '150px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        {/* 这里可以放置一个 Lottie 动画，现在用一个简单的占位符 */}
        <Box
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '4px solid',
            borderColor: 'primary.main',
            borderTopColor: 'transparent',
            animation: 'spin 1s linear infinite',
            '@keyframes spin': {
              '0%': {
                transform: 'rotate(0deg)',
              },
              '100%': {
                transform: 'rotate(360deg)',
              },
            },
          }}
        />
      </Box>
      
      <Typography variant="h2" gutterBottom>
        正在分析您的代码...
      </Typography>
      
      <Box sx={{ width: '100%', mt: 4 }}>
        <LinearProgress variant="determinate" value={progress} />
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {Math.round(progress)}%
        </Typography>
      </Box>
    </Box>
  );
};

const NewScan = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [files, setFiles] = useState([]);
  const [scanMode, setScanMode] = useState('quick');
  const [ruleSet, setRuleSet] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const steps = ['上传代码', '选择扫描模式', '扫描中'];

  const handleNext = () => {
    if (activeStep === 1) {
      // 开始扫描，模拟扫描过程
      setIsScanning(true);
      setTimeout(() => {
        // 扫描完成后跳转到报告页面
        navigate('/reports/new-report-id');
      }, 5000); // 5秒后跳转，模拟扫描过程
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  return (
    <Box>
      <Typography variant="h1" gutterBottom>
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ p: 4 }}>
          {activeStep === 0 && (
            <UploadStep
              files={files}
              setFiles={setFiles}
              onNext={handleNext}
            />
          )}
          
          {activeStep === 1 && (
            <ScanModeStep
              scanMode={scanMode}
              setScanMode={setScanMode}
              ruleSet={ruleSet}
              setRuleSet={setRuleSet}
              onBack={handleBack}
              onNext={handleNext}
            />
          )}
          
          {activeStep === 2 && <ScanningStep />}
        </Box>
      </Box>
    </Box>
  );
};

export default NewScan;