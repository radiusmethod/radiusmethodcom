import React, { useRef, useEffect, useState } from 'react';
import { FaBox } from 'react-icons/fa';
import { createPointToPointAnimation, createTransformAnimation } from '../utils/MotionPathUtils';
import styles from '../../DeploymentFlexibility.module.css';
import LaserBeamAnimation from './LaserBeamAnimation';

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
  const groundStationRef = useRef<HTMLDivElement>(null);
  const satelliteRef = useRef<HTMLDivElement>(null);
  const hangarRef = useRef<HTMLDivElement>(null);
  
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [dishToSatelliteActive, setDishToSatelliteActive] = useState(false);
  const [satelliteToHangarActive, setSatelliteToHangarActive] = useState(false);
  
  // Add unique ID for the laser beams
  const laserId = useRef(`edge-laser-${Math.random().toString(36).substr(2, 9)}`).current;
  
  // Calculate ground station position - halfway between center and destination
  // This is where the first part of the animation will end
  const groundStationPosition = {
    x: centerPosition.x + (destinationPosition.x - centerPosition.x) * 0.4,
    y: centerPosition.y + (destinationPosition.y - centerPosition.y) * 0.5
  };
  
  // Calculate satellite position
  const satellitePosition = {
    x: destinationPosition.x,
    y: destinationPosition.y - 12,
  };
  
  // Reset animation completed state when animation starts
  useEffect(() => {
    if (isAnimating) {
      setAnimationCompleted(false);
      setDishToSatelliteActive(false);
      setSatelliteToHangarActive(false);
      console.log('Edge animation starting');
    }
  }, [isAnimating]);
  
  // Position the placeholder elements for animation
  useEffect(() => {
    if (groundStationRef.current) {
      groundStationRef.current.style.left = `${groundStationPosition.x}%`;
      groundStationRef.current.style.top = `${groundStationPosition.y}%`;
    }
    
    if (satelliteRef.current) {
      satelliteRef.current.style.left = `${satellitePosition.x}%`;
      satelliteRef.current.style.top = `${satellitePosition.y}%`;
    }
    
    if (hangarRef.current) {
      hangarRef.current.style.left = `${destinationPosition.x}%`;
      hangarRef.current.style.top = `${destinationPosition.y}%`;
    }
  }, [groundStationPosition, satellitePosition, destinationPosition]);
  
  // Create and manage animation
  useEffect(() => {
    let animation: any = null;
    
    const handleAnimationStart = () => {
      console.log('Edge animation started');
    };
    
    const handleAnimationComplete = () => {
      console.log('Edge animation completed');
      setAnimationCompleted(true);
      
      // Activate the first lightning beam from dish to satellite
      setDishToSatelliteActive(true);
      
      // Activate the second lightning beam after a delay
      setTimeout(() => {
        setSatelliteToHangarActive(true);
      }, 800);
      
      if (onAnimationComplete) {
        onAnimationComplete();
      }
      
      if (onDestinationReceive) {
        setTimeout(() => {
          onDestinationReceive();
        }, 1200); // Give time for lightning to be visible before triggering receiving state
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
    <>
      {/* Placeholder elements for animation targets */}
      <div 
        ref={groundStationRef} 
        style={{ 
          position: 'absolute', 
          width: '10px', 
          height: '10px', 
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      <div 
        ref={satelliteRef} 
        style={{ 
          position: 'absolute', 
          width: '10px', 
          height: '10px', 
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      <div 
        ref={hangarRef} 
        style={{ 
          position: 'absolute', 
          width: '10px', 
          height: '10px', 
          opacity: 0,
          pointerEvents: 'none',
          transform: 'translate(-50%, -50%)'
        }} 
      />
      
      {/* Satellite transmission visualization from ground station to satellite */}
      {dishToSatelliteActive && (
        <LaserBeamAnimation 
          id={`${laserId}-dish-to-satellite`}
          sourceRef={groundStationRef}
          targetRef={satelliteRef}
          color="#FFE44D"
          duration={1200}
          isAnimating={isAnimating && isActive && dishToSatelliteActive}
          path="dish-to-satellite"
        />
      )}
      
      {/* Satellite transmission visualization from satellite to hangar */}
      {satelliteToHangarActive && (
        <LaserBeamAnimation 
          id={`${laserId}-satellite-to-hangar`}
          sourceRef={satelliteRef}
          targetRef={hangarRef}
          color="#FFE44D"
          duration={1200}
          isAnimating={isAnimating && isActive && satelliteToHangarActive}
          path="satellite-to-hangar"
        />
      )}
      
      {/* Package animation */}
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
    </>
  );
};

export default EdgeAnimation; 