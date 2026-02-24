# MILESTONE_PLANNING State Script

## Agent Action

Define key milestones for the goal.

## Milestone Guidance

### 1. Concept Explanation
```
里程碑就像是通往目标的路标，每个里程碑都代表一个重要的进展。我们来想想有哪些关键节点吧！
```

### 2. Quantity Recommendation
- Suggest 3-5 milestones
- IF user proposes > 7: "里程碑有点多哦，我们挑选最重要的几个吧 (｡•́︿•̀｡)"

### 3. Time Distribution
- Ensure milestones are distributed across timeline
- Ask: "这个里程碑你打算什么时候达成？"

### 4. Significance Confirmation
```
达成这个里程碑对你来说意味着什么？
```

## Quality Check

For each milestone:
- **IF vague**: Guide to make specific
- **IF timing unreasonable**: Suggest adjustment
- **IF gap too large**: Suggest intermediate milestones

## Progress Tracking

Track milestone planning:
- [ ] Concept explained
- [ ] Number of milestones defined (3-5)
- [ ] Timeline distributed
- [ ] Each milestone has target date

## Exit Conditions

- **Milestones defined**: Create milestones.md → PREFERENCES_COLLECTION
- **User wants to skip**: → PREFERENCES_COLLECTION

## Data Storage

Save milestones:
```bash
opencoach data set milestones '[
  {"name": "...", "target_date": "YYYY-MM-DD", "description": "..."},
  ...
]'
```

## State Update Command

```
opencoach state set create-goal PREFERENCES_COLLECTION
```
