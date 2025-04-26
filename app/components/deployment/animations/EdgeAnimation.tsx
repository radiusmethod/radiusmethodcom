import React, { useRef, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation, createTransformAnimation } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';

interface Position {
  x: number;
  y: number;
}

interface EdgeAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const EdgeAnimation: React.FC<EdgeAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete,
  onDestinationReceive
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  
  // Calculate ground station position - halfway between center and destination
  // This is where the first part of the animation will end
  const groundStationPosition = {
    x: centerPosition.x + (destinationPosition.x - centerPosition.x) * 0.4,
    y: centerPosition.y + (destinationPosition.y - centerPosition.y) * 0.5
  };
  
  // Debug info
  console.log('EdgeAnimation props:', { isAnimating, isActive, centerPosition, destinationPosition });
  console.log('Ground station position:', groundStationPosition);
  
  // Reset animation completed state when animation starts
  useEffect(() => {
    if (isAnimating) {
      setAnimationCompleted(false);
      console.log('Edge animation starting');
    }
  }, [isAnimating]);
  
  // Create and manage animation
  useEffect(() => {
    let animation: any = null;
    
    const handleAnimationStart = () => {
      console.log('Edge animation started');
    };
    
    const handleAnimationComplete = () => {
      console.log('Edge animation completed');
      setAnimationCompleted(true);
      
      if (onAnimationComplete) {
        onAnimationComplete();
      }
      
      if (onDestinationReceive) {
        onDestinationReceive();
      }
    };
    
    if (packageRef.current && isAnimating && isActive) {
      try {
        // Create animation from center to ground station
        animation = createPointToPointAnimation(
          packageRef.current,
          centerPosition,
          groundStationPosition,
          {
            duration: 800,
            easing: 'easeOutQuad',
            onStart: handleAnimationStart,
            onComplete: handleAnimationComplete
          }
        );
        
        // Play the animation
        animation.play();
        console.log('Edge animation created and started');
      } catch (error) {
        console.error('Error creating edge animation:', error);
      }
    }
    
    // Cleanup function
    return () => {
      if (animation) {
        animation.cancel();
        console.log('Edge animation cleaned up');
      }
    };
  }, [
    isAnimating, 
    isActive, 
    centerPosition, 
    groundStationPosition, 
    onAnimationComplete,
    onDestinationReceive
  ]);
  
  if (!isActive) {
    return null;
  }
  
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

export default EdgeAnimation; 