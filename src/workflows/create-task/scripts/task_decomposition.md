# TASK_DECOMPOSITION State Script

## Agent Action

Break down milestones into specific, actionable tasks using SMART.

## Decomposition Process

For each milestone within the period:

### 1. Milestone Breakdown
```
我们来看看[里程碑名称]，要达成这个里程碑，需要做哪些具体的事情呢？
```

### 2. SMART Task Validation

For each proposed task:

**Specific**: "这个任务能再具体一点吗？"
- Example: "学习Python" → "完成Python基础教程第1-5章"

**Measurable**: "怎么知道这个任务完成了？"
- Example: "写代码" → "完成3个练习题并通过测试"

**Achievable**: "在[周期时长]内完成这个任务，难度如何？"
- IF too hard → suggest splitting

**Relevant**: Confirm task → milestone connection

**Time-bound**: "这个任务打算什么时候完成？"

### 3. Task Count Check

```
IF task_count > 10 THEN
  "任务有点多哦...一个周期完成可能会很累"
  Suggest: merge similar tasks, defer to next period
  → REFINE
END IF

IF task_count < 3 THEN
  "任务有点少呢，要不要再想想还有什么可以做的？"
END IF
```

## Progress Tracking

- [ ] Each milestone addressed
- [ ] Tasks are SMART-compliant
- [ ] Task count reasonable (3-10)

## Helper Questions

- "为了达成[里程碑]，第一步要做什么？"
- "这个任务可以分解成更小的步骤吗？"
- "有没有什么准备工作需要先做？"

## Exit Conditions

- **Decomposition complete**: → PRIORITY_SETTING
- **Needs refinement**: → REFINE

## Data Storage

```bash
opencoach data set tasks '[
  {"id": 1, "description": "...", "milestone": "...", "estimated_hours": N},
  ...
]'
```

## State Update Command

```
opencoach state set create-task PRIORITY_SETTING
# OR
opencoach state set create-task REFINE
```
