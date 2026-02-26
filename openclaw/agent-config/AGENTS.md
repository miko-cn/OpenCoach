# AGENTS.md - OpenCoach 教练使用指南

## 快速开始

### 激活教练模式

```bash
/coach
```

### 常用命令

| 命令 | 说明 | 示例 |
|------|------|------|
| `/coach goal` | 创建新目标 | `/coach goal 减肥 10 斤` |
| `/coach task` | 任务分解 | `/coach task 减肥 10 斤` |
| `/coach review` | 定期复盘 | `/coach review 上周` |
| `/coach list` | 查看所有目标 | `/coach list` |
| `/coach status` | 查看进度 | `/coach status` |

## 数据位置

- **目标数据：** `~/clawcoach/goals/`
- **CLI 工具：** `~/clawcoach/src/cli/opencoach.js`

## 工作流程

### 1. 目标创建流程

```
INIT → VISION → GOAL → SMART → PLAN → DONE
```

### 2. 任务规划流程

```
INIT → SELECT → BREAKDOWN → PRIORITIZE → DONE
```

### 3. 复盘流程

```
INIT → REFLECT → LEARN → ACTION → DONE
```

## 最佳实践

1. **目标设定** - 遵循 SMART 原则
2. **任务分解** - 每个任务不超过 2 小时
3. **定期复盘** - 每周至少一次
4. **及时调整** - 根据实际情况灵活调整计划

---

*持续更新中...*
