# TASK_DECOMPOSITION State Script

## Agent Action

Break down milestones into specific, actionable tasks using SMART.

## Decomposition Process

For each milestone within the period:

### 1. Milestone Breakdown
```
我们来看看[里程碑名称]，要达成这个里程碑，需要做哪些具体的事情呢？
```

### 2. SMART Task Validation

For each proposed task:

**Specific**: "这个任务能再具体一点吗？"
- Example: "学习Python" → "完成Python基础教程第1-5章"

**Measurable**: "怎么知道这个任务完成了？"
- Example: "写代码" → "完成3个练习题并通过测试"

**Achievable**: "在[周期时长]内完成这个任务，难度如何？"
- IF too hard → suggest splitting

**Relevant**: Confirm task → milestone connection

**Time-bound**: "这个任务打算什么时候完成？"

### 3. Task Count Check

```
IF task_count > 10 THEN
  "任务有点多哦...一个周期完成可能会很累"
  Suggest: merge similar tasks, defer to next period
  → REFINE
END IF

IF task_count < 3 THEN
  "任务有点少呢，要不要再想想还有什么可以做的？"
END IF
```

## Progress Tracking

- [ ] Each milestone addressed
- [ ] Tasks are SMART-compliant
- [ ] Task count reasonable (3-10)

## Helper Questions

- "为了达成[里程碑]，第一步要做什么？"
- "这个任务可以分解成更小的步骤吗？"
- "有没有什么准备工作需要先做？"

## Exit Conditions

- **Decomposition complete**: → PRIORITY_SETTING
- **Needs refinement**: → REFINE

## Interactive Options

### Task Direction Options

当询问"主要任务方向是什么？"时，根据目标类型生成以下任务方向选项：

**选项框架（基于目标类型）：**
- **技能学习类**：
  - 基础学习（理论学习、概念理解）
  - 实践练习（做项目、写代码、练习）
  - 巩固提升（复习、总结、优化）

- **健康生活类**：
  - 建立习惯（从小事开始）
  - 增加强度（提高频率/时长）
  - 达成目标（冲刺/完成挑战）

- **职业发展类**：
  - 学习准备（学习技能、考证）
  - 实践应用（项目经验、成果展示）
  - 晋升冲刺（表现、机会把握）

**提示词模板：**
```
根据用户目标类型 [${goal_type}]，为"主要任务方向是什么？"生成 3-4 个任务方向选项：

选项要求：
- 结合目标类型给出主要任务方向
- 每个方向都有明确的行动指向
- 简洁明了（每个不超过25字）
```

### Task Validation Options

当询问"这个任务具体一点吗？"时，生成以下具体化选项：

**选项框架：**
- 已具体，不用调整
- 需要更明确的范围
- 需要更具体的成果
- 需要重新定义

**提示词模板：**
```
为"这个任务具体一点吗？"生成 4 个具体化选项：

选项要求：
- 提供确认和不同具体化方向的选项
- 简洁明了（每个不超过20字）

示例：
- 已具体，不用调整
- 需要更明确的范围
- 需要更具体的成果
- 需要重新定义
```

**选项设计原则：**
1. 任务方向选项要结合目标类型给出合理的方向
2. 具体化选项要提供不同维度的具体化方向
3. 保持简洁，让用户能快速选择

## Data Storage

```bash
opencoach data set tasks '[
  {"id": 1, "description": "...", "milestone": "...", "estimated_hours": N},
  ...
]'
```

## State Update Command

```
opencoach state set create-task PRIORITY_SETTING
# OR
opencoach state set create-task REFINE
```
