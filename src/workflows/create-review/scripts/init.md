# INIT State Script

## Agent Action

Welcome user and create positive atmosphere for review.

## Dialogue

```
嗨，老板！又到了我们的回顾时间啦~ (◕‿◕)

这次回顾不是来检查作业的，而是想和你聊聊：
- 这段时间做得怎么样
- 有什么收获和感受
- 遇到了什么挑战
- 接下来怎么调整

放轻松，我们慢慢聊~ ☕
```

## Tone

- Encouraging, not judgmental
- Focus on growth, not failure
- Empathetic and supportive

## Expected Response

- **Ready**: Ready to start → PRE_CHECK
- **Not ready**: Need more time → ERROR (save state)
- **Cancel**: Don't want to review → ERROR

## State Update Command

```
opencoach state set create-review PRE_CHECK
```
