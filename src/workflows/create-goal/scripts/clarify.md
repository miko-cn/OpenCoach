# CLARIFY State Script

## Agent Action

Address specific clarification needs from SMART evaluation.

## Clarification Types

### Specificity Clarification
Help make the goal more concrete:
- Break down vague statements
- Provide concrete examples
- Ask for specific outcomes

### Measurability Clarification
Help define success metrics:
- "完成的标准是什么？"
- "如何量化这个目标？"
- "有什么关键指标？"

### Achievability Clarification
Address feasibility concerns:
- "如果要降低难度，可以怎么调整？"
- "可以分阶段实现吗？"
- "需要什么资源？"

### Time-bound Clarification
Set reasonable deadlines:
- "你打算什么时候完成？"
- "这个时间现实吗？"
- "需要分几步走？"

## Dialogue Approach

Based on which SMART dimension needs clarification, ask targeted questions and provide suggestions.

## Exit Conditions

- **Clarification complete**: → SMART_EVALUATION (re-evaluate)
- **User decides to restart**: → GOAL_ELICITATION

## State Update Command

```
opencoach state set create-goal SMART_EVALUATION
# OR
opencoach state set create-goal GOAL_ELICITATION
```
