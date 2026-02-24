# GOAL_ELICITATION State Script

## Agent Action

Use Chain-of-Thought (CoT) prompting to elicit a clear, specific goal description.

## CoT Questioning Strategy

### Level 1: Open Exploration
```
老板，跟我说说你最近在想什么目标呀？(ᵔᴥᵔ)
```

### Level 2: Specificity Guidance
Based on user's response, probe for details:

- **IF goal is vague**: "这个听起来很棒！能再具体说说吗？比如你想达到什么样的状态？"
- **IF goal is ambitious**: "哇这个目标很有挑战性！我们可以先聚焦在哪个具体方面呢？"

### Level 3: Boundary Confirmation
```
所以你的目标是[复述用户目标]，对吗？有没有什么是明确不包括在内的？
```

### Level 4: Success Visualization
```
想象一下，当你实现这个目标时，你的生活会有什么不同？
```

## Progress Tracking

Track attempts (max 3 clarification rounds). Use TODO tool:
- [ ] Level 1 question asked
- [ ] Level 2 follow-up completed
- [ ] Level 3 confirmation obtained
- [ ] Level 4 visualization done

## Exit Conditions

- **Goal clarified**: Save goal description → IMPORTANCE_EXPLORATION
- **Goal still vague after 3 attempts**: → ERROR (goal unclear)
- **User confused**: Provide examples → GOAL_ELICITATION (retry)

## Data Storage

Save intermediate goal description:
```bash
opencoach data set goal_description "..."
```

## State Update Command

```
opencoach state set create-goal IMPORTANCE_EXPLORATION
# OR
opencoach state set create-goal ERROR
```
