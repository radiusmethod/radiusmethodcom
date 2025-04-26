import React, { useRef, useEffect } from 'react';
import { FaBox } from 'react-icons/fa';
import gsap from 'gsap';
import { createCloudAnimation, Position } from '../utils/AnimationUtils';
import styles from '../../DeploymentFlexibility.module.css';

interface CloudAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
}

const CloudAnimation: React.FC<CloudAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Handle animation start/stop
  useEffect(() => {
    // Clean up any existing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    if (isAnimating && isActive) {
      console.log('Starting Cloud animation');
      
      // Create a new animation timeline using the dedicated function
      timelineRef.current = createCloudAnimation({
        destPosition: destinationPosition,
        packageSelector: packageRef.current,
        centerPosition: centerPosition
      }, {
        onStart: () => {
          console.log('Cloud animation started');
        },
        onComplete: () => {
          console.log('Cloud animation completed');
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      });
      
      // Start the animation
      timelineRef.current.play();
    }
    
    // Cleanup animation on unmount
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
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
        zIndex: 5
      }}
    >
      <FaBox size={24} color="#FFB81C" />
    </div>
  );
};

export default CloudAnimation; 