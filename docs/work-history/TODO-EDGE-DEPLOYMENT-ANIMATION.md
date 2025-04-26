# TODO: Implement New Edge Deployment Animation

## Background
The current Edge Deployment destination needs to be replaced with a more complex animation sequence showing package deployment to remote edge devices. This new animation will feature a satellite dish on the ground that beams the package to a satellite, which then beams to a drone aircraft on an airstrip in front of a hangar. This work needs to follow the existing patterns established for other deployment destinations.

## Checklist

### Research & Analysis
- [x] Study existing `CloudDestination` and `ScifDestination` implementations
- [x] Review animation utilities in `/app/components/deployment/utils`
- [x] Examine `DestinationMap.tsx` to understand how destinations are positioned and rendered
- [x] Review `DeploymentFlexibility.tsx` to understand how animations are orchestrated

### Component Creation
- [x] Create `EdgeSatelliteDishIcon.tsx` in `/app/components/deployment/destinations/`
- [x] Create `EdgeSatelliteIcon.tsx` in `/app/components/deployment/destinations/`
- [x] Create `EdgeDroneIcon.tsx` in `/app/components/deployment/destinations/`
- [x] Create `EdgeHangarIcon.tsx` in `/app/components/deployment/destinations/` (background element)
- [x] Create `EdgeDestination.tsx` in `/app/components/deployment/destinations/` (main destination component)

### Animation Implementation
- [x] Create `EdgeAnimation.tsx` in `/app/components/deployment/animations/`
- [x] Implement multi-stage animation sequence: 
  - [x] Stage 1: Package travels to satellite dish
  - [x] Stage 2: Beam from dish to satellite
  - [x] Stage 3: Beam from satellite to drone
  - [x] Stage 4: Drone receives package
- [ ] Create `useEdgeAnimation.ts` hook in `/app/components/deployment/hooks/` if needed

### Integration
- [x] Update `DestinationMap.tsx` to render the new Edge Destination
- [x] Update references in `DeploymentFlexibility.tsx`
- [x] Update animations/index.ts to export the new EdgeAnimation

### Testing & Refinement
- [ ] Test animation with different timings
- [ ] Ensure responsive behavior on different screen sizes
- [ ] Verify correct animation sequence triggering
- [ ] Check for animation conflicts with other destinations 