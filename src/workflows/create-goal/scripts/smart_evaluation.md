# SMART_EVALUATION State Script

## Agent Action

Evaluate the goal against SMART principles systematically.

## Evaluation Framework

### 1. Specific (具体性)
```
目标是否明确具体？
```
- IF not specific: "我们需要让目标更具体一些。比如，[给出具体化建议]"
- → CLARIFY

### 2. Measurable (可衡量性)
```
我们怎么知道你达成这个目标了？有什么可以衡量的标准吗？
```
- IF cannot measure: Assist in setting measurable criteria
- → CLARIFY

### 3. Achievable (可实现性)
```
以你现在的资源和能力，这个目标实现起来难度如何？1-10分你会打几分？
```
- IF difficulty > 8: "这个目标挑战性很大哦！我们要不要调整一下，或者分阶段实现？"
- IF difficulty < 3: "这个目标对你来说似乎太简单了，要不要设定更有挑战性的？"
- → CLARIFY

### 4. Relevant (相关性)
```
这个目标和你当前的生活重心、长期规划有什么关系？
```
- IF low relevance: Re-explore importance
- → IMPORTANCE_EXPLORATION

### 5. Time-bound (时限性)
```
你打算什么时候实现这个目标？给自己设定一个期限吧！
```
- IF no timeframe: Help set reasonable deadline
- → CLARIFY

## Progress Tracking

Track SMART dimension status:
- [ ] Specific: pass/fail/pending
- [ ] Measurable: pass/fail/pending
- [ ] Achievable: pass/fail/pending
- [ ] Relevant: pass/fail/pending
- [ ] Time-bound: pass/fail/pending

## Dialogue

**All dimensions pass**:
```
太棒了！你的目标已经很清晰了 ✨
```

**Some dimensions need clarification**:
```
我们在[维度]上还需要再明确一下，让我帮你...
```

## Exit Conditions

- **All SMART dimensions pass**: → ACTION_PLANNING
- **Some dimensions need clarification**: → CLARIFY
- **User confused about SMART**: Provide simplified explanation → SMART_EVALUATION

## Interactive Options

### 1. Specific (具体性) Options

当询问"目标是否明确具体？"时，生成以下具体程度选项：

**选项框架：**
- 很具体了，不用调整
- 需要更明确一些（范围/程度/标准）
- 还比较模糊，需要重新定义

**提示词模板：**
```
为"目标是否明确具体？"生成 3 个选项：

选项要求：
- 提供明确的确认和需要调整选项
- 简洁明了（每个不超过20字）
```

### 2. Measurable (可衡量性) Options

当询问"我们怎么知道你达成这个目标了？有什么可以衡量的标准吗？"时，根据目标类型生成衡量标准选项：

**选项框架（基于目标类型）：**
- **技能类**：完成特定任务/项目、获得认证、通过考试
- **健康类**：达到某个次数/时长、达到某个身体指标（体重/体脂等）
- **职业类**：获得晋升/加薪、完成项目、获得客户
- **创作类**：发布作品、完成作品、获得特定反馈
- **习惯类**：连续坚持X天、每周达到X次、达到稳定状态

**提示词模板：**
```
根据用户目标类型 [${goal_type}]，为"我们怎么知道你达成这个目标了？"生成 3-4 个衡量标准选项：

选项要求：
- 结合目标类型给出具体可衡量的标准
- 每个选项都有明确的完成标志
- 简洁明了（每个不超过25字）
```

### 3. Achievable (可实现性) Options

当询问"以你现在的资源和能力，这个目标实现起来难度如何？1-10分你会打几分？"时，生成以下难度选项：

**选项框架：**
- 1-3分：轻松愉快（低难度，轻松达成）
- 4-6分：适中挑战（需要努力，可以达成）
- 7-8分：需要努力（有挑战但可行）
- 9-10分：极具挑战（非常困难，可能需要大幅调整）

**提示词模板：**
```
为"以你现在的资源和能力，这个目标实现起来难度如何？1-10分你会打几分？"生成 4 个难度选项：

选项要求：
- 覆盖不同难度等级（简单/适中/挑战/极具挑战）
- 每个选项附带简短说明
- 简洁明了（每个不超过20字）

示例：
- 1-3分：轻松愉快
- 4-6分：适中挑战
- 7-8分：需要努力
- 9-10分：极具挑战
```

### 4. Relevant (相关性) Options

当询问"这个目标和你当前的生活重心、长期规划有什么关系？"时，生成以下相关性选项：

**选项框架：**
- 直接相关（工作/学习/当前生活需要）
- 长期规划（未来发展的基础，为以后打铺垫）
- 兴趣驱动（真心想做，符合价值观）
- 应对现状（解决当前问题或改善生活质量）
- 其实关系不大（只是想做而已）

**提示词模板：**
```
为"这个目标和你当前的生活重心、长期规划有什么关系？"生成 3-4 个相关性选项：

选项要求：
- 覆盖不同关系类型
- 简洁明了（每个不超过20字）
- 不要让用户感到压力（可以接受"关系不大"）
```

### 5. Time-bound (时限性) Options

当询问"你打算什么时候实现这个目标？给自己设定一个期限吧！"时，生成以下时间选项：

**选项框架：**
- 1-2周（短期冲刺，快速见效）
- 1个月（中期目标，适中的节奏）
- 3个月（季度规划，稳步推进）
- 6个月+（长期项目，需要持续投入）

**提示词模板：**
```
为"你打算什么时候实现这个目标？"生成 4 个时间选项：

选项要求：
- 覆盖不同时间跨度（短期/中期/长期）
- 结合目标难度和类型调整（难的目标给更长时间）
- 简洁明了（每个不超过20字）

示例：
- 1-2周（短期冲刺）
- 1个月（中期目标）
- 3个月（季度规划）
- 6个月+（长期项目）
```

**选项设计原则：**
1. 每个SMART维度都要有选项
2. 选项要覆盖该维度可能的各种情况
3. 根据用户目标类型和上下文动态调整选项内容
4. 对于可衡量性和时限性，结合目标特点给出具体建议

## Data Storage

Save SMART evaluation results:
```bash
opencoach data set smart_specific "..."
opencoach data set smart_measurable "..."
opencoach data set smart_achievable "difficulty: N/10"
opencoach data set smart_relevant "..."
opencoach data set smart_timelimit "YYYY-MM-DD"
```

## State Update Command

```
opencoach state set create-goal ACTION_PLANNING
# OR
opencoach state set create-goal CLARIFY
```
