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

## Interactive Options

当询问"准备好了吗？我们开始吧！"时，生成以下准备状态选项：

**选项框架：**
- 准备好了，开始吧！
- 稍后再来（现在不太方便）
- 还没目标，先去创建目标

**提示词模板：**
```
为"准备好了吗？我们开始吧！"生成 3 个准备状态选项：

选项要求：
- 提供开始、稍后、创建目标三个选项
- 简洁明了（每个不超过20字）

示例：
- 准备好了，开始吧！
- 稍后再来
- 还没目标，先去创建
```

**选项设计原则：**
1. 提供明确的开始选项
2. 提供稍后选项
3. 提供创建目标的选项，因为这是前置条件

## State Update Command

```
opencoach state set create-task PRE_CHECK
```
