---
name: ClawCoach
description: AI 目标管理与教练式工作流系统
metadata: {"clawdbot":{"emoji":"🎯","os":["linux","darwin"],"requires":{"bins":["node"]}}}
---

# ClawCoach Skill

AI 驱动的目标管理与教练式工作流系统，帮助你设定目标、分解任务、定期复盘。

## 📋 命令列表

### 基础命令（Phase 1）

| 命令 | 功能 | 示例 |
|------|------|------|
| `/coach goal <目标>` | 创建新目标 | `/coach goal 学习 TypeScript` |
| `/coach task <目标>` | 任务分解 | `/coach task 学习 TypeScript` |
| `/coach review [目标]` | 查看复盘列表 | `/coach review` 或 `/coach review 学习 TypeScript` |
| `/coach list` | 查看所有目标 | `/coach list` |

### 工作流命令（Phase 2 - 开发中）

| 命令 | 功能 | 示例 |
|------|------|------|
| `/coach create` | 完整目标创建工作流 | `/coach create` |
| `/coach plan <目标>` | 任务规划工作流 | `/coach plan 学习 TypeScript` |
| `/coach reflect <目标>` | 复盘工作流 | `/coach reflect 学习 TypeScript` |

### 高级命令（Phase 3 - 计划中）

| 命令 | 功能 | 示例 |
|------|------|------|
| `/coach show <目标>` | 查看目标详情 | `/coach show 学习 TypeScript` |
| `/coach export <目标>` | 导出目标 | `/coach export 学习 TypeScript` |
| `/coach add-resource` | 添加资源 | `/coach add-resource 学习 TypeScript 教程 https://...` |

---

## 🚀 使用指南

### 创建目标

```
/coach goal 学习 TypeScript
```

**响应：**
```
✅ 目标已创建：学习 TypeScript

📁 位置：~/OpenCoach/goals/xue-xi-typescript

🎯 接下来可以：
- /coach task 学习 TypeScript - 任务分解
- /coach show 学习 TypeScript - 查看目标详情
- /coach create - 使用完整工作流深入规划
```

### 任务分解

```
/coach task 学习 TypeScript
```

**响应：**
```
✅ 任务已创建：学习 TypeScript

📁 位置：~/OpenCoach/goals/xue-xi-typescript/tasks.md

📋 接下来可以：
- /coach show 学习 TypeScript - 查看任务详情
- /coach review 学习 TypeScript - 创建复盘
- /coach plan 学习 TypeScript - 使用完整工作流深入规划
```

### 查看复盘列表

```
/coach review 学习 TypeScript
```

**响应：**
```
📋 学习 TypeScript 的复盘

📝 2026-02-复盘
📝 2026-01-复盘

💡 提示：使用 `/coach reflect 学习 TypeScript` 创建新复盘
```

**如果没有复盘：**
```
📝 学习 TypeScript 还没有复盘

💡 创建复盘（Phase 2 工作流）：
- `/coach reflect 学习 TypeScript` - 使用完整复盘工作流
```

### 查看所有目标

```
/coach list
```

**响应：**
```
📋 目标列表

🎯 学习 TypeScript
🎯 减肥 10 斤
🎯 完成项目上线

💡 提示：使用 /coach show <目标> 查看详情
```

---

## 📁 数据存储

- **目标文件：** `~/OpenCoach/goals/<目标-slug>/goal.md`
- **任务文件：** `~/OpenCoach/goals/<目标-slug>/tasks.md`
- **复盘文件：** `~/OpenCoach/goals/<目标-slug>/review-<周期>.md`
- **状态文件：** `~/OpenCoach/.opencoach/state.json`
- **数据文件：** `~/OpenCoach/.opencoach/data.json`

---

## 🔧 技术实现

### 脚本结构

```
scripts/
├── index.js          # 命令入口
├── list.js           # /coach list
├── goal.js           # /coach goal
├── task.js           # /coach task
├── review.js         # /coach review
└── utils.js          # 工具函数
```

### CLI 调用

Skill 通过子进程调用 OpenCoach CLI：

```javascript
const { execCLI } = require('./utils');

// 创建目标
const result = execCLI('goals create "学习 TypeScript"');

// 查看列表
const result = execCLI('goals list');
```

---

## 📖 工作流说明

### 目标创建工作流

1. **愿景探索** - 明确理想状态
2. **目标定义** - SMART 原则
3. **重要性探索** - 动机分析
4. **里程碑规划** - 阶段性成果
5. **文档生成** - 结构化目标文档

### 任务规划工作流

1. **任务分解** - 拆解为可执行步骤
2. **优先级排序** - 重要紧急矩阵
3. **时间估算** - 开始/结束日期
4. **进度追踪** - 完成状态

### 复盘工作流

1. **周期回顾** - 整体情况
2. **完成情况** - 目标对比
3. **收获反思** - 经验教训
4. **改进计划** - 下一步行动

---

## 💡 最佳实践

### 目标设定
- ✅ 使用 SMART 原则（具体、可衡量、可实现、相关、时限）
- ✅ 分解为阶段性里程碑
- ✅ 定期复盘调整

### 任务管理
- ✅ 任务粒度适中（1-3 天可完成）
- ✅ 设置明确的开始/结束日期
- ✅ 标注优先级

### 复盘习惯
- ✅ 每周/每月定期复盘
- ✅ 诚实记录完成情况
- ✅ 制定具体改进计划

---

## 🆘 常见问题

### Q: 目标已存在怎么办？
A: 使用 `/coach show <目标>` 查看，或 `/coach task <目标>` 创建任务。

### Q: 如何删除目标？
A: 目前需要手动删除 `~/OpenCoach/goals/<目标-slug>/` 目录。

### Q: 可以修改目标吗？
A: 直接编辑 `goal.md` 文件即可。

### Q: 工作流模式是什么？
A: Phase 2 将支持交互式工作流，Agent 会引导你完成完整的目标创建/任务规划/复盘流程。

---

**版本：** 1.0.0 (Phase 1)  
**最后更新：** 2026-02-26
