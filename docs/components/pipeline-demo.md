# PipelineDemo Component

The PipelineDemo component is a ready-to-use implementation of the Pipeline concept, showcasing an AI-powered development workflow with sample data.

## Purpose

This component serves as:

1. A demonstration of the Pipeline component's capabilities
2. A showcase for AI-powered development workflows
3. A visual example of the stages in an automated development pipeline

## Implementation

The PipelineDemo is implemented as a standalone component that:

- Creates sample job data with realistic dependencies
- Organizes jobs into logical stages (Build, Test, Evaluate, AI-Powered Analysis, Deploy)
- Renders a complete pipeline with styled stages and jobs
- Groups jobs by type for better organization

## Props

```tsx
interface PipelineDemoProps {
  className?: string;
}
```

## Sample Data Structure

The component creates a comprehensive set of sample jobs that represent a complete development workflow:

```tsx
type JobStatus = 'success' | 'running' | 'failed' | 'pending';

interface Job {
  id: string;
  name: string;
  status: JobStatus;
  type: 'build' | 'test' | 'evaluate' | 'analysis' | 'deploy';
  dependencies?: string[];
}

// Sample structure for a job
const job = {
  id: 'build-1',
  name: 'Initialize Project',
  status: 'success',
  type: 'build',
  dependencies: ['other-job-id']
};
```

## Usage

The PipelineDemo component is used on the homepage of the application:

```tsx
import PipelineDemo from './components/PipelineDemo';

export default function Home() {
  return (
    <div className="homepage">
      {/* Other sections */}
      <PipelineDemo />
    </div>
  );
}
```

## Styling

The component uses its own CSS module (`PipelineDemo.module.css`) for styling, separate from the main Pipeline component. Key styling features include:

- Custom background with inset shadow effects
- Styled header with title and description
- Custom container for the pipeline stages
- Special styling for the AI Analysis stage to highlight its importance
- Responsive layout adjustments 