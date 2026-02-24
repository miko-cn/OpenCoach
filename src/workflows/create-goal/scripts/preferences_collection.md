# PREFERENCES_COLLECTION State Script

## Agent Action

Collect user preferences for agent interaction (optional).

## Preference Collection

```
最后，你对我有什么特别的要求或偏好吗？比如：
- 称呼方式（现在叫你'老板'，要换吗？）
- 沟通风格（严肃一点还是轻松一点？）
- 提醒频率（多久提醒一次进度？）
- 其他任何想法~
```

## Dialogue Variations

**User provides preferences**:
```
好的，我都记下了！创建 preferences.md 文件
```

**User has no preferences**:
```
好的，那就保持现在这样啦！有需要随时告诉我 (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
跳过文件创建
```

## Progress Tracking

Track preference collection:
- [ ] Preference question asked
- [ ] User response received
- [ ] File created (if applicable)

## Exit Conditions

- **Preferences collected (or user skips)**: → COMPLETE

## Interactive Options

### 1. Addressing Options

当询问"叫我什么？"时，生成以下称呼选项：

**选项框架：**
- 老板（保持现有称呼）
- 叫我的名字 [用户名]
- 昵称（可爱/亲切的称呼）
- 其他/自定义输入

**提示词模板：**
```
为"叫我什么？"生成 3 个称呼选项：

选项要求：
- 提供保持现有、使用名字、使用昵称三个选项
- 如果知道用户名，可以在"叫我的名字"选项中提及
- 简洁明了（每个不超过20字）
- 保留自定义输入空间

示例：
- 老板（保持现有）
- 叫我的名字
- 昵称（可爱/亲切的称呼）
- [其他...自定义输入]
```

### 2. Communication Style Options

当询问"沟通风格？"时，生成以下风格选项：

**选项框架：**
- 轻松活泼（就像现在，用表情和颜文字）
- 认真专注（少点玩笑，更专业）
- 根据情况调整（有时候轻松，有时候认真）
- 都可以，你看着办

**提示词模板：**
```
为"沟通风格？"生成 4 个风格选项：

选项要求：
- 覆盖不同风格（轻松/认真/灵活/随意）
- 每个选项附带简短说明
- 简洁明了（每个不超过30字）
- 让用户能快速选择自己偏好的风格

示例：
- 轻松活泼（就像现在）
- 认真专注（更专业）
- 根据情况调整（灵活切换）
- 都可以，你看着办
```

### 3. Reminder Frequency Options

当询问"提醒频率？"时，生成以下频率选项：

**选项框架：**
- 每天提醒（保持高频）
- 每周提醒（每周回顾）
- 每月提醒（月度总结）
- 不需要提醒，我自己会来

**提示词模板：**
```
为"提醒频率？"生成 4 个频率选项：

选项要求：
- 覆盖不同频率（每天/每周/每月/不需要）
- 简洁明了（每个不超过20字）
- 让用户能选择自己需要的频率
- 提供不需要提醒的选项

示例：
- 每天提醒
- 每周提醒
- 每月提醒
- 不需要提醒
```

### 4. Other Preferences Options

当询问"还有什么其他偏好吗？"时，生成以下常见偏好选项：

**选项框架：**
- 没有其他偏好了
- 希望更直接一点（少点客套）
- 希望更多鼓励（需要动力支持）
- 希望更严格一点（多监督和提醒）
- 其他/自定义输入

**提示词模板：**
```
为"还有什么其他偏好吗？"生成 3-4 个常见偏好选项：

选项要求：
- 覆盖常见偏好类型（直接/鼓励/严格/无其他）
- 简洁明了（每个不超过25字）
- 提供"没有其他偏好了"选项
- 保留自定义输入空间

示例：
- 没有其他偏好了
- 希望更直接一点
- 希望更多鼓励
- 希望更严格一点
- [其他...自定义输入]
```

**选项设计原则：**
1. 称呼选项要涵盖保持现有、使用名字、使用昵称三种主要方式
2. 风格选项要让用户能快速选择自己喜欢的沟通方式
3. 频率选项要覆盖不同的提醒节奏，包括不需要提醒
4. 其他偏好选项要涵盖常见需求，提供自定义空间

## Data Storage

Save preferences:
```bash
opencoach data set preferences '{
  "addressing": "老板",
  "communication_style": "轻松",
  "reminder_frequency": "每周",
  "other": "..."
}'
```

## State Update Command

```
opencoach state set create-goal COMPLETE
```
