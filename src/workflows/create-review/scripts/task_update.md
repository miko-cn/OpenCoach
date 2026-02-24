# TASK_UPDATE State Script

## Agent Action

Update task statuses based on review.

## Update Scenarios

### Tasks Archived
If all tasks completed and archived:
```
tasks.md 已归档到 archives/
→ NEXT_CYCLE_PLANNING
```

### Tasks Continue
If continuing with current tasks:

1. Update task statuses (based on review)
2. Adjust priorities (if needed)
3. Update due dates (if adjusted)
4. Add task notes (important info)
5. Update next review date

### Confirmation Dialogue

```
我已经更新了任务清单：
- 已完成任务：[列表]
- 调整后的任务：[列表]
- 下次评估时间：[日期]

确认一下，这样可以吗？
```

## Exit Conditions

- **Tasks archived**: → NEXT_CYCLE_PLANNING
- **Tasks updated**: → COMPLETE

## State Update Command

```
opencoach state set create-review NEXT_CYCLE_PLANNING
# OR
opencoach state set create-review COMPLETE
```
