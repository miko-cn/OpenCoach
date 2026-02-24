# 🎯 OpenCoach

> 一个基于 AI 的目标管理与教练式工作流系统，采用 State of Art 提示词工程实践

OpenCoach 是一个专业的目标管理框架，通过结构化的工作流、智能化的 AI Agent 和可复用的模板系统，帮助用户实现目标设定、任务规划、进度追踪和定期复盘的完整闭环。

## ✨ 核心特性

### 🤖 智能 Agent 系统
- **角色驱动**：专业的教练式 AI Agent，提供个性化指导
- **上下文感知**：自动恢复会话状态，无缝继续工作
- **交互式菜单**：直观的命令系统，快速访问各项功能

### 📋 结构化工作流（已重构）
- **目标创建流程**：从愿景到可执行目标的完整引导
- **任务规划流程**：SMART 原则驱动的任务分解
- **复盘评估流程**：基于 GROW 模型的反思与改进
- **Agent 可执行**：结构化状态定义，便于 LLM 理解和执行

### 🔧 CLI 工具
- **状态管理**：工作流状态跟踪和恢复
- **数据存储**：工作流过程中的临时数据
- **目标 CRUD**：目标、任务、回顾的增删改查
- **导出功能**：JSON 格式导出便于集成

### 🧪 测试框架
- Jest 测试套件
- 临时目录隔离
- 易于扩展

## 📁 项目结构

```
OpenCoach/
├── src/
│   ├── Agent.md                    # Agent 核心定义文档
│   ├── agents/
│   │   └── opencoach.chatmode.md  # Agent 激活配置
│   ├── prompts/
│   │   ├── opencoach-create.prompt.md
│   │   ├── opencoach-plan.prompt.md
│   │   └── opencoach-review.prompt.md
│   ├── templates/                   # 文档模板
│   │   ├── goal.md
│   │   ├── tasks.md
│   │   ├── milestones.md
│   │   ├── review.md
│   │   └── preferences.md
│   ├── workflows/                  # 工作流（重构后）
│   │   ├── create-goal/
│   │   │   ├── meta.yaml           # 元数据
│   │   │   ├── states.yaml         # 结构化状态定义
│   │   │   ├── transitions.yaml    # 转换规则
│   │   │   └── scripts/            # 对话脚本（分离）
│   │   ├── create-task/
│   │   │   └── ...
│   │   └── create-review/
│   │       └── ...
│   ├── cli/                        # CLI 工具
│   │   ├── opencoach.js           # 主程序
│   │   ├── package.json
│   │   ├── jest.config.js
│   │   ├── README.md
│   │   └── test/                  # 测试
│   │       ├── setup.js
│   │       ├── helpers.js
│   │       ├── state.test.js
│   │       ├── data.test.js
│   │       └── goals.test.js
├── goals/                          # 用户目标存储（自动生成）
└── LICENSE
```

## 🚀 快速开始

### 1. 激活 Agent

在支持 Agent 的 AI 助手中（如 Cursor、Windsurf 等），使用以下命令激活 OpenCoach：

```
@opencoach
```

### 2. 使用 CLI 工具

```bash
# 进入 CLI 目录
cd src/cli

# 安装依赖
npm install

# 运行测试
npm test

# 使用 CLI
node opencoach.js goals list
node opencoach.js state set create-goal INIT
```

### 3. 创建第一个目标

激活后，选择菜单中的"创建新目标"选项，Agent 将引导你完成：

1. **愿景探索**：明确你想要达成的理想状态
2. **目标定义**：使用 SMART 原则定义具体目标
3. **里程碑规划**：分解为可管理的阶段性成果
4. **文档生成**：自动创建结构化的目标文档

## 💡 工作流重构说明

### 重构前的问题
- 工作流文件过于冗长（470-740 行）
- 指令与内容混合
- 缺少结构化状态管理
- LLM 难以可靠追踪状态

### 重构后的结构
```
workflows/create-goal/
├── meta.yaml           # 元数据：版本、状态列表
├── states.yaml         # Agent 可执行的结构化格式
├── transitions.yaml    # 转换规则（结构化）
└── scripts/           # 对话脚本（独立文件）
    ├── init.md
    ├── goal_elicitation.md
    └── ...
```

### CLI 状态管理
```bash
# Agent 在每个状态结束时调用
opencoach state set create-goal IMPORTANCE_EXPLORATION
opencoach data set --key goal_description --value "My goal"

# 需要知道当前状态时
opencoach state get create-goal  # 返回: create-goal: GOAL_ELICITATION
```

## 📖 文档说明

### Agent 定义（Agent.md）
完整的 Agent 角色定义，包括：
- 核心价值观和设计理念
- 交互菜单系统
- 工作流引用和执行规则
- 上下文管理机制

### 工作流文档（workflows/）
每个工作流包含：
- YAML 元数据（版本、依赖）
- 结构化状态定义
- 转换规则
- 独立对话脚本

### CLI 工具（cli/）
- `opencoach.js`: 主程序
- `test/`: 测试套件
- `README.md`: 详细使用说明

## 🧪 测试

```bash
cd src/cli
npm test
```

测试结果：
```
Test Suites: 3 passed
Tests:       16 passed
```

## 🤝 如何贡献

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

**开始你的目标管理之旅吧！** 🚀

使用 `@opencoach` 激活 Agent，让 AI 教练陪伴你实现每一个目标。
