/**
 * /coach goal 命令
 * 
 * 功能：创建新目标
 * 用法：/coach goal <目标名称>
 */

const { execCLI, formatSuccess, formatError, formatHelp, goalExists } = require('./utils');

module.exports = async function({ context, params }) {
  const goalName = params.goal || (params._ && params._[0]);
  
  // 检查是否提供了目标名称
  if (!goalName) {
    return {
      content: formatHelp(
        'goal <目标名称>',
        [
          '/coach goal 学习 TypeScript',
          '/coach goal 减肥 10 斤',
          '/coach goal 完成项目上线'
        ]
      )
    };
  }
  
  // 检查目标是否已存在
  if (goalExists(goalName)) {
    return {
      content: `⚠️ 目标已存在：**${goalName}**

使用以下命令查看：
- \`/coach show ${goalName}\` - 查看目标详情
- \`/coach task ${goalName}\` - 创建任务分解`
    };
  }
  
  // 创建目标
  const result = execCLI(`goals create "${goalName}"`);
  
  if (!result.success) {
    return { content: formatError('创建目标失败：' + result.error) };
  }
  
  // 解析输出，提取目标目录
  const locationMatch = result.output.match(/Location:\s*(.+)/);
  const location = locationMatch ? locationMatch[1].trim() : null;
  
  let response = formatSuccess('目标已创建：**' + goalName + '**') + '\n\n' +
    '📁 位置：`' + (location || '~/OpenCoach/goals/' + goalName.toLowerCase().replace(/\s+/g, '-')) + '`\n\n' +
    '🎯 **接下来可以：**\n' +
    '- `/coach task ' + goalName + '` - 任务分解\n' +
    '- `/coach show ' + goalName + '` - 查看目标详情\n' +
    '- `/coach create` - 使用完整工作流深入规划';

  if (location) {
    response += `

📝 目标文件已生成，包含：
- 目标描述
- 重要性与动机
- SMART 评估
- 行动方针`;
  }
  
  return { content: response };
};
