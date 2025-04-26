import React, { useRef, useEffect } from 'react';
import { FaBox } from 'react-icons/fa';
import { FaCompactDisc } from 'react-icons/fa';
import gsap from 'gsap';
import { createScifAnimation, Position } from '../utils/AnimationUtils';
import styles from '../../DeploymentFlexibility.module.css';

interface ScifAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  shieldPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
}

const ScifAnimation: React.FC<ScifAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  shieldPosition,
  destinationPosition,
  onAnimationComplete
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Handle animation start/stop
  useEffect(() => {
    // Clean up any existing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    if (isAnimating && isActive) {
      console.log('Starting SCIF animation');
      
      // Create a new animation timeline using the dedicated function
      timelineRef.current = createScifAnimation({
        destPosition: destinationPosition,
        shieldPosition: shieldPosition,
        packageSelector: packageRef.current,
        cdSelector: cdRef.current,
        centerPosition: centerPosition
      }, {
        onStart: () => {
          console.log('SCIF animation started');
        },
        onComplete: () => {
          console.log('SCIF animation completed');
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        },
        onTransform: () => {
          console.log('Package transformed to CD at shield');
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
  }, [isAnimating, isActive, centerPosition, shieldPosition, destinationPosition, onAnimationComplete]);

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
      
      {/* CD element that replaces the package at the shield */}
      <div
        ref={cdRef}
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
        <FaCompactDisc size={24} color="#FFB81C" />
      </div>
    </>
  );
};

export default ScifAnimation; 