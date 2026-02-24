# FILE_CREATION State Script

## Agent Action

Create review file and archive tasks if needed.

## File Creation

### 1. Create reviews directory
```bash
mkdir -p goals/{goal-slug}/reviews
```

### 2. Create review file
- Path: goals/{goal-slug}/reviews/{YYYY-MM-DD}.md
- Template: templates/review.md
- Content:
  - Task completion evaluation
  - Challenges encountered
  - Lessons learned
  - Improvement plan
  - Personal growth reflection

### 3. Archive tasks (if applicable)
- Create archives directory
- Copy tasks.md → archives/tasks-{YYYY-MM-DD}.md
- Add archive metadata

## Error Handling

```
IF review file already exists for today THEN
  Ask: 覆盖/新建(带时间戳)/取消
END IF
```

## Exit Conditions

- **Files created**: → TASK_UPDATE
- **Error occurred**: → ERROR

## Interactive Options

### Review File Name Options

当询问"这次复盘叫什么名字？"时，生成以下名称选项：

**选项框架：**
- 基于日期的名称（如：20260224回顾）
- 基于周期的名称（如：第一周期回顾）
- 基于完成率的名称（如：80%完成回顾）
- 简单的"复盘"即可

**提示词模板：**
```
根据复盘日期 [${review_date}]、周期和完成率，为"这次复盘叫什么名字？"生成 3-4 个名称选项：

选项要求：
- 基于日期、周期、完成率生成不同名称
- 简洁明了（每个不超过20字）

示例：
- 20260224回顾
- 第一周期回顾
- 80%完成回顾
```

### File Conflict Options

当询问"复盘文件已存在，要怎么处理？"时，生成以下处理选项：

**选项框架：**
- 添加时间戳（如：复盘-20260224-2）
- 覆盖原有文件
- 取消操作

**提示词模板：**
```
为"复盘文件已存在，要怎么处理？"生成 3 个处理选项：

选项要求：
- 提供添加时间戳、覆盖、取消三个选项
- 简洁明了（每个不超过25字）

示例：
- 添加时间戳
- 覆盖原有文件
- 取消操作
```

**选项设计原则：**
1. 名称选项要基于日期、周期、完成率生成不同的命名方式
2. 文件冲突选项要提供添加时间戳、覆盖、取消三种处理方式

## State Update Command

```
opencoach state set create-review TASK_UPDATE
# OR
opencoach state set create-review ERROR
```
