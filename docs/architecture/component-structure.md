# Component Structure

This document outlines the component architecture used in the Radius Method application.

## Overview

The component structure follows a hierarchical organization, with components grouped by functionality and responsibility. The application uses a modular component approach, where UI elements are broken down into small, reusable pieces.

## Directory Structure

```
app/
├─ components/
│  ├─ HeroBanner/
│  ├─ CoreCapabilities/
│  ├─ ProductFeatures/
│  ├─ SectionSeparator/
│  ├─ Pipeline/
│  │  ├─ Pipeline.tsx
│  │  ├─ Pipeline.module.css
│  │  ├─ PipelineStage.tsx
│  │  ├─ PipelineJob.tsx
│  │  └─ PipelineConnection.tsx
│  └─ PipelineDemo.tsx
└─ page.tsx
```

## Component Types

The application uses several types of components:

### 1. Page Components

Page components represent entire pages and are directly tied to routes in the Next.js App Router. They typically import and compose multiple feature components.

Example: `app/page.tsx` (Home page)

### 2. Feature Components

Feature components represent major UI sections that implement specific features or content areas.

Examples: `HeroBanner`, `CoreCapabilities`, `ProductFeatures`, `PipelineDemo`

### 3. UI Components

Smaller, reusable components that can be composed to build more complex interfaces.

Examples: `PipelineStage`, `PipelineJob`, `PipelineConnection`

## Component Composition Pattern

The application uses component composition to build complex UIs:

1. **Top-Down Composition**: Pages compose feature components
2. **Feature Components**: Compose UI components into meaningful features
3. **UI Components**: Handle specific UI responsibilities

## Example: Pipeline Component Composition

```
Pipeline
├─ PipelineStage (multiple)
│  └─ PipelineJob (multiple)
└─ PipelineConnection (for job dependencies)
```

## Client vs Server Components

The application clearly distinguishes between client and server components:

1. **Server Components** (default in Next.js App Router): Used for components that don't need interactivity
2. **Client Components** (marked with 'use client'): Used for components that need state, effects, or event handlers

Examples of client components:
- `PipelineStage.tsx` - Uses interactivity for job management
- `PipelineJob.tsx` - Handles click events and status changes

## Data Flow

The component architecture implements a top-down data flow:

1. Data is passed down from parent components to children via props
2. State changes are handled by passing callback functions to child components
3. Shared state is lifted to common parent components when needed 