
# OpenCoach

OpenCoach 是一组用于目标管理、任务创建与回顾的轻量级模板与提示（prompts），便于快速搭建教练式工作流。

## 项目结构

- `src/`：核心说明与模板
  - `agents/`：agent 模式文档
  - `prompts/`：用于生成内容的提示模板
  - `templates/`：目标、任务、里程碑等可复用文档模板
  - `workflows/`：示例工作流（如创建目标 / 复盘 / 任务）
- `tools/`：可选工具或脚本目录

## 快速开始

1. 在工作区中查看 `src/Agent.md` 了解整体设计。
2. 根据需要打开 `src/prompts/` 下的提示（例如 `opencoach-create.prompt.md`）并自定义。
3. 使用 `src/templates/` 中的模板快速创建目标、里程碑或复盘文档。

## 如何贡献

- 提交 issue 讨论新功能或改进。
- 克隆仓库并在本地编辑 `src/templates/` 或 `src/prompts/`，然后发起 PR。

## 许可证

本项目遵循仓库根目录的 `LICENSE` 文件。

## 更多信息

参见 `src/` 下的文档以获取详细说明与用例。
