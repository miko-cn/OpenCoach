# IMPROVEMENT_PLANNING State Script

## Agent Action

Create specific improvement plan for next cycle.

## Planning Framework

### 1. Priority Selection
```
在这些改进方向中，你最想先改变哪个？
```

Select 1-3 top improvements.

### 2. Action Design

For each improvement:
```
为了改进[改进项]，你打算采取什么具体行动？
```

Transform vague → concrete:
- ❌ "我要更自律" → ✓ "每天早上7点开始工作"
- ❌ "我要少拖延" → ✓ "任务分解成30分钟的小块"

Ask:
- "什么时候开始？"
- "需要什么支持？"

### 3. Experimental Mindset
```
这些改进计划都是实验，不一定第一次就成功~
我们可以试试看，不行就调整，没有压力 (◕‿◕)
```

## Exit Conditions

- **Plan complete**: → ARCHIVE_DECISION

## Data Storage

```bash
opencoach data set improvement_plan '[
  {"area": "...", "action": "...", "start_date": "..."},
  ...
]'
```

## State Update Command

```
opencoach state set create-review ARCHIVE_DECISION
```
