# ARCHIVE_DECISION State Script

## Agent Action

Decide whether to archive current task list.

## Decision Logic

Calculate completion rate: completed_tasks / total_tasks

### Scenarios

**100% completion**:
```
所有任务都完成啦！太棒了！🎉
我们把这个任务清单归档吧~
→ Archive (automatic)
```

**≥80% + remaining are low priority**:
```
大部分任务都完成了，剩下的都是低优先级任务。
要把当前清单归档，开始新周期吗？
还是继续完成剩余任务？
→ User choice
```

**<80%**:
```
还有一些任务没完成呢，我们更新一下任务清单吧~
→ Continue (no archive)
```

## Exit Conditions

- **Archive decided**: → FILE_CREATION
- **Continue decided**: → TASK_UPDATE

## State Update Command

```
opencoach state set create-review FILE_CREATION
# OR
opencoach state set create-review TASK_UPDATE
```
