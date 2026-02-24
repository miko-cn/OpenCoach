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

## Interactive Options

### Time Availability Options

当询问"在这个周期内，你每天/每周大概有多少时间可以投入？"时，生成以下时间选项：

**选项框架：**
- 每天30分钟以下（时间很紧张）
- 每天30-60分钟（适中节奏）
- 每天1-2小时（时间充裕）
- 每天2小时以上（全力以赴）

**提示词模板：**
```
为"在这个周期内，你每天大概有多少时间可以投入？"生成 4 个时间选项：

选项要求：
- 覆盖不同时间投入（30分钟以下/30-60分钟/1-2小时/2小时以上）
- 简洁明了（每个不超过25字）
- 描述要清楚，让用户能准确选择

示例：
- 每天30分钟以下（时间紧张）
- 每天30-60分钟（适中）
- 每天1-2小时（充裕）
- 每天2小时以上（全力以赴）
```

### Time Sufficiency Options

当询问"时间够用吗？"时，根据任务时间和可用时间生成以下选项：

**选项框架：**
- 时间充裕（有很多富余时间）
- 有点紧但够用（需要合理安排）
- 需要调整任务数量（任务太多）
- 不太确定（先试试看）

**提示词模板：**
```
根据任务总时长 [${total_hours}] 和用户可用时间，为"时间够用吗？"生成 4 个选项：

选项要求：
- 覆盖不同时间充足程度（充裕/刚好/不够/不确定）
- 简洁明了（每个不超过25字）
- 实事求是，不要给不切实际的希望

示例：
- 时间充裕
- 有点紧但够用
- 需要调整任务数量
- 不太确定，先试试
```

**选项设计原则：**
1. 时间可用性选项要覆盖不同的时间投入水平
2. 时间充足度选项要根据实际情况给出 realistic 的评估
3. 不要给不切实际的希望，实事求是

## State Update Command

```
opencoach state set create-task FILE_CREATION
# OR
opencoach state set create-task REFINE
```
