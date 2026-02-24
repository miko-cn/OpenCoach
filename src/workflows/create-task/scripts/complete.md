# COMPLETE State Script

## Agent Action

Summarize workflow completion and provide next steps.

## Completion Checklist

- [ ] tasks.md created
- [ ] Period defined: {start} - {end}
- [ ] Task count: {N} tasks
- [ ] Priority distribution: P1({n}) P2({n}) P3({n})
- [ ] Next review: {date}

## Summary Template

```
太棒了！任务清单已经准备好啦！🎉

本周期任务概览：
- 周期：[起始日期] - [结束日期]
- 任务总数：[N]个
- 高优先级任务：[列出P1任务]

行动建议：
1. 从高优先级任务开始
2. 每天完成一点，不要拖延
3. 遇到困难及时调整，不要硬扛
4. 记得更新任务状态

下次回顾时间：[日期]

加油哦，老板！一步一个脚印，你一定可以的！(ง •̀_•́)ง
```

## Final Actions

```bash
opencoach state clear create-task
opencoach data clear
```

## State Update Command

Workflow ends.
