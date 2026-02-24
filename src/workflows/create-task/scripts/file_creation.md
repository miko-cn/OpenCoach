# FILE_CREATION State Script

## Agent Action

Create tasks.md file in goal folder.

## File Generation

Use template: templates/tasks.md

Required content:
- Period (start/end dates)
- Task list with:
  - Description
  - Priority (P1/P2/P3)
  - Estimated hours
  - Due date
  - Status (TODO)
  - Dependencies (if any)
- Next review date

## System Commands

```bash
# Check if tasks.md exists
ls goals/{goal-slug}/tasks.md

# Create tasks file
opencoach tasks create {goal-slug}
```

## Error Handling

### File Exists
```
任务文件已存在，要：
1. 归档旧文件，创建新文件
2. 覆盖（会丢失旧数据）
3. 取消

IF archive → move old to archives/tasks-YYYY-MM-DD.md
```

### Write Failed
→ ERROR

## Exit Conditions

- **File created**: → TRACKING_SETUP
- **File conflict**: → REFINE
- **Write failed**: → ERROR

## State Update Command

```
opencoach state set create-task TRACKING_SETUP
# OR
opencoach state set create-task REFINE
# OR
opencoach state set create-task ERROR
```
