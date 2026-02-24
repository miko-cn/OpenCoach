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

## Interactive Options

### Improvement Priority Options

当询问"在这些改进方向中，你最想先改变哪个？"时，生成以下优先级选项：

**选项框架（基于前面讨论的改进方向）：**
- 列出前面讨论的改进方向（最多4个）
- 或者提供通用优先级选项：
  - 时间管理（安排得更合理）
  - 执行力提升（更坚持）
  - 方法优化（更有效）
  - 心态调整（更积极）

**提示词模板：**
```
为"在这些改进方向中，你最想先改变哪个？"生成 3-4 个选项：

选项要求：
- 基于前面讨论的改进方向
- 或者提供通用改进方向
- 简洁明了（每个不超过25字）

示例（通用）：
- 时间管理
- 执行力提升
- 方法优化
- 心态调整
```

### Action Approach Options

当询问"打算采取什么具体行动？"时，生成以下行动类型选项：

**选项框架：**
- 制定详细计划（把事情分解）
- 设定小目标（从简单开始）
- 找人监督（accountability partner）
- 改变环境（调整条件/工具）
- 其他/自定义输入

**提示词模板：**
```
为"打算采取什么具体行动？"生成 4 个行动类型选项：

选项要求：
- 覆盖不同行动类型（计划/小目标/监督/环境）
- 简洁明了（每个不超过25字）

示例：
- 制定详细计划
- 设定小目标
- 找人监督
- 改变环境
- [其他...自定义输入]
```

**选项设计原则：**
1. 改进优先级选项要基于前面讨论的内容
2. 行动类型选项要提供可行的具体行动方式

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
