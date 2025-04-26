import React, { useRef, useEffect } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation, Position } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

interface AirGappedAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
}

const AirGappedAnimation: React.FC<AirGappedAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const firstAnimationRef = useRef<any>(null);
  const secondAnimationRef = useRef<any>(null);
  const timeoutsRef = useRef<number[]>([]);

  // Clean up timeouts to prevent memory leaks
  const clearTimeouts = () => {
    timeoutsRef.current.forEach(id => window.clearTimeout(id));
    timeoutsRef.current = [];
  };

  // Handle animation start/stop
  useEffect(() => {
    // Cleanup previous animations
    firstAnimationRef.current = null;
    secondAnimationRef.current = null;
    clearTimeouts();

    if (isAnimating && isActive && packageRef.current) {
      console.log('Starting Air-Gapped animation', {centerPosition, destinationPosition});
      
      // Position the element at the beginning
      packageRef.current.style.opacity = '1';
      packageRef.current.style.left = `${centerPosition.x}%`;
      packageRef.current.style.top = `${centerPosition.y}%`;
      packageRef.current.style.transform = 'translate(-50%, -50%)';

      try {
        // Calculate padlock (midpoint) position - about 60% of the way
        const padlockX = centerPosition.x + (destinationPosition.x - centerPosition.x) * 0.6;
        const padlockY = centerPosition.y + (destinationPosition.y - centerPosition.y) * 0.6;
        const padlockPosition = { x: padlockX, y: padlockY };

        // First animate to the padlock position
        const firstAnimation = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          padlockPosition,
          {
            duration: 600, // Faster for first part
            easing: 'easeOutQuad',
            onStart: () => {
              console.log('Air-Gapped animation started');
            },
            onComplete: () => {
              // Do transformation at padlock (rotate element)
              if (packageRef.current) {
                // Add rotation effect
                packageRef.current.style.transition = 'transform 0.3s ease-out';
                packageRef.current.style.transform = 'translate(-50%, -50%) rotate(180deg) scale(0.9)';
                
                console.log('Package transformed at security checkpoint');
                
                // After brief pause, continue to destination
                const timeoutId = window.setTimeout(() => {
                  if (packageRef.current) {
                    // Reset transform
                    packageRef.current.style.transform = 'translate(-50%, -50%)';
                    
                    try {
                      // Second animation to destination
                      const secondAnimation = createPointToPointAnimation(
                        packageRef.current,
                        padlockPosition,
                        destinationPosition,
                        {
                          duration: 600, // Faster for second part
                          easing: 'easeInQuad',
                          onComplete: () => {
                            console.log('Air-Gapped animation completed');
                            // Hide element at the end
                            if (packageRef.current) {
                              packageRef.current.style.opacity = '0';
                            }
                            if (onAnimationComplete) {
                              onAnimationComplete();
                            }
                          }
                        }
                      );
                      
                      if (secondAnimation) {
                        secondAnimationRef.current = secondAnimation;
                      } else {
                        console.error('Failed to create second part of Air-Gapped animation');
                        if (onAnimationComplete) {
                          onAnimationComplete();
                        }
                      }
                    } catch (error) {
                      console.error('Error creating second part of Air-Gapped animation:', error);
                      if (onAnimationComplete) {
                        onAnimationComplete();
                      }
                    }
                  }
                }, 400);
                
                timeoutsRef.current.push(timeoutId);
              }
            }
          }
        );
        
        if (firstAnimation) {
          firstAnimationRef.current = firstAnimation;
        } else {
          console.error('Failed to create first part of Air-Gapped animation');
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
    } else {
      // Hide the element when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    }
    
    // Cleanup on unmount
    return () => {
      clearTimeouts();
      // Make sure the element is hidden
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
    };
  }, [isAnimating, isActive, centerPosition, destinationPosition, onAnimationComplete]);

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