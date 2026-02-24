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

## State Update Command

Workflow ends.
