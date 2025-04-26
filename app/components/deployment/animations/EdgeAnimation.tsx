import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';
import LaserBeamAnimation from './LaserBeamAnimation';

interface Position {
  x: number;
  y: number;
}

interface EdgeAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const EdgeAnimation: React.FC<EdgeAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete,
  onDestinationReceive
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const groundStationRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const hangarRef = useRef<HTMLDivElement>(null);
  
  const animationRef = useRef<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const animationStartedRef = useRef(false);
  
  const [dishToSatelliteActive, setDishToSatelliteActive] = useState(false);
  const [satelliteToHangarActive, setSatelliteToHangarActive] = useState(false);
  
  // Add unique ID for the laser beams
  const laserId = useRef(`edge-laser-${Math.random().toString(36).substr(2, 9)}`).current;
  
  // Calculate ground station position - halfway between center and destination
  const groundStationPosition = {
    x: centerPosition.x + (destinationPosition.x - centerPosition.x) * 0.4,
    y: centerPosition.y + (destinationPosition.y - centerPosition.y) * 0.5
  };
  
  // Calculate satellite position
  const satellitePosition = {
    x: destinationPosition.x,
    y: destinationPosition.y - 12,
  };
  
  // Debug initial render
  useLayoutEffect(() => {
    console.log('EdgeAnimation component initial render with props:', {
      isAnimating,
      isActive,
      centerPosition,
      destinationPosition
    });
  }, []);
  
  // Reset completion state when destination changes
  useEffect(() => {
    if (!isActive) {
      setIsComplete(false);
      setDishToSatelliteActive(false);
      setSatelliteToHangarActive(false);
      animationStartedRef.current = false;
      console.log('EdgeAnimation: resetting state because it is not active');
    } else {
      console.log('EdgeAnimation: is now active');
    }
  }, [isActive]);
  
  // Log position updates
  useEffect(() => {
    console.log('EdgeAnimation positions updated:', {
      centerPosition,
      groundStationPosition,
      satellitePosition,
      destinationPosition
    });
  }, [centerPosition, groundStationPosition, satellitePosition, destinationPosition]);
  
  // Position the placeholder elements for animation
  useEffect(() => {
    if (groundStationRef.current) {
      groundStationRef.current.style.left = `${groundStationPosition.x}%`;
      groundStationRef.current.style.top = `${groundStationPosition.y}%`;
    }
    
    if (satelliteRef.current) {
      satelliteRef.current.style.left = `${satellitePosition.x}%`;
      satelliteRef.current.style.top = `${satellitePosition.y}%`;
    }
    
    if (hangarRef.current) {
      hangarRef.current.style.left = `${destinationPosition.x}%`;
      hangarRef.current.style.top = `${destinationPosition.y}%`;
    }
  }, [groundStationPosition, satellitePosition, destinationPosition]);
  
  // Handle animation start/stop
  useEffect(() => {
    console.log('EdgeAnimation useEffect trigger with state:', { 
      isAnimating, 
      isActive, 
      hasPackageRef: !!packageRef.current,
      animationStarted: animationStartedRef.current,
      isComplete
    });
    
    // Clear previous animation
    if (animationRef.current) {
      console.log('Cleaning up previous Edge animation');
      animationRef.current.cancel();
      animationRef.current = null;
    }
    
    // Only start new animation if:
    // 1. Animation and destination are active
    // 2. We have a package ref
    // 3. We haven't already started animation for this cycle
    // 4. The animation hasn't already completed
    if (isAnimating && isActive && packageRef.current && !animationStartedRef.current && !isComplete) {
      console.log('Starting Edge animation with positions:', {
        centerPosition, 
        groundStationPosition
      });
      
      // Mark that we've started the animation for this cycle
      animationStartedRef.current = true;
      
      // Reset the beam states
      setDishToSatelliteActive(false);
      setSatelliteToHangarActive(false);
      
      // Make package visible at the center
      if (packageRef.current) {
        packageRef.current.style.opacity = '1';
        packageRef.current.style.left = `${centerPosition.x}%`;
        packageRef.current.style.top = `${centerPosition.y}%`;
      }
      
      try {
        // Create animation from center to ground station
        const animation = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          groundStationPosition,
          {
            duration: 800,
            easing: 'easeOutQuad',
            onStart: () => {
              console.log('Edge animation started');
            },
            onComplete: () => {
              console.log('Edge animation completed');
              
              // Hide the package
              if (packageRef.current) {
                packageRef.current.style.opacity = '0';
              }
              
              // Activate the first lightning beam from dish to satellite
              setTimeout(() => {
                console.log('Activating dish-to-satellite beam');
                setDishToSatelliteActive(true);
                
                // Activate the second lightning beam after a delay
                setTimeout(() => {
                  console.log('Activating satellite-to-hangar beam');
                  setSatelliteToHangarActive(true);
                  
                  // Set completion state
                  setIsComplete(true);
                  
                  // Trigger callbacks
                  if (onDestinationReceive) {
                    setTimeout(() => {
                      console.log('Calling onDestinationReceive callback');
                      onDestinationReceive();
                    }, 600);
                  }
                  
                  if (onAnimationComplete) {
                    console.log('Calling onAnimationComplete callback');
                    onAnimationComplete();
                  }
                }, 800);
              }, 200);
            }
          }
        );
        
        // Store and play the animation
        if (animation) {
          animationRef.current = animation;
          animation.play();
          console.log('Edge animation created and started');
        } else {
          console.error('Failed to create Edge animation');
          // Still call completion callback to not block the flow
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        console.error('Error creating Edge animation:', error);
        // Still call completion callback to not block the flow
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    } else if (!isAnimating) {
      // Animation has stopped, reset flag
      console.log('Animation has stopped, resetting flags');
      animationStartedRef.current = false;
      
      // Hide the package when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    } else if (!isActive) {
      console.log('Edge animation not active, skipping');
    } else if (animationStartedRef.current) {
      console.log('Edge animation already started for this cycle');
    } else if (isComplete) {
      console.log('Edge animation already completed');
    } else {
      console.log('Edge animation not starting due to other conditions');
    }
    
    // Cleanup when component unmounts or dependencies change
    return () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
      
      // Hide the package
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    };
  }, [
    isAnimating, 
    isActive, 
    centerPosition, 
    groundStationPosition, 
    onAnimationComplete, 
    onDestinationReceive, 
    isComplete
  ]);
  
  // Don't render anything when not active
  if (!isActive) return null;
  
  return (
    <>
      {/* Placeholder elements for animation targets */}
      <div 
        ref={groundStationRef} 
        style={{ 
          position: 'absolute', 
          width: '10px', 
          height: '10px', 
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      <div 
        ref={satelliteRef} 
        style={{ 
          position: 'absolute', 
          width: '10px', 
          height: '10px', 
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      <div 
        ref={hangarRef} 
        style={{ 
          position: 'absolute', 
          width: '10px', 
          height: '10px', 
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      {/* Satellite transmission visualization from ground station to satellite */}
      {dishToSatelliteActive && (
        <LaserBeamAnimation 
          id={`${laserId}-dish-to-satellite`}
          sourceRef={groundStationRef}
          targetRef={satelliteRef}
          color="#FFE44D"
          duration={800}
          isAnimating={dishToSatelliteActive}
          path="dish-to-satellite"
        />
      )}
      
      {/* Satellite transmission visualization from satellite to hangar */}
      {satelliteToHangarActive && (
        <LaserBeamAnimation 
          id={`${laserId}-satellite-to-hangar`}
          sourceRef={satelliteRef}
          targetRef={hangarRef}
          color="#FFE44D"
          duration={800}
          isAnimating={satelliteToHangarActive}
          path="satellite-to-hangar"
        />
      )}
      
      {/* Package animation */}
      <div
        ref={packageRef}
        className={styles.animatingElement}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0,
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          padding: '8px',
          width: '40px',
          height: '40px',
          border: '2px solid #FFB81C'
        }}
      >
        <FaBox size={20} color="#FFB81C" />
      </div>
    </>
  );
};

export default EdgeAnimation;
