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

## State Update Command

```
opencoach state set create-task PERIOD_DEFINITION
# OR
opencoach state set create-task ERROR
```
