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

## Interactive Options

### File Exists Options

当询问"任务文件已存在，如何处理？"时，生成以下处理选项：

**选项框架：**
- 归档旧文件，创建新文件（保留历史）
- 覆盖（会丢失旧数据）
- 取消操作

**提示词模板：**
```
为"任务文件已存在，如何处理？"生成 3 个处理选项：

选项要求：
- 提供归档、覆盖、取消三个选项
- 简洁明了（每个不超过30字）
- 明确每种方式的后果

示例：
- 归档旧文件，创建新文件
- 覆盖（会丢失旧数据）
- 取消操作
```

**选项设计原则：**
1. 提供归档选项，保护用户数据
2. 明确警告覆盖的风险
3. 提供取消选项，让用户能改变主意

## State Update Command

```
opencoach state set create-task TRACKING_SETUP
# OR
opencoach state set create-task REFINE
# OR
opencoach state set create-task ERROR
```
