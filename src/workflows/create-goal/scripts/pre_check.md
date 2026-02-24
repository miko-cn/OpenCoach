# PRE_CHECK State Script

## Agent Action

Check prerequisites and scan for existing goals.

## System Commands

```bash
# Check if goals directory exists
ls -la goals/

# Scan existing goals
ls goals/
```

## Dialogue

If goals/ does not exist:
```
我注意到你还没有目标目录，我来帮你创建一个~
```

If existing goals found:
```
我看到你已经有一些目标了：
{{goal_list}}

要创建新目标，还是更新现有的？
```

## Conditions

- **goals/ exists**: → GOAL_ELICITATION
- **goals/ does not exist**: create it → GOAL_ELICITATION
- **similar goal found**: ask user to clarify → determine next step

## Interactive Options

当询问"要创建新目标，还是更新现有的？"时，生成以下选项：

**选项框架：**
- 创建新目标（全新开始）
- 更新现有目标 [列出已有目标]
- 先看看我有什么目标（查看现有目标）

**提示词模板：**
```
为"要创建新目标，还是更新现有的？"生成选项：

选项要求：
- 如果有现有目标，列出前3-5个已有目标作为选项
- 提供"创建新目标"选项
- 提供"先看看现有目标"选项
- 每个选项简洁明了（不超过30字）

示例（如果有现有目标）：
- 创建新目标（全新开始）
- 更新"学习Python"目标
- 更新"每周运动"目标
- 先看看我有什么目标

示例（如果没有现有目标）：
- 创建新目标（全新开始）
```

**选项设计原则：**
1. 如果有现有目标，列出前3-5个作为选项
2. 提供"创建新目标"作为主要选项
3. 提供"先看看现有目标"选项，让用户能了解现状

## State Update Command

```
opencoach state set create-goal GOAL_ELICITATION
# OR
opencoach state set create-goal ERROR
```
