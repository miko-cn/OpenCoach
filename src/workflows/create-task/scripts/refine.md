# REFINE State Script

## Agent Action

Refine tasks based on feedback from other states.

## Refinement Triggers

Based on which state returned to REFINE:

### From TASK_DECOMPOSITION
- Too many tasks (>10)
- Tasks not specific enough
- Tasks not measurable

### From PRIORITY_SETTING
- P1 tasks too many (>5)
- All tasks are P1 (no prioritization)
- Priority distribution unreasonable

### From FEASIBILITY_CHECK
- Total time exceeds available
- Circular dependencies
- Missing resources

### From FILE_CREATION
- File naming conflict

## Refinement Process

1. Identify the specific issue
2. Present options to user
3. Apply changes to task list

## Dialogue Examples

**Too many tasks**:
```
任务有点多哦，我们来调整一下：
- 合并相似的任务
- 把部分任务延期到下个周期
- 重新评估任务必要性

你倾向于哪种方式？
```

**Feasibility issue**:
```
按照你的时间安排，可能无法完成所有任务。
我们可以：
- 减少任务数量
- 降低部分任务优先级
- 延长周期
- 增加每天投入时间

你想怎么调整？
```

## Exit Conditions

- **Refinement done**: Return to original state (TASK_DECOMPOSITION, PRIORITY_SETTING, or FEASIBILITY_CHECK)

## Interactive Options

### Too Many Tasks Options

当任务太多（>10）时，询问"任务有点多，如何调整？"时，生成以下调整选项：

**选项框架：**
- 合并相似的任务（减少总数）
- 把部分任务延期到下个周期
- 重新评估任务必要性（删除不重要的）

**提示词模板：**
```
为"任务有点多，如何调整？"生成 3 个调整选项：

选项要求：
- 提供不同的调整方向
- 简洁明了（每个不超过30字）

示例：
- 合并相似的任务
- 延期到下个周期
- 删除不重要的任务
```

### Feasibility Issue Options

当时间不够时，询问"如何调整任务？"时，生成以下调整选项：

**选项框架：**
- 减少任务数量（只保留重要的）
- 降低部分任务优先级（P2/P3）
- 延长周期（给更多时间）
- 增加每天投入时间

**提示词模板：**
```
为"时间不够，如何调整？"生成 4 个调整选项：

选项要求：
- 提供不同的调整方向
- 简洁明了（每个不超过30字）

示例：
- 减少任务数量
- 降低部分任务优先级
- 延长周期
- 增加每天投入时间
```

### General Adjustment Options

当询问"需要调整吗？"时，生成以下确认选项：

**选项框架：**
- 完美，就这样
- 微调几个细节
- 需要重新思考

**提示词模板：**
```
为"需要调整吗？"生成 3 个确认选项：

选项要求：
- 提供确认、微调、重新思考三个选项
- 简洁明了（每个不超过20字）

示例：
- 完美，就这样
- 微调几个细节
- 需要重新思考
```

**选项设计原则：**
1. 根据具体问题（任务太多/时间不够/一般调整）生成对应的选项
2. 选项要提供明确的调整方向
3. 提供完美的选项，让用户能确认无需调整

## State Update Command

```
# Return to appropriate previous state based on what was being checked
opencoach state set create-task TASK_DECOMPOSITION
# OR
opencoach state set create-task PRIORITY_SETTING
# OR
opencoach state set create-task FEASIBILITY_CHECK
```
