# FILE_CREATION State Script

## Agent Action

Create goal folder and generate goal.md file.

## Folder Naming Rules

1. Extract goal keywords (English)
2. Convert to lowercase
3. Use hyphens to connect
4. Example: "学习Python编程" → "learn-python-programming"

## System Commands

```bash
# Create goal folder
mkdir -p goals/{goal-slug}

# Generate goal.md from template
# Use opencoach goals create command
opencoach goals create "{goal-name}"
```

## File Creation Process

1. Generate goal slug from name
2. Create goals/{slug}/ directory
3. Create goal.md using template
4. Populate with collected data:
   - Goal description
   - Importance and motivation
   - SMART evaluation results
   - Action guidelines

## Error Handling

### File Conflict
```
IF folder already exists THEN
  询问用户：
  - "要重命名吗？" (添加时间戳)
  - "要覆盖吗？" (备份原文件)
  - "要取消吗？"
END IF
```

### Write Failure
```
哎呀，文件创建遇到问题了 (｡•́︿•̀｡)
提示用户检查权限或磁盘空间
→ ERROR
```

## Exit Conditions

- **File created successfully**: → MILESTONE_PLANNING
- **File conflict**: → CLARIFY (resolve naming)
- **File write failed**: → ERROR

## State Update Command

```
opencoach state set create-goal MILESTONE_PLANNING
# OR
opencoach state set create-goal ERROR
```
