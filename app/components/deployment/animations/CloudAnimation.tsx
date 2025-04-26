import React, { useRef, useEffect } from 'react';
import { FaBox } from 'react-icons/fa';
import gsap from 'gsap';
import { createDestinationAnimation, Position } from '../utils/AnimationUtils';
import styles from '../../DeploymentFlexibility.module.css';

interface CloudAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destPosition: Position;
  onAnimationComplete?: () => void;
}

const CloudAnimation: React.FC<CloudAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destPosition,
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
      console.log('Starting cloud animation');
      
      // Create a new animation timeline
      timelineRef.current = createDestinationAnimation('cloud', {
        destPosition: destPosition,
        packageSelector: packageRef.current
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
  }, [isAnimating, isActive, centerPosition, destPosition, onAnimationComplete]);

  return (
    <>
      {/* Package element */}
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
    </>
  );
};

export default CloudAnimation; 