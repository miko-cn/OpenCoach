# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

OpenCoach is an AI-powered goal management and coaching system. It provides structured workflows for goal setting, task planning, and progress review through an interactive AI Agent persona.

## Project Structure

```
OpenCoach/
├── src/
│   ├── Agent.md                    # Core agent definition (role, workflows, behavior)
│   ├── agents/
│   │   └── opencoach.chatmode.md  # Agent activation config with tool definitions
│   ├── prompts/
│   │   ├── opencoach-create.prompt.md
│   │   ├── opencoach-plan.prompt.md
│   │   └── opencoach-review.prompt.md
│   ├── templates/                   # Document templates
│   │   ├── goal.md
│   │   ├── tasks.md
│   │   ├── milestones.md
│   │   ├── review.md
│   │   └── preferences.md
│   ├── workflows/                  # Workflows (REFACTORED)
│   │   ├── create-goal/           # Refactored structure
│   │   │   ├── meta.yaml         # Metadata
│   │   │   ├── states.yaml       # Structured state definitions
│   │   │   ├── transitions.yaml  # Transition rules
│   │   │   └── scripts/          # Dialogue scripts (separate)
│   │   ├── create-task/
│   │   │   └── ...
│   │   └── create-review/
│   │       └── ...
│   ├── cli/                        # CLI Tool
│   │   ├── opencoach.js          # Main program
│   │   ├── package.json
│   │   ├── jest.config.js
│   │   ├── README.md
│   │   └── test/                 # Test suite
│   │       ├── setup.js
│   │       ├── helpers.js
│   │       ├── state.test.js
│   │       ├── data.test.js
│   │       └── goals.test.js
├── goals/                          # User goal storage (auto-generated)
└── LICENSE
```

## Activation

To activate OpenCoach in a compatible AI assistant, use `@opencoach` reference. The agent loads `src/Agent.md` for role definition and `src/agents/opencoach.chatmode.md` for tool configuration.

## Key Concepts

### Workflows (Refactored)

The workflows have been refactored for better LLM execution:

- **create-goal**: Guided goal creation using SMART principles
- **create-task**: Task breakdown and planning for existing goals
- **create-review**: Progress review and reflection using GROW model

Each workflow now has:
- `meta.yaml`: Workflow metadata
- `states.yaml`: Structured state definitions (LLM-executable)
- `transitions.yaml`: Transition rules (structured)
- `scripts/`: Individual dialogue scripts

### CLI Tool

The CLI tool (`src/cli/opencoach.js`) provides:

```bash
# State management
opencoach state get <workflow>
opencoach state set <workflow> <state>
opencoach state clear <workflow>

# Data storage
opencoach data set --key <k> --value <v>
opencoach data get [--key <k>]
opencoach data clear

# Goal management
opencoach goals list
opencoach goals create <name>
opencoach goals get <goal>

# Tasks
opencoach tasks list <goal>
opencoach tasks create <goal>

# Export
opencoach export <goal> [-o <file>]
```

### Agent Persona

The agent embodies a teenage girl coach persona ("青春期的美少女教练") who addresses users as "老板" (boss). Key traits:
- Natural, conversational language (avoiding AI-sounding phrasing)
- Uses cute emojis and kaomoji
- Emotionally supportive and encouraging
- Professional but approachable

## Important Files

- `src/Agent.md`: Main agent definition - read this first to understand the agent's role, workflows, and behavior
- `src/workflows/create-goal/`: Refactored workflow structure (start here for new features)
- `src/cli/opencoach.js`: CLI tool for state and data management
- `src/cli/test/`: Test suite (run with `npm test` in cli directory)
