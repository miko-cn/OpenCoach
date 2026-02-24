# PERIOD_DEFINITION State Script

## Agent Action

Define the task planning period with the user.

## Period Suggestion Logic

```
1. Check preferences.md for user preference
   IF has preference → use that period length

2. Check milestones.md for near-term milestone
   IF has near milestone → suggest period until that date

3. Default: suggest 2 weeks or 1 month
```

## Dialogue

```
这次任务清单的周期是多久呢？
我建议是[建议周期]，你觉得呢？
```

## Period Validation

```
IF period < 3 days THEN
  "周期有点短哦，可能来不及完成太多任务 (｡•́︿•̀｡)"
  Suggest longer period
END IF

IF period > 3 months THEN
  "周期有点长呢，建议分成几个小周期，这样更容易跟踪进度~"
  Suggest shorter period
END IF
```

## Date Format

Ensure dates are in YYYY-MM-DD format.

## Exit Conditions

- **Period defined**: → TASK_DECOMPOSITION

## Interactive Options

当询问"这次任务清单的周期是多久呢？"时，生成以下周期选项：

**选项框架：**
- 1周（快速冲刺，短期目标）
- 2周（标准周期，适中的节奏）
- 1个月（深度推进，长期目标）
- 其他/自定义输入

**提示词模板：**
```
为"这次任务清单的周期是多久呢？"生成 4 个周期选项：

选项要求：
- 覆盖不同周期长度（1周/2周/1个月）
- 每个选项附带简短说明
- 简洁明了（每个不超过25字）

示例：
- 1周（快速冲刺）
- 2周（标准周期）
- 1个月（深度推进）
- [其他...自定义输入]
```

**选项设计原则：**
1. 提供不同长度的周期选项
2. 每个选项附带简短说明，让用户理解各选项的特点
3. 提供自定义输入选项

## Data Storage

```bash
opencoach data set period_start "YYYY-MM-DD"
opencoach data set period_end "YYYY-MM-DD"
```

## State Update Command

```
opencoach state set create-task TASK_DECOMPOSITION
```
