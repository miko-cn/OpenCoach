/**
 * /coach list 命令
 * 
 * 功能：查看所有目标列表
 * 用法：/coach list
 */

const { execCLI, formatSuccess, formatError } = require('./utils');

module.exports = async function({ context, params }) {
  // 执行 CLI 命令
  const result = execCLI('goals list');
  
  if (!result.success) {
    return { content: formatError('获取目标列表失败：' + result.error) };
  }
  
  // 解析输出
  const lines = result.output.split('\n');
  
  // 检查是否有目标
  if (lines.some(line => line.includes('No goals found'))) {
    return {
      content: `📋 暂无目标

还没有创建任何目标，使用以下命令开始：
- \`/coach goal <目标名称>\` - 创建新目标
- \`/coach create\` - 使用完整工作流创建目标`
    };
  }
  
  // 格式化输出
  let output = '📋 **目标列表**\n\n';
  
  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      const goalName = line.replace('-', '').trim();
      output += `🎯 ${goalName}\n`;
    }
  }
  
  output += '\n💡 提示：使用 \`/coach show <目标>\` 查看详情';
  
  return { content: output };
};
