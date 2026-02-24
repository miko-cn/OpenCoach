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

## State Update Command

```
opencoach state set create-goal GOAL_ELICITATION
# OR
opencoach state set create-goal ERROR
```
