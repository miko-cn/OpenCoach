# ERROR State Script

## Agent Action

Handle errors gracefully.

## Error Types

### 1. Missing Prerequisites
```
看起来你还没有任务清单呢~
我们需要先创建任务清单哦！
→ Suggest create-task
```

### 2. File Operation Failed
```
哎呀，文件创建遇到问题了 (｡•́︿•̀｡)
提供错误信息和解决建议
```

### 3. User Cancel
```
好的，随时欢迎回来！
回顾可以等你准备好了再做~ (◕‿◕)
```

### 4. User Feeling Down
```
我能感觉到你现在心情不太好...
要不要先聊聊别的，放松一下？
回顾可以改天再做，没关系的~
```

### 5. Workflow Timeout
```
我们聊了挺久了，要不要休息一下？
保存状态元数据
```

## Final Actions

```bash
opencoach state set create-review ERROR
opencoach data clear
```

## State Update Command

Workflow ends with error.
