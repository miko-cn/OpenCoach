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

## Interactive Options

### 1. Milestone Quantity Options

当询问"你觉得这个目标需要几个里程碑？"时，生成以下数量选项：

**选项框架：**
- 3 个（起步-中途-终点，简单清晰）
- 4 个（起步-进展-冲刺-完成，更细致）
- 5 个（更细致的分解，每个阶段都很明确）
- 稍后再定，先完成任务（不想现在规划）

**提示词模板：**
```
为"你觉得这个目标需要几个里程碑？"生成 4 个数量选项：

选项要求：
- 覆盖不同数量（3/4/5个）
- 每个选项附带简短说明
- 简洁明了（每个不超过25字）
- 提供"稍后再定"选项给不确定的用户

示例：
- 3 个（起步-中途-终点）
- 4 个（起步-进展-冲刺-完成）
- 5 个（更细致的分解）
- 稍后再定，先完成任务
```

### 2. First Milestone Options

当询问"第一个里程碑是什么？"时，根据用户目标生成起始里程碑选项：

**选项框架（基于目标类型）：**
- **技能学习类**：
  - 完成基础学习/入门
  - 能独立完成简单任务
  - 掌握核心概念/语法

- **健康生活类**：
  - 建立基础习惯（如连续运动一周）
  - 达到初步目标（如减重2斤）
  - 适应新的作息/饮食

- **职业发展类**：
  - 完成某个项目/任务
  - 通过某个考试/评估
  - 获得某个技能认证

- **创作产出类**：
  - 完成草稿/初稿
  - 完成第一个作品
  - 发布第一个作品

**提示词模板：**
```
根据用户目标 [${goal}]，为"第一个里程碑是什么？"生成 3-4 个起始里程碑选项：

选项要求：
- 结合目标类型给出合理的起始点
- 每个里程碑都是可衡量、可实现的
- 简洁明了（每个不超过30字）
- 提供不同难度的起始点（从简单到适中）
```

### 3. Subsequent Milestone Options

当询问后续里程碑时，根据目标时间线和进展生成选项：

**选项框架：**
- 提供不同时间节点的里程碑（如：第一个月、两个月、三个月）
- 每个里程碑都比前一个有明确进展
- 最后一个里程碑接近目标完成

**提示词模板：**
```
根据用户目标 [${goal}] 和已设定的第一个里程碑，为后续里程碑生成 3-4 个选项：

选项要求：
- 每个里程碑都比前一个有明显进展
- 时间分布合理（如：1个月、2个月、3个月）
- 每个里程碑都有明确的完成标准
- 简洁明了（每个不超过35字）
```

**选项设计原则：**
1. 数量选项要简洁清晰，说明不同数量的特点
2. 里程碑选项要结合目标类型给出合理的起始点和进展
3. 每个里程碑都要可衡量、可实现
4. 提供"稍后再定"选项给不想现在规划的用户

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
