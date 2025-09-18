import { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  Grid,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Button,
  TextField,
  InputAdornment,
  Chip,
  LinearProgress,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Paper,
} from '@mui/material';
import {
  Search as SearchIcon,
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Code as CodeIcon,
  Security as SecurityIcon,
  Quiz as QuizIcon,
  CheckCircle as CheckCircleIcon,
  PlayArrow as PlayArrowIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`learn-tabpanel-${index}`}
      aria-labelledby={`learn-tab-${index}`}
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

// 知识库文章组件
const KnowledgeArticle = ({ article }) => {
  return (
    <Card sx={{ mb: 3, overflow: 'hidden' }}>
      <Grid container>
        {/* 左侧：文章内容 */}
        <Grid item xs={12} md={8} sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {article.tags.map((tag, index) => (
              <Chip key={index} label={tag} size="small" />
            ))}
          </Box>
          <Typography variant="h3" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="body1" paragraph>
            {article.summary}
          </Typography>
          <Button
            variant="text"
            color="primary"
            endIcon={<ArrowForwardIcon />}
          >
            阅读全文
          </Button>
        </Grid>
        
        {/* 右侧：文章元数据 */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              难度
            </Typography>
            <Chip
              label={{
                beginner: '初级',
                intermediate: '中级',
                advanced: '高级',
              }[article.difficulty]}
              size="small"
              color={{
                beginner: 'success',
                intermediate: 'primary',
                advanced: 'error',
              }[article.difficulty]}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              阅读时间
            </Typography>
            <Typography variant="body2">
              {article.readTime} 分钟
            </Typography>
          </Box>
          
          <Box>
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              相关 CWE
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {article.relatedCWEs.map((cwe, index) => (
                <Chip key={index} label={`CWE-${cwe}`} size="small" variant="outlined" />
              ))}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

// 交互式课程组件
const CourseCard = ({ course }) => {
  return (
    <Card sx={{ 
      height: '400px', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Box sx={{ p: 3, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: '50%',
              bgcolor: 'primary.main',
              color: 'white',
              mb: 2,
            }}
          >
            {course.icon === 'code' && <CodeIcon />}
            {course.icon === 'security' && <SecurityIcon />}
            {course.icon === 'quiz' && <QuizIcon />}
          </Box>
          
          <Chip
            label={{
              beginner: '初级',
              intermediate: '中级',
              advanced: '高级',
            }[course.difficulty]}
            size="small"
            color={{
              beginner: 'success',
              intermediate: 'primary',
              advanced: 'error',
            }[course.difficulty]}
          />
        </Box>
        
        <Typography variant="h3" gutterBottom>
          {course.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {course.description}
        </Typography>
        
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">
              完成进度: {course.progress}%
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {course.completedModules}/{course.totalModules} 模块
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={course.progress}
            sx={{ mb: 2, height: 6, borderRadius: 3 }}
          />
        </Box>
      </Box>
      
      <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.9)', borderTop: 1, borderColor: 'divider' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={course.progress > 0 ? <PlayArrowIcon /> : <SchoolIcon />}
        >
          {course.progress > 0 ? '继续学习' : '开始学习'}
        </Button>
      </Box>
    </Card>
  );
};

// 安全挑战组件
const ChallengeCard = ({ challenge }) => {
  return (
    <Card sx={{ 
      height: '400px', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Box sx={{ p: 3, flex: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Chip
            label={{
              easy: '简单',
              medium: '中等',
              hard: '困难',
            }[challenge.difficulty]}
            size="small"
            color={{
              easy: 'success',
              medium: 'primary',
              hard: 'error',
            }[challenge.difficulty]}
          />
          
          {challenge.completed && (
            <CheckCircleIcon color="success" />
          )}
        </Box>
        
        <Typography variant="h3" gutterBottom>
          {challenge.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          {challenge.description}
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {challenge.tags.map((tag, index) => (
            <Chip key={index} label={tag} size="small" variant="outlined" />
          ))}
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            相关 CWE:
          </Typography>
          <Chip label={`CWE-${challenge.cwe}`} size="small" />
        </Box>
      </Box>
      
      <Box sx={{ p: 2, bgcolor: 'rgba(255, 255, 255, 0.9)', borderTop: 1, borderColor: 'divider' }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={challenge.completed ? <CheckCircleIcon /> : <PlayArrowIcon />}
        >
          {challenge.completed ? '查看解决方案' : '开始挑战'}
        </Button>
      </Box>
    </Card>
  );
};

const Learn = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedFaq, setExpandedFaq] = useState(false);
  
  // 模拟知识库文章数据
  const knowledgeArticles = [
    {
      id: '1',
      title: '理解缓冲区溢出：原理、风险与防御',
      summary: '缓冲区溢出是一种常见的软件漏洞，攻击者可以利用它执行恶意代码或使程序崩溃。本文深入探讨缓冲区溢出的工作原理、常见攻击方式以及如何在代码中防范这类漏洞。',
      tags: ['内存安全', '漏洞防御', 'C/C++'],
      difficulty: 'intermediate',
      readTime: 15,
      relatedCWEs: [120, 121, 122, 124],
    },
    {
      id: '2',
      title: 'SQL 注入攻击完全指南',
      summary: 'SQL 注入是 Web 应用程序中最常见的安全漏洞之一。本文介绍 SQL 注入的基本原理、攻击技术以及如何通过参数化查询、ORM 框架和输入验证来保护您的应用程序。',
      tags: ['Web 安全', '数据库', '输入验证'],
      difficulty: 'beginner',
      readTime: 12,
      relatedCWEs: [89, 564, 943],
    },
    {
      id: '3',
      title: '跨站脚本攻击 (XSS) 防御策略',
      summary: 'XSS 攻击允许攻击者在受害者浏览器中注入恶意脚本。本文详细介绍 XSS 的三种主要类型（存储型、反射型和 DOM 型），以及如何通过内容安全策略、输出编码和其他技术来防御这些攻击。',
      tags: ['Web 安全', '前端安全', 'JavaScript'],
      difficulty: 'intermediate',
      readTime: 18,
      relatedCWEs: [79, 80, 83, 84],
    },
  ];
  
  // 模拟交互式课程数据
  const courses = [
    {
      id: '1',
      title: '安全编码基础',
      description: '学习软件安全的基本原则和常见漏洞类型，包括输入验证、认证与授权、加密等核心概念。',
      icon: 'code',
      difficulty: 'beginner',
      progress: 75,
      completedModules: 3,
      totalModules: 4,
    },
    {
      id: '2',
      title: 'Web 应用安全',
      description: '深入了解 Web 应用程序中的常见安全漏洞，如 XSS、CSRF、SQL 注入等，以及如何防御这些攻击。',
      icon: 'security',
      difficulty: 'intermediate',
      progress: 30,
      completedModules: 2,
      totalModules: 6,
    },
    {
      id: '3',
      title: '安全代码审计',
      description: '学习如何系统地审查代码以识别安全漏洞，掌握静态分析工具的使用方法和手动代码审计技术。',
      icon: 'code',
      difficulty: 'advanced',
      progress: 0,
      completedModules: 0,
      totalModules: 5,
    },
    {
      id: '4',
      title: '安全编程测验',
      description: '通过一系列测验题目测试您对安全编程概念的理解，涵盖多种编程语言和安全领域。',
      icon: 'quiz',
      difficulty: 'intermediate',
      progress: 0,
      completedModules: 0,
      totalModules: 3,
    },
  ];
  
  // 模拟安全挑战数据
  const challenges = [
    {
      id: '1',
      title: '修复缓冲区溢出',
      description: '在这个挑战中，您需要识别并修复 C 程序中的缓冲区溢出漏洞，防止潜在的内存破坏和代码执行攻击。',
      difficulty: 'medium',
      tags: ['C/C++', '内存安全'],
      cwe: 120,
      completed: true,
    },
    {
      id: '2',
      title: '防御 SQL 注入',
      description: '分析并修复一个易受 SQL 注入攻击的 Web 应用程序，实现参数化查询和适当的输入验证。',
      difficulty: 'easy',
      tags: ['Web', 'SQL', 'PHP'],
      cwe: 89,
      completed: false,
    },
    {
      id: '3',
      title: '安全密码存储',
      description: '实现安全的密码存储机制，包括适当的哈希算法、盐值和密钥拉伸，以保护用户凭据。',
      difficulty: 'medium',
      tags: ['认证', '加密', 'Python'],
      cwe: 916,
      completed: false,
    },
    {
      id: '4',
      title: '修复竞态条件',
      description: '识别并修复多线程应用程序中的竞态条件漏洞，确保安全的并发操作。',
      difficulty: 'hard',
      tags: ['并发', 'Java', '线程安全'],
      cwe: 362,
      completed: false,
    },
  ];
  
  // 模拟常见问题数据
  const faqs = [
    {
      question: '什么是 CWE？',
      answer: 'CWE (Common Weakness Enumeration) 是一个由社区开发的常见软件和硬件安全弱点列表。它作为一种通用语言，帮助识别、描述和讨论软件安全漏洞。每个 CWE 条目都有一个唯一的编号，并包含详细的描述、示例和缓解策略。',
    },
    {
      question: '如何开始学习代码安全？',
      answer: '开始学习代码安全的最佳方式是：1) 掌握一门编程语言的基础知识；2) 了解常见的安全漏洞类型（如 OWASP Top 10）；3) 学习安全编码实践；4) 尝试安全挑战和 CTF 比赛；5) 阅读安全博客和文档。我们建议从"安全编码基础"课程开始，然后逐步尝试简单的安全挑战。',
    },
    {
      question: '如何在我的项目中集成安全实践？',
      answer: '在项目中集成安全实践的关键步骤包括：1) 在开发生命周期早期考虑安全性（安全左移）；2) 使用自动化安全测试工具；3) 进行定期的代码审查；4) 遵循安全编码标准；5) 对开发团队进行安全培训；6) 实施持续的安全监控。您可以使用 CodeGuardian 等工具在开发过程中自动检测安全问题。',
    },
    {
      question: '静态分析和动态分析有什么区别？',
      answer: '静态分析是在不执行代码的情况下分析源代码或编译后的代码，用于发现潜在的安全漏洞、编码错误和其他问题。动态分析则是在运行时分析应用程序，通过模拟真实攻击场景来发现漏洞。两种方法各有优缺点，通常结合使用可以获得最佳结果。',
    },
  ];
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleFaqChange = (panel) => (event, isExpanded) => {
    setExpandedFaq(isExpanded ? panel : false);
  };
  
  // 筛选知识库文章
  const filteredArticles = knowledgeArticles.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  return (
    <Box>
      <Typography variant="h1" gutterBottom>
        学习资源
      </Typography>
      
      <Card 
        sx={{ 
          mb: 4,
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          borderRadius: 2,
        }}
      >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="学习资源选项卡">
            <Tab label="知识库" />
            <Tab label="交互式课程" />
            <Tab label="安全挑战" />
            <Tab label="常见问题" />
          </Tabs>
        </Box>
        
        {/* 知识库选项卡 */}
        <TabPanel value={tabValue} index={0}>
          <TextField
            fullWidth
            placeholder="搜索文章、主题或标签..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mb: 4 }}
          />
          
          {filteredArticles.length > 0 ? (
            filteredArticles.map(article => (
              <KnowledgeArticle key={article.id} article={article} />
            ))
          ) : (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" gutterBottom>
                未找到匹配的文章
              </Typography>
              <Typography variant="body2" color="text.secondary">
                尝试使用不同的搜索词或浏览我们的所有文章。
              </Typography>
            </Box>
          )}
        </TabPanel>
        
        {/* 交互式课程选项卡 */}
        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            {courses.map(course => (
              <Grid item xs={12} md={6} lg={4} key={course.id}>
                <CourseCard course={course} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        {/* 安全挑战选项卡 */}
        <TabPanel value={tabValue} index={2}>
          <Grid container spacing={3}>
            {challenges.map(challenge => (
              <Grid item xs={12} md={6} lg={4} key={challenge.id}>
                <ChallengeCard challenge={challenge} />
              </Grid>
            ))}
          </Grid>
        </TabPanel>
        
        {/* 常见问题选项卡 */}
        <TabPanel value={tabValue} index={3}>
          <Paper elevation={0} sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.9)', mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              常见问题解答 (FAQ)
            </Typography>
            <Typography variant="body2" color="text.secondary">
              找到关于代码安全、漏洞和最佳实践的常见问题的答案。
            </Typography>
          </Paper>
          
          {faqs.map((faq, index) => (
            <Accordion
              key={index}
              expanded={expandedFaq === `panel${index}`}
              onChange={handleFaqChange(`panel${index}`)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index}-content`}
                id={`panel${index}-header`}
              >
                <Typography variant="subtitle1">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1">
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>
      </Card>
    </Box>
  );
};

export default Learn;