# SMART_EVALUATION State Script

## Agent Action

Evaluate the goal against SMART principles systematically.

## Evaluation Framework

### 1. Specific (具体性)
```
目标是否明确具体？
```
- IF not specific: "我们需要让目标更具体一些。比如，[给出具体化建议]"
- → CLARIFY

### 2. Measurable (可衡量性)
```
我们怎么知道你达成这个目标了？有什么可以衡量的标准吗？
```
- IF cannot measure: Assist in setting measurable criteria
- → CLARIFY

### 3. Achievable (可实现性)
```
以你现在的资源和能力，这个目标实现起来难度如何？1-10分你会打几分？
```
- IF difficulty > 8: "这个目标挑战性很大哦！我们要不要调整一下，或者分阶段实现？"
- IF difficulty < 3: "这个目标对你来说似乎太简单了，要不要设定更有挑战性的？"
- → CLARIFY

### 4. Relevant (相关性)
```
这个目标和你当前的生活重心、长期规划有什么关系？
```
- IF low relevance: Re-explore importance
- → IMPORTANCE_EXPLORATION

### 5. Time-bound (时限性)
```
你打算什么时候实现这个目标？给自己设定一个期限吧！
```
- IF no timeframe: Help set reasonable deadline
- → CLARIFY

## Progress Tracking

Track SMART dimension status:
- [ ] Specific: pass/fail/pending
- [ ] Measurable: pass/fail/pending
- [ ] Achievable: pass/fail/pending
- [ ] Relevant: pass/fail/pending
- [ ] Time-bound: pass/fail/pending

## Dialogue

**All dimensions pass**:
```
太棒了！你的目标已经很清晰了 ✨
```

**Some dimensions need clarification**:
```
我们在[维度]上还需要再明确一下，让我帮你...
```

## Exit Conditions

- **All SMART dimensions pass**: → ACTION_PLANNING
- **Some dimensions need clarification**: → CLARIFY
- **User confused about SMART**: Provide simplified explanation → SMART_EVALUATION

## Data Storage

Save SMART evaluation results:
```bash
opencoach data set smart_specific "..."
opencoach data set smart_measurable "..."
opencoach data set smart_achievable "difficulty: N/10"
opencoach data set smart_relevant "..."
opencoach data set smart_timelimit "YYYY-MM-DD"
```

## State Update Command

```
opencoach state set create-goal ACTION_PLANNING
# OR
opencoach state set create-goal CLARIFY
```
