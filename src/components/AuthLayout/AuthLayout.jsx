import { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import './AuthLayout.css';

const AuthLayout = ({ children }) => {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [globalIdCounter, setGlobalIdCounter] = useState(0); // 全局ID计数器

  // 代码块示例数据 - 十个不同类型的安全漏洞示例
  const codeExamples = [
    {
      code: `function validateUser(input) {
    const query = "SELECT * FROM users WHERE id = " + input;
    return database.execute(query);
}

function processPayment(amount) {
    if (amount > 0) {
        return chargeCard(amount);
    }
}`,
      vulnerabilities: [2, 7],
      report: [
        "🔍 SQL Injection vulnerability detected in line 2",
        "⚠️  Missing input validation for user input",
        "💳 Potential payment bypass in line 7",
        "✅ Recommendation: Use parameterized queries"
      ]
    },
    {
      code: `app.get('/admin', (req, res) => {
    const userRole = req.headers['x-user-role'];
    if (userRole === 'admin') {
        res.json(getAdminData());
    } else {
        res.status(403).send('Forbidden');
    }
});`,
      vulnerabilities: [2, 3],
      report: [
        "🚨 Authorization bypass vulnerability detected",
        "🔐 Header-based authentication is insecure",
        "🛡️  Missing proper authentication middleware",
        "✅ Recommendation: Implement JWT token validation"
      ]
    },
    {
      code: `function uploadFile(file) {
    const fileName = file.originalname;
    const filePath = './uploads/' + fileName;
    fs.writeFileSync(filePath, file.buffer);
    
    return {
        success: true,
        path: filePath
    };
}`,
      vulnerabilities: [2, 3, 4],
      report: [
        "📁 Path traversal vulnerability detected",
        "🚫 Missing file type validation",
        "⬆️  Unrestricted file upload vulnerability",
        "✅ Recommendation: Validate file types and sanitize paths"
      ]
    },
    {
      code: `const crypto = require('crypto');

function hashPassword(password) {
    return crypto.createHash('md5').update(password).digest('hex');
}

function authenticateUser(username, password) {
    const hashedInput = hashPassword(password);
    return users.find(u => u.hash === hashedInput);
}`,
      vulnerabilities: [4, 8],
      report: [
        "🔒 Weak cryptographic hash function (MD5)",
        "🧂 Missing salt in password hashing",
        "🌈 Vulnerable to rainbow table attacks",
        "✅ Recommendation: Use bcrypt or Argon2"
      ]
    },
    {
      code: `import subprocess

def execute_command(user_input):
    command = f"ping -c 1 {user_input}"
    result = subprocess.run(command, shell=True, capture_output=True)
    return result.stdout.decode()

def process_request(data):
    return execute_command(data['host'])`,
      vulnerabilities: [4, 5, 9],
      report: [
        "💻 Command injection vulnerability detected",
        "⚡ Unsafe use of shell=True parameter",
        "🔓 Unvalidated user input in system command",
        "✅ Recommendation: Use subprocess with argument list"
      ]
    },
    {
      code: `<?php
session_start();

if ($_POST['username'] && $_POST['password']) {
    $user = $_POST['username'];
    $pass = $_POST['password'];
    
    if ($user == 'admin' && $pass == 'password123') {
        $_SESSION['logged_in'] = true;
        echo "Login successful";
    }
}
?>`,
      vulnerabilities: [4, 5, 8],
      report: [
        "🔑 Hardcoded credentials vulnerability",
        "📝 Missing CSRF protection",
        "🔐 Weak password policy",
        "✅ Recommendation: Use secure authentication system"
      ]
    },
    {
      code: `public class UserController {
    @RequestMapping("/user/{id}")
    public User getUser(@PathVariable String id) {
        String query = "SELECT * FROM users WHERE id = " + id;
        return jdbcTemplate.queryForObject(query, User.class);
    }
    
    @RequestMapping("/delete/{id}")
    public void deleteUser(@PathVariable String id) {
        userService.delete(Integer.parseInt(id));
    }
}`,
      vulnerabilities: [4, 9],
      report: [
        "🗃️  SQL Injection in Spring Controller",
        "🔢 Missing input validation for ID parameter",
        "🚫 No authorization check for delete operation",
        "✅ Recommendation: Use @PreAuthorize and parameterized queries"
      ]
    },
    {
      code: `const express = require('express');
const app = express();

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/api/data', (req, res) => {
    res.json({ secret: process.env.API_KEY });
});`,
      vulnerabilities: [5, 6, 11],
      report: [
        "🌐 Overly permissive CORS configuration",
        "🔓 Wildcard origin allows any domain",
        "🔑 Sensitive data exposure in API response",
        "✅ Recommendation: Configure specific CORS origins"
      ]
    },
    {
      code: `function validateInput(data) {
    return data.replace(/<script>/g, '');
}

function renderUserContent(userInput) {
    const cleaned = validateInput(userInput);
    document.getElementById('content').innerHTML = cleaned;
}

function displayMessage(msg) {
    $('#message').html(msg);
}`,
      vulnerabilities: [2, 7, 11],
      report: [
        "🕷️  Cross-Site Scripting (XSS) vulnerability",
        "🧹 Insufficient input sanitization",
        "⚠️  Direct DOM manipulation with user data",
        "✅ Recommendation: Use proper HTML encoding and CSP"
      ]
    },
    {
      code: `import pickle
import base64

def load_user_data(encoded_data):
    decoded = base64.b64decode(encoded_data)
    user_obj = pickle.loads(decoded)
    return user_obj

def save_session(request):
    session_data = request.cookies.get('session')
    if session_data:
        return load_user_data(session_data)
    return None`,
      vulnerabilities: [6, 7, 10],
      report: [
        "🥒 Insecure deserialization vulnerability",
        "🍪 Untrusted data from cookies",
        "💥 Potential remote code execution",
        "✅ Recommendation: Use JSON or secure serialization"
      ]
    }
  ];

  // 创建代码块
  const createCodeBlock = (data) => {
    // 使用全局计数器确保绝对唯一性
    const currentGlobalId = globalIdCounter;
    setGlobalIdCounter(prev => prev + 1);
    
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substr(2, 9);
    const blockId = `block-${timestamp}-${randomId}-${currentGlobalId}`;
    
    console.log(`Creating block with ID: ${blockId}, globalId: ${currentGlobalId}, timestamp: ${timestamp}`);
    
    return {
      id: blockId,
      code: data.code,
      vulnerabilities: data.vulnerabilities,
      report: data.report,
      top: 200, // 固定位置，居中显示（将被CSS覆盖）
      scanning: false,
      analyzing: false,
      marked: false,
      exiting: false,
      forceUpdate: Date.now() // 添加强制更新标记
    };
  };

  // 初始化代码块
  const [currentBlock, setCurrentBlock] = useState(null);
  const [terminalActive, setTerminalActive] = useState(false);
  const [terminalContent, setTerminalContent] = useState([]);

  useEffect(() => {
    console.log('Current block changed:', currentBlock);
  }, [currentBlock]);

  useEffect(() => {
    // 初始化第一个代码块
    const data = codeExamples[0];
    const block = createCodeBlock(data);
    setCurrentBlock(block);

    // 延迟开始第一个动画
    setTimeout(() => {
      startScanAnimation();
    }, 1000);
  }, []);

  // 开始扫描动画
  const startScanAnimation = () => {
    setCurrentBlock(prev => ({ ...prev, scanning: true }));

    setTimeout(() => {
      setCurrentBlock(prev => ({ ...prev, scanning: false }));
      startAnalysisAnimation();
    }, 2000);
  };

  // 开始分析动画
  const startAnalysisAnimation = () => {
    setCurrentBlock(prev => ({ ...prev, analyzing: true }));

    setTimeout(() => {
      setCurrentBlock(prev => ({ ...prev, analyzing: false, marked: true }));
      setTimeout(() => startReportingAnimation(), 0);
    }, 1000);
  };

  // 开始报告动画
  const startReportingAnimation = () => {
    console.log('Starting reporting animation for current block');
    
    // 使用函数式更新来获取最新的currentBlock状态
    setCurrentBlock(prevBlock => {
      if (!prevBlock || !prevBlock.report) {
        console.error('No current block or report data available');
        return prevBlock;
      }

      const reportData = prevBlock.report;
      console.log('Report data:', reportData);
      
      // 激活终端并清空之前的内容
      console.log('Activating terminal...');
      setTerminalActive(true);
      setTerminalContent([]); // 确保清空之前的内容

      // 确保终端激活后再开始输出内容
      setTimeout(() => {
        let lineIndex = 0;
        let currentContent = []; // 本地内容数组，避免状态更新延迟
        
        const typeNextLine = () => {
          if (lineIndex < reportData.length) {
            const text = reportData[lineIndex];
            const color = lineIndex === 0 ? '#ef4444' : '#059669';
            
            // 逐字符打字效果
            let charIndex = 0;
            const typingText = `> `;
            
            const typeChar = () => {
              if (charIndex <= text.length) {
                const displayText = typingText + text.substring(0, charIndex);
                currentContent[lineIndex] = { text: displayText, color };
                setTerminalContent([...currentContent]);
                charIndex++;
                setTimeout(typeChar, 50); // 打字速度
              } else {
                // 当前行完成，开始下一行
                lineIndex++;
                setTimeout(typeNextLine, 300);
              }
            };
            
            typeChar();
          } else {
            // 报告完成，开始下一个代码块
            setTimeout(() => {
              console.log('Report completed, hiding terminal...');
              setTerminalActive(false);
              setTerminalContent([]); // 清空终端内容
              startNextBlock();
            }, 2000);
          }
        };

        typeNextLine();
      }, 100); // 给终端激活一点时间
      
      return prevBlock; // 返回原状态，不修改
    });
  };
  const startNextBlock = () => {
    // 第一步：标记当前代码块为移出状态
    setCurrentBlock(prev => ({
      ...prev,
      exiting: true,
      scanning: false,
      analyzing: false,
      marked: false
    }));

    // 第二步：等待移出动画完成后替换新代码块
    setTimeout(() => {
      // 获取下一个代码块数据
      const nextIndex = (currentBlockIndex + 1) % codeExamples.length;
      const newData = codeExamples[nextIndex];
      
      // 创建新代码块
      const newBlock = createCodeBlock(newData);
      
      console.log(`Switching to new block: ${newBlock.id}`);
      
      // 替换当前代码块
      setCurrentBlock(newBlock);
      setCurrentBlockIndex(nextIndex);

      // 第三步：延迟开始下一个扫描动画
      setTimeout(() => {
        startScanAnimation();
      }, 500); // 给新代码块一点时间渲染
    }, 800); // 等待移出动画完成
  };

  return (
    <Box className="auth-layout">
      {/* 主舞台 */}
      <Box className="stage">
        <Box className="code-blocks-container">
          {currentBlock && (
            <Box
              key={`${currentBlock.id}-${currentBlock.forceUpdate || 0}`} // 使用forceUpdate来强制重新渲染
              className={`code-block ${currentBlock.scanning ? 'scanning' : ''} ${currentBlock.analyzing ? 'analyzing' : ''} ${currentBlock.marked ? 'marked' : ''} ${currentBlock.exiting ? 'exiting' : ''}`}
              sx={{ 
                position: 'absolute',
                left: '10%',
                width: '80%',
                transition: currentBlock.exiting ? 'opacity 0.8s ease, transform 0.8s ease' : 'opacity 0.3s ease, transform 0.3s ease',
                opacity: currentBlock.exiting ? 0 : 1,
                transform: currentBlock.exiting ? 'translateY(-50%) translateY(-100px)' : 'translateY(-50%)',
                pointerEvents: currentBlock.exiting ? 'none' : 'auto',
                zIndex: currentBlock.exiting ? -1 : 1
              }}
            >
              <Box className="code-container">
                <pre className="code-original">{currentBlock.code}</pre>
                <pre className="code-scanned">
                  {currentBlock.code.split('\n').map((line, lineIndex) => {
                    const actualLineNumber = lineIndex + 1;
                    const isVulnerableLine = currentBlock.vulnerabilities.includes(actualLineNumber);
                    
                    console.log(`Line ${actualLineNumber}: "${line.trim()}" - Vulnerable: ${isVulnerableLine}`);
                    
                    return (
                      <span key={lineIndex}>
                        {isVulnerableLine ? (
                          <span className="vulnerability-line">
                            {line}
                            <span className="vulnerability-underline"></span>
                            <span className="vulnerability-mark">✗</span>
                          </span>
                        ) : (
                          line
                        )}
                        {'\n'}
                      </span>
                    );
                  })}
                </pre>
              </Box>
              <Box className="analysis-bar"></Box>
            </Box>
          )}
        </Box>
        
        {/* 模拟终端 */}
        <Box className={`terminal ${terminalActive ? 'active' : ''}`}>
          <Box className="terminal-header">Security Audit Report</Box>
          <Box className="terminal-content">
            {terminalContent.map((line, index) => (
              <Box key={index} sx={{ color: line.color }}>
                {line.text}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* 登录/注册面板 */}
      <Box className="auth-panel">
        <Box className="auth-container">
          <Box className="auth-header">
            <Typography variant="h4" component="h1" className="auth-title">
              CodeSecure
            </Typography>
            <Typography variant="body2" className="auth-subtitle">
              智能代码安全审计平台
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default AuthLayout;