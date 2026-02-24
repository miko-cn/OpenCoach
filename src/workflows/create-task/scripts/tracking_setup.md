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

## State Update Command

```
opencoach state set create-task COMPLETE
```
