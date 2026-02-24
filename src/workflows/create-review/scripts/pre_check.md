# PRE_CHECK State Script

## Agent Action

Verify tasks.md exists and check timing.

## System Commands

```bash
# Check tasks.md exists
ls goals/{goal-slug}/tasks.md

# Read tasks
cat goals/{goal-slug}/tasks.md
```

## Check Logic

```
IF tasks.md does not exist THEN
  "咦，我没找到任务清单呢 (｡•́︿•̀｡)"
  → ERROR (redirect to create-task)
END IF

IF tasks.md is empty THEN
  "任务清单是空的哦，看起来还没有开始制定任务~"
  → ERROR
END IF

# Check next review date
IF current_date < next_review_date THEN
  Ask: "还没到回顾时间呢，是要提前回顾还是调整任务？"
  IF提前回顾 → TASK_REVIEW
  IF调整任务 → TASK_UPDATE
ELSE
  → TASK_REVIEW
END IF
```

## Exit Conditions

- **Check passed**: → TASK_REVIEW
- **No tasks**: → ERROR
- **User wants to adjust**: → TASK_UPDATE

## Interactive Options

### Early Review Options

当询问"还没到回顾时间，要提前回顾还是调整任务？"时，生成以下选项：

**选项框架：**
- 提前回顾（现在就开始）
- 调整任务（不回顾，直接改）
- 取消操作（稍后再说）

**提示词模板：**
```
为"还没到回顾时间，要提前回顾还是调整任务？"生成 3 个选项：

选项要求：
- 提供提前回顾、调整任务、取消三个选项
- 简洁明了（每个不超过25字）

示例：
- 提前回顾
- 调整任务
- 取消操作
```

**选项设计原则：**
1. 提供提前回顾选项
2. 提供调整任务选项，方便直接改
3. 提供取消选项，尊重用户选择

## State Update Command

```
opencoach state set create-review TASK_REVIEW
# OR
opencoach state set create-review ERROR
```
