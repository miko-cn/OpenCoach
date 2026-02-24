# create-goal Workflow (Refactored)

## Structure

```
create-goal/
├── meta.yaml           # Workflow metadata
├── states.yaml         # Structured state definitions
├── transitions.yaml    # Transition rules
└── scripts/           # Dialogue scripts
    ├── init.md
    ├── pre_check.md
    ├── goal_elicitation.md
    ├── importance_exploration.md
    ├── smart_evaluation.md
    ├── clarify.md
    ├── action_planning.md
    ├── file_creation.md
    ├── milestone_planning.md
    ├── preferences_collection.md
    ├── complete.md
    └── error.md
```

## Usage

### State Management

```bash
# Get current state
opencoach state get create-goal

# Set state
opencoach state set create-goal GOAL_ELICITATION

# Clear state (on completion)
opencoach state clear create-goal
```

### Data Storage

```bash
# Store intermediate data
opencoach data set goal_description "..."
opencoach data set smart_evaluation "..."

# Get stored data
opencoach data get goal_description

# Clear data
opencoach data clear
```

### Goal Management

```bash
# Create new goal
opencoach goals create "Learn Python"

# List goals
opencoach goals list

# Get goal details
opencoach goals get learn-python
```

## State Flow

```
INIT → PRE_CHECK → GOAL_ELICITATION → IMPORTANCE_EXPLORATION
    → SMART_EVALUATION → ACTION_PLANNING → FILE_CREATION
    → MILESTONE_PLANNING → PREFERENCES_COLLECTION → COMPLETE
                                                        ↓
                                                      END

Any state → ERROR → END
```
