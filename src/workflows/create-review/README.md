# create-review Workflow (Refactored)

## Structure

```
create-review/
├── meta.yaml           # Workflow metadata
├── states.yaml         # Structured state definitions
├── transitions.yaml    # Transition rules
└── scripts/           # Dialogue scripts
    ├── init.md
    ├── pre_check.md
    ├── task_review.md
    ├── challenge_discussion.md
    ├── experience_summary.md
    ├── improvement_planning.md
    ├── archive_decision.md
    ├── file_creation.md
    ├── task_update.md
    ├── next_cycle_planning.md
    ├── complete.md
    └── error.md
```

## Usage

### State Management

```bash
# Get current state
opencoach state get create-review

# Set state
opencoach state set create-review TASK_REVIEW

# Clear state (on completion)
opencoach state clear create-review
```

### Review Management

```bash
# List reviews for a goal
opencoach reviews list {goal-slug}

# Get specific review
opencoach reviews get {goal-slug} {date}
```

## State Flow

```
INIT → PRE_CHECK → TASK_REVIEW → CHALLENGE_DISCUSSION
    → EXPERIENCE_SUMMARY → IMPROVEMENT_PLANNING
    → ARCHIVE_DECISION → FILE_CREATION → TASK_UPDATE
    → NEXT_CYCLE_PLANNING → COMPLETE
                                                ↓
                                              END

Any state → ERROR → END
```

## Key Features

- **Empathetic approach**: Focus on encouragement, not judgment
- **Growth mindset**: Learn from both successes and challenges
- **Flexible archiving**: Decide whether to archive based on completion
- **Emotional support**: Socratic questioning and emotional validation
