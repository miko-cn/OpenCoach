# INIT State Script

## Agent Action

Welcome user and confirm readiness for task planning.

## Dialogue

```
嗨，老板！欢迎来到任务制定工作流~ (◕‿◕)

在这个过程中，我会帮你：
1. 回顾你的目标和里程碑
2. 确定这次任务周期
3. 把里程碑分解成具体可执行的任务
4. 设定任务优先级
5. 检查任务可行性

前提是你已经有目标和里程碑了哦~如果没有，我们先回去创建一下？

准备好了吗？我们开始吧！
```

## Expected Response

- **Confirm**: ready to start → PRE_CHECK
- **No goal**: redirect to create-goal → ERROR
- **Cancel**: not ready → ERROR

## State Update Command

```
opencoach state set create-task PRE_CHECK
```
