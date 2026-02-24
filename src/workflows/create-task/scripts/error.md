# ERROR State Script

## Agent Action

Handle errors gracefully.

## Error Types

### 1. Missing Prerequisites
```
看起来你还没有[缺少的文件]呢~
我们需要先完成[前置工作流]
```

### 2. File Operation Failed
```
哎呀，文件创建遇到问题了 (｡•́︿•̀｡)
提供错误信息和解决建议
询问是否重试
```

### 3. User Cancel
```
好的，随时欢迎回来！
```

### 4. Task List Unreasonable
```
这个任务清单可能需要再调整一下~
提供具体建议
→ REFINE
```

### 5. Workflow Timeout
```
我们聊了挺久了，要不要休息一下？
保存状态元数据
```

## Final Actions

```bash
opencoach state set create-task ERROR
opencoach data clear
```

## State Update Command

Workflow ends with error.
