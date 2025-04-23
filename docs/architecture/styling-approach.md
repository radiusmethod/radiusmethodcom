# Styling Approach

This document outlines the styling methodology used in the Radius Method application.

## CSS Modules

The application uses CSS Modules as the primary styling approach. CSS Modules provide local scoping of CSS by automatically creating unique class names, which helps prevent style conflicts.

### Implementation

- Each component has its own `.module.css` file (e.g., `Pipeline.module.css`)
- Styles are imported into components and applied via the `styles` object
- Class names are combined using template literals or the `classNames` utility

Example usage:

```tsx
import styles from './Pipeline.module.css';

// Basic usage
<div className={styles.pipeline}>...</div>

// Combining classes
<div className={`${styles.pipeline} ${styles.active}`}>...</div>

// Conditional classes
<div className={`${styles.job} ${status === 'running' ? styles.jobRunning : ''}`}>...</div>
```

## Styling Structure

The CSS files are organized with a consistent structure:

1. **Container Elements** - Outer container styles
2. **Layout Elements** - Structure and positioning styles
3. **Component Elements** - Styles for specific component parts
4. **State Variations** - Different appearances based on state (active, disabled, etc.)
5. **Animations** - Keyframe animations and transitions
6. **Media Queries** - Responsive adjustments for different screen sizes

## Pipeline Component Styling

The `Pipeline.module.css` file (942 lines) is the most complex styling file in the application and includes:

### Key Styling Elements

1. **Container Styles**:
   ```css
   .pipelineContainer {
     display: flex;
     flex-direction: column;
     width: 100%;
     border: 1px solid #e5e7eb;
     border-radius: 8px;
     overflow: hidden;
     box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
     background-color: #ffffff;
   }
   ```

2. **Job Status Styling**:
   ```css
   .jobSuccess {
     border-left: 4px solid #34d399;
   }
   
   .jobRunning {
     border-left: 4px solid #60a5fa;
   }
   
   .jobFailed {
     border-left: 4px solid #f87171;
   }
   
   .jobPending {
     border-left: 4px solid #9ca3af;
   }
   ```

3. **Animations**:
   ```css
   @keyframes spin {
     from {
       transform: rotate(0deg);
     }
     to {
       transform: rotate(360deg);
     }
   }
   
   .jobRunning .statusIcon {
     animation: spin 2s linear infinite;
   }
   ```

4. **Responsive Design**:
   ```css
   @media (max-width: 768px) {
     .pipelineStages {
       flex-direction: column;
     }
     
     .pipelineControls {
       flex-direction: column;
       align-items: flex-start;
     }
   }
   ```

## Styling Best Practices

The application follows these styling best practices:

1. **Component Encapsulation** - Styles are encapsulated within their component's module
2. **Semantic Class Names** - Class names reflect the purpose or content rather than appearance
3. **Responsive Design** - Mobile-first approach with media queries for larger screens
4. **Status Visualization** - Consistent visual language for different states (success, running, failed, pending)
5. **Animation for Feedback** - Subtle animations to indicate status and provide visual feedback 