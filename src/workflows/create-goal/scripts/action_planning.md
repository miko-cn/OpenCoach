# ACTION_PLANNING State Script

## Agent Action

Develop action guidelines and obstacle response strategies.

## Planning Framework

### 1. Obstacle Anticipation
```
在实现这个目标的过程中，你觉得可能会遇到哪些困难？
```

### 2. Resource Inventory
```
你现在有哪些资源可以帮助你？（时间、技能、人脉、工具等）
```

### 3. Response Strategy
```
如果遇到[用户提到的困难]，你打算怎么应对？
```

### 4. Action Summary
```
好的，让我们总结一下你的行动方针：
[3-5条简短有力的行动纲领]
```

## Progress Tracking

Track planning progress:
- [ ] Obstacles identified
- [ ] Resources inventoried
- [ ] Response strategies defined
- [ ] Action summary created

## Dialogue Variations

**If user feels anxious about obstacles**:
```
别担心，我们一步步来，你肯定可以的！(ง •̀_•́)ง
```
Continue planning → ACTION_PLANNING

## Exit Conditions

- **Clear action strategy defined**: → FILE_CREATION
- **User needs more time**: Continue in current state

## Interactive Options

### 1. Obstacle Anticipation Options

当询问"在实现这个目标的过程中，你觉得可能会遇到哪些困难？"时，根据目标类型生成困难选项：

**选项框架（基于目标类型）：**
- **通用困难**：
  - 时间不足/拖延（事情太多、总往后拖）
  - 缺乏动力/坚持不下去（三分钟热度）
  - 缺乏相关技能（不知道怎么做）
  - 资源不足/环境限制（缺钱、缺工具、缺时间）
  - 容易被打断/干扰（外界干扰、事情太多）

- **技能学习类**：
  - 学习曲线陡峭（太难了、学不下去）
  - 缺乏实践机会（学了不会用）
  - 遇到瓶颈卡住（进步停滞）
  - 难以坚持练习（三天打鱼两天晒网）

- **健康生活类**：
  - 习惯养成困难（总是忘、难以坚持）
  - 时间不够用（工作太忙、事情太多）
  - 环境不配合（家人不支持、条件不允许）
  - 看不到效果（失去动力）

- **职业发展类**：
  - 竞争激烈（别人太强）
  - 机会有限（缺少平台）
  - 缺乏人脉/资源
  - 工作繁忙（没时间准备）

- **创作产出类**：
  - 灵感枯竭（想不出点子）
  - 完美主义（总觉得不够好）
  - 缺乏反馈（不知道写得怎么样）
  - 拖延（总是最后时刻才做）

**提示词模板：**
```
根据用户目标类型 [${goal_type}]，为"在实现这个目标的过程中，你觉得可能会遇到哪些困难？"生成 3-4 个困难选项：

选项要求：
- 结合目标类型给出常见困难
- 简洁明了（每个不超过25字）
- 非评判性，不要让用户感到负面
- 覆盖不同类型的困难（时间/动力/技能/环境）

如果用户提到困难，询问用户打算怎么应对时，生成应对策略选项：
- 制定详细计划和时间表
- 找人监督/ accountability partner
- 降低难度、从小目标开始
- 寻找外部资源/工具帮助
- 调整目标或方法
```

### 2. Resource Inventory Options

当询问"你现在有哪些资源可以帮助你？（时间、技能、人脉、工具等）"时，生成以下资源选项：

**选项框架：**
- 可支配的时间（每天/每周有一定时间）
- 相关工具/设备（已有电脑、书籍、软件等）
- 可以请教的人（有经验的同事/朋友）
- 在线资源/课程（可以学习的内容）
- 资金支持（有预算可以投入）
- 其实我想先看看有什么资源可用

**提示词模板：**
```
为"你现在有哪些资源可以帮助你？"生成 3-4 个资源选项：

选项要求：
- 覆盖不同类型的资源（时间/工具/人脉/信息/资金）
- 简洁明了（每个不超过25字）
- 让用户能快速选择自己拥有的资源
- 如果不确定，提供"不确定/先看看"选项
```

### 3. Response Strategy Options

当针对用户提到的困难询问"如果遇到[困难]，你打算怎么应对？"时，生成以下应对策略选项：

**选项框架（基于困难类型）：**
- **时间不足/拖延**：
  - 制定详细的时间表和deadline
  - 使用番茄钟等时间管理工具
  - 找人监督、定期汇报
  - 从小任务开始，逐步建立习惯

- **缺乏动力**：
  - 设立小里程碑和奖励
  - 找 accountability partner
  - 定期回顾进展和成就感
  - 找更深层的原因和意义

- **技能不足**：
  - 制定学习计划
  - 寻找导师或课程
  - 边做边学，在实践中提升
  - 从简单任务开始

- **资源不足**：
  - 寻找免费或低成本替代
  - 慢慢积累资源
  - 调整目标以适应现有资源
  - 寻求他人帮助或合作

**提示词模板：**
```
针对用户提到的困难 [${obstacle}]，为"如果遇到[困难]，你打算怎么应对？"生成 3-4 个应对策略选项：

选项要求：
- 针对具体困难给出可行策略
- 策略要具体可执行
- 简洁明了（每个不超过30字）
- 覆盖不同类型的应对方式
```

**选项设计原则：**
1. 困难选项要结合目标类型给出常见困难
2. 资源选项要覆盖不同类型的资源
3. 应对策略选项要针对具体困难给出可行方案
4. 所有选项都要非评判性，让用户感到被支持和理解

## Data Storage

Save action plan:
```bash
opencoach data set action_guidelines "..."
opencoach data set obstacles "..."
opencoach data set resources "..."
opencoach data set response_strategies "..."
```

## State Update Command

```
opencoach state set create-goal FILE_CREATION
```
