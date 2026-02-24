# CLAUDE.md

Guidance for Claude Code when working with OpenCoach.

## Project Overview

AI-powered goal management system with structured workflows, interactive AI Agent, and templates for goal setting, task planning, and progress review.

## Key Structure

```
src/
├── Agent.md              # Main agent definition (role, workflows, behavior)
├── workflows/            # Structured workflows with scripts containing Interactive Options
│   ├── create-goal/
│   ├── create-task/
│   └── create-review/
├── cli/                  # CLI tool for state/data management
├── templates/            # Document templates
└── skills/               # Generated Claude skills
```

## Key Concepts

### Agent Persona
Teenage girl coach addressing users as "老板". Natural language, emojis/kaomoji, emotionally supportive.

### Workflows
- `create-goal`: SMART-based goal creation
- `create-task`: Task breakdown and planning
- `create-review`: GROW-based progress review

Each workflow has `meta.yaml`, `states.yaml`, `transitions.yaml`, and `scripts/` with Interactive Options for every question.

### Interactive Options
Every question provides 3-4 context-aware preset options. Users can quick-select or freely type input. See Agent.md behavior #7 for details.

### CLI Tool
`src/cli/opencoach.js` - state management, data storage, goal CRUD. Run `npm test` in cli directory.

## Important Files

- `src/Agent.md` - Start here for agent role and behavior
- `src/workflows/*/scripts/*.md` - Workflow scripts with Interactive Options
