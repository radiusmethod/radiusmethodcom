# Adding New Animations

This guide explains how to add a new animation type to the deployment flexibility visualization system.

## Prerequisites

Before starting, you should be familiar with:
- React and functional components
- TypeScript
- Basic animation concepts
- Project structure (see the [Deployment Components README](../../app/components/deployment/README.md))

## Step 1: Plan Your Animation

1. Determine what the animation should show (e.g., package moving to a new destination)
2. Sketch the animation path and key points
3. Decide on any special effects or transformations

## Step 2: Create a Destination Component

Create a new file in `app/components/deployment/components/destinations` for your destination:

```tsx
// Example: MyDestination.tsx
import React from 'react';
import styles from '../../../DeploymentFlexibility.module.css';
import { FaServer } from 'react-icons/fa'; // Choose an appropriate icon

interface MyDestinationProps {
  isActive: boolean;
  position: { x: number; y: number };
}

const MyDestination: React.FC<MyDestinationProps> = ({ isActive, position }) => {
  return (
    <div 
      className={`${styles.destination} ${isActive ? styles.active : ''}`}
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%` 
      }}
    >
      <div className={styles.destinationIcon}>
        <FaServer />
      </div>
      <div className={styles.destinationLabel}>
        My Destination
      </div>
    </div>
  );
};

export default MyDestination;
```

## Step 3: Create Animation Component

Create a new file in `app/components/deployment/animations`:

```tsx
// Example: MyAnimation.tsx
import React, { useRef, useEffect } from 'react';
import styles from '../../../DeploymentFlexibility.module.css';
import { createPointToPointAnimation } from '../utils/MotionPathUtils';
import { FaBox } from 'react-icons/fa';

interface MyAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: { x: number; y: number };
  destinationPosition: { x: number; y: number };
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const MyAnimation: React.FC<MyAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete,
  onDestinationReceive
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<{ play: () => void; pause: () => void; cancel: () => void } | null>(null);
  const isCompletedRef = useRef<boolean>(false);

  useEffect(() => {
    // Reset completion state on new animation
    isCompletedRef.current = false;
    
    if (packageRef.current) {
      try {
        // Clean up previous animation if it exists
        if (animationRef.current) {
          animationRef.current.cancel();
          animationRef.current = null;
        }

        // Set up the animation
        if (isActive && isAnimating) {
          animationRef.current = createPointToPointAnimation({
            element: packageRef.current,
            startPosition: centerPosition,
            endPosition: destinationPosition,
            duration: 800,
            easing: 'easeOutQuad',
            onComplete: () => {
              console.log('Animation completed');
              isCompletedRef.current = true;
              if (onAnimationComplete) onAnimationComplete();
              if (onDestinationReceive) onDestinationReceive();
            }
          });

          if (animationRef.current) {
            animationRef.current.play();
          }
        }
      } catch (error) {
        console.error('Error creating animation:', error);
      }
    }

    return () => {
      // Clean up animation on unmount
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };
  }, [isAnimating, isActive, centerPosition, destinationPosition, onAnimationComplete, onDestinationReceive]);

  // Only render if active and animating, or if completed but still active
  if (!isActive || (!isAnimating && !isCompletedRef.current)) {
    return null;
  }

  return (
    <div
      ref={packageRef}
      className={styles.package}
      style={{
        left: `${centerPosition.x}%`,
        top: `${centerPosition.y}%`,
        opacity: isAnimating || isCompletedRef.current ? 1 : 0
      }}
    >
      <FaBox />
    </div>
  );
};

export default MyAnimation;
```

## Step 4: Update DeploymentFlexibility Component

1. Add your destination to the destinations array in `DeploymentFlexibility.tsx`:

```tsx
// Add import
import MyDestination from './components/destinations/MyDestination';
import MyAnimation from './animations/MyAnimation';

// Add to destinations array
const destinations = [
  // ... existing destinations
  {
    id: 'my-destination',
    name: 'My Destination',
    position: { x: 85, y: 60 },
    component: MyDestination
  }
];
```

2. Add your animation to the animations section:

```tsx
{activeDestination === 4 && (
  <MyAnimation
    isAnimating={isAnimating}
    isActive={activeDestination === 4}
    centerPosition={centerPosition}
    destinationPosition={destinations[4].position}
    onAnimationComplete={handleAnimationComplete}
    onDestinationReceive={handleDestinationReceive}
  />
)}
```

## Step 5: Update DestinationMap Component

Make sure your destination is properly rendered in the `DestinationMap.tsx` component:

```tsx
// Import your destination component
import MyDestination from './destinations/MyDestination';

// In the component JSX, make sure it's included
{destinations.map((destination, index) => {
  const DestinationComponent = destination.component;
  return (
    <DestinationComponent
      key={destination.id}
      isActive={activeDestination === index}
      position={destination.position}
    />
  );
})}
```

## Step 6: Test Your Animation

1. Run the application with `npm run dev`
2. Test your animation using the "Test Animation" button
3. Verify that the animation works as expected

## Customizing the Animation

For more complex animations, you may need to:

1. Create a custom animation function in `MotionPathUtils.ts`
2. Add special effects or transitions
3. Add new animation states or options

See the existing animations like `ScifAnimation.tsx` for examples of more complex animations.

## Best Practices

- Keep animation components focused on a single animation type
- Separate animation logic from rendering logic
- Clean up animations on unmount to prevent memory leaks
- Use consistent naming and structure
- Add comments for complex animation logic 