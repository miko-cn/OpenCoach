# OpenClaw 适配层

此分支包含 OpenCoach 在 OpenClaw 平台的适配代码。

## 目录结构

```
openclaw/
├── skill/              # OpenClaw Skill
│   ├── SKILL.md       # Skill 定义
│   └── scripts/       # 脚本文件
└── agent-config/      # Coach Agent 配置
    ├── SOUL.md        # 人格设定
    ├── AGENTS.md      # 使用指南
    └── IDENTITY.md    # 身份定义
```

## 部署到 OpenClaw

### 方式 1：Git Clone（推荐）

```bash
cd ~/.openclaw/workspace/skills
git clone -b feature/openclaw-skill git@github.com:miko-cn/OpenCoach.git opencoach-src
ln -s opencoach-src/openclaw/skill opencoach
ln -s opencoach-src/openclaw/agent-config ../../agents/coach
```

### 方式 2：Git Worktree

```bash
cd ~/clawcoach
git worktree add -b openclaw-deploy ~/.openclaw/workspace/skills/opencoach-src feature/openclaw-skill
```

## 同步主分支功能

```bash
# 从 main 分支同步最新功能
git checkout feature/openclaw-skill
git merge main
git push origin feature/openclaw-skill
```

## 开发流程

1. **主分支开发** - 在 `main` 分支开发 OpenCoach 核心功能
2. **同步到分支** - 定期 merge main 到 `feature/openclaw-skill`
3. **OpenClaw 特定开发** - 在此分支添加 OpenClaw 适配代码
4. **部署测试** - 部署到 OpenClaw 测试
5. **发布版本** - 打 tag 发布

## 分支说明

- **main** - OpenCoach 核心功能（独立产品）
- **feature/openclaw-skill** - OpenClaw 平台适配（此分支）

## 版本发布

```bash
# 发布 OpenCoach 核心版本
git checkout main
git tag v1.0.0
git push origin v1.0.0

# 发布 OpenClaw 适配版本
git checkout feature/openclaw-skill
git merge main
git tag v1.0.0-openclaw
git push origin v1.0.0-openclaw
```

---

*最后更新：2026-02-26*
