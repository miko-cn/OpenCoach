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

## Interactive Options

当询问"接下来想做什么？"时，生成以下下一步选项：

**选项框架：**
- 开始执行任务（开始工作）
- 再规划另一个周期（为下个阶段做准备）
- 先休息一下（调整状态）

**提示词模板：**
```
为"接下来想做什么？"生成 3 个下一步选项：

选项要求：
- 提供执行、规划、休息三个选项
- 简洁明了（每个不超过25字）

示例：
- 开始执行任务
- 再规划另一个周期
- 先休息一下
```

**选项设计原则：**
1. 提供执行选项作为主要选项
2. 提供规划选项，方便连续工作
3. 提供休息选项，尊重用户节奏

## State Update Command

Workflow ends.
