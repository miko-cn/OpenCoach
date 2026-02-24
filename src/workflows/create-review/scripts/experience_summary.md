# EXPERIENCE_SUMMARY State Script

## Agent Action

Help user summarize lessons learned and personal growth.

## Summary Framework

### 1. Success Patterns
```
让我们来看看这个周期做得好的地方 ✨

哪些任务完成得特别顺利？为什么？
你用了什么方法或策略？
有什么是你想在下个周期继续保持的？
```

### 2. Improvement Areas
```
我们也来想想有哪些可以改进的地方~

如果重新来过，你会做哪些不同的选择？
有什么是你希望下次避免的？
```

### 3. Personal Growth
```
除了任务本身，你觉得自己有什么成长吗？

这个过程中，你对自己有什么新的认识？
有什么是你以前不知道自己能做到的？
```

### 4. Summary Synthesis
```
让我总结一下你的收获：
1. [成功经验1]
2. [改进方向1]
3. [个人成长1]
...
```

## Progress Tracking

- [ ] Success patterns identified
- [ ] Improvement areas noted
- [ ] Personal growth reflected
- [ ] Summary synthesized

## Exit Conditions

- **Summary complete**: → IMPROVEMENT_PLANNING

## Interactive Options

### Success Pattern Options

当询问"这个周期做得最好的地方是什么？"时，生成以下成功类型选项：

**选项框架：**
- 技能提升（学到了新东西）
- 时间管理（安排得更合理）
- 心态调整（更积极/更自律）
- 坚持不懈（养成了习惯）
- 发现新方向（有了新想法）

**提示词模板：**
```
为"这个周期做得最好的地方是什么？"生成 4 个成功类型选项：

选项要求：
- 覆盖不同成功类型（技能/时间/心态/坚持/方向）
- 简洁明了（每个不超过25字）
- 正面激励，让用户感受到成长

示例：
- 技能提升
- 时间管理
- 心态调整
- 坚持不懈
- 发现新方向
```

### Improvement Area Options

当询问"有什么可以改进的地方？"时，生成以下改进方向选项：

**选项框架：**
- 时间安排（需要更合理）
- 任务难度（太高或太低）
- 执行力（需要更坚持）
- 方法策略（需要更有效）
- 其实挺好的，没什么要改

**提示词模板：**
```
为"有什么可以改进的地方？"生成 4 个改进方向选项：

选项要求：
- 覆盖不同改进方向（时间/难度/执行力/方法）
- 提供"没什么要改"选项
- 简洁明了（每个不超过25字）

示例：
- 时间安排
- 任务难度
- 执行力
- 方法策略
- 其实挺好的，没什么要改
```

### Personal Growth Options

当询问"这个过程中有什么个人成长？"时，生成以下成长类型选项：

**选项框架：**
- 更了解自己（知道了自己的特点）
- 更有自信（相信自己能做到）
- 更有耐心（能接受慢慢来）
- 更会规划（学会了安排）
- 没什么特别的

**提示词模板：**
```
为"这个过程中有什么个人成长？"生成 4 个成长类型选项：

选项要求：
- 覆盖不同成长类型（了解/自信/耐心/规划）
- 提供"没什么特别的"选项
- 简洁明了（每个不超过25字）

示例：
- 更了解自己
- 更有自信
- 更有耐心
- 更会规划
- 没什么特别的
```

**选项设计原则：**
1. 成功模式选项要聚焦用户的成长和进步
2. 改进方向选项要提供具体的改进领域，以及"没什么要改"选项
3. 个人成长选项要涵盖不同的成长维度，以及"没什么特别的"选项

## Data Storage

```bash
opencoach data set lessons_learned "..."
opencoach data set improvements "..."
opencoach data set personal_growth "..."
```

## State Update Command

```
opencoach state set create-review IMPROVEMENT_PLANNING
```
