# TRACKING_SETUP State Script

## Agent Action

Set up task tracking schedule and review frequency.

## Tracking Configuration

### 1. Review Frequency
```
你打算多久回顾一次任务进度呢？
```

Suggested frequency:
- Short period (<2 weeks): every 3-5 days
- Medium period (2 weeks-1 month): weekly
- Long period (>1 month): bi-weekly

### 2. Next Review Date
```
那我们下次回顾的时间定在[建议日期]，可以吗？
```

### 3. Reminder Options
```
需要我提醒你吗？
```

### 4. Status Update Guide
```
你可以随时更新 tasks.md 中的任务状态：
- TODO: 待办
- IN_PROGRESS: 进行中
- DONE: 已完成
- BLOCKED: 受阻

如果遇到困难，随时来找我聊聊！
```

## Save to File

Write next review date to tasks.md.

## Exit Conditions

- **Setup complete**: → COMPLETE

## Interactive Options

### Review Frequency Options

当询问"多久回顾一次任务？"时，根据周期长度生成以下频率选项：

**选项框架：**
- 每天回顾（适合短周期<1周）
- 每周回顾（适合中等周期1-4周）
- 周期结束再看（适合长周期>1个月）
- 看情况，灵活调整

**提示词模板：**
```
根据周期长度 [${period_length}]，为"多久回顾一次任务？"生成 4 个回顾频率选项：

选项要求：
- 覆盖不同频率（每天/每周/周期结束/灵活）
- 结合周期长度给出建议
- 简洁明了（每个不超过25字）

示例：
- 每天回顾
- 每周回顾
- 周期结束再看
- 看情况，灵活调整
```

### Reminder Options

当询问"需要我提醒你吗？"时，生成以下提醒选项：

**选项框架：**
- 需要，请提醒我
- 不需要，我自己会记得
- 看情况，有时候提醒一下

**提示词模板：**
```
为"需要我提醒你吗？"生成 3 个提醒选项：

选项要求：
- 覆盖需要、不需要、有时需要三个选项
- 简洁明了（每个不超过20字）

示例：
- 需要，请提醒我
- 不需要，我自己会记得
- 看情况，有时候提醒
```

**选项设计原则：**
1. 回顾频率选项要结合周期长度给出建议
2. 提醒选项要覆盖不同的需求
3. 提供灵活选项，给用户选择空间

## State Update Command

```
opencoach state set create-task COMPLETE
```
