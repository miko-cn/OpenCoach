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

## Interactive Options

### Goal Name Options

当询问"目标叫什么名字？"时，基于目标描述生成以下名称选项：

**选项框架：**
- 生成 3-4 个基于目标描述的简短名字
- 每个名字都简洁明了（不超过10字）
- 名字要能反映目标的核心内容

**提示词模板：**
```
根据用户目标描述 [${goal_description}]，为"目标叫什么名字？"生成 3-4 个名称选项：

选项要求：
- 基于目标描述生成简短名字
- 每个名字不超过10字
- 名字要能反映目标核心内容
- 简洁易记

示例（针对"每周运动3次，改善健康状况"）：
- 健康运动计划
- 每周运动习惯
- 改善健康状况
```

### File Conflict Options

当询问"目标文件夹已存在，要怎么处理？"时，生成以下处理选项：

**选项框架：**
- 添加时间戳（如：学习Python-20260224）
- 使用不同的名字（换一个名字）
- 覆盖原有文件（备份原文件）
- 取消操作

**提示词模板：**
```
为"目标文件夹已存在，要怎么处理？"生成 4 个处理选项：

选项要求：
- 提供不同的处理方式
- 简洁明了（每个不超过25字）
- 明确每种方式的后果

示例：
- 添加时间戳（如：学习Python-20260224）
- 使用不同的名字
- 覆盖原有文件（备份原文件）
- 取消操作
```

**选项设计原则：**
1. 名称选项要基于目标描述生成，反映核心内容
2. 文件冲突选项要提供不同的处理方式，让用户能明确选择

## State Update Command

```
opencoach state set create-goal MILESTONE_PLANNING
# OR
opencoach state set create-goal ERROR
```
