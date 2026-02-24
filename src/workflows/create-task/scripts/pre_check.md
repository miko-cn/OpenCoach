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

## Interactive Options

### Goal Selection Options

当询问"选择哪个目标？"时，列出所有现有目标作为选项：

**选项框架：**
- 列出前5个已有目标（如果有）
- 提供"取消"选项

**提示词模板：**
```
为"选择哪个目标？"生成选项：

选项要求：
- 列出所有现有目标（最多5个）
- 每个选项简短明了（不超过30字）
- 提供"取消"选项

示例：
- 学习Python编程
- 每周运动3次
- 提升英语口语
- [其他...取消]
```

### Existing Tasks Options

当询问"已有任务清单，要如何处理？"时，生成以下处理选项：

**选项框架：**
- 创建新周期（归档旧任务）
- 更新现有任务
- 查看现有任务

**提示词模板：**
```
为"已有任务清单，要如何处理？"生成 3 个处理选项：

选项要求：
- 提供新周期、更新、查看三个选项
- 简洁明了（每个不超过25字）

示例：
- 创建新周期（归档旧任务）
- 更新现有任务
- 查看现有任务
```

**选项设计原则：**
1. 目标选择选项要列出所有现有目标，让用户能快速选择
2. 已有任务处理选项要提供新周期、更新、查看三种主要方式

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
