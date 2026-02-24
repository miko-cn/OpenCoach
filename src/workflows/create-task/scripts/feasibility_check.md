# FEASIBILITY_CHECK State Script

## Agent Action

Check overall task feasibility within the time period.

## Feasibility Assessment

### 1. Time Estimation
For each task, ask: "这个任务大概需要多少时间？（小时）"

Calculate total hours needed.

### 2. Availability Check
```
在这个周期内，你每天/每周大概有多少时间可以投入到这个目标？
```

Total available = daily_hours × days

### 3. Capacity Check
```
IF total_hours > available_hours × 0.8 THEN
  "嗯...任务量有点大哦 (｡•́︿•̀｡)"
  Suggest: reduce tasks, lower priority, extend period, increase daily time
  → REFINE
END IF
```

### 4. Dependency Check
Check for circular dependencies between tasks.

### 5. Resource Check
- "完成这些任务，你需要哪些资源？"
- "这些资源你现在都有吗？"

## Exit Conditions

- **Feasible**: → FILE_CREATION
- **Needs adjustment**: → REFINE

## State Update Command

```
opencoach state set create-task FILE_CREATION
# OR
opencoach state set create-task REFINE
```
