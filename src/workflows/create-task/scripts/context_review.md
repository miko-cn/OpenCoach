# CONTEXT_REVIEW State Script

## Agent Action

Read and summarize goal and milestones context.

## System Commands

```bash
# Read goal file
cat goals/{goal-slug}/goal.md

# Read milestones file
cat goals/{goal-slug}/milestones.md
```

## Review Process

1. Extract key information:
   - Goal description
   - Goal deadline
   - Key milestones (especially near-term ones)
   - Current progress (if any)

2. Present summary to user:

```
让我们先回顾一下你的目标 📋

目标：[目标简述]
期限：[时间框架]
最近的里程碑：
- [里程碑1] - [时间]
- [里程碑2] - [时间]

现在我们来制定具体的行动任务吧！
```

## User Response Options

- **Confirm**: Info is correct → PERIOD_DEFINITION
- **Needs update**: Goal needs modification → ERROR (suggest updating goal.md)

## Exit Conditions

- **Context confirmed**: → PERIOD_DEFINITION
- **Needs update**: → ERROR

## Interactive Options

### Progress Assessment Options

当询问"当前进展如何？"时，生成以下进展选项：

**选项框架：**
- 刚刚开始（还没怎么开始）
- 完成第一阶段（有一些进展）
- 进行中，遇到了一些困难（卡住了）
- 已经不错了，继续推进（进展顺利）

**提示词模板：**
```
为"当前进展如何？"生成 4 个进展选项：

选项要求：
- 覆盖不同进展状态（刚开始/有进展/遇到困难/进展顺利）
- 简洁明了（每个不超过30字）
- 描述要简洁，让用户能快速选择

示例：
- 刚刚开始
- 完成第一阶段
- 进行中，遇到一些困难
- 已经不错了，继续推进
```

### Recent Changes Options

当询问"最近有什么变化？"时，生成以下变化选项：

**选项框架：**
- 没什么变化（和之前一样）
- 时间更紧了（更忙了）
- 想法有些调整（目标方向微调）
- 找到了新资源（有新的工具/帮助）

**提示词模板：**
```
为"最近有什么变化？"生成 4 个变化选项：

选项要求：
- 覆盖常见的变化类型（无变化/时间/想法/资源）
- 简洁明了（每个不超过25字）
- 非评判性，让用户能轻松选择

示例：
- 没什么变化
- 时间更紧了
- 想法有些调整
- 找到了新资源
```

**选项设计原则：**
1. 进展选项要覆盖不同进展状态
2. 变化选项要涵盖常见的变化类型
3. 所有选项都要非评判性

## State Update Command

```
opencoach state set create-task PERIOD_DEFINITION
# OR
opencoach state set create-task ERROR
```
