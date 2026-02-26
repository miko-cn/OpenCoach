/**
 * /coach review 命令
 * 
 * 功能：查看/创建复盘
 * 用法：/coach review [目标名称]
 * 
 * 示例：
 * - /coach review
 * - /coach review 学习 TypeScript
 * 
 * 注意：目前 CLI 仅支持查看复盘列表，创建复盘功能将在 Phase 2 工作流中实现
 */

const { execCLI, formatSuccess, formatError, formatHelp, getGoalsList } = require('./utils');

module.exports = async function({ context, params }) {
  const goalName = params.goal || (params._ && params._[0]);
  
  // 如果没有指定目标，先获取目标列表
  let targetGoal = goalName;
  
  if (!targetGoal) {
    const goals = getGoalsList();
    
    if (goals.length === 0) {
      return {
        content: `📋 暂无目标

先创建一个目标吧：
- \`/coach goal <目标名称>\` - 创建新目标`
      };
    }
    
    if (goals.length === 1) {
      // 只有一个目标，直接使用
      targetGoal = goals[0];
    } else {
      // 多个目标，让用户选择
      let goalList = goals.map((g, i) => `${i + 1}. ${g}`).join('\n');
      return {
        content: `📋 请选择要查看复盘的目标：

${goalList}

或者指定目标：
\`/coach review <目标名称>\``
      };
    }
  }
  
  // 查看复盘列表
  const result = execCLI(`reviews list "${targetGoal}"`);
  
  if (!result.success) {
    // 如果是因为目标不存在
    if (result.error.includes('No reviews found') || result.output.includes('No reviews')) {
      return {
        content: `📝 **${targetGoal}** 还没有复盘

💡 创建复盘（Phase 2 工作流）：
- \`/coach reflect ${targetGoal}\` - 使用完整复盘工作流

或者手动创建复盘文件：
- 位置：\`~/OpenCoach/goals/${targetGoal.toLowerCase().replace(/\s+/g, '-')}/reviews/\``
      };
    }
    return { content: formatError('获取复盘列表失败：' + result.error) };
  }
  
  // 格式化输出
  return { content: formatReviewList(result.output, targetGoal) };
};

/**
 * 格式化复盘列表响应
 */
function formatReviewList(output, goalName) {
  const lines = output.split('\n');
  let response = `📋 **${goalName}** 的复盘\n\n`;
  
  let hasReviews = false;
  for (const line of lines) {
    if (line.trim().startsWith('-')) {
      hasReviews = true;
      const reviewName = line.replace('-', '').trim();
      response += `📝 ${reviewName}\n`;
    }
  }
  
  if (!hasReviews) {
    response = `📝 **${goalName}** 还没有复盘

💡 创建复盘（Phase 2 工作流）：
- \`/coach reflect ${goalName}\` - 使用完整复盘工作流`;
  } else {
    response += '\n💡 提示：使用 `/coach reflect ' + goalName + '` 创建新复盘';
  }
  
  return { content: response };
}
