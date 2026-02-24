# create-task Workflow (Refactored)

## Structure

```
create-task/
├── meta.yaml           # Workflow metadata
├── states.yaml         # Structured state definitions
├── transitions.yaml    # Transition rules
└── scripts/           # Dialogue scripts
    ├── init.md
    ├── pre_check.md
    ├── context_review.md
    ├── period_definition.md
    ├── task_decomposition.md
    ├── priority_setting.md
    ├── feasibility_check.md
    ├── refine.md
    ├── file_creation.md
    ├── tracking_setup.md
    ├── complete.md
    └── error.md
```

## Usage

### State Management

```bash
# Get current state
opencoach state get create-task

# Set state
opencoach state set create-task PERIOD_DEFINITION

# Clear state (on completion)
opencoach state clear create-task
```

### Task Management

```bash
# List tasks for a goal
opencoach tasks list {goal-slug}

# Update task status
opencoach tasks update {task-id} {status}

# Create tasks file
opencoach tasks create {goal-slug}
```

## State Flow

```
INIT → PRE_CHECK → CONTEXT_REVIEW → PERIOD_DEFINITION
    → TASK_DECOMPOSITION → PRIORITY_SETTING → FEASIBILITY_CHECK
    → FILE_CREATION → TRACKING_SETUP → COMPLETE
                                                    ↓
                                                  END

Any state → REFINE → (previous state)
Any state → ERROR → END
```
