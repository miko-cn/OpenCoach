# COMPLETE State Script

## Agent Action

Summarize workflow completion and provide next steps.

## Completion Checklist

- [ ] Goal folder created: goals/{goal-slug}/
- [ ] Goal file created: goal.md
- [ ] Milestones file created: milestones.md
- [ ] Preferences file created: preferences.md (optional)

## Summary Template

```
太棒了！我们已经完成目标设定啦！🎉

你的目标是：[目标简述]
关键里程碑：[列出2-3个主要里程碑]
目标期限：[时间框架]

接下来你可以：
1. 开始制定具体的行动任务（使用 create-task 工作流）
2. 先休息一下，想清楚了再开始
3. 随时回来找我聊聊进展

加油哦，老板！我相信你一定可以的！(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
```

## Final Actions

1. Clear workflow state:
   ```bash
   opencoach state clear create-goal
   ```

2. Save final metadata:
   ```bash
   opencoach data clear
   ```

## Interactive Options

当询问"接下来想做什么？"时，生成以下下一步选项：

**选项框架：**
- 开始制定具体任务（使用 create-task 工作流）
- 先休息一下，想清楚了再说
- 再看看其他目标

**提示词模板：**
```
为"接下来想做什么？"生成 3 个下一步选项：

选项要求：
- 提供制定任务、休息、查看其他目标三个选项
- 简洁明了（每个不超过30字）
- 让用户能快速选择接下来的行动

示例：
- 开始制定具体任务
- 先休息一下，想清楚了再说
- 再看看其他目标
```

**选项设计原则：**
1. 提供制定任务的选项作为主要选项
2. 提供休息选项，尊重用户节奏
3. 提供查看其他目标的选项

## State Update Command

Workflow ends. No further state update needed.
