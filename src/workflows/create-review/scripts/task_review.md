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

## Interactive Options

### Completion Rate Assessment Options

当询问"这次任务完成情况如何？"时，生成以下完成率选项：

**选项框架：**
- 全部完成（100%，太棒了）
- 大部分完成（80%以上，不错）
- 完成一半（50%左右，有进展）
- 完成较少（20%以下，有困难）
- 都没完成（需要好好聊聊）

**提示词模板：**
```
为"这次任务完成情况如何？"生成 5 个完成率选项：

选项要求：
- 覆盖不同完成率（100%/80%/50%/20%/0%）
- 每个选项附带简短说明
- 简洁明了（每个不超过25字）

示例：
- 全部完成（100%，太棒了）
- 大部分完成（80%以上）
- 完成一半（50%左右）
- 完成较少（20%以下）
- 都没完成（需要好好聊聊）
```

### Unfinished Task Handling Options

当询问"未完成的任务要怎么处理？"时，生成以下处理选项：

**选项框架：**
- 取消，不再需要（这个任务不再重要）
- 移到下一个周期（继续完成）
- 调整后继续（改改内容/优先级）
- 先保留，再说（暂时不改）

**提示词模板：**
```
为"未完成的任务要怎么处理？"生成 4 个处理选项：

选项要求：
- 提供取消、移动、调整、保留四个选项
- 简洁明了（每个不超过25字）

示例：
- 取消，不再需要
- 移到下一个周期
- 调整后继续
- 先保留，再说
```

**选项设计原则：**
1. 完成率选项要覆盖不同完成情况
2. 未完成任务处理选项要提供不同的处理方式

## State Update Command

```
opencoach state set create-review CHALLENGE_DISCUSSION
# OR
opencoach state set create-review EXPERIENCE_SUMMARY
```
