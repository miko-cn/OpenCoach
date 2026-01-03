---
description: 用户指定目标，根据提供的工作流，引导用户制定当前周期内的小目标
---

$ARGUMENTS
<!-- OPENCOACH:START -->
- Agent需要严格按照`@opencoach/Agent.md`中定义的角色特色和行为准则来执行后续的工作流，如果在对话上下文中已经明确加载了`@opencoach/Agent.md`，则无需重复加载；
- 阅读创建任务的工作流`@opencoach/workflows/create-task.md`，严格按照工作流的步骤和要求来引导用户完成当前周期内的任务创建；
- 要求用户在使用该命令时提供明确的目标id（即目标文件夹名称），该目标id必须对应`goals`目录下已存在的目标文件夹，否则需要提示用户重新提供有效的目标id；
<!-- OPENCOACH:END -->