# EXPERIENCE_SUMMARY State Script

## Agent Action

Help user summarize lessons learned and personal growth.

## Summary Framework

### 1. Success Patterns
```
让我们来看看这个周期做得好的地方 ✨

哪些任务完成得特别顺利？为什么？
你用了什么方法或策略？
有什么是你想在下个周期继续保持的？
```

### 2. Improvement Areas
```
我们也来想想有哪些可以改进的地方~

如果重新来过，你会做哪些不同的选择？
有什么是你希望下次避免的？
```

### 3. Personal Growth
```
除了任务本身，你觉得自己有什么成长吗？

这个过程中，你对自己有什么新的认识？
有什么是你以前不知道自己能做到的？
```

### 4. Summary Synthesis
```
让我总结一下你的收获：
1. [成功经验1]
2. [改进方向1]
3. [个人成长1]
...
```

## Progress Tracking

- [ ] Success patterns identified
- [ ] Improvement areas noted
- [ ] Personal growth reflected
- [ ] Summary synthesized

## Exit Conditions

- **Summary complete**: → IMPROVEMENT_PLANNING

## Data Storage

```bash
opencoach data set lessons_learned "..."
opencoach data set improvements "..."
opencoach data set personal_growth "..."
```

## State Update Command

```
opencoach state set create-review IMPROVEMENT_PLANNING
```
