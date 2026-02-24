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

## Interactive Options

当询问"要把当前清单归档，开始新周期吗？还是继续完成剩余任务？"时，生成以下归档选项：

**选项框架：**
- 归档并开始新周期（之前的任务存档）
- 继续完成剩余任务（不归档）
- 先不归档，更新一下任务

**提示词模板：**
```
为"要把当前清单归档，开始新周期吗？还是继续完成剩余任务？"生成 3 个归档选项：

选项要求：
- 提供归档、继续、更新三个选项
- 简洁明了（每个不超过30字）

示例：
- 归档并开始新周期
- 继续完成剩余任务
- 先不归档，更新一下
```

**选项设计原则：**
1. 提供归档选项，方便开启新周期
2. 提供继续选项，保留现有任务
3. 提供更新选项，调整现有任务

## State Update Command

```
opencoach state set create-review FILE_CREATION
# OR
opencoach state set create-review TASK_UPDATE
```
