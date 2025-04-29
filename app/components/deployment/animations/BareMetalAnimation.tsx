import React, { useRef, useEffect, useState } from 'react';
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
  const animationStartedRef = useRef(false);
  const prevAnimatingRef = useRef(isAnimating);

  // Reset state when animation is activated (handles redeploy case)
  useEffect(() => {
    // If isAnimating transitions from false to true, reset state
    if (isAnimating && !prevAnimatingRef.current) {
      setHasCompleted(false);
      animationStartedRef.current = false;
    }
    
    // Update previous isAnimating value
    prevAnimatingRef.current = isAnimating;
  }, [isAnimating]);

  // Reset completion state when destination changes
  useEffect(() => {
    if (!isActive) {
      setHasCompleted(false);
      animationStartedRef.current = false;
    }
  }, [isActive]);

  // Handle animation
  useEffect(() => {
    // Clean up function
    const cleanUp = () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };

    // If we're animating and have a valid element
    if (isAnimating && packageRef.current && !animationStartedRef.current && !hasCompleted) {
      // Mark that we've started the animation for this cycle
      animationStartedRef.current = true;
      
      // Make sure package is properly positioned at the start
      if (packageRef.current) {
        packageRef.current.style.opacity = '1'; // Start visible
        packageRef.current.style.left = `${centerPosition.x}%`;
        packageRef.current.style.top = `${centerPosition.y}%`;
        packageRef.current.style.transform = 'translate(-50%, -50%)';
      }
      
      try {
        // Create the animation from center to destination
        animationRef.current = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          destinationPosition,
          {
            duration: 800, // Same duration as Cloud animation
            easing: 'easeOutQuad', // Same easing as Cloud animation
            onStart: () => {
              // Animation started
            },
            onUpdate: (progress) => {
              // Animation progress updates
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
        
        if (!animationRef.current) {
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    } else if (!isAnimating) {
      // Animation has stopped, reset our flag
      animationStartedRef.current = false;
      
      // Hide the element when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    }

    return cleanUp;
  }, [isAnimating, isActive, centerPosition, destinationPosition, hasCompleted, onAnimationComplete, onDestinationReceive]);

  return (
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
        border: '2px solid #FFB81C',
        transition: 'opacity 0.2s ease' // Add transition for opacity
      }}
    >
      <FaBox size={20} color="#FFB81C" />
    </div>
  );
};

export default BareMetalAnimation; 