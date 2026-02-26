/**
 * /coach task 命令
 * 
 * 功能：为目标创建任务分解
 * 用法：/coach task <目标名称>
 */

const { execCLI, formatSuccess, formatError, formatHelp, goalExists, generateSlug } = require('./utils');
const fs = require('fs');
const path = require('path');

module.exports = async function({ context, params }) {
  const goalName = params.goal || (params._ && params._[0]);
  
  // 检查是否提供了目标名称
  if (!goalName) {
    return {
      content: formatHelp(
        'task <目标名称>',
        [
          '/coach task 学习 TypeScript',
          '/coach task 减肥 10 斤',
          '/coach task 完成项目上线'
        ]
      )
    };
  }
  
  // 检查目标是否存在
  if (!goalExists(goalName)) {
    return {
      content: `⚠️ 目标不存在：**${goalName}**

使用以下命令创建目标：
- \`/coach goal ${goalName}\` - 创建新目标
- \`/coach list\` - 查看所有目标`
    };
  }
  
  // 获取目标 slug
  const slug = generateSlug(goalName);
  
  // 检查 tasks.md 是否已存在
  const fs = require('fs');
  const path = require('path');
  const tasksFilePath = path.join(process.env.HOME, 'OpenCoach/goals', slug, 'tasks.md');
  
  if (fs.existsSync(tasksFilePath)) {
    return {
      content: `⚠️ 任务文件已存在：**${goalName}**

📁 位置：\`${tasksFilePath}\`

📋 **接下来可以：**
- 直接编辑任务文件
- \`/coach plan ${goalName}\` - 使用完整工作流深入规划（Phase 2）`
    };
  }
  
  // 创建任务文件（手动实现，因为 CLI 的 tasks create 有 bug）
  const today = new Date().toISOString().split('T')[0];
  const content = `---
period:
  start: ${today}
  end: YYYY-MM-DD
next_review: YYYY-MM-DD
---

# 任务清单

## 当前周期
${today} - 结束日期

## 任务列表

- [ ] 任务 1 描述
- [ ] 任务 2 描述
- [ ] 任务 3 描述

## 优先级说明

- P1: 高优先级 - 必须完成
- P2: 中优先级 - 应该完成
- P3: 低优先级 - 可以完成

`;
  
  try {
    fs.mkdirSync(path.dirname(tasksFilePath), { recursive: true });
    fs.writeFileSync(tasksFilePath, content, 'utf-8');
    
    return {
      content: formatSuccess('任务已创建：**' + goalName + '**') + '\n\n' +
        '📁 位置：`' + tasksFilePath + '`\n\n' +
        '📋 **接下来可以：**\n' +
        '- 编辑任务文件添加具体任务\n' +
        '- `/coach review ' + goalName + '` - 查看复盘\n' +
        '- `/coach plan ' + goalName + '` - 使用完整工作流深入规划（Phase 2）\n\n' +
        '📝 **任务文件已生成，包含：**\n' +
        '- 任务列表模板\n' +
        '- 开始/结束日期\n' +
        '- 优先级说明'
    };
  } catch (error) {
    return { content: formatError('创建任务失败：' + error.message) };
  }
};
