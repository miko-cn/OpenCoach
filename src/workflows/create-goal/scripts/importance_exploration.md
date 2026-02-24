# IMPORTANCE_EXPLORATION State Script

## Agent Action

Explore the importance and intrinsic motivation behind the goal.

## Exploration Framework

### 1. Personal Significance
```
这个目标对你来说意味着什么？为什么现在想要实现它？
```

### 2. Values Alignment
```
实现这个目标会让你成为什么样的人？这和你的价值观有什么联系？
```

### 3. Motivation Source
```
是什么让你对这个目标充满动力？是内心的渴望还是外部的期待？
```

### 4. Obstacle History
```
之前有没有尝试过类似的目标？如果有，是什么阻碍了你？
```

## Progress Tracking

Track which dimensions have been explored:
- [ ] Personal significance discussed
- [ ] Values alignment explored
- [ ] Motivation source identified
- [ ] Past obstacles acknowledged

## Dialogue Variations

**If user mainly cites external reasons** (external motivation):
```
除了[外部原因]，这个目标对你个人有什么意义呢？
```
Continue exploring → IMPORTANCE_EXPLORATION (loop)

**If user realizes goal is not important**:
```
看起来这个目标可能不是你真正想要的，要不要重新想想？
```
→ GOAL_ELICITATION (restart)

## Exit Conditions

- **Clear intrinsic motivation**: Save importance/motivation → SMART_EVALUATION
- **Mainly external motivation**: Continue exploration
- **Goal not important**: Restart goal elicitation

## Interactive Options

### 1. Personal Significance Options

当询问"这个目标对你来说意味着什么？为什么现在想要实现它？"时，生成以下意义选项：

**选项框架：**
- 个人成长突破（成为更好的自己）
- 改善生活质量（解决实际问题）
- 实现某个心愿（完成梦想/目标）
- 应对当前挑战（解决迫在眉睫的问题）
- 为未来做准备（打基础/积累）

**提示词模板：**
```
为"这个目标对你来说意味着什么？为什么现在想要实现它？"生成 3-4 个意义选项：

选项要求：
- 覆盖不同意义类型（成长/改善/心愿/挑战/未来）
- 简洁明了（每个不超过20字）
- 有情感共鸣
- 根据用户目标类型调整
```

### 2. Values Alignment Options

当询问"实现这个目标会让你成为什么样的人？这和你的价值观有什么联系？"时，生成以下价值观选项：

**选项框架：**
- 更自律/更有执行力的人
- 更专业/更有能力的人
- 更健康/更积极的人
- 更有创造力/更有产出的人
- 更善于沟通/更有影响力的人

**提示词模板：**
```
根据用户目标 [${goal}]，为"实现这个目标会让你成为什么样的人？"生成 3-4 个选项：

选项要求：
- 描述目标达成后的身份转变
- 与目标类型相关
- 有正面激励性
- 简洁明了（每个不超过20字）
```

### 3. Motivation Source Options

当询问"是什么让你对这个目标充满动力？是内心的渴望还是外部的期待？"时，生成以下动力来源选项：

**选项框架：**
- 内在渴望（我就是喜欢/想做）
- 外部期待（家人/工作/社会需要）
- 两者都有（既有内在也有外在）
- 其实我也不太确定（但觉得应该做）

**提示词模板：**
```
为"是什么让你对这个目标充满动力？"生成 3-4 个动力来源选项：

选项要求：
- 覆盖内在/外在/混合/不确定
- 简洁明了（每个不超过15字）
- 不要让用户感到压力
```

### 4. Obstacle History Options

当询问"之前有没有尝试过类似的目标？如果有，是什么阻碍了你？"时，生成以下历史经验选项：

**选项框架：**
- 从未尝试过（第一次）
- 尝试过但没坚持（半途而废）
- 有一些相关经验（部分成功）
- 尝试过但遇到困难（需要调整方法）
- [其他...自定义输入]

**提示词模板：**
```
为"之前有没有尝试过类似的目标？如果有，是什么阻碍了你？"生成 3-4 个经验选项：

选项要求：
- 覆盖不同的经验类型
- 包含从未尝试到有经验的各种情况
- 简洁明了（每个不超过20字）
- 非评判性，不要让用户感到负面

如果用户提到有失败经历，生成阻碍因素选项：
- 时间不足/拖延
- 缺乏动力/坚持不下去
- 方法不对/难度过高
- 缺乏支持/资源不足
- 突发情况/优先级变化
```

**选项设计原则：**
1. 涵盖不同的意义维度和动力类型
2. 非评判性，避免让用户感到压力或负面
3. 提供明确的区分选项
4. 根据用户目标类型和上下文动态调整

## Data Storage

Save motivation data:
```bash
opencoach data set importance "..."
opencoach data set motivation_source "internal|external|both"
```

## State Update Command

```
opencoach state set create-goal SMART_EVALUATION
# OR
opencoach state set create-goal GOAL_ELICITATION
```
