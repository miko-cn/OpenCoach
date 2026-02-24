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

## Interactive Options

当询问"准备好开始回顾了吗？"时，生成以下准备状态选项：

**选项框架：**
- 准备好了，开始吧！
- 还没准备好，稍后再来
- 我不想回顾，先算了

**提示词模板：**
```
为"准备好开始回顾了吗？"生成 3 个准备状态选项：

选项要求：
- 提供开始、稍后、取消三个选项
- 简洁明了（每个不超过20字）

示例：
- 准备好了，开始吧！
- 还没准备好，稍后再来
- 我不想回顾
```

**选项设计原则：**
1. 提供明确的开始选项
2. 提供稍后选项，给用户缓冲时间
3. 提供取消选项，尊重用户选择

## State Update Command

```
opencoach state set create-review PRE_CHECK
```
