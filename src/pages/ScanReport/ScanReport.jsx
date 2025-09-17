import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
  Collapse,
  Divider,
  Button,
  Link,
  Popover,
  TextField,
  IconButton,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import {
  Share as ShareIcon,
  ContentCopy as ContentCopyIcon,
  CheckCircle as CheckCircleIcon,
  Security as SecurityIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
} from '@mui/icons-material';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { ReportDetailSkeleton } from '../../components/LoadingSpinner/LoadingSpinner';
import { PageError, ScanFailedError } from '../../components/ErrorMessage/ErrorMessage';

// 注册 Chart.js 组件
ChartJS.register(ArcElement, Tooltip, Legend);

// 代码浏览器组件
const CodeViewer = ({ code, highlightedLine }) => {
  return (
    <Box
      sx={{
        fontFamily: 'code',
        fontSize: '14px',
        bgcolor: '#f5f5f5',
        p: 2,
        borderRadius: 1,
        overflow: 'auto',
        maxHeight: '400px',
      }}
    >
      <pre style={{ margin: 0 }}>
        {code.split('\n').map((line, index) => (
          <Box
            component="div"
            key={index}
            sx={{
              display: 'flex',
              bgcolor: index + 1 === highlightedLine ? 'rgba(231, 76, 60, 0.1)' : 'transparent',
              p: 0.5,
              borderRadius: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                color: 'text.disabled',
                width: '30px',
                textAlign: 'right',
                mr: 2,
                userSelect: 'none',
              }}
            >
              {index + 1}
            </Box>
            <Box component="span" sx={{ flex: 1 }}>
              {line || ' '}
            </Box>
          </Box>
        ))}
      </pre>
    </Box>
  );
};

// 详细问题视图组件
const IssueDetail = ({ issue }) => {
  return (
    <Box sx={{ mt: 3, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
      <Grid container spacing={3}>
        {/* 左侧: 代码浏览器 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h6" gutterBottom>
            问题代码
          </Typography>
          <CodeViewer code={issue.code} highlightedLine={issue.line} />
        </Grid>
        
        {/* 右侧: 教育内容 */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom>
            {issue.type} (CWE-{issue.cwe})
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              🤔 这是什么意思?
            </Typography>
            <Typography variant="body1">
              {issue.plain_explanation}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              💥 为何是个问题?
            </Typography>
            <Typography variant="body1">
              {issue.why_is_it_a_problem}
            </Typography>
          </Box>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              🔧 如何修复?
            </Typography>
            <Typography variant="body1" gutterBottom>
              {issue.how_to_fix.description}
            </Typography>
            
            <Box sx={{ mt: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
              <Box sx={{ p: 2, bgcolor: '#ffebee' }}>
                <Typography variant="subtitle2" color="error" gutterBottom>
                  ❌ 错误代码
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    fontFamily: 'code',
                    fontSize: '14px',
                    m: 0,
                    p: 1,
                    bgcolor: '#f8f8f8',
                    borderRadius: 1,
                    overflow: 'auto',
                  }}
                >
                  {issue.how_to_fix.bad_code}
                </Box>
              </Box>
              
              <Box sx={{ p: 2, bgcolor: '#e8f5e9' }}>
                <Typography variant="subtitle2" color="success.main" gutterBottom>
                  ✅ 正确代码
                </Typography>
                <Box
                  component="pre"
                  sx={{
                    fontFamily: 'code',
                    fontSize: '14px',
                    m: 0,
                    p: 1,
                    bgcolor: '#f8f8f8',
                    borderRadius: 1,
                    overflow: 'auto',
                  }}
                >
                  {issue.how_to_fix.good_code}
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Box>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              📚 深入学习
            </Typography>
            <Box component="ul" sx={{ pl: 2 }}>
              {issue.learn_more_links.map((link, index) => (
                <Box component="li" key={index} sx={{ mb: 1 }}>
                  <Link href={link.url} target="_blank" rel="noopener">
                    {link.title}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const ScanReport = () => {
  const { reportId } = useParams();
  const [selectedIssue, setSelectedIssue] = useState(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const [copied, setCopied] = useState(false);
  const [showName, setShowName] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [scanFailed, setScanFailed] = useState(false);
  
  // 模拟数据加载
  useEffect(() => {
    const loadReport = async () => {
      try {
        setLoading(true);
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // 模拟扫描失败的情况（10%概率）
        if (Math.random() < 0.1) {
          setScanFailed(true);
          return;
        }
        
        setError(null);
        setScanFailed(false);
      } catch (err) {
        setError('加载报告失败');
      } finally {
        setLoading(false);
      }
    };
    
    loadReport();
  }, [reportId]);

  const handleRetry = () => {
    setError(null);
    setScanFailed(false);
    setLoading(true);
    // 重新加载数据
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleGoHome = () => {
    window.location.href = '/dashboard';
  };

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <ReportDetailSkeleton />
      </Box>
    );
  }

  if (scanFailed) {
    return (
      <ScanFailedError
        onRetry={handleRetry}
        onGoHome={handleGoHome}
      />
    );
  }

  if (error) {
    return (
      <PageError
        title="报告加载失败"
        message={error}
        onRetry={handleRetry}
      />
    );
  }
  
  // 模拟报告数据
  const report = {
    id: reportId,
    fileName: 'assignment5.zip',
    scanDate: '2024-07-20 14:30',
    scanMode: '快速检查',
    riskScore: 43,
    issues: [
      {
        id: '1',
        severity: 'high',
        type: '缓冲区溢出',
        cwe: '120',
        location: 'src/utils.cpp',
        line: 42,
        code: `#include <stdio.h>
#include <string.h>

void process_input(char *input) {
  char buffer[10];
  strcpy(buffer, input); // 危险操作，没有检查输入长度
  printf("处理结果: %s\n", buffer);
}

int main() {
  char *user_input = "这是一个非常长的输入字符串，会导致缓冲区溢出";
  process_input(user_input);
  return 0;
}`,
        plain_explanation: '缓冲区溢出是指程序试图向缓冲区写入超过其容量的数据，导致数据溢出到相邻的内存区域。在这个例子中，程序使用 strcpy() 函数将用户输入复制到一个固定大小的缓冲区，但没有检查输入的长度是否超过缓冲区的大小。',
        why_is_it_a_problem: '当缓冲区溢出发生时，超出缓冲区的数据会覆盖相邻的内存区域，可能破坏程序的其他变量、返回地址或函数指针。攻击者可以利用这个漏洞执行任意代码，导致程序崩溃、数据泄露或完全控制系统。这是一个严重的安全漏洞，被广泛用于各种攻击中。',
        how_to_fix: {
          description: '使用安全的字符串处理函数，如 strncpy()，并始终检查输入长度。更好的做法是使用现代 C++ 的 std::string 或其他安全的字符串处理库。',
          bad_code: 'char buffer[10];\nstrcpy(buffer, input); // 危险',
          good_code: 'char buffer[10];\nstrncpy(buffer, input, sizeof(buffer) - 1);\nbuffer[sizeof(buffer) - 1] = \'\\0\'; // 确保字符串正确终止',
        },
        learn_more_links: [
          { title: 'CWE-120: 经典缓冲区溢出漏洞', url: 'https://cwe.mitre.org/data/definitions/120.html' },
          { title: '安全的 C/C++ 字符串处理', url: 'https://example.com/secure-string-handling' },
        ],
      },
      {
        id: '2',
        severity: 'medium',
        type: '格式化字符串漏洞',
        cwe: '134',
        location: 'src/logger.cpp',
        line: 27,
        code: `#include <stdio.h>

void log_message(const char *message) {
  printf(message); // 危险：直接将用户输入作为格式化字符串
}

int main() {
  char *user_input = "%s%s%s%s%s%s%s%s";
  log_message(user_input);
  return 0;
}`,
        plain_explanation: '格式化字符串漏洞是指程序将用户可控的输入直接用作 printf() 等函数的格式化字符串参数，而不是作为格式化字符串的参数。',
        why_is_it_a_problem: '当攻击者能够控制格式化字符串时，他们可以使用特殊的格式说明符（如 %s、%x、%n）来读取栈上的数据、泄露内存内容，甚至写入任意内存地址。这可能导致信息泄露、程序崩溃或远程代码执行。',
        how_to_fix: {
          description: '始终使用固定的格式化字符串，并将用户输入作为参数传递。',
          bad_code: 'printf(message); // 危险',
          good_code: 'printf("%s", message); // 安全',
        },
        learn_more_links: [
          { title: 'CWE-134: 格式化字符串漏洞', url: 'https://cwe.mitre.org/data/definitions/134.html' },
          { title: '格式化字符串攻击的防御', url: 'https://example.com/format-string-defense' },
        ],
      },
      {
        id: '3',
        severity: 'medium',
        type: '整数溢出',
        cwe: '190',
        location: 'src/memory.cpp',
        line: 15,
        // 其他详细信息...
      },
      {
        id: '4',
        severity: 'medium',
        type: '空指针解引用',
        cwe: '476',
        location: 'src/parser.cpp',
        line: 89,
        // 其他详细信息...
      },
      {
        id: '5',
        severity: 'low',
        type: '资源泄漏',
        cwe: '772',
        location: 'src/file_handler.cpp',
        line: 53,
        // 其他详细信息...
      },
    ],
  };

  // 计算问题分布
  const issueCounts = {
    high: report.issues.filter(issue => issue.severity === 'high').length,
    medium: report.issues.filter(issue => issue.severity === 'medium').length,
    low: report.issues.filter(issue => issue.severity === 'low').length,
  };

  // 甜甜圈图数据
  const chartData = {
    labels: ['高危', '中危', '低危'],
    datasets: [
      {
        data: [issueCounts.high, issueCounts.medium, issueCounts.low],
        backgroundColor: ['#E74C3C', '#F39C12', '#3498DB'],
        hoverBackgroundColor: ['#C0392B', '#D35400', '#2980B9'],
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    cutout: '70%',
  };

  const handleIssueClick = (issue) => {
    setSelectedIssue(selectedIssue && selectedIssue.id === issue.id ? null : issue);
  };

  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
    setCopied(false);
  };

  const handleCopyLink = () => {
    const shareUrl = `https://codeguardian.edu/shared-report/${report.id}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOpen = Boolean(shareAnchorEl);

  // 空状态 - 没有发现问题
  const renderEmptyState = () => (
    <Box>
      {/* 成功状态卡片 */}
      <Card sx={{ p: 4, mb: 4, textAlign: 'center', bgcolor: 'success.light', color: 'success.contrastText' }}>
        <CheckCircleIcon sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h2" gutterBottom>
          太棒了！代码安全检查通过
        </Typography>
        <Typography variant="h6" paragraph>
          我们没有在您的代码中发现任何已知的安全问题。请继续保持良好的编码习惯！
        </Typography>
      </Card>

      {/* 统计信息网格 */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <SecurityIcon sx={{ fontSize: 48, color: 'success.main', mb: 2 }} />
            <Typography variant="h4" color="success.main" gutterBottom>
              0
            </Typography>
            <Typography variant="h6" color="text.secondary">
              安全问题
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              未发现任何安全漏洞
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <TrendingUpIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
            <Typography variant="h4" color="primary.main" gutterBottom>
              100%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              安全评分
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              代码质量优秀
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ p: 3, textAlign: 'center', height: '100%' }}>
            <SchoolIcon sx={{ fontSize: 48, color: 'info.main', mb: 2 }} />
            <Typography variant="h4" color="info.main" gutterBottom>
              A+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              安全等级
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              符合最佳实践
            </Typography>
          </Card>
        </Grid>
      </Grid>

      {/* 建议和下一步 */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="primary.main">
              🎉 恭喜您！
            </Typography>
            <Typography variant="body1" paragraph>
              您的代码通过了我们的安全检查，这表明您在编写安全代码方面做得很好。
            </Typography>
            <Typography variant="body2" color="text.secondary">
              • 没有发现缓冲区溢出漏洞<br/>
              • 没有发现SQL注入风险<br/>
              • 没有发现跨站脚本攻击漏洞<br/>
              • 输入验证处理得当<br/>
              • 内存管理安全
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom color="info.main">
              💡 继续提升
            </Typography>
            <Typography variant="body1" paragraph>
              虽然没有发现问题，但您可以继续学习更多安全编程知识：
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
                onClick={() => window.open('/learn', '_blank')}
              >
                学习资源
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mr: 1, mb: 1 }}
              >
                安全挑战
              </Button>
              <Button 
                variant="outlined" 
                size="small" 
                sx={{ mb: 1 }}
              >
                最佳实践
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box>
      {/* 报告头 */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h1" gutterBottom>
            {report.fileName} 的安全报告
          </Typography>
          <Typography variant="body2" color="text.secondary">
            扫描于: {report.scanDate} | 模式: {report.scanMode}
          </Typography>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ShareIcon />}
          onClick={handleShareClick}
        >
          分享
        </Button>
        <Popover
          open={shareOpen}
          anchorEl={shareAnchorEl}
          onClose={handleShareClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <Box sx={{ p: 3, maxWidth: 400 }}>
            <Typography variant="h6" gutterBottom>
              分享报告
            </Typography>
            <Typography variant="body2" paragraph>
              任何人都可以通过此链接查看这份只读报告。
            </Typography>
            <Box sx={{ display: 'flex', mb: 2 }}>
              <TextField
                size="small"
                fullWidth
                value={`https://codeguardian.edu/shared-report/${report.id}`}
                InputProps={{
                  readOnly: true,
                }}
              />
              <IconButton color="primary" onClick={handleCopyLink}>
                {copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Box>
            <FormControlLabel
              control={
                <Checkbox
                  checked={showName}
                  onChange={(e) => setShowName(e.target.checked)}
                />
              }
              label="在报告中显示我的姓名 (Alex)"
            />
          </Box>
        </Popover>
      </Box>

      {report.issues.length > 0 ? (
        <>
          {/* 摘要视图 */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h1" color="text.primary" sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                  {report.riskScore}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  风险评分
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  分数越高，风险越大。
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h1" color="text.primary" sx={{ fontSize: '48px', fontWeight: 'bold' }}>
                  {report.issues.length}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  问题总数
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 3, height: '100%' }}>
                <Box sx={{ height: 200, position: 'relative' }}>
                  <Doughnut data={chartData} options={chartOptions} />
                </Box>
              </Card>
            </Grid>
          </Grid>

          {/* 问题列表视图 */}
          <Card sx={{ mb: 4 }}>
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>严重性</TableCell>
                    <TableCell>漏洞类型 (CWE)</TableCell>
                    <TableCell>位置</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {report.issues.map((issue) => (
                    <>
                      <TableRow
                        key={issue.id}
                        hover
                        onClick={() => handleIssueClick(issue)}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell>
                          <Chip
                            label={{
                              high: '高危',
                              medium: '中危',
                              low: '低危',
                            }[issue.severity]}
                            sx={{
                              bgcolor: {
                                high: 'semantic.high',
                                medium: 'semantic.medium',
                                low: 'semantic.low',
                              }[issue.severity],
                              color: 'white',
                            }}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{issue.type} (CWE-{issue.cwe})</TableCell>
                        <TableCell>{issue.location}: Line {issue.line}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={3}>
                          <Collapse in={selectedIssue && selectedIssue.id === issue.id} timeout="auto" unmountOnExit>
                            <IssueDetail issue={issue} />
                            <Divider sx={{ my: 2 }} />
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </>
      ) : (
        renderEmptyState()
      )}
    </Box>
  );
};

export default ScanReport;