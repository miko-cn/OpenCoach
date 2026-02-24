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

## State Update Command

```
opencoach state set create-goal PRE_CHECK
```
