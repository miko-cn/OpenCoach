# CLAUDE.md - ClawCoach 开发指南

> 为 Claude Code 在 ClawCoach 项目中工作提供的指导

## 项目概述

**ClawCoach** 是 OpenCoach 在 OpenClaw 平台的适配版本，一个基于 AI 的目标管理与教练式工作流系统。

### 与 OpenCoach 的关系

| 项目 | 位置 | 分支 | 用途 |
|------|------|------|------|
| **OpenCoach** | `~/OpenCoach` | `main` | 核心产品开发（独立应用） |
| **ClawCoach** | `~/ClawCoach` | `feature/openclaw-skill` | OpenClaw 平台适配（Skill/Agent） |

### 核心架构

```
ClawCoach/
├── src/                          # OpenCoach 核心代码（从 main 分支同步）
│   ├── Agent.md                  # Agent 核心定义
│   ├── workflows/                # 结构化工作流
│   │   ├── create-goal/          # 目标创建工作流
│   │   ├── create-task/          # 任务规划工作流
│   │   └── create-review/        # 复盘工作流
│   ├── cli/                      # CLI 工具
│   ├── prompts/                  # Prompt 模板
│   └── templates/                # 文档模板
├── openclaw/                     # OpenClaw 适配层
│   ├── skill/                    # OpenClaw Skill 定义
│   └── agent-config/             # Coach Agent 配置
└── scripts/                      # 部署和同步脚本
```

## 开发环境

### cc-cli 模型配置

**配置位置：** `~/cc-cli/bash/config.json`

**推荐模型：**

| 任务类型 | 模型 | 命令 | 说明 |
|----------|------|------|------|
| 日常开发 | MiniMax-M2.5 | `cc-mm25` | 默认模型，适合对话和代码 |
| 代码重构 | Qwen Coder Plus | `cc-qw3p` | 复杂代码任务 |
| 快速编码 | Qwen Coder Next | `cc-qw3n` | 简单代码任务 |
| 复杂推理 | Qwen Max | `cc-qw3m` | 需要深度思考的任务 |
| 中文内容 | GLM 4.7 | `cc-glm47` | 中文文档/内容 |

### 使用方法

```bash
# 加载配置（新终端自动加载）
source ~/cc-cli/bash/profile.sh

# 使用默认模型（MiniMax-M2.5）
cc-mm25

# 在 tmux 会话中运行复杂任务
SOCKET="/tmp/clawdbot-tmux-sockets/clawdbot.sock"
tmux -S "$SOCKET" new -d -s "clawcoach-dev"
tmux -S "$SOCKET" send-keys -t "clawcoach-dev" -- 'cd ~/ClawCoach && cc-mm25 -p "任务"' Enter
```

### 环境变量

- **AliyunCS API Key:** `ALIYUNCS_API_KEY`
- **Minimax API Key:** `MINIMAX_API_KEY`

## 核心概念

### 1. 结构化工作流

每个工作流包含：

```
workflows/create-goal/
├── meta.yaml           # 元数据：版本、状态列表
├── states.yaml         # Agent 可执行的结构化状态
├── transitions.yaml    # 状态转换规则
└── scripts/            # 对话脚本（每个问题含 Interactive Options）
    ├── init.md
    ├── goal_elicitation.md
    └── ...
```

### 2. Interactive Options

每个交互问题提供 3-4 个预设选项：
- 基于用户上下文的动态生成
- 覆盖全面、差异明显、有启发性
- 保留自定义输入空间

### 3. CLI 状态管理

```bash
# 设置状态
node src/cli/opencoach.js state set create-goal GOAL_ELICITATION

# 存储数据
node src/cli/opencoach.js data set --key goal_description --value "My goal"

# 获取状态
node src/cli/opencoach.js state get create-goal
```

### 4. Agent 人格

- **角色：** 青少年女孩教练
- **称呼用户：** "老板"
- **风格：** 自然语言、表情符号/颜文字、情感支持
- **定位：** 专业但亲切的目标管理伙伴

## 关键文件

### 必读文件

| 文件 | 用途 |
|------|------|
| `src/Agent.md` | Agent 角色定义、行为准则、工作流引用 |
| `src/workflows/*/scripts/*.md` | 工作流对话脚本（含 Interactive Options） |
| `src/cli/opencoach.js` | CLI 工具主程序 |
| `openclaw/skill/SKILL.md` | OpenClaw Skill 定义 |

### 配置文件

| 文件 | 用途 |
|------|------|
| `openclaw/agent-config/SOUL.md` | Coach Agent 人格设定 |
| `openclaw/agent-config/IDENTITY.md` | Agent 身份定义 |
| `openclaw/agent-config/AGENTS.md` | Agent 使用指南 |

## OpenClaw Skill 开发

### Skill 结构

```
openclaw/skill/
├── SKILL.md              # Skill 定义（命令、描述、用法）
└── scripts/              # 脚本文件（可选）
    ├── goal.js           # 目标管理命令
    ├── task.js           # 任务管理命令
    └── review.js         # 复盘命令
```

### SKILL.md 格式

```markdown
---
name: ClawCoach
description: AI 目标管理与教练式工作流
metadata: {"emoji":"🎯","os":["linux","darwin"],"requires":{"bins":["node"]}}
---

# ClawCoach Skill

使用 OpenCoach CLI 进行目标管理。

## 命令

- `/coach goal <目标>` - 创建新目标
- `/coach task <目标>` - 任务分解
- `/coach review <周期>` - 复盘
- `/coach list` - 查看所有目标

## 使用方式

\`\`\`bash
node ~/ClawCoach/src/cli/opencoach.js goals create "目标名称"
\`\`\`
```

### 开发流程

1. **在 `feature/openclaw-skill` 分支开发**
2. **同步 main 分支核心功能**：`./scripts/sync-to-openclaw.sh`
3. **添加 OpenClaw 特定代码**（Skill 命令、Agent 配置）
4. **部署测试**：`./scripts/deploy-to-openclaw.sh`
5. **提交并推送**

## 测试

### CLI 测试

```bash
cd src/cli
npm test
```

**测试结果：** 16 个测试全部通过

### OpenClaw Skill 测试

```bash
# 部署到 OpenClaw
./scripts/deploy-to-openclaw.sh

# 在 OpenClaw 中测试命令
/coach goal "测试目标"
/coach list
```

## 重要注意事项

### ⚠️ 分支管理

- **不在 `main` 分支修改 OpenClaw 适配代码**
- **定期从 `main` 合并核心功能**：`git merge main`
- **推送前确认分支**：`git branch`

### ⚠️ 路径约定

- **ClawCoach 根目录：** `~/ClawCoach`
- **OpenClaw 工作区：** `~/.openclaw/workspace`
- **用户数据：** `~/OpenCoach/goals/`（与 OpenCoach 共享）

### ⚠️ cc-cli 使用

- **必须加载配置**：`source ~/cc-cli/bash/profile.sh`
- **不使用智谱 BigModel 提供商**
- **GLM 5 有问题**，中文任务使用 GLM 4.7

### ⚠️ OpenClaw 配置

- **命令：** `openclaw-cn`（不是 `openclaw`）
- **修改配置后验证**：`./scripts/validate-config.sh`
- **重启网关：** `openclaw-cn gateway restart`

## 常用命令

### 开发命令

```bash
# 同步 main 分支
./scripts/sync-to-openclaw.sh

# 部署到 OpenClaw
./scripts/deploy-to-openclaw.sh

# 查看部署状态
cat DEPLOY_STATUS.md

# 运行 CLI 测试
cd src/cli && npm test
```

### Git 命令

```bash
# 查看分支
git branch

# 合并 main 分支
git checkout feature/openclaw-skill
git merge main

# 推送更新
git push origin feature/openclaw-skill
```

### OpenClaw 命令

```bash
# 查看状态
openclaw-cn status

# 重启网关
openclaw-cn gateway restart

# 查看技能
openclaw-cn skills list
```

---

**最后更新：** 2026-02-26  
**适用分支：** `feature/openclaw-skill`
