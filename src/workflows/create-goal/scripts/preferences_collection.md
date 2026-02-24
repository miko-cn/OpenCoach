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
