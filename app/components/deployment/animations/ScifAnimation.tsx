import React, { useRef, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { FaCompactDisc } from 'react-icons/fa';
import { createTransformAnimation, Position } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

export interface ScifAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  shieldPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const ScifAnimation: React.FC<ScifAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  shieldPosition,
  destinationPosition,
  onAnimationComplete,
  onDestinationReceive
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
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
    // No need to actively clean up Anime.js animations
    // They will complete on their own
    animationRef.current = null;

    if (isAnimating && isActive && packageRef.current && cdRef.current) {
      console.log('Starting SCIF animation', {centerPosition, shieldPosition, destinationPosition});
      
      // Reset completion state when animation starts
      setIsComplete(false);
      
      // Make sure elements are properly positioned at start
      packageRef.current.style.opacity = '1';
      packageRef.current.style.left = `${centerPosition.x}%`;
      packageRef.current.style.top = `${centerPosition.y}%`;
      packageRef.current.style.transform = 'translate(-50%, -50%)';
      
      cdRef.current.style.opacity = '0';
      cdRef.current.style.left = `${shieldPosition.x}%`;
      cdRef.current.style.top = `${shieldPosition.y}%`;
      cdRef.current.style.transform = 'translate(-50%, -50%)';
      
      try {
        // Create and start the transform animation
        const animation = createTransformAnimation(
          packageRef.current,
          cdRef.current,
          centerPosition, 
          shieldPosition,
          destinationPosition,
          {
            duration: 1600, // Total animation duration
            easing: 'easeOutQuad'
          }
        );
        
        if (animation) {
          // Store animation reference
          animationRef.current = animation;
          
          // Set callbacks and start
          animation.onTransformCallback = () => {
            console.log('Package transformed to CD at shield');
          };
          
          animation.onCompleteCallback = () => {
            console.log('SCIF animation completed');
            
            // Trigger the destination receive callback
            if (onDestinationReceive) {
              onDestinationReceive();
            }
            
            // Set completion state
            setIsComplete(true);
            
            // Then complete the animation
            if (onAnimationComplete) {
              onAnimationComplete();
            }
          };
          
          // Log start and begin animation
          console.log('SCIF animation started');
          animation.start();
        } else {
          console.error('Failed to create SCIF animation');
          // Still call completion callback to not block the flow
          if (onAnimationComplete) {
            onAnimationComplete();
          }
        }
      } catch (error) {
        console.error('Error creating SCIF animation:', error);
        // Still call completion callback to not block the flow
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    } else {
      // Hide the elements when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
      if (cdRef.current) {
        cdRef.current.style.opacity = '0';
      }
    }
    
    // Cleanup on unmount
    return () => {
      // Just make sure the elements are hidden
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
      if (cdRef.current) {
        cdRef.current.style.opacity = '0';
      }
    };
  }, [isAnimating, isActive, centerPosition, shieldPosition, destinationPosition, onAnimationComplete, onDestinationReceive]);

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
          zIndex: 10,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(0,0,0,0.7)',
          borderRadius: '50%',
          padding: '8px',
          width: '40px',
          height: '40px',
          border: '2px solid #64B5F6'
        }}
      >
        <FaCompactDisc size={20} color="#64B5F6" />
      </div>
    </>
  );
};

export default ScifAnimation; 