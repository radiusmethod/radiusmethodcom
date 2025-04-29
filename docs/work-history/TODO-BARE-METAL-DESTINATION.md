# TODO: Implement Bare Metal Destination with Server Rack SVG

## Background
The deployment flexibility visualization needs a properly styled Bare Metal destination component in the bottom left corner. Currently, it's using a simple FaDatabase icon, but we need to replace it with a custom SVG server rack icon and implement the proper animation for data/package travel between the center and this destination.

We'll need to create:
1. A custom SVG server rack icon component
2. A new BareMetalAnimation component based on the existing animation patterns
3. Integration of these components with the existing animation flow

## Checklist

### Server Rack SVG Icon Component
- [x] Create a new file `ServerRackIcon.tsx` in the `destinations` directory
- [x] Design a server rack SVG with appropriate styling
- [x] Implement state-based styling (active, inactive, receiving)
- [x] Add visual feedback when receiving a package (glow effect)
- [ ] Test the component with different states

### BareMetalAnimation Component
- [x] Create a new file `BareMetalAnimation.tsx` in the `animations` directory
- [x] Base it on the CloudAnimation pattern (similar functionality)
- [x] Implement the point-to-point animation using `createPointToPointAnimation`
- [x] Add proper state management and callbacks
- [x] Ensure animation cleanup on unmount

### Bare Metal Destination Component Update
- [x] Update the existing `BareMetalDestination.tsx` to use the new SVG component
- [x] Ensure it follows the standard destination props interface
- [x] Implement the receiving animation state handling

### Integration
- [x] Export the BareMetalAnimation in the `animations/index.ts` file
- [ ] Make sure the animation is properly connected to the AnimationController
- [ ] Test the full animation flow from center to the Bare Metal destination
- [ ] Verify visual feedback when the package arrives

### Final Cleanup
- [x] Remove any console.log statements used for debugging
- [x] Ensure consistent styling with other destination components
- [ ] Verify there are no memory leaks or performance issues
- [ ] Document the new components if needed 