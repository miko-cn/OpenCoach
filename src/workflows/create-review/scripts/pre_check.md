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

## State Update Command

```
opencoach state set create-review TASK_REVIEW
# OR
opencoach state set create-review ERROR
```
