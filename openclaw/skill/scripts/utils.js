/**
 * ClawCoach Skill 工具函数
 * 
 * 提供 CLI 调用封装、错误处理、输出格式化等功能
 */

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// CLI 路径（使用 ~/ClawCoach）
const CLI_PATH = path.join(process.env.HOME, 'ClawCoach/src/cli/opencoach.js');

/**
 * 执行 CLI 命令
 * @param {string} command - CLI 命令（不含 node 和路径）
 * @param {object} options - 执行选项
 * @returns {object} { success: boolean, output: string, error?: string }
 */
function execCLI(command, options = {}) {
  const {
    timeout = 10000,  // 默认 10 秒超时
    encoding = 'utf8',
    throwOnError = false
  } = options;

  const fullCommand = `node "${CLI_PATH}" ${command}`;
  
  try {
    const output = execSync(fullCommand, {
      encoding,
      timeout,
      stdio: ['pipe', 'pipe', 'pipe']  // 捕获 stdout 和 stderr
    });
    
    return {
      success: true,
      output: output.trim(),
      error: null
    };
  } catch (error) {
    const result = {
      success: false,
      output: '',
      error: error.message
    };
    
    if (throwOnError) {
      throw error;
    }
    
    return result;
  }
}

/**
 * 格式化成功消息
 * @param {string} message - 消息内容
 * @param {string} emoji - 表情符号（默认：✅）
 * @returns {string}
 */
function formatSuccess(message, emoji = '✅') {
  return `${emoji} ${message}`;
}

/**
 * 格式化错误消息
 * @param {string} message - 错误信息
 * @param {string} emoji - 表情符号（默认：❌）
 * @returns {string}
 */
function formatError(message, emoji = '❌') {
  return `${emoji} ${message}`;
}

/**
 * 格式化帮助消息
 * @param {string} usage - 用法说明
 * @param {string[]} examples - 示例数组
 * @returns {string}
 */
function formatHelp(usage, examples = []) {
  let help = `📖 用法：${usage}\n`;
  
  if (examples.length > 0) {
    help += '\n示例：\n';
    examples.forEach(ex => {
      help += `  - ${ex}\n`;
    });
  }
  
  return help;
}

/**
 * 检查目标是否存在
 * @param {string} goalName - 目标名称
 * @returns {boolean}
 */
function goalExists(goalName) {
  const slug = generateSlug(goalName);
  const goalDir = path.join(process.env.HOME, 'OpenCoach/goals', slug);
  return fs.existsSync(goalDir);
}

/**
 * 生成 URL 友好的 slug
 * @param {string} name - 名称
 * @returns {string}
 */
function generateSlug(name) {
  if (!name) return '';
  return name.toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[-\s]+/g, '-')
    .trim();
}

/**
 * 获取所有目标列表
 * @returns {string[]} 目标名称数组
 */
function getGoalsList() {
  const result = execCLI('goals list');
  if (!result.success) {
    return [];
  }
  
  // 解析输出：
  // Goals:
  //   - goal-1
  //   - goal-2
  const lines = result.output.split('\n');
  const goals = [];
  
  for (const line of lines) {
    const match = line.match(/^\s*-\s+(.+)$/);
    if (match) {
      goals.push(match[1].trim());
    }
  }
  
  return goals;
}

module.exports = {
  execCLI,
  formatSuccess,
  formatError,
  formatHelp,
  goalExists,
  generateSlug,
  getGoalsList,
  CLI_PATH
};
