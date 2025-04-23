# Components Documentation

This section provides documentation for all React components used in the Radius Method application.

## Component Index

- [Pipeline](./pipeline.md) - Workflow visualization component showing stages and jobs
- [PipelineDemo](./pipeline-demo.md) - Demo implementation of the Pipeline component with sample data

## Component Architecture

Components in the Radius Method project follow these principles:

1. **Modular Design** - Components are designed to be self-contained and reusable
2. **TypeScript Interface** - Each component has clearly defined props using TypeScript interfaces
3. **CSS Modules** - Styling is encapsulated using CSS modules (`.module.css` files)
4. **Responsive Design** - Components adapt to different screen sizes with mobile-first approach
5. **Server vs Client Components** - Clear separation using the 'use client' directive for interactive components 