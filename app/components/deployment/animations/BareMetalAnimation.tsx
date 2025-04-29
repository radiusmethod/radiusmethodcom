import React, { useRef, useEffect, useState, useCallback } from 'react';
import { FaBox } from 'react-icons/fa';
import { Position, createPointToPointAnimation } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

// Define the AnimationInstance type locally since it's not exported from MotionPathUtils
interface AnimationInstance {
  play: () => void;
  pause: () => void;
  cancel: () => void;
}

export interface BareMetalAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const BareMetalAnimation: React.FC<BareMetalAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete,
  onDestinationReceive
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationInstance | null>(null);
  const [hasCompleted, setHasCompleted] = useState(false);
  
  // Use a more robust tracking method for animation state
  const [animationKey, setAnimationKey] = useState(0);
  
  // Reset animation state
  const resetAnimationState = useCallback(() => {
    // Cancel any existing animation
    if (animationRef.current) {
      animationRef.current.cancel();
      animationRef.current = null;
    }
    
    // Reset state
    setHasCompleted(false);
    
    // Force recreation of animation by changing key
    setAnimationKey(prev => prev + 1);
    
    // Reset package visibility and position
    if (packageRef.current) {
      packageRef.current.style.opacity = '0';
      packageRef.current.style.left = `${centerPosition.x}%`;
      packageRef.current.style.top = `${centerPosition.y}%`;
    }
  }, [centerPosition]);

  // Listen for global animation reset events
  useEffect(() => {
    const handleReset = () => {
      resetAnimationState();
    };
    
    window.addEventListener('reset-animation-state', handleReset);
    return () => {
      window.removeEventListener('reset-animation-state', handleReset);
    };
  }, [resetAnimationState]);
  
  // Reset when component becomes inactive
  useEffect(() => {
    if (!isActive) {
      resetAnimationState();
    }
  }, [isActive, resetAnimationState]);
  
  // Reset when animation is restarted
  useEffect(() => {
    if (isAnimating && isActive && hasCompleted) {
      resetAnimationState();
    }
  }, [isAnimating, isActive, hasCompleted, resetAnimationState]);
  
  // Handle animation with key dependency to ensure re-creation
  useEffect(() => {
    // Skip if not active or already completed
    if (!isActive || hasCompleted) return;
    
    // Clean up function
    const cleanUp = () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };

    // If we're animating and have a valid element
    if (isAnimating && packageRef.current && !hasCompleted) {
      // Make sure package is properly positioned at the start
      if (packageRef.current) {
        packageRef.current.style.opacity = '1'; // Start visible
        packageRef.current.style.left = `${centerPosition.x}%`;
        packageRef.current.style.top = `${centerPosition.y}%`;
        packageRef.current.style.transform = 'translate(-50%, -50%)';
      }
      
      try {
        // Create a fresh animation instance
        animationRef.current = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          destinationPosition,
          {
            duration: 800,
            easing: 'easeOutQuad',
            onStart: () => {
              // Animation started
            },
            onUpdate: () => {
              // Animation updates
            },
            onComplete: () => {
              // Trigger destination receive animation first
              if (onDestinationReceive) {
                onDestinationReceive();
              }
              
              // Set completion state
              setHasCompleted(true);
              
              // Hide element at the end
              if (packageRef.current) {
                packageRef.current.style.opacity = '0';
              }
              
              // Then complete the animation sequence
              if (onAnimationComplete) {
                onAnimationComplete();
              }
            }
          }
        );
        
        // Handle failure to create animation
        if (!animationRef.current && onAnimationComplete) {
          onAnimationComplete();
        }
      } catch (error) {
        // Handle animation creation error
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    } else if (!isAnimating) {
      // Hide the element when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    }

    // Clean up on unmount or dependencies change
    return cleanUp;
  }, [isAnimating, isActive, centerPosition, destinationPosition, hasCompleted, onAnimationComplete, onDestinationReceive, animationKey]);

  return (
    <div
      ref={packageRef}
      className={styles.animatingElement}
      style={{
        position: 'absolute',
        left: `${centerPosition.x}%`,
        top: `${centerPosition.y}%`,
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
        border: '2px solid #FFB81C',
        transition: 'opacity 0.2s ease'
      }}
    >
      <FaBox size={20} color="#FFB81C" />
    </div>
  );
};

export default BareMetalAnimation; 