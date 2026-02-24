# IMPORTANCE_EXPLORATION State Script

## Agent Action

Explore the importance and intrinsic motivation behind the goal.

## Exploration Framework

### 1. Personal Significance
```
这个目标对你来说意味着什么？为什么现在想要实现它？
```

### 2. Values Alignment
```
实现这个目标会让你成为什么样的人？这和你的价值观有什么联系？
```

### 3. Motivation Source
```
是什么让你对这个目标充满动力？是内心的渴望还是外部的期待？
```

### 4. Obstacle History
```
之前有没有尝试过类似的目标？如果有，是什么阻碍了你？
```

## Progress Tracking

Track which dimensions have been explored:
- [ ] Personal significance discussed
- [ ] Values alignment explored
- [ ] Motivation source identified
- [ ] Past obstacles acknowledged

## Dialogue Variations

**If user mainly cites external reasons** (external motivation):
```
除了[外部原因]，这个目标对你个人有什么意义呢？
```
Continue exploring → IMPORTANCE_EXPLORATION (loop)

**If user realizes goal is not important**:
```
看起来这个目标可能不是你真正想要的，要不要重新想想？
```
→ GOAL_ELICITATION (restart)

## Exit Conditions

- **Clear intrinsic motivation**: Save importance/motivation → SMART_EVALUATION
- **Mainly external motivation**: Continue exploration
- **Goal not important**: Restart goal elicitation

## Data Storage

Save motivation data:
```bash
opencoach data set importance "..."
opencoach data set motivation_source "internal|external|both"
```

## State Update Command

```
opencoach state set create-goal SMART_EVALUATION
# OR
opencoach state set create-goal GOAL_ELICITATION
```
