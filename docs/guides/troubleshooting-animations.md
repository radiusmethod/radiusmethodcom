# Troubleshooting Animation Issues

This guide helps identify and resolve common issues with the deployment flexibility animations.

## Common Issues

### Animations Not Playing

If animations aren't playing when expected:

1. **Check Console Errors**: Open your browser's developer tools (F12) and check for errors in the console.

2. **Verify Animation Triggers**: Make sure the animation triggers are firing correctly:
   ```tsx
   // In DeploymentFlexibility.tsx
   console.log('Animation state:', isAnimating, activeDestination);
   ```

3. **Check DOM Elements**: Ensure the animation elements are being rendered:
   ```tsx
   console.log('Package element:', packageRef.current);
   ```

4. **Verify Component Props**: Check that animation components are receiving the correct props:
   ```tsx
   console.log('Animation props:', {
     isAnimating,
     isActive,
     centerPosition,
     destinationPosition
   });
   ```

### Animation Positioning Issues

If animations are playing but elements are in the wrong positions:

1. **Check Position Values**: Log the position values for debugging:
   ```tsx
   console.log('Positions:', {
     center: centerPosition,
     destination: destinationPosition
   });
   ```

2. **Inspect SVG Paths**: For path animations, check that SVG paths are being generated correctly:
   ```tsx
   console.log('SVG path:', createSVGPath(startPosition, endPosition));
   ```

3. **Verify CSS Units**: Make sure position units are consistent (percentages, pixels, etc.).

### Animation Timing Issues

If animations are too fast, too slow, or not synchronized:

1. **Check Duration Settings**: Verify the duration settings in animation creation:
   ```tsx
   // In your animation component
   const animation = createPointToPointAnimation({
     // ... other options
     duration: 800, // Duration in milliseconds
     easing: 'easeOutQuad'
   });
   ```

2. **Examine Easing Functions**: Different easing functions can affect how animations feel.

3. **Sequence Timing**: For sequenced animations, ensure previous animations complete before next ones start.

## Debugging Animation Functions

To debug animation utility functions:

### Point-to-Point Animation

```tsx
// In MotionPathUtils.ts
export function createPointToPointAnimation({
  element,
  startPosition,
  endPosition,
  duration,
  easing,
  onComplete
}: MotionPathOptions) {
  console.log('Creating point-to-point animation with:', {
    element,
    startPosition,
    endPosition,
    duration,
    easing
  });
  
  // Rest of the function...
}
```

### Transform Animation

```tsx
// In MotionPathUtils.ts
export function createTransformAnimation({
  packageElement,
  cdElement,
  startPosition,
  shieldPosition,
  duration,
  onTransform,
  onComplete
}: TransformAnimationOptions) {
  console.log('Creating transform animation with:', {
    packageElement,
    cdElement,
    startPosition,
    shieldPosition,
    duration
  });
  
  // Rest of the function...
}
```

## Browser Compatibility Issues

If animations work in some browsers but not others:

1. **Check Browser Support**: Verify that animation libraries are compatible with target browsers.

2. **Add Polyfills**: For older browsers, consider adding polyfills for missing features.

3. **Test in Multiple Browsers**: Always test animations in multiple browsers.

## Performance Issues

If animations are laggy or causing performance problems:

1. **Reduce Complexity**: Simplify complex animations.

2. **Use Hardware Acceleration**: Add CSS properties that trigger GPU acceleration:
   ```css
   .animated-element {
     transform: translateZ(0);
     will-change: transform;
   }
   ```

3. **Optimize Animation Logic**: Avoid expensive computations during animation frames.

4. **Reduce DOM Operations**: Minimize DOM manipulation during animations.

## Specific Component Troubleshooting

### ScifAnimation Issues

Common issues with the SCIF Animation component:

1. **Package Not Transforming**: Check that both package and CD elements are positioned correctly.

2. **Shield Animation Failed**: Make sure the shield position is correctly passed to the animation.

3. **Missing CD Element**: Verify that the CD element is rendered and positioned correctly.

### CloudAnimation Issues

Common issues with the Cloud Animation component:

1. **Package Not Visible**: Check that the package element has proper opacity settings.

2. **Incorrect Destination**: Verify the destination position matches the cloud component position.

3. **Animation Cancellation**: Ensure animations are properly canceled when component unmounts.

## Reporting Issues

If you can't resolve an animation issue, report it with the following information:

1. Detailed description of the issue
2. Browser and device information
3. Console logs and errors
4. Steps to reproduce
5. Screenshot or screen recording if possible 