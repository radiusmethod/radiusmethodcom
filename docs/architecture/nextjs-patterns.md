# Next.js Patterns

This document outlines the Next.js patterns and best practices used in the Radius Method application.

## App Router Architecture

The application uses Next.js App Router architecture (introduced in Next.js 13+) which provides several benefits:

1. **File-based Routing** - Routes are based on the file system structure
2. **Page and Layout Nesting** - Layouts can be nested to share UI across routes
3. **Built-in Loading States** - Loading UI can be defined with loading.js files
4. **Server Components by Default** - Components are server-rendered by default
5. **Streaming** - Allows progressively rendering and streaming HTML

## Directory Structure

```
app/
├─ layout.tsx        # Root layout (applied to all routes)
├─ page.tsx          # Homepage route
├─ components/       # Shared components
│  └─ ...
├─ api/              # API routes
│  └─ ...
```

## Server vs Client Components

The application makes careful use of server and client components:

### Server Components (Default)

Server components are used for:
- Data fetching
- Accessing backend resources directly
- Keeping sensitive information on the server
- Large dependencies that should be kept server-side

### Client Components

Client components (marked with 'use client' directive) are used for:
- Interactivity and event listeners
- useState, useEffect and other React hooks
- Browser-only APIs
- Custom event handlers

Example of a client component:

```tsx
'use client';

import React, { useState } from 'react';
import PipelineJob from './PipelineJob';

export default function PipelineStage({ title, jobs, onJobStatusChange }) {
  const [expanded, setExpanded] = useState(true);
  
  return (
    <div className={styles.stage}>
      <div className={styles.stageHeader} onClick={() => setExpanded(!expanded)}>
        {title}
      </div>
      {expanded && (
        <div className={styles.stageJobs}>
          {jobs.map((job) => (
            <PipelineJob 
              key={job.id}
              {...job}
              onStatusChange={(newStatus) => onJobStatusChange(job.id, newStatus)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
```

## Data Fetching

While not prominently featured in the analyzed code, the application follows Next.js best practices for data fetching:

1. **Server Components** - Direct data fetching in server components
2. **API Routes** - Separate API routes for client-side data fetching
3. **Static vs Dynamic** - Strategic use of static generation and dynamic rendering

## Optimization Techniques

The application implements several Next.js optimization techniques:

1. **Component Splitting** - Breaking UI into smaller, focused components
2. **CSS Modules** - Using CSS modules for styling to improve loading performance
3. **Conditional Rendering** - Only rendering components when needed
4. **Client/Server Boundary** - Careful consideration of the client/server boundary

## Deployment

The application is set up for deployment on modern hosting platforms, with configurations in the `.github/workflows` directory for CI/CD pipelines. 