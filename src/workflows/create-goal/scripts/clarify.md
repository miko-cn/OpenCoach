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

## Interactive Options

### Specificity Clarification Options

当询问"需要让目标更具体一些。你想从哪个方面开始？"时，生成以下具体化选项：

**选项框架（基于不具体的目标）：**
- 明确范围（具体是哪个方面/领域）
- 明确程度（要达到什么水平/标准）
- 明确成果（具体要产出什么）
- 重新定义目标（换个更明确的目标）

**提示词模板：**
```
根据用户需要具体化的目标 [${vague_goal}]，为"需要让目标更具体一些。你想从哪个方面开始？"生成 3-4 个选项：

选项要求：
- 结合目标特点给出具体化的方向
- 简洁明了（每个不超过25字）
- 提供重新定义目标的选项

示例（针对"学编程"）：
- 明确学什么语言（Python/JavaScript/其他）
- 明确要达到什么水平（入门/应用/精通）
- 明确具体项目（做一个网站/一个工具）
- 重新定义更明确的目标
```

### Measurability Clarification Options

当询问"如何衡量目标完成？"时，根据目标类型生成衡量标准选项：

**选项框架（与 SMART_EVALUATION 的 Measurable 部分类似）：**
- 完成特定任务/项目
- 达到某个数量/次数
- 获得某种认证/成果
- 看到某种状态改变

**提示词模板：**
```
根据用户目标 [${goal}]，为"如何衡量目标完成？"生成 3-4 个衡量标准选项：

选项要求：
- 结合目标类型给出可衡量的标准
- 每个选项都有明确的完成标志
- 简洁明了（每个不超过25字）
```

### Achievability Clarification Options

当询问"如果要降低难度，可以怎么调整？"或"可以分阶段实现吗？"时，生成以下调整选项：

**选项框架：**
- 降低目标难度（减少范围/降低标准）
- 延长实现时间（给更多时间）
- 分阶段实现（先达成小目标）
- 调整为更现实的目标

**提示词模板：**
```
为"如果要降低难度，可以怎么调整？"生成 3-4 个调整选项：

选项要求：
- 提供不同的调整方向
- 简洁明了（每个不超过25字）
- 让用户能选择适合的调整方式

示例：
- 降低目标难度（减少范围）
- 延长实现时间（给更多时间）
- 分阶段实现（先达成小目标）
- 调整为更现实的目标
```

### Time-bound Clarification Options

当询问"你打算什么时候完成？"或"这个时间现实吗？"时，生成以下时间选项：

**选项框架（与 SMART_EVALUATION 的 Time-bound 部分类似）：**
- 1-2周（短期）
- 1个月（中期）
- 3个月（长期）
- 更长的时间

**提示词模板：**
```
为"你打算什么时候完成？"生成 4 个时间选项：

选项要求：
- 覆盖不同时间跨度
- 结合目标难度调整
- 简洁明了（每个不超过20字）

示例：
- 1-2周（短期）
- 1个月（中期）
- 3个月（长期）
- 更长的时间
```

**选项设计原则：**
1. 根据需要澄清的SMART维度生成对应的选项
2. 选项要具体可行，给出明确的调整方向
3. 简洁明了，让用户能快速选择

## State Update Command

```
opencoach state set create-goal SMART_EVALUATION
# OR
opencoach state set create-goal GOAL_ELICITATION
```
