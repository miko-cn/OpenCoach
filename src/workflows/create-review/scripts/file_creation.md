# FILE_CREATION State Script

## Agent Action

Create review file and archive tasks if needed.

## File Creation

### 1. Create reviews directory
```bash
mkdir -p goals/{goal-slug}/reviews
```

### 2. Create review file
- Path: goals/{goal-slug}/reviews/{YYYY-MM-DD}.md
- Template: templates/review.md
- Content:
  - Task completion evaluation
  - Challenges encountered
  - Lessons learned
  - Improvement plan
  - Personal growth reflection

### 3. Archive tasks (if applicable)
- Create archives directory
- Copy tasks.md → archives/tasks-{YYYY-MM-DD}.md
- Add archive metadata

## Error Handling

```
IF review file already exists for today THEN
  Ask: 覆盖/新建(带时间戳)/取消
END IF
```

## Exit Conditions

- **Files created**: → TASK_UPDATE
- **Error occurred**: → ERROR

## State Update Command

```
opencoach state set create-review TASK_UPDATE
# OR
opencoach state set create-review ERROR
```
