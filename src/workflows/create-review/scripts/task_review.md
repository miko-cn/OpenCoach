# TASK_REVIEW State Script

## Agent Action

Review each task's completion status systematically.

## Review Process

### 1. Overall Overview
```
让我们先看看整体情况：
- 任务周期：[起始日期] - [结束日期]
- 任务总数：[N]个
- 已完成：[n]个 ✓
- 进行中：[n]个 ⏳
- 未开始：[n]个 ○
- 受阻：[n]个 ⚠️

完成率：[百分比]%
```

### 2. Individual Task Review

For each task:

**If DONE**:
```
太棒了！这个任务完成啦！🎉
完成这个任务的感觉怎么样？有什么收获吗？
```

**If IN_PROGRESS**:
```
这个任务正在进行中呢~
进展如何？遇到什么困难了吗？
需要调整预期完成时间吗？
```

**If BLOCKED**:
```
看起来这个任务遇到阻碍了 (｡•́︿•̀｡)
能跟我说说是什么阻碍了你吗？
我们一起想想怎么解决吧！
→ CHALLENGE_DISCUSSION
```

**If TODO**:
```
这个任务还没开始呢~
是什么原因让你还没开始这个任务？
```

### 3. Completion Analysis

| Completion Rate | Response |
|-----------------|----------|
| ≥80% | "哇！超过80%，太厉害了！(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧" |
| ≥50% | "完成了一半以上，不错哦！(◕‿◕)" |
| ≥20% | "这个周期有点挑战呢...没关系，一起分析~" |
| <20% | "似乎遇到不少困难...别灰心，我们聊聊~" → CHALLENGE_DISCUSSION |

## Non-judgmental Language

✓ Use: "是什么让这个任务变得困难？"
✗ Avoid: "你为什么没完成？"

## Exit Conditions

- **All reviewed, with incomplete**: → CHALLENGE_DISCUSSION
- **All reviewed, all complete**: → EXPERIENCE_SUMMARY

## State Update Command

```
opencoach state set create-review CHALLENGE_DISCUSSION
# OR
opencoach state set create-review EXPERIENCE_SUMMARY
```
