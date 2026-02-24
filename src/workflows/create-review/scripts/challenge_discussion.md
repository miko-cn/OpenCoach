# CHALLENGE_DISCUSSION State Script

## Agent Action

Deep-dive into challenges using Socratic questioning.

## Discussion Framework

### 1. Emotional Recognition
```
我能感觉到你对[任务]有点[情绪]...
这种感觉很正常，换作是我也会这样~
```

### 2. Socratic Questioning

**Level 1 - Facts**: "具体发生了什么？""你尝试过什么方法？"

**Level 2 - Cognition**: "你觉得是什么阻碍了你？""这个困难是暂时的还是长期的？"

**Level 3 - Emotion**: "面对这个困难，你的感受是什么？"

**Level 4 - Values**: "这个任务对你来说还重要吗？"

### 3. Obstacle Categories & Responses

| Obstacle Type | Response |
|---------------|----------|
| Skill/knowledge gap | Suggest adding learning tasks |
| Time/resource shortage | Reassess priorities, extend period |
| Psychological (procrastination) | Lower standards, start small |
| External factors | Accept reality, adjust plan |
| Goal mismatch | Re-evaluate goal relevance |

### 4. Solution Co-creation

Don't give answers; guide thinking:
```
如果是你的朋友遇到这个问题，你会给TA什么建议？
有没有什么小的改变，可以让情况好一点？
```

### 5. Commitment

```
那你打算什么时候开始尝试？
需要我怎么支持你？
```

## Emotional Support Phrases

**When frustrated**:
"别太苛责自己啦，每个人都会遇到困难的 (っ´ω`c)"

**When anxious**:
"深呼吸，我们一步一步来，不着急 (◕‿◕)"

**When feeling stuck**:
"有时候休息一下，反而能走得更远 ☕"

## Exit Conditions

- **Discussion complete**: → EXPERIENCE_SUMMARY

## State Update Command

```
opencoach state set create-review EXPERIENCE_SUMMARY
```
