# Deployment Components

This directory contains components related to the deployment flexibility visualization system, showcasing how Radius Method can deploy to various environments.

## Directory Structure

```
deployment/
├── animations/         # Animation components for different deployment targets
│   ├── AirGappedAnimation.tsx
│   ├── CloudAnimation.tsx
│   ├── KubernetesAnimation.tsx
│   └── ScifAnimation.tsx
├── components/         # UI components for deployment visualization
│   ├── CenterLogo.tsx
│   ├── ControlButtons.tsx
│   ├── DeploymentCard.tsx
│   └── DestinationMap.tsx
├── hooks/              # Custom hooks for animation state management
│   ├── useAnimationState.ts
│   └── useScifAnimation.ts
└── utils/              # Utilities for animation and position calculations
    └── MotionPathUtils.ts
```

## Component Overview

### Main Component

- **DeploymentFlexibility.tsx**: The main container component that orchestrates all animations and UI elements.

### Animation Components

- **CloudAnimation**: Animates package movement to cloud environments
- **ScifAnimation**: Animates package transformation into CD for classified networks
- **AirGappedAnimation**: Animates package movement to air-gapped networks
- **KubernetesAnimation**: Animates package movement to Kubernetes environments

### UI Components

- **DestinationMap**: Renders the SVG map of destinations and connection paths
- **DeploymentCard**: Displays deployment status with loading/success indicators
- **CenterLogo**: Renders the center Radius Method logo with highlight effects
- **ControlButtons**: Provides user interface for testing and redeploying

### Custom Hooks

- **useAnimationState**: Manages the overall animation state lifecycle
- **useScifAnimation**: Custom hook for SCIF-specific animation logic

## Usage

The deployment components are designed to be used together to create an interactive visualization:

```tsx
import DeploymentFlexibility from './DeploymentFlexibility';

const MyPage = () => {
  return (
    <section className="my-section">
      <DeploymentFlexibility />
    </section>
  );
};

export default MyPage;
```

## Animation Flow

1. User interaction or scroll event triggers animation
2. `DeploymentFlexibility` component determines the active destination
3. The appropriate animation component is activated based on destination
4. Package animates from center to destination
5. Animation completion triggers callbacks for state updates

## Extending

To add a new deployment destination:

1. Create a new animation component in the `animations/` directory
2. Add the new destination to the destinations array in `DeploymentFlexibility.tsx`
3. Implement the animation logic using the utilities in `MotionPathUtils.ts`
4. Update the `DestinationMap` component to include the new destination

See [Adding New Animations](../../../docs/guides/adding-new-animations.md) for detailed instructions.

## Related Documentation

- [Deployment Animation System](../../../docs/architecture/deployment-animation-system.md)
- [Next.js App Router Architecture](../../../docs/architecture/nextjs-app-architecture.md) 