/**
 * ClawCoach Skill 命令入口
 * 
 * 导出所有命令供 OpenClaw 调用
 */

module.exports = {
  // Phase 1: 基础命令
  list: require('./list'),
  goal: require('./goal'),
  task: require('./task'),
  review: require('./review'),
  
  // 工具函数
  utils: require('./utils')
};
