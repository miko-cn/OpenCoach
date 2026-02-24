# NEXT_CYCLE_PLANNING State Script

## Agent Action

Guide user to plan next cycle or rest.

## User Options

```
太棒了！这个周期的任务都完成啦！🎉

现在你可以：
1. 马上开始制定下一周期的任务
2. 先休息一下，过几天再说
3. 回顾一下目标，看看是否需要调整

你想怎么做呢？
```

### Option Responses

**1. Start now**:
```
好的！那我们现在就开始吧~ (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧
→ Suggest create-task workflow
```

**2. Rest**:
```
好的，好好休息，庆祝一下你的成就！🎊
想开始新周期的时候随时来找我~
→ COMPLETE
```

**3. Review goal**:
```
明白了，我们可以重新审视一下目标~
→ Suggest updating goal.md or milestones.md
```

## Exit Conditions

- **User makes choice**: → COMPLETE (regardless of choice)

## State Update Command

```
opencoach state set create-review COMPLETE
```
