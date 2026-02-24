# PRE_CHECK State Script

## Agent Action

Verify prerequisites - goal.md and milestones.md exist.

## System Commands

```bash
# List goals
ls goals/

# Check for goal.md
ls goals/{goal-slug}/goal.md

# Check for milestones.md
ls goals/{goal-slug}/milestones.md

# Check if tasks.md already exists
ls goals/{goal-slug}/tasks.md
```

## Check Logic

```
IF goals/ directory does not exist THEN
  "哎呀，看起来你还没有创建目标呢 (｡•́︿•̀｡)"
  "我们需要先创建一个目标，才能制定任务哦！"
  → ERROR (redirect to create-goal)
END IF

IF multiple goal folders exist THEN
  List all goals
  Ask user to select → store selected goal
END IF

IF goal.md does not exist THEN
  → ERROR (redirect to create-goal)
END IF

IF milestones.md does not exist THEN
  Ask user: "我没找到里程碑文件，要不要先补充一下里程碑？"
  IF yes → ERROR (redirect to create-milestone)
  IF no → CONTINUE without milestones
END IF

IF tasks.md already exists THEN
  Ask: "已有任务清单，要：
  1. 创建新周期（归档旧任务）
  2. 更新现有任务
  3. 查看现有任务"
END IF
```

## Exit Conditions

- **All checks passed**: → CONTEXT_REVIEW
- **Missing prerequisites**: → ERROR

## Data Storage

```bash
opencoach data set goal_slug "..."
```

## State Update Command

```
opencoach state set create-task CONTEXT_REVIEW
# OR
opencoach state set create-task ERROR
```
