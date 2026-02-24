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
