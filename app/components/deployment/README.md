# Deployment Animation Architecture

This directory contains components and utilities for the Deployment Flexibility animations.

## Directory Structure

- `/animations` - React components for each animation type
- `/components` - Reusable UI components
- `/destinations` - Destination display components
- `/hooks` - Custom React hooks
- `/utils` - Utility functions and classes

## Animation Architecture

The animation system follows a clean separation of concerns:

### Utils (Logic)

- `AnimationUtils.ts` - Contains core animation functions
  - Each animation type has its own dedicated function (createScifAnimation, createCloudAnimation, etc.)
  - These functions handle the GSAP timeline creation and animation logic
  - All animations use a consistent interface for options and callbacks

- `PathGenerator.ts` - Handles SVG path generation for animations
  - Generates paths between points
  - Calculates positions for special elements (padlock, shield)

### Components (UI)

- Animation components (`ScifAnimation.tsx`, `CloudAnimation.tsx`, etc.)
  - Each animation type has its own React component
  - Components manage lifecycle and render the visual elements
  - Components call the appropriate utility functions from AnimationUtils
  - Handle cleanup on unmount

- Destination components (`ScifDestination.tsx`, `CloudDestination.tsx`, etc.)
  - Render the destination UI elements
  - Handle active/inactive states
  - Do not contain animation logic

## Usage

To create an animation:

1. Import the appropriate animation component
2. Pass in the required props (positions, active state)
3. The component will handle the rest

Example:

```tsx
<ScifAnimation
  isAnimating={isAnimating}
  isActive={isActive}
  centerPosition={{ x: 50, y: 50 }}
  shieldPosition={{ x: 65, y: 35 }}
  destinationPosition={{ x: 80, y: 20 }}
  onAnimationComplete={handleAnimationComplete}
/>
```

## Adding a New Animation Type

To add a new animation type:

1. Add a new function in `AnimationUtils.ts`
2. Create a new component in `/animations`
3. Follow the same pattern as existing animations

## Connecting to Main Component

The main `DeploymentFlexibility.tsx` component can import and use these animations to create a complete deployment visualization. 