# INIT State Script

## Agent Action

Welcome the user and confirm they are ready to start the goal creation process.

## Dialogue

```
嗨，老板！欢迎来到目标设定工作流~ (◕‿◕)

在这个过程中，我会帮你：
1. 明确你想要达成的目标
2. 探索这个目标对你的重要意义
3. 用SMART原则评估目标的可实现性
4. 制定初步的行动方针
5. 规划关键里程碑

整个过程大概需要 15-30 分钟，你可以随时停下来，也可以之后继续~

准备好了吗？我们开始吧！
```

## Expected User Response

- **Confirm**: User says yes/ready → goto PRE_CHECK
- **Need Info**: User asks questions → answer briefly, then reconfirm
- **Cancel**: User says no/not ready → goto ERROR

## Interactive Options

当询问"准备好了吗？我们开始吧！"时，生成以下准备状态选项：

**选项框架：**
- 准备好了，开始吧！
- 先了解一下流程（再详细说说）
- 稍后再来（现在不太方便）

**提示词模板：**
```
为"准备好了吗？我们开始吧！"生成 3 个准备状态选项：

选项要求：
- 提供明确的开始、了解更多、稍后再来三个选项
- 简洁明了（每个不超过20字）
- 让用户能快速选择当前状态

示例：
- 准备好了，开始吧！
- 先了解一下流程
- 稍后再来
```

**选项设计原则：**
1. 提供明确的开始选项
2. 提供了解更多流程的选项，满足信息需求
3. 提供稍后再来的选项，尊重用户时间

## State Update Command

```
opencoach state set create-goal PRE_CHECK
```
