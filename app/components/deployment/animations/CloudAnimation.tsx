import React, { useRef, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation, Position } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

export interface CloudAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const CloudAnimation: React.FC<CloudAnimationProps> = ({
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
  
  // Reset completion state when destination changes
  useEffect(() => {
    if (!isActive) {
      setIsComplete(false);
    }
  }, [isActive]);
  
  // Handle animation start/stop
  useEffect(() => {
    // Cleanup any previous animation
    animationRef.current = null;

    if (isAnimating && isActive && packageRef.current) {
      console.log('Starting Cloud animation with positions:', {
        start: centerPosition,
        end: destinationPosition
      });
      
      // Reset completion state when animation starts
      setIsComplete(false);
      
      // Make sure package is properly positioned at the start
      if (packageRef.current) {
        packageRef.current.style.opacity = '1'; // Start visible
        packageRef.current.style.left = `${centerPosition.x}%`;
        packageRef.current.style.top = `${centerPosition.y}%`;
        packageRef.current.style.transform = 'translate(-50%, -50%)';
      }
      
      try {
        // Create point-to-point animation
        const animation = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          destinationPosition,
          {
            duration: 800, // Animation duration
            easing: 'easeOutQuad',
            onStart: () => {
              console.log('Cloud animation started');
            },
            onComplete: () => {
              console.log('Cloud animation completed');
              
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
          console.error('Failed to create cloud animation');
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        console.error('Error creating cloud animation:', error);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    } else {
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
  }, [isAnimating, isActive, centerPosition, destinationPosition, onAnimationComplete, onDestinationReceive]);

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

export default CloudAnimation; 