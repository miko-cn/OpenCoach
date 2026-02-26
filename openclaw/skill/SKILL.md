---
name: OpenCoach
description: AI 目标管理与教练式工作流系统
metadata: {"clawdbot":{"emoji":"🎯","os":["linux","darwin"],"requires":{"bins":["node"]}}}
---

# OpenCoach Skill

使用 OpenCoach CLI 进行目标管理。

## 命令

- `/coach goal <目标>` - 创建新目标
- `/coach task <目标>` - 任务分解
- `/coach review <周期>` - 复盘
- `/coach list` - 查看所有目标

## 使用方式

```bash
# 创建目标
node ~/clawcoach/src/cli/opencoach.js goals create "减肥 10 斤"

# 任务分解
node ~/clawcoach/src/cli/opencoach.js tasks plan "减肥 10 斤"

# 复盘
node ~/clawcoach/src/cli/opencoach.js reviews create "上周"

# 查看列表
node ~/clawcoach/src/cli/opencoach.js goals list
```
