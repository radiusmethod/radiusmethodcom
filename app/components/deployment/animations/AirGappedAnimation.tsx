import React, { useRef, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation, Position } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

export interface AirGappedAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const AirGappedAnimation: React.FC<AirGappedAnimationProps> = ({
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
  
  // Reset completion state when destination changes
  useEffect(() => {
    if (!isActive) {
      setIsComplete(false);
      animationStartedRef.current = false;
    }
  }, [isActive]);
  
  // Handle animation start/stop
  useEffect(() => {
    // Cleanup any previous animation
    animationRef.current = null;

    // Only start a new animation if one hasn't already been started for this cycle
    if (isAnimating && isActive && packageRef.current && !animationStartedRef.current && !isComplete) {
      // Animation starting
      
      // Mark that we've started animation for this cycle
      animationStartedRef.current = true;
      
      // Position the element at the beginning
      packageRef.current.style.opacity = '1';
      packageRef.current.style.left = `${centerPosition.x}%`;
      packageRef.current.style.top = `${centerPosition.y}%`;
      packageRef.current.style.transform = 'translate(-50%, -50%)';
      
      try {
        // Simplify animation - just do direct point-to-point like the other components
        const animation = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          destinationPosition,
          {
            duration: 800, // Same duration as Cloud animation
            easing: 'easeOutQuad', // Same easing as Cloud animation
            onStart: () => {
              // Animation started
            },
            onComplete: () => {
              // Animation completed
              
              // Trigger destination receive animation first
              if (onDestinationReceive) {
                onDestinationReceive();
              }
              
              // Set completion state
              setIsComplete(true);
              
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
        
        // Store animation reference
        animationRef.current = animation;
        
        if (!animation) {
          console.error('Failed to create Air-Gapped animation');
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        console.error('Error creating Air-Gapped animation:', error);
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
    
    // Cleanup on unmount
    return () => {
      // Just make sure the element is hidden
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    };
  }, [isAnimating, isActive, centerPosition, destinationPosition, onAnimationComplete, onDestinationReceive, isComplete]);

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
        border: '2px solid #FFB81C'
      }}
    >
      <FaBox size={20} color="#FFB81C" />
    </div>
  );
};

export default AirGappedAnimation; 