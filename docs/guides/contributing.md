# Contributing to Radius Method

Thank you for your interest in contributing to the Radius Method project! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please read and follow our Code of Conduct.

## How to Contribute

There are many ways to contribute to Radius Method:

1. **Reporting Bugs**: If you find a bug, please create an issue with detailed reproduction steps
2. **Suggesting Enhancements**: New features or improvements to existing functionality
3. **Pull Requests**: Code contributions to fix issues or add features
4. **Documentation**: Improvements to documentation, examples, or guides
5. **Testing**: Help with writing or improving tests

## Development Process

### Setting Up the Development Environment

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/radius-method.git
   cd radius-method
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your work:
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Development Workflow

1. Make your changes to the codebase
2. Add tests for new functionality
3. Run the tests:
   ```bash
   npm test
   ```
4. Make sure your code follows the style guidelines:
   ```bash
   npm run lint
   ```
5. Commit your changes with a clear message:
   ```bash
   git commit -m "Add feature: your feature description"
   ```
6. Push your branch to GitHub:
   ```bash
   git push origin feature/your-feature-name
   ```
7. Create a Pull Request from your branch

## Pull Request Guidelines

1. Make sure your PR addresses a specific issue or has been discussed beforehand
2. Include a clear description of the changes and their purpose
3. Add appropriate tests for your changes
4. Update documentation if necessary
5. Follow the existing code style and conventions
6. Keep PRs focused on a single topic to make review easier

## Component Development Guidelines

When adding or modifying components:

1. **Component Structure**: Follow the existing component pattern with props interface defined in TypeScript
2. **CSS Modules**: Use CSS modules for styling with appropriate naming
3. **Testing**: Add tests for component functionality
4. **Documentation**: Update or add component documentation
5. **Server vs Client**: Be clear about whether your component is a server or client component

### Example Component Structure

```tsx
'use client'; // Add this for client components with interactivity

import React from 'react';
import styles from './YourComponent.module.css';

interface YourComponentProps {
  // Define props here
  title: string;
  onAction?: () => void;
}

const YourComponent: React.FC<YourComponentProps> = ({ 
  title,
  onAction
}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      {onAction && (
        <button onClick={onAction} className={styles.button}>
          Take Action
        </button>
      )}
    </div>
  );
};

export default YourComponent;
```

## Documentation Guidelines

When updating documentation:

1. Follow the established structure in the `/docs` directory
2. Use markdown for all documentation
3. Include examples where appropriate
4. Keep the Table of Contents updated
5. Use kebab-case for new documentation files

## Getting Help

If you need help with your contribution, you can:

1. Create an issue with the "question" label
2. Reach out to the maintainers directly
3. Join our community chat

Thank you for contributing to Radius Method! Your efforts help make this project better for everyone. 