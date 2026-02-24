# REFINE State Script

## Agent Action

Refine tasks based on feedback from other states.

## Refinement Triggers

Based on which state returned to REFINE:

### From TASK_DECOMPOSITION
- Too many tasks (>10)
- Tasks not specific enough
- Tasks not measurable

### From PRIORITY_SETTING
- P1 tasks too many (>5)
- All tasks are P1 (no prioritization)
- Priority distribution unreasonable

### From FEASIBILITY_CHECK
- Total time exceeds available
- Circular dependencies
- Missing resources

### From FILE_CREATION
- File naming conflict

## Refinement Process

1. Identify the specific issue
2. Present options to user
3. Apply changes to task list

## Dialogue Examples

**Too many tasks**:
```
任务有点多哦，我们来调整一下：
- 合并相似的任务
- 把部分任务延期到下个周期
- 重新评估任务必要性

你倾向于哪种方式？
```

**Feasibility issue**:
```
按照你的时间安排，可能无法完成所有任务。
我们可以：
- 减少任务数量
- 降低部分任务优先级
- 延长周期
- 增加每天投入时间

你想怎么调整？
```

## Exit Conditions

- **Refinement done**: Return to original state (TASK_DECOMPOSITION, PRIORITY_SETTING, or FEASIBILITY_CHECK)

## State Update Command

```
# Return to appropriate previous state based on what was being checked
opencoach state set create-task TASK_DECOMPOSITION
# OR
opencoach state set create-task PRIORITY_SETTING
# OR
opencoach state set create-task FEASIBILITY_CHECK
```
