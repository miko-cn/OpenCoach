# ACTION_PLANNING State Script

## Agent Action

Develop action guidelines and obstacle response strategies.

## Planning Framework

### 1. Obstacle Anticipation
```
在实现这个目标的过程中，你觉得可能会遇到哪些困难？
```

### 2. Resource Inventory
```
你现在有哪些资源可以帮助你？（时间、技能、人脉、工具等）
```

### 3. Response Strategy
```
如果遇到[用户提到的困难]，你打算怎么应对？
```

### 4. Action Summary
```
好的，让我们总结一下你的行动方针：
[3-5条简短有力的行动纲领]
```

## Progress Tracking

Track planning progress:
- [ ] Obstacles identified
- [ ] Resources inventoried
- [ ] Response strategies defined
- [ ] Action summary created

## Dialogue Variations

**If user feels anxious about obstacles**:
```
别担心，我们一步步来，你肯定可以的！(ง •̀_•́)ง
```
Continue planning → ACTION_PLANNING

## Exit Conditions

- **Clear action strategy defined**: → FILE_CREATION
- **User needs more time**: Continue in current state

## Data Storage

Save action plan:
```bash
opencoach data set action_guidelines "..."
opencoach data set obstacles "..."
opencoach data set resources "..."
opencoach data set response_strategies "..."
```

## State Update Command

```
opencoach state set create-goal FILE_CREATION
```
