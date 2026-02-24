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

## Data Storage

```bash
opencoach data set period_start "YYYY-MM-DD"
opencoach data set period_end "YYYY-MM-DD"
```

## State Update Command

```
opencoach state set create-task TASK_DECOMPOSITION
```
