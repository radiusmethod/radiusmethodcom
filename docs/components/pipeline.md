# Pipeline Component

The Pipeline component is a visualization tool that displays workflow stages and jobs with their dependencies and statuses.

## Component Structure

The Pipeline system consists of multiple related components:

- **Pipeline** - Main container component that manages the overall pipeline state and layout
- **PipelineStage** - Represents a stage or phase in the pipeline (e.g., Build, Test, Deploy)
- **PipelineJob** - Represents an individual job within a stage
- **PipelineConnection** - Visual representation of dependencies between jobs

## Props and Interfaces

### Pipeline Component

```tsx
interface PipelineProps {
  jobs: Job[];
  showDependencies?: boolean;
}

export type JobStatus = 'success' | 'running' | 'failed' | 'pending';

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  type: string;
  dependencies?: string[];
}
```

### PipelineStage Component

```tsx
interface PipelineStageProps {
  title: string;
  jobs: Job[];
  showDependencies: boolean;
  allJobs: Job[];
}
```

### PipelineJob Component

```tsx
interface PipelineJobProps {
  job: Job;
}
```

### PipelineConnection Component

```tsx
interface PipelineConnectionProps {
  sourceId: string;
  targetId: string;
  sourceType: string;
  targetType: string;
}
```

## Usage Example

```tsx
import Pipeline from './components/Pipeline/Pipeline';

// Sample job data
const jobs = [
  {
    id: 'build-1',
    name: 'Initialize Project',
    status: 'success',
    type: 'build',
  },
  {
    id: 'test-1',
    name: 'Unit Tests',
    status: 'running',
    type: 'test',
    dependencies: ['build-1']
  },
  {
    id: 'deploy-1',
    name: 'Staging Deploy',
    status: 'pending',
    type: 'deploy',
    dependencies: ['test-1']
  }
];

function MyPage() {
  return (
    <Pipeline 
      jobs={jobs}
      showDependencies={true} 
    />
  );
}
```

## Styling

The Pipeline component uses CSS modules for styling, with the main styles defined in `Pipeline.module.css`. Key styling features include:

1. **Job Status Styling** - Different visual treatments for success, running, failed, and pending jobs
2. **Connection Lines** - SVG paths showing dependencies between jobs
3. **Animations** - Animations for running jobs, transitions, and connection lines
4. **Responsive Layout** - Mobile-responsive design with adjustments for smaller screens

## Implementation Notes

- The Pipeline component exists in multiple variations (.jsx, .tsx, .js) which may represent different versions or implementations
- The component supports different grouping modes (by stage or by dependencies)
- Job status changes can trigger visual updates throughout the pipeline
- Connection lines are calculated dynamically based on job positions 