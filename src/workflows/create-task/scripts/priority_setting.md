# PRIORITY_SETTING State Script

## Agent Action

Set task priorities using Eisenhower matrix.

## Priority Framework

### Assessment Questions

**Importance**: "这个任务对实现目标有多重要？"
- High: Directly impacts goal
- Medium: Contributes to goal
- Low: Nice to have

**Urgency**: "这个任务有多紧急？"
- High: Must complete soon, deadline
- Medium: Needs completion within period
- Low: Flexible

### Priority Matrix

|           | High Urgency | Medium Urgency | Low Urgency |
|-----------|--------------|----------------|--------------|
| High Importance | P1 | P1 | P2 |
| Medium Importance | P1 | P2 | P3 |
| Low Importance | P2 | P3 | P3 |

### Distribution Check

```
IF p1_count > 5 THEN
  "高优先级任务有点多哦，重新评估一下？"
  → REFINE
END IF

IF all_tasks_are_p1 THEN
  "如果所有事情都很重要，那就等于都不重要了 (｡•́︿•̀｡)"
  → REFINE
END IF
```

## Helper Questions

- "如果只能完成一个任务，你会选哪个？"
- "哪些任务是其他任务的前置条件？"

## Exit Conditions

- **Priorities set reasonably**: → FEASIBILITY_CHECK
- **Distribution unreasonable**: → REFINE

## Interactive Options

### Importance Assessment Options

当询问"这个任务对实现目标有多重要？"时，生成以下重要性选项：

**选项框架：**
- 非常重要（直接影响目标达成）
- 比较重要（有助于目标达成）
- 一般重要（锦上添花）

**提示词模板：**
```
为"这个任务对实现目标有多重要？"生成 3 个重要性选项：

选项要求：
- 覆盖不同重要性等级（非常重要/比较重要/一般）
- 简洁明了（每个不超过25字）

示例：
- 非常重要（直接影响目标）
- 比较重要（有助于目标）
- 一般重要（锦上添花）
```

### Urgency Assessment Options

当询问"这个任务有多紧急？"时，生成以下紧急度选项：

**选项框架：**
- 非常紧急（有明确deadline/必须在周期内完成）
- 比较紧急（需要在周期内完成）
- 不太紧急（可以灵活安排）

**提示词模板：**
```
为"这个任务有多紧急？"生成 3 个紧急度选项：

选项要求：
- 覆盖不同紧急度等级（非常紧急/比较紧急/不太紧急）
- 简洁明了（每个不超过30字）

示例：
- 非常紧急（有明确deadline）
- 比较紧急（周期内完成）
- 不太紧急（可以灵活安排）
```

### Task Count Options

当询问"安排几个任务？"时，生成以下任务数量选项：

**选项框架：**
- 3个（聚焦重点，简单清晰）
- 5个（平衡覆盖，适中节奏）
- 7个（全面分解，略多但可行）
- 其他/自定义输入

**提示词模板：**
```
为"这个周期安排几个任务？"生成 4 个任务数量选项：

选项要求：
- 覆盖不同数量（3/5/7个）
- 每个选项附带简短说明
- 简洁明了（每个不超过30字）

示例：
- 3个（聚焦重点）
- 5个（平衡覆盖）
- 7个（全面分解）
- [其他...自定义输入]
```

**选项设计原则：**
1. 重要性选项要覆盖不同等级
2. 紧急度选项要考虑deadline和周期限制
3. 任务数量选项要提供聚焦、平衡、全面三种策略

## Data Storage

```bash
opencoach data set tasks_priority '[
  {"id": 1, "priority": "P1", "importance": "high", "urgency": "high"},
  ...
]'
```

## State Update Command

```
opencoach state set create-task FEASIBILITY_CHECK
# OR
opencoach state set create-task REFINE
```
