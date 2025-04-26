import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
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
  const animationStartedRef = useRef(false);
  
  // Debug positions for troubleshooting - using layout effect to ensure it runs before render
  useLayoutEffect(() => {
    console.log('ScifAnimation component initial render with props:', {
      isAnimating,
      isActive,
      centerPosition,
      shieldPosition,
      destinationPosition
    });
  }, []);
  
  // Reset completion state when destination changes
  useEffect(() => {
    if (!isActive) {
      setIsComplete(false);
      animationStartedRef.current = false;
      console.log('ScifAnimation: resetting completion state because it is not active');
    } else {
      console.log('ScifAnimation: is now active');
    }
  }, [isActive]);

  // Debug positions whenever they change
  useEffect(() => {
    console.log('ScifAnimation positions updated:', {
      centerPosition,
      shieldPosition,
      destinationPosition,
      isActive,
      isAnimating
    });
  }, [centerPosition, shieldPosition, destinationPosition, isActive, isAnimating]);

  // Handle animation start/stop
  useEffect(() => {
    console.log('ScifAnimation useEffect trigger with state:', { 
      isAnimating, 
      isActive, 
      hasPackageRef: !!packageRef.current,
      hasCdRef: !!cdRef.current,
      animationStarted: animationStartedRef.current,
      isComplete
    });
    
    // Clear previous animation
    if (animationRef.current) {
      console.log('Cleaning up previous SCIF animation');
      animationRef.current = null;
    }

    // Only start a new animation if one hasn't already been started for this cycle
    if (isAnimating && isActive && packageRef.current && cdRef.current && !animationStartedRef.current && !isComplete) {
      console.log('Starting SCIF animation with positions:', {
        centerPosition, 
        shieldPosition, 
        destinationPosition
      });
      
      // Mark that we've started the animation for this cycle
      animationStartedRef.current = true;
      
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
          
          // Start the animation with callbacks
          animation
            .onTransform(() => {
              console.log('Package transformed to CD at shield');
            })
            .onComplete(() => {
              console.log('SCIF animation completed');
              
              // Trigger the destination receive callback
              if (onDestinationReceive) {
                console.log('Calling onDestinationReceive callback');
                onDestinationReceive();
              }
              
              // Set completion state
              setIsComplete(true);
              
              // Then complete the animation
              if (onAnimationComplete) {
                console.log('Calling onAnimationComplete callback');
                onAnimationComplete();
              }
            })
            .start();
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
    } else if (!isAnimating) {
      // Animation has stopped, reset our flag
      console.log('Animation has stopped, resetting flags');
      animationStartedRef.current = false;
      
      // Hide the elements when not animating
      if (packageRef.current) {
        packageRef.current.style.opacity = '0';
      }
      if (cdRef.current) {
        cdRef.current.style.opacity = '0';
      }
    } else if (!isActive) {
      console.log('SCIF animation not active, skipping');
    } else if (animationStartedRef.current) {
      console.log('SCIF animation already started for this cycle');
    } else if (isComplete) {
      console.log('SCIF animation already completed');
    } else {
      console.log('SCIF animation not starting due to other conditions');
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
  }, [isAnimating, isActive, centerPosition, shieldPosition, destinationPosition, onAnimationComplete, onDestinationReceive, isComplete]);

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