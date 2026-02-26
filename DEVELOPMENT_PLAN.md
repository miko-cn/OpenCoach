# ClawCoach Skill 开发计划

> 使用 Plan 模式制定，基于 cc-mm25 分析

**创建时间：** 2026-02-26  
**分支：** `feature/openclaw-skill`  
**状态：** 🟡 待开始

---

## 📋 项目分析

### 现有 CLI 命令结构

```
opencoach.js
├── state <get|set|clear> <workflow>    # 工作流状态管理
├── data <set|get|clear> [key] [value]  # 临时数据存储
├── goals <list|create|get|add>         # 目标管理
├── tasks <list|create> <goal>          # 任务管理
├── reviews <list|create> <goal>        # 复盘管理
└── export <goal> [-o file]             # 导出功能
```

### 工作流结构

```
src/workflows/
├── create-goal/     # 目标创建工作流（7 个状态）
├── create-task/     # 任务规划工作流（5 个状态）
└── create-review/   # 复盘工作流（6 个状态）
```

### 数据存储位置

- **用户数据：** `~/OpenCoach/goals/`（与 OpenCoach 共享）
- **状态文件：** `~/OpenCoach/.opencoach/state.json`
- **数据文件：** `~/OpenCoach/.opencoach/data.json`

---

## 🎯 开发目标

### Phase 1：基础 Skill 命令（优先级：高）

实现 4 个核心命令，覆盖 90% 使用场景：

| 命令 | 功能 | CLI 映射 | 复杂度 |
|------|------|----------|--------|
| `/coach goal <目标>` | 创建新目标 | `goals create` | ⭐⭐ |
| `/coach task <目标>` | 任务分解 | `tasks create` | ⭐⭐ |
| `/coach review <周期>` | 复盘 | `reviews create` | ⭐⭐ |
| `/coach list` | 查看所有目标 | `goals list` | ⭐ |

### Phase 2：工作流集成（优先级：中）

集成结构化工作流，支持交互式对话：

| 命令 | 功能 | 工作流 | 复杂度 |
|------|------|--------|--------|
| `/coach create` | 完整目标创建工作流 | `create-goal` | ⭐⭐⭐⭐ |
| `/coach plan` | 任务规划工作流 | `create-task` | ⭐⭐⭐⭐ |
| `/coach reflect` | 复盘工作流 | `create-review` | ⭐⭐⭐⭐ |

### Phase 3：高级功能（优先级：低）

| 命令 | 功能 | CLI 映射 | 复杂度 |
|------|------|----------|--------|
| `/coach show <目标>` | 查看目标详情 | `goals get` | ⭐ |
| `/coach export <目标>` | 导出目标 | `export` | ⭐ |
| `/coach add-resource` | 添加资源 | `goals add` | ⭐⭐ |
| `/coach status` | 查看工作流状态 | `state get` | ⭐ |

---

## 📁 目录结构

```
~/ClawCoach/openclaw/skill/
├── SKILL.md                  # Skill 定义（已创建）
├── scripts/                  # 命令脚本（待创建）
│   ├── index.js              # 命令入口（导出所有命令）
│   ├── goal.js               # /coach goal 命令
│   ├── task.js               # /coach task 命令
│   ├── review.js             # /coach review 命令
│   ├── list.js               # /coach list 命令
│   ├── create.js             # /coach create 工作流（Phase 2）
│   ├── plan.js               # /coach plan 工作流（Phase 2）
│   ├── reflect.js            # /coach reflect 工作流（Phase 2）
│   ├── show.js               # /coach show 命令（Phase 3）
│   ├── export.js             # /coach export 命令（Phase 3）
│   └── utils.js              # 工具函数（CLI 调用封装）
└── README.md                 # Skill 使用说明
```

---

## 🛠️ 实现方案

### 方案 A：直接调用 CLI（推荐 Phase 1）

**优点：**
- ✅ 复用现有 CLI 代码
- ✅ 测试覆盖（16 个测试已验证）
- ✅ 开发快速
- ✅ 与 OpenCoach 保持同步

**缺点：**
- ❌ 进程开销（每个命令启动新 Node 进程）
- ❌ 输出格式需要解析

**实现示例：**

```javascript
// scripts/goal.js
const { execSync } = require('child_process');
const path = require('path');

const CLI_PATH = path.join(process.env.HOME, 'ClawCoach/src/cli/opencoach.js');

module.exports = async function({ context, params }) {
  const goalName = params.goal;
  
  if (!goalName) {
    return { content: '❌ 请提供目标名称\n\n用法：/coach goal <目标名称>' };
  }
  
  try {
    const cmd = `node "${CLI_PATH}" goals create "${goalName}"`;
    const output = execSync(cmd, { encoding: 'utf8', timeout: 10000 });
    return { content: `✅ ${output}` };
  } catch (error) {
    return { content: `❌ 创建目标失败：${error.message}` };
  }
};
```

### 方案 B：直接导入 CLI 模块（Phase 2 考虑）

**优点：**
- ✅ 无进程开销
- ✅ 更好的错误处理
- ✅ 可以直接调用函数

**缺点：**
- ❌ CLI 代码需要重构（目前是脚本模式）
- ❌ 路径依赖复杂

**实现示例：**

```javascript
// scripts/goal.js
const { goalsCreate } = require('../../src/cli/opencoach.js');

module.exports = async function({ context, params }) {
  const goalName = params.goal;
  
  // 重定向 console.log 输出
  let output = '';
  const originalLog = console.log;
  console.log = (msg) => { output += msg + '\n'; };
  
  try {
    goalsCreate({ _: [goalName] });
    return { content: `✅ ${output}` };
  } catch (error) {
    return { content: `❌ 错误：${error.message}` };
  } finally {
    console.log = originalLog;
  }
};
```

### 方案 C：工作流引擎集成（Phase 2）

**实现要点：**
- 读取 `workflows/*/states.yaml`
- 维护会话状态
- 调用 Prompt 模板
- 交互式选项生成

**架构：**

```
┌─────────────────┐
│  OpenClaw Agent │
│  (用户对话)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Workflow Engine│
│  (状态管理)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Prompt Templates│
│  (对话脚本)     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  CLI State/Data │
│  (持久化)       │
└─────────────────┘
```

---

## 📅 开发计划

### Week 1：Phase 1 基础命令

#### Day 1-2：环境准备
- [ ] 创建 `scripts/` 目录结构
- [ ] 实现 `utils.js`（CLI 调用封装）
- [ ] 实现 `list.js`（最简单，验证流程）
- [ ] 测试：`/coach list`

#### Day 3-4：核心命令
- [ ] 实现 `goal.js`（创建目标）
- [ ] 实现 `task.js`（任务分解）
- [ ] 实现 `review.js`（复盘）
- [ ] 测试所有命令

#### Day 5：文档和测试
- [ ] 更新 `SKILL.md`
- [ ] 编写使用文档
- [ ] 集成测试

### Week 2：Phase 2 工作流集成

#### Day 1-3：工作流引擎
- [ ] 读取 YAML 配置文件
- [ ] 实现状态机
- [ ] 实现 Prompt 模板渲染

#### Day 4-5：工作流命令
- [ ] 实现 `create.js`（目标创建工作流）
- [ ] 实现 `plan.js`（任务规划工作流）
- [ ] 实现 `reflect.js`（复盘工作流）

### Week 3：Phase 3 高级功能 + 优化

- [ ] 实现剩余命令（show, export, add-resource）
- [ ] 性能优化
- [ ] 错误处理增强
- [ ] 完整文档

---

## ✅ 验收标准

### Phase 1 验收

```bash
# 所有命令可用
/coach list
/coach goal "学习 TypeScript"
/coach task "学习 TypeScript"
/coach review "上周"

# 验证数据
ls ~/OpenCoach/goals/
cat ~/OpenCoach/.opencoach/state.json
```

### Phase 2 验收

```bash
# 工作流交互式对话
/coach create
# → Agent 引导用户完成目标创建流程

/coach plan "学习 TypeScript"
# → Agent 引导用户完成任务分解

/coach reflect "学习 TypeScript"
# → Agent 引导用户完成复盘
```

### Phase 3 验收

```bash
# 高级功能
/coach show "学习 TypeScript"
/coach export "学习 TypeScript"
/coach add-resource "学习 TypeScript" "教程" "https://..."
```

---

## 🔧 开发工具

### 测试命令

```bash
# CLI 测试
cd ~/ClawCoach/src/cli
npm test

# OpenClaw 测试
/coach list
/coach goal "测试目标"

# 验证部署
ls -la ~/.openclaw/workspace/skills/clawcoach/
```

### 调试技巧

```bash
# 查看 Skill 日志
tail -f ~/.openclaw/logs/gateway.log | grep clawcoach

# 直接测试 CLI
node ~/ClawCoach/src/cli/opencoach.js goals list

# 检查状态
node ~/ClawCoach/src/cli/opencoach.js state get create-goal
```

---

## ⚠️ 注意事项

### 网关重启规则

1. **非必要不重启**
2. **重启前必须询问用户**
3. **重启前必须验证配置**：
   ```bash
   ./scripts/validate-config.sh
   ```

### 路径约定

- **ClawCoach 根目录：** `~/ClawCoach`
- **OpenClaw 工作区：** `~/.openclaw/workspace`
- **用户数据：** `~/OpenCoach/goals/`（与 OpenCoach 共享）

### 分支管理

- **开发分支：** `feature/openclaw-skill`
- **定期同步 main：** `git merge main`
- **推送前检查：** `git status`

---

## 📚 参考资料

- [OpenClaw Skill 开发文档](https://docs.openclaw.ai/concepts/skills)
- [CLI 工具 README](src/cli/README.md)
- [OpenClaw 开发指南](openclaw/README.md)

---

**下一步：** 开始 Phase 1 Day 1 - 创建 `scripts/` 目录和 `utils.js`
