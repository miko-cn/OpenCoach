# OpenCoach CLI Tool

A command-line tool for managing OpenCoach workflows, goals, and tasks.

## Installation

```bash
# Option 1: Direct execution
node /path/to/OpenCoach/src/cli/opencoach.js <command>

# Option 2: Add to PATH
export PATH="$PATH:/path/to/OpenCoach/src/cli"
opencoach <command>

# Option 3: Global install (from cli directory)
cd /path/to/OpenCoach/src/cli
npm link
opencoach <command>
```

## Quick Start

```bash
# State management
opencoach state get create-goal
opencoach state set create-goal IMPORTANCE_EXPLORATION
opencoach state clear create-goal

# Data storage
opencoach data set --key goal_description --value "Learn Python"
opencoach data get --key goal_description

# Goal management
opencoach goals list
opencoach goals create "学习Python"

# Task management
opencoach tasks list learn-python
opencoach tasks create learn-python --start 2026-02-24 --end 2026-03-24
```

## Commands

### State Management
| Command | Description |
|---------|-------------|
| `opencoach state get <workflow>` | Get current workflow state |
| `opencoach state set <workflow> <state>` | Set workflow state |
| `opencoach state clear <workflow>` | Clear workflow state |

### Data Storage
| Command | Description |
|---------|-------------|
| `opencoach data set --key <k> --value <v>` | Store string value |
| `opencoach data set --json '<json>'` | Store JSON data |
| `opencoach data get [--key <k>]` | Get data |
| `opencoach data clear` | Clear all data |

### Goal Management
| Command | Description |
|---------|-------------|
| `opencoach goals list` | List all goals |
| `opencoach goals create <name>` | Create new goal |
| `opencoach goals get <goal>` | Get goal details |

### Task Management
| Command | Description |
|---------|-------------|
| `opencoach tasks list <goal>` | List tasks |
| `opencoach tasks create <goal>` | Create tasks file |

### Reviews
| Command | Description |
|---------|-------------|
| `opencoach reviews list <goal>` | List reviews |

### Export
| Command | Description |
|---------|-------------|
| `opencoach export <goal>` | Export as JSON |
| `opencoach export <goal> -o <file>` | Export to file |

## Workflow Integration

The CLI is designed to work with the refactored workflow structure:

```
workflows/
├── create-goal/
│   ├── meta.yaml           # Workflow metadata
│   ├── states.yaml         # Structured state definitions
│   ├── transitions.yaml    # Transition rules
│   └── scripts/           # Dialogue scripts (separate files)
├── create-task/
│   └── ...
└── create-review/
    └── ...
```

### Example Workflow Execution

```bash
# Agent starts workflow
opencoach state set create-goal INIT

# After user confirms
opencoach state set create-goal PRE_CHECK
opencoach state set create-goal GOAL_ELICITATION

# Store collected data
opencoach data set --key goal_description --value "My goal"

# Continue workflow
opencoach state set create-goal IMPORTANCE_EXPLORATION

# Complete workflow
opencoach state clear create-goal
opencoach data clear
```

## Testing

```bash
npm test           # Run all tests
npm run test:watch # Watch mode
```

## Development

### Adding New Commands

1. Add function to `opencoach.js`
2. Add command parser in `parseArgs()`
3. Add test in `test/`

### Test Structure

```
test/
├── setup.js       # Test environment (temp directories)
├── helpers.js     # Reusable test functions
├── state.test.js # State management tests
├── data.test.js  # Data storage tests
└── goals.test.js # Goal management tests
```
