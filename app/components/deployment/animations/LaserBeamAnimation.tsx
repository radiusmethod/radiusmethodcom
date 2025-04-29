import React, { useEffect, useRef, useState } from 'react';
import { FaBolt } from 'react-icons/fa'; // Switch back to bolts
import styles from '../../DeploymentFlexibility.module.css';

// Define the allowed animation paths
export type AnimationPath = 'dish-to-satellite' | 'satellite-to-hangar';

interface Position {
  x: number;
  y: number;
}

export interface LaserBeamAnimationProps {
  id: string;
  sourceRef: React.RefObject<HTMLDivElement>;
  targetRef: React.RefObject<HTMLDivElement>;
  satelliteRef?: React.RefObject<HTMLDivElement>; // Make optional with ?
  hangarRef?: React.RefObject<HTMLDivElement>; // Make optional with ?
  color?: string;
  duration?: number;
  delay?: number;
  isAnimating: boolean;
  path?: AnimationPath;
}

// Fixed number of data points to display in sequence
const NUM_POINTS = 5;

const LaserBeamAnimation: React.FC<LaserBeamAnimationProps> = ({
  id,
  sourceRef,
  targetRef,
  satelliteRef,
  hangarRef,
  color = '#FFE44D', // Yellow/gold color for satellite transmission
  duration = 1500,
  delay = 0,
  isAnimating,
  path = 'dish-to-satellite'
}) => {
  // Create refs for all the data points
  const pointRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dishPosition, setDishPosition] = useState<Position>({ x: 0, y: 0 });
  const [satellitePosition, setSatellitePosition] = useState<Position>({ x: 0, y: 0 });
  const [hangarPosition, setHangarPosition] = useState<Position>({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  
  // Keep track of animation state
  const [isFirstLegComplete, setIsFirstLegComplete] = useState(false);
  
  // Initialize the refs array
  useEffect(() => {
    pointRefs.current = pointRefs.current.slice(0, NUM_POINTS);
  }, []);
  
  // Log positions to help debug direction issues
  useEffect(() => {
    console.log("Animation positions:", {
      dish: dishPosition,
      satellite: satellitePosition,
      hangar: hangarPosition
    });
  }, [dishPosition, satellitePosition, hangarPosition]);
  
  // Calculate positions from element refs
  useEffect(() => {
    // Function to get element position in viewport percentage
    const getElementPosition = (element: HTMLDivElement | null): Position => {
      if (!element) return { x: 0, y: 0 };
      
      const rect = element.getBoundingClientRect();
      const pageWidth = window.innerWidth;
      const pageHeight = window.innerHeight;
      
      // Calculate center of element
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Convert to percentage of viewport
      return {
        x: (centerX / pageWidth) * 100,
        y: (centerY / pageHeight) * 100
      };
    };
    
    // Update dish position
    if (sourceRef.current) {
      setDishPosition(getElementPosition(sourceRef.current));
    }
    
    // Update satellite position if ref exists
    if (satelliteRef?.current) {
      setSatellitePosition(getElementPosition(satelliteRef.current));
    } else if (targetRef.current) {
      // Fallback to targetRef if satelliteRef isn't provided
      setSatellitePosition(getElementPosition(targetRef.current));
    }
    
    // Update hangar position if ref exists
    if (hangarRef?.current) {
      setHangarPosition(getElementPosition(hangarRef.current));
    }
  }, [sourceRef, satelliteRef, hangarRef, targetRef, isAnimating]);
  
  // Set up the animation
  useEffect(() => {
    // Clear any existing animation
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset leg state when animation starts or stops
    if (!isAnimating) {
      setIsFirstLegComplete(false);
    }
    
    const hasRequiredRefs = sourceRef.current && 
      (satelliteRef?.current || targetRef.current);
    
    if (!isAnimating || !hasRequiredRefs) {
      // Hide all points when not animating
      pointRefs.current.forEach(point => {
        if (point) {
          point.style.opacity = '0';
        }
      });
      return;
    }
    
    const totalDuration = 15000; // 15 seconds total
    const singleLegDuration = 7500; // 7.5 seconds per leg
    
    // Start time for the animation
    startTimeRef.current = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      
      // Determine if we're on first or second leg
      const hasBothLegs = Boolean(hangarRef?.current);
      
      // Check if first leg has completed
      if (!isFirstLegComplete && elapsed >= singleLegDuration) {
        setIsFirstLegComplete(true);
      }
      
      // Reset the animation after completing full cycle
      if (elapsed >= totalDuration) {
        startTimeRef.current = Date.now();
        setIsFirstLegComplete(false);
      }
      
      // For single leg mode, always use first leg with progress wrapping around
      const useLeg2 = hasBothLegs && isFirstLegComplete;
      
      // Get start and end positions for current leg
      const startPos = useLeg2 ? satellitePosition : dishPosition;
      const endPos = useLeg2 ? hangarPosition : satellitePosition;
      
      // Calculate path vectors
      const dx = endPos.x - startPos.x;
      const dy = endPos.y - startPos.y;
      
      // Calculate angle for bolt rotation (in degrees)
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      
      // Calculate progress within current leg (0 to 1)
      const legDuration = useLeg2 ? 
        totalDuration - singleLegDuration : singleLegDuration;
      
      const legElapsed = useLeg2 ? 
        elapsed - singleLegDuration : elapsed;
      
      const legProgress = Math.min(legElapsed / legDuration, 1);
      
      // Position each point as part of the marching sequence
      pointRefs.current.forEach((point, index) => {
        if (!point) return;
        
        // Configure bolt appearance
        point.style.fontSize = '10px';
        point.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
        point.style.filter = `drop-shadow(0 0 1px ${color})`;
        
        // Calculate this point's position in the sequence
        const pointProgress = legProgress - (index * 0.05);
        
        // If point hasn't started yet or has finished current leg, hide it
        if (pointProgress < 0 || pointProgress > 1) {
          point.style.opacity = '0';
        } else {
          point.style.opacity = '1';
          
          // Calculate position along current leg
          const x = startPos.x + dx * pointProgress;
          const y = startPos.y + dy * pointProgress;
          
          point.style.left = `${x}vw`;
          point.style.top = `${y}vh`;
        }
      });
      
      // Continue animation if still animating
      if (isAnimating) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Start animation
    animate();
    
    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Hide all points
      pointRefs.current.forEach(point => {
        if (point) {
          point.style.opacity = '0';
        }
      });
    };
  }, [isAnimating, dishPosition, satellitePosition, hangarPosition, color, isFirstLegComplete]);
  
  const hasRequiredRefs = sourceRef.current && 
    (satelliteRef?.current || targetRef.current);
  
  if (!isAnimating || !hasRequiredRefs) {
    return null;
  }
  
  // Create path for the first leg (dish to satellite)
  const dishToSatellitePath = {
    left: `${dishPosition.x}vw`,
    top: `${dishPosition.y}vh`,
    width: `${Math.sqrt(
      Math.pow(satellitePosition.x - dishPosition.x, 2) + 
      Math.pow(satellitePosition.y - dishPosition.y, 2)
    )}vw`,
    transform: `translate(-50%, -50%) rotate(${
      Math.atan2(
        satellitePosition.y - dishPosition.y,
        satellitePosition.x - dishPosition.x
      ) * (180 / Math.PI)
    }deg)`,
    transformOrigin: 'left center'
  };
  
  // Only show second leg if hangarRef exists
  const hasBothLegs = Boolean(hangarRef?.current);
  
  return (
    <>
      {/* Path lines */}
      <div
        style={{
          position: 'fixed',
          height: '1px',
          background: 'none',
          borderTop: `1px dashed ${color}`,
          opacity: isFirstLegComplete ? 0.05 : 0.1, // Dim first leg after completion
          transition: 'opacity 0.3s ease',
          zIndex: 9,
          pointerEvents: 'none',
          ...dishToSatellitePath
        }}
      />
      {hasBothLegs && (
        <div
          style={{
            position: 'fixed',
            height: '1px',
            background: 'none',
            borderTop: `1px dashed ${color}`,
            opacity: isFirstLegComplete ? 0.1 : 0.05, // Brighten second leg after first completes
            transition: 'opacity 0.3s ease',
            zIndex: 9,
            pointerEvents: 'none',
            left: `${satellitePosition.x}vw`,
            top: `${satellitePosition.y}vh`,
            width: `${Math.sqrt(
              Math.pow(hangarPosition.x - satellitePosition.x, 2) + 
              Math.pow(hangarPosition.y - satellitePosition.y, 2)
            )}vw`,
            transform: `translate(-50%, -50%) rotate(${
              Math.atan2(
                hangarPosition.y - satellitePosition.y,
                hangarPosition.x - satellitePosition.x
              ) * (180 / Math.PI)
            }deg)`,
            transformOrigin: 'left center'
          }}
        />
      )}
      
      {/* Bolts */}
      {Array.from({ length: NUM_POINTS }).map((_, index) => (
        <div
          key={`bolt-${id}-${index}`}
          ref={el => {
            pointRefs.current[index] = el;
          }}
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: color,
            opacity: 0,
            zIndex: 20,
            pointerEvents: 'none'
          }}
        >
          <FaBolt />
        </div>
      ))}
    </>
  );
};

export default LaserBeamAnimation; 