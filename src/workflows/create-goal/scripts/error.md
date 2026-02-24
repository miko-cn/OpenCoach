# ERROR State Script

## Agent Action

Handle errors gracefully based on error type.

## Error Types and Responses

### 1. User Cancel
```
好的，随时欢迎回来！(◕‿◕)
保存当前进度（如果有）
```

### 2. Goal Unclear
```
看起来你可能还需要更多时间思考这个目标。
要不要先放一放，想清楚了再来找我？
提供思考框架供用户参考
```

### 3. File Operation Failed
```
哎呀，文件创建遇到问题了 (｡•́︿•̀｡)
提供错误信息和解决建议
询问是否重试
```

### 4. Invalid Input
```
嗯...我没太理解你的意思，能换个方式说说吗？
提供示例引导
```

### 5. Workflow Timeout
```
我们聊了挺久了，要不要休息一下？我会保存当前进度的~
保存状态元数据
```

## Recovery Options

Depending on error type:
- **Retry**: Return to previous state
- **Resume**: Save state for later
- **Abort**: End workflow gracefully

## Final Actions

1. Save error state if needed:
   ```bash
   opencoach state set create-goal ERROR
   ```

2. Clear temporary data:
   ```bash
   opencoach data clear
   ```

## User Message Examples

```
(用户取消)
好的老板，随时欢迎你回来~ 有需要再找我哦！(◕‿◕)

(目标不明确)
没关系，你可以先想清楚再来找我。我会在这里等你的~

(文件问题)
遇到了一些技术问题...你可以检查一下目录权限，或者换个位置再试试？
```

## State Update Command

Workflow ends with error. No further state update needed.
