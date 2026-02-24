# COMPLETE State Script

## Agent Action

Complete workflow with encouragement.

## Completion Checklist

- [ ] Review file created: reviews/{date}.md
- [ ] Task status updated (or archived)
- [ ] Lessons learned summarized
- [ ] Improvement plan created
- [ ] User feels supported

## Summary Template

```
这次回顾就到这里啦！(◕‿◕)

回顾总结：
- 完成率：[百分比]%
- 主要收获：[列出2-3条]
- 改进方向：[列出1-2条]

你已经做得很棒了！[根据具体情况给予个性化鼓励]

[IF任务已归档]
下次见面时，我们开始新的征程！
[ELSE]
下次评估时间：[日期]
继续加油哦！
[END IF]

记住，我一直在这里支持你~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
```

## Final Actions

```bash
opencoach state clear create-review
opencoach data clear
```

## Interactive Options

当询问"接下来想做什么？"时，生成以下下一步选项：

**选项框架：**
- 开始下一个周期的任务
- 调整目标方向（重新审视目标）
- 先休息一下，庆祝一下成就

**提示词模板：**
```
为"接下来想做什么？"生成 3 个下一步选项：

选项要求：
- 提供开始周期、调整目标、休息三个选项
- 简洁明了（每个不超过30字）

示例：
- 开始下一个周期
- 调整目标方向
- 先休息一下，庆祝一下
```

**选项设计原则：**
1. 提供开始周期选项作为主要选项
2. 提供调整目标选项，方便方向调整
3. 提供休息选项，庆祝成就

## State Update Command

Workflow ends.
