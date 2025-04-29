import React, { useRef, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

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
  const animationRef = useRef<any>(null);
  const [isComplete, setIsComplete] = useState(false);
  const animationStartedRef = useRef(false);
  
  const [pathLeg1Active, setPathLeg1Active] = useState(false);
  const [pathLeg2Active, setPathLeg2Active] = useState(false);
  
  // Calculate ground station position for the dish
  const groundStationPosition = {
    x: centerPosition.x + (destinationPosition.x - centerPosition.x) * 0.4 + 2.6, // Moved left
    y: centerPosition.y + (destinationPosition.y - centerPosition.y) * 0.5 - 5.5, // Moved up
  };
  
  // Calculate satellite position - positioned much higher for better visualization
  const satellitePosition = {
    x: destinationPosition.x + .5, // More offset to the right to match actual satellite
    y: Math.min(centerPosition.y, destinationPosition.y), // Much higher to match actual satellite position
  };
  
  // Adjust hangar position to target the actual hangar building
  const hangarPosition = {
    x: destinationPosition.x + 7, // Offset to target the hangar building
    y: destinationPosition.y - 8, // Slightly higher to target the hangar building
  };
  
  // Reset completion state when destination changes
  useEffect(() => {
    if (!isActive) {
      setIsComplete(false);
      setPathLeg1Active(false);
      setPathLeg2Active(false);
      animationStartedRef.current = false;
    }
  }, [isActive]);
  
  // Handle animation start/stop
  useEffect(() => {
    // Clear previous animation
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }
    
    // Only start new animation if:
    // 1. Animation and destination are active
    // 2. We have a package ref
    // 3. We haven't already started animation for this cycle
    // 4. The animation hasn't already completed
    if (isAnimating && isActive && packageRef.current && !animationStartedRef.current && !isComplete) {
      // Mark that we've started the animation for this cycle
      animationStartedRef.current = true;
      
      // Reset the path states
      setPathLeg1Active(false);
      setPathLeg2Active(false);
      
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
            onComplete: () => {
              // Hide the package
              if (packageRef.current) {
                packageRef.current.style.opacity = '0';
              }
              
              // Activate the first path leg
              setTimeout(() => {
                setPathLeg1Active(true);
                
                // Activate the second path leg after a delay
                setTimeout(() => {
                  setPathLeg2Active(true);
                  
                  // Set completion state
                  setIsComplete(true);
                  
                  // Trigger callbacks
                  if (onDestinationReceive) {
                    setTimeout(() => {
                      onDestinationReceive();
                    }, 600);
                  }
                  
                  if (onAnimationComplete) {
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
        } else {
          // Still call completion callback to not block the flow
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        // Still call completion callback to not block the flow
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    } else if (!isAnimating) {
      // Animation has stopped, reset flag
      animationStartedRef.current = false;
      
      // Hide the package when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
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
  
  // Don't render package when not active, but always show paths
  const showPackage = isActive && isAnimating;
  
  return (
    <>
      {/* SVG container for paths - always visible */}
      <svg 
        style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%',
          pointerEvents: 'none',
          zIndex: 2,
          overflow: 'visible'
        }}
      >
        {/* Ground Station Dot */}
        <circle 
          cx={`${groundStationPosition.x}%`} 
          cy={`${groundStationPosition.y}%`} 
          r="4"
          fill="#64B5F6"
          opacity={isActive ? 0.8 : 0.4}
        />
        
        {/* Satellite Dot */}
        <circle 
          cx={`${satellitePosition.x}%`} 
          cy={`${satellitePosition.y}%`} 
          r="4"
          fill="#64B5F6"
          opacity={isActive ? 0.8 : 0.4}
        />
        
        {/* Path from dish to satellite - always visible but changes appearance */}
        <line
          x1={`${groundStationPosition.x}%`}
          y1={`${groundStationPosition.y}%`}
          x2={`${satellitePosition.x}%`}
          y2={`${satellitePosition.y}%`}
          stroke={pathLeg1Active ? '#FFE44D' : 'rgba(255, 255, 255, 0.3)'}
          strokeWidth="2"
          strokeDasharray="5,5"
          style={{
            transition: 'stroke 0.3s, stroke-dasharray 0.3s',
            filter: pathLeg1Active ? 'drop-shadow(0 0 3px rgba(255, 228, 77, 0.8))' : 'none',
            strokeDasharray: pathLeg1Active ? 'none' : '5,5'
          }}
        />
        
        {/* Path from satellite to hangar - always visible but changes appearance */}
        <line
          x1={`${satellitePosition.x}%`}
          y1={`${satellitePosition.y}%`}
          x2={`${hangarPosition.x}%`}
          y2={`${hangarPosition.y}%`}
          stroke={pathLeg2Active ? '#FFE44D' : 'rgba(255, 255, 255, 0.3)'}
          strokeWidth="2"
          strokeDasharray="5,5"
          style={{
            transition: 'stroke 0.3s, stroke-dasharray 0.3s',
            filter: pathLeg2Active ? 'drop-shadow(0 0 3px rgba(255, 228, 77, 0.8))' : 'none',
            strokeDasharray: pathLeg2Active ? 'none' : '5,5'
          }}
        />
      </svg>
      
      {/* Package animation - only show when active */}
      {showPackage && (
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
      )}
    </>
  );
};

export default EdgeAnimation;
