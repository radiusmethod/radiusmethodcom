import React, { useRef, useEffect } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation, Position } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

interface KubernetesAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
}

const KubernetesAnimation: React.FC<KubernetesAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<any>(null);

  // Handle animation start/stop
  useEffect(() => {
    // Cleanup any previous animation
    animationRef.current = null;

    if (isAnimating && isActive && packageRef.current) {
      console.log('Starting Kubernetes animation', {centerPosition, destinationPosition});
      
      // Position the element at the beginning
      packageRef.current.style.opacity = '1';
      packageRef.current.style.left = `${centerPosition.x}%`;
      packageRef.current.style.top = `${centerPosition.y}%`;
      packageRef.current.style.transform = 'translate(-50%, -50%)';
      
      try {
        // Create animation
        const animation = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          destinationPosition,
          {
            duration: 800, // Slightly faster animation
            easing: 'easeOutElastic', // Elastic easing for bounce effect
            onStart: () => {
              console.log('Kubernetes animation started');
            },
            onComplete: () => {
              console.log('Kubernetes animation completed');
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
        
        // Store animation reference
        animationRef.current = animation;
        
        if (!animation) {
          console.error('Failed to create Kubernetes animation');
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        console.error('Error creating Kubernetes animation:', error);
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

export default KubernetesAnimation;