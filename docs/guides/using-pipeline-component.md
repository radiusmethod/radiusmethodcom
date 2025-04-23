# Using the Pipeline Component

This guide explains how to implement and customize the Pipeline component in your application.

## Basic Usage

To add a Pipeline to your page or component:

1. Import the Pipeline component:

```tsx
import Pipeline from '../components/Pipeline/Pipeline';
```

2. Prepare your job data:

```tsx
const jobs = [
  {
    id: 'build-1',
    name: 'Build Project',
    status: 'success',
    type: 'build'
  },
  {
    id: 'test-1',
    name: 'Run Tests',
    status: 'running',
    type: 'test',
    dependencies: ['build-1']
  }
];
```

3. Render the Pipeline component:

```tsx
<Pipeline 
  jobs={jobs}
  showDependencies={true}
/>
```

## Job Data Structure

Each job in the pipeline requires the following properties:

| Property | Type | Description |
|----------|------|-------------|
| id | string | Unique identifier for the job |
| name | string | Display name for the job |
| status | 'success' \| 'running' \| 'failed' \| 'pending' | Current status of the job |
| type | string | Job type (e.g., 'build', 'test', 'deploy') |
| dependencies | string[] | (Optional) Array of job IDs that this job depends on |

## Working with Job Dependencies

Job dependencies are used to:

1. Group jobs in stages (when using 'stage' grouping)
2. Draw connection lines between dependent jobs (when showDependencies is true)
3. Establish execution order in interactive pipelines

Example with dependencies:

```tsx
const jobs = [
  { id: 'job-1', name: 'First Job', status: 'success', type: 'build' },
  { id: 'job-2', name: 'Second Job', status: 'running', type: 'test', dependencies: ['job-1'] },
  { id: 'job-3', name: 'Third Job', status: 'pending', type: 'deploy', dependencies: ['job-2'] }
];
```

## Handling Job Status Changes

To make your Pipeline interactive, you can handle job status changes:

```tsx
import { useState } from 'react';
import Pipeline from '../components/Pipeline/Pipeline';

function MyPipeline() {
  const [jobs, setJobs] = useState([
    { id: 'job-1', name: 'First Job', status: 'pending', type: 'build' }
  ]);
  
  const handleJobClick = (jobId) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === 'pending' ? 'running' : 'success' } 
        : job
    ));
  };
  
  return (
    <div className="my-pipeline">
      <Pipeline 
        jobs={jobs}
        onJobClick={handleJobClick}
        showDependencies={true}
      />
    </div>
  );
}
```

## Customizing the Pipeline

The Pipeline component can be customized in several ways:

### Group Jobs by Stage or Dependencies

The Pipeline supports two grouping modes:

1. **Stage Grouping** (default): Jobs are grouped by their type property
2. **Dependency Grouping**: Jobs are arranged according to their dependency relationships

To switch between modes:

```tsx
<Pipeline 
  jobs={jobs}
  groupBy="dependencies" // or "stage"
/>
```

### Showing/Hiding Dependencies

You can toggle the visibility of dependency connections:

```tsx
<Pipeline 
  jobs={jobs}
  showDependencies={false} // default is true
/>
```

### Custom Styling

While the Pipeline component has its own styles, you can customize its appearance by wrapping it in a container with custom styles:

```tsx
<div className="custom-pipeline-wrapper">
  <Pipeline jobs={jobs} />
</div>
```

Then in your CSS:

```css
.custom-pipeline-wrapper :global(.pipelineContainer) {
  /* Custom styles for the pipeline container */
  background-color: #f0f4f8;
}

.custom-pipeline-wrapper :global(.jobSuccess) {
  /* Custom styles for successful jobs */
  border-left-color: #2e7d32;
}
``` 