# GOAL_ELICITATION State Script

## Agent Action

Use Chain-of-Thought (CoT) prompting to elicit a clear, specific goal description.

## CoT Questioning Strategy

### Level 1: Open Exploration
```
老板，跟我说说你最近在想什么目标呀？(ᵔᴥᵔ)
```

### Level 2: Specificity Guidance
Based on user's response, probe for details:

- **IF goal is vague**: "这个听起来很棒！能再具体说说吗？比如你想达到什么样的状态？"
- **IF goal is ambitious**: "哇这个目标很有挑战性！我们可以先聚焦在哪个具体方面呢？"

### Level 3: Boundary Confirmation
```
所以你的目标是[复述用户目标]，对吗？有没有什么是明确不包括在内的？
```

### Level 4: Success Visualization
```
想象一下，当你实现这个目标时，你的生活会有什么不同？
```

## Progress Tracking

Track attempts (max 3 clarification rounds). Use TODO tool:
- [ ] Level 1 question asked
- [ ] Level 2 follow-up completed
- [ ] Level 3 confirmation obtained
- [ ] Level 4 visualization done

## Exit Conditions

- **Goal clarified**: Save goal description → IMPORTANCE_EXPLORATION
- **Goal still vague after 3 attempts**: → ERROR (goal unclear)
- **User confused**: Provide examples → GOAL_ELICITATION (retry)

## Interactive Options

### Level 1: Open Exploration Options

当询问"老板，跟我说说你最近在想什么目标呀？"时，生成以下目标类型选项：

**选项框架（AI 根据上下文调整）：**
- 技能学习类（如：学习编程、学习一门外语、掌握某个工具）
- 健康生活类（如：每周运动3次、早睡早起、改善饮食习惯）
- 职业发展类（如：晋升到某个岗位、获得某项认证、转行换赛道）
- 创作产出类（如：写一篇文章、完成一个项目、发布作品）
- 人际关系类（如：改善沟通、扩大社交圈、陪伴家人）

**提示词模板：**
```
基于用户可能的兴趣，为以下问题生成 3-4 个有启发性的选项：
老板，跟我说说你最近在想什么目标呀？

选项要求：
- 覆盖不同领域（技能/健康/职业/创作/人际关系等）
- 每个选项都有明确的行动指向
- 使用老板熟悉的场景作为示例
- 差异明显，不要重复
- 简洁明了（每个不超过15字）
```

### Level 2: Specificity Guidance Options

当询问"能再具体说说吗？"时，根据 Level 1 的选择动态生成选项：

**示例（基于"技能学习类"）：**
- 掌握基础概念和入门
- 达到独立应用水平
- 获得专业认证/资质

**示例（基于"健康生活类"）：**
- 建立基础习惯（如每周运动一次）
- 达到稳定状态（如规律作息）
- 达成具体目标（如减重多少/跑多少公里）

**提示词模板：**
```
根据用户选择的领域 [${domain}]，为"能再具体说说吗？"生成 3-4 个具体程度选项：

选项要求：
- 覆盖不同深度等级（入门/应用/精通/特定目标）
- 结合领域特点给出具体示例
- 简洁明了（每个不超过20字）
```

### Level 3: Boundary Confirmation Options

当询问"所以你的目标是[目标]，对吗？"时，生成以下确认选项：

**选项框架：**
- 对，就是这样
- 不完全是，需要调整（具体是...）
- 需要重新思考

**提示词模板：**
```
为以下确认问题生成选项：
所以你的目标是 [${goal}]，对吗？

选项要求：
- 提供明确的确认和否定选项
- 提供"需要调整"的中间选项
- 保持简洁（每个不超过15字）
```

### Level 4: Success Visualization Options

当询问"想象一下，当你实现这个目标时，你的生活会有什么不同？"时，生成以下可视化选项：

**选项框架（基于目标类型）：**
- **技能类**：能独立完成某事、获得认可、提升自信
- **健康类**：身体状态改善、精力更充沛、心情更好
- **职业类**：获得晋升、薪资提升、更有成就感
- **创作类**：作品发布、收到反馈、完成梦想
- **关系类**：关系改善、更少冲突、更多支持

**提示词模板：**
```
根据用户目标类型 [${goal_type}]，为"当你实现这个目标时，你的生活会有什么不同？"生成 3-4 个可视化选项：

选项要求：
- 描述具体的改变或状态
- 与目标类型相关
- 有情感共鸣和激励性
- 简洁明了（每个不超过25字）
```

**选项设计原则：**
1. 涵盖不同的生活领域和深度等级
2. 每个选项都有明确的行动指向或描述
3. 使用老板熟悉的场景作为示例
4. 保留一个"其他/自定义"选项（默认由 UI 提供）
5. 根据用户之前的回答动态调整选项内容

## Data Storage

Save intermediate goal description:
```bash
opencoach data set goal_description "..."
```

## State Update Command

```
opencoach state set create-goal IMPORTANCE_EXPLORATION
# OR
opencoach state set create-goal ERROR
```
