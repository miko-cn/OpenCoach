# ClawCoach OpenClaw 开发指南

> 将 OpenCoach 适配为 OpenClaw Skill/Agent 的完整开发指南

## 📖 项目概述

### ClawCoach 是什么？

**ClawCoach** 是 OpenCoach 在 OpenClaw 平台的适配版本，一个 AI 驱动的目标管理与教练式工作流系统。

### 与 OpenCoach 的关系

```
┌─────────────────────────────────────────────────────────────┐
│                     OpenCoach 项目                          │
├─────────────────────────────────────────────────────────────┤
│  ~/OpenCoach (main 分支)         │  ~/ClawCoach             │
│  • 核心产品开发                  │  (feature/openclaw-skill)│
│  • 独立 CLI 应用                 │  • OpenClaw 适配层       │
│  • 通用 Agent 定义               │  • Skill 命令封装        │
│                                  │  • OpenClaw Agent 配置   │
└─────────────────────────────────────────────────────────────┘
```

### 核心价值

| 特性 | OpenCoach | ClawCoach |
|------|-----------|-----------|
| 工作流引擎 | ✅ | ✅（共享） |
| CLI 工具 | ✅ | ✅（共享） |
| OpenClaw Skill | ❌ | ✅ |
| OpenClaw Agent | ❌ | ✅（可选） |
| 飞书集成 | ❌ | ✅ |
| 独立运行 | ✅ | ✅ |

## 🚀 快速开始

### 前置条件

1. **OpenClaw 已安装并配置**
   ```bash
   openclaw-cn status
   ```

2. **Node.js 环境**
   ```bash
   node --version  # v24.13.1+
   npm --version
   ```

3. **Git 配置**
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your@email.com"
   ```

### 步骤 1：克隆项目

```bash
# 克隆到开发目录
cd ~
git clone -b feature/openclaw-skill git@github.com:miko-cn/OpenCoach.git ClawCoach
cd ClawCoach
```

### 步骤 2：安装依赖

```bash
# 安装 CLI 依赖
cd src/cli
npm install
npm test  # 验证安装（16 个测试应全部通过）
```

### 步骤 3：部署到 OpenClaw

```bash
# 返回项目根目录
cd ~/ClawCoach

# 运行部署脚本
./scripts/deploy-to-openclaw.sh
```

**部署脚本会：**
- 创建符号链接到 OpenClaw 工作区
- 复制 Skill 定义到 `~/.openclaw/workspace/skills/clawcoach`
- 复制 Agent 配置到 `~/.openclaw/workspace/agents/coach`
- 更新部署状态文件

### 步骤 4：验证部署

```bash
# 重启 OpenClaw 网关
openclaw-cn gateway restart

# 等待网关启动后，在 OpenClaw 中测试
/coach list
```

## 🛠️ 开发流程

### 分支策略

```
main (OpenCoach 核心)
  │
  └── merge ──> feature/openclaw-skill (ClawCoach 适配)
                  │
                  ├── openclaw/skill/       # Skill 定义
                  └── openclaw/agent-config/ # Agent 配置
```

### 标准开发流程

```bash
# 1. 在 main 分支开发核心功能
git checkout main
# ... 开发 OpenCoach 核心功能 ...
git commit -m "feat: 新功能"
git push origin main

# 2. 同步到 ClawCoach
git checkout feature/openclaw-skill
git merge main

# 3. 解决冲突（如有）
# 4. 添加 OpenClaw 特定代码
# 5. 测试
./scripts/deploy-to-openclaw.sh

# 6. 提交并推送
git commit -m "feat: OpenClaw 适配"
git push origin feature/openclaw-skill
```

### 同步脚本

```bash
# 自动从 main 分支同步核心功能
./scripts/sync-to-openclaw.sh
```

**脚本功能：**
- 检查当前分支
- 合并 main 分支
- 解决常见冲突
- 运行测试验证

## 📦 OpenClaw Skill 开发规范

### Skill 目录结构

```
~/.openclaw/workspace/skills/clawcoach/
├── SKILL.md              # Skill 定义（必需）
├── scripts/              # 命令脚本（可选）
│   ├── goal.js
│   ├── task.js
│   └── review.js
└── package.json          # 依赖定义（可选）
```

### SKILL.md 格式

```markdown
---
name: ClawCoach
description: AI 目标管理与教练式工作流系统
metadata: {"emoji":"🎯","os":["linux","darwin"],"requires":{"bins":["node"]}}
---

# ClawCoach Skill

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

### 命令实现模式

#### 模式 1：直接调用 CLI（推荐）

```javascript
// scripts/goal.js
const { execSync } = require('child_process');

module.exports = async function({ context, params }) {
  const goalName = params.goal;
  const cmd = `node ~/ClawCoach/src/cli/opencoach.js goals create "${goalName}"`;
  const output = execSync(cmd, { encoding: 'utf8' });
  return { content: output };
};
```

#### 模式 2：调用工作流

```javascript
// scripts/task.js
const { execSync } = require('child_process');

module.exports = async function({ context, params }) {
  const goalName = params.goal;
  
  // 设置工作流状态
  execSync(`node ~/ClawCoach/src/cli/opencoach.js state set create-task INIT`);
  
  // 启动工作流
  const cmd = `node ~/ClawCoach/src/cli/opencoach.js tasks plan "${goalName}"`;
  const output = execSync(cmd, { encoding: 'utf8' });
  
  return { content: output };
};
```

### Skill 测试

```bash
# 在 OpenClaw 中测试
/coach goal "测试目标"
/coach task "测试目标"
/coach review "上周"
/coach list
```

## 🧪 测试指南

### CLI 测试

```bash
cd src/cli
npm test
```

**预期输出：**
```
Test Suites: 3 passed
Tests:       16 passed
```

### OpenClaw Skill 测试

```bash
# 1. 部署
./scripts/deploy-to-openclaw.sh

# 2. 重启网关
openclaw-cn gateway restart

# 3. 在 OpenClaw 中测试所有命令
/coach goal "学习 TypeScript"
/coach list
/coach task "学习 TypeScript"
/coach review "上周"
```

### 集成测试

```bash
# 创建完整工作流测试
# 1. 创建目标
/coach goal "减肥 10 斤"

# 2. 任务分解
/coach task "减肥 10 斤"

# 3. 查看结果
/coach list

# 4. 复盘（一周后）
/coach review "上周"
```

## 🚢 部署流程

### 开发环境部署

```bash
# 使用符号链接（推荐开发环境）
./scripts/deploy-to-openclaw.sh
```

### 生产环境部署

```bash
# 使用 Git 子模块（推荐生产环境）
cd ~/.openclaw/workspace/skills
git submodule add -b feature/openclaw-skill git@github.com:miko-cn/OpenCoach.git clawcoach-src
ln -s clawcoach-src/openclaw/skill clawcoach
```

### 部署验证清单

- [ ] Skill 文件已复制到 `~/.openclaw/workspace/skills/clawcoach/`
- [ ] Agent 配置已复制到 `~/.openclaw/workspace/agents/coach/`
- [ ] OpenClaw 网关已重启
- [ ] `/coach` 命令可用
- [ ] CLI 测试通过

## 🔧 故障排查

### 常见问题

#### 1. Skill 不生效

```bash
# 检查 Skill 是否已加载
openclaw-cn skills list

# 检查符号链接
ls -la ~/.openclaw/workspace/skills/clawcoach

# 重新部署
./scripts/deploy-to-openclaw.sh
openclaw-cn gateway restart
```

#### 2. CLI 命令失败

```bash
# 检查 Node.js 版本
node --version

# 检查依赖
cd src/cli
npm install

# 运行测试
npm test
```

#### 3. 工作流状态错误

```bash
# 重置工作流状态
node src/cli/opencoach.js state reset create-goal

# 检查状态
node src/cli/opencoach.js state get create-goal
```

#### 4. OpenClaw 网关问题

```bash
# 查看网关状态
openclaw-cn gateway status

# 查看日志
journalctl --user -u openclaw-gateway.service -f

# 重启网关
openclaw-cn gateway restart
```

### 调试技巧

```bash
# 启用详细日志
export DEBUG=clawcoach:*

# 查看 Skill 加载日志
cat ~/.openclaw/logs/gateway.log | grep clawcoach

# 测试 CLI 直接调用
node ~/ClawCoach/src/cli/opencoach.js goals list
```

## 📚 参考资源

### OpenClaw 文档

- [Skill 开发指南](https://docs.openclaw.ai/concepts/skills)
- [Agent 配置](https://docs.openclaw.ai/concepts/agent)
- [工作区结构](https://docs.openclaw.ai/concepts/agent-workspace)

### 本地文档

- `CLAUDE.md` - 开发环境配置
- `DEPLOY_STATUS.md` - 部署状态跟踪
- `scripts/README.md` - 脚本使用说明

### 相关项目

- [OpenCoach](https://github.com/miko-cn/OpenCoach) - 核心项目
- [OpenClaw](https://github.com/openclaw/openclaw) - 平台框架

## 🤝 贡献指南

### 提交规范

```bash
# 功能开发
git commit -m "feat: 添加新工作流"

# Bug 修复
git commit -m "fix: 修复状态管理问题"

# 文档更新
git commit -m "docs: 更新开发指南"

# OpenClaw 适配
git commit -m "adapt: OpenClaw Skill 命令封装"
```

### 发布流程

```bash
# 1. 更新版本号
# 2. 更新 CHANGELOG.md
# 3. 打标签
git tag v1.0.0-openclaw
git push origin v1.0.0-openclaw

# 4. 发布说明
# 在 GitHub Release 中发布详细说明
```

---

**最后更新：** 2026-02-26  
**维护者：** ClawCoach 开发团队  
**许可证：** MIT
