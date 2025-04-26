import React, { useEffect, useRef, useState } from 'react';
import { FaBolt } from 'react-icons/fa';
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
  color?: string;
  duration?: number;
  delay?: number;
  isAnimating: boolean;
  path?: AnimationPath;
}

// Number of lightning bolts to display in the animation
const NUM_BOLTS = 5;

const LaserBeamAnimation: React.FC<LaserBeamAnimationProps> = ({
  id,
  sourceRef,
  targetRef,
  color = '#FFE44D', // Yellow/gold color for satellite transmission
  duration = 1500,
  delay = 0,
  isAnimating,
  path = 'dish-to-satellite'
}) => {
  // Create refs for all the bolt elements
  const boltRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [startPosition, setStartPosition] = useState<Position>({ x: 0, y: 0 });
  const [endPosition, setEndPosition] = useState<Position>({ x: 0, y: 0 });
  const animationInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Initialize the refs array
  useEffect(() => {
    boltRefs.current = boltRefs.current.slice(0, NUM_BOLTS);
  }, []);
  
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
    
    // Update positions if refs exist
    if (sourceRef.current && targetRef.current) {
      const sourcePos = getElementPosition(sourceRef.current);
      const targetPos = getElementPosition(targetRef.current);
      
      setStartPosition(sourcePos);
      setEndPosition(targetPos);
      
      console.log(`LaserBeam positions calculated for ${path}:`, { 
        source: sourcePos, 
        target: targetPos 
      });
    }
  }, [sourceRef.current, targetRef.current, path, isAnimating]);
  
  // Set up the animation
  useEffect(() => {
    // Clear any existing animation
    if (animationInterval.current) {
      clearInterval(animationInterval.current);
      animationInterval.current = null;
    }
    
    if (!isAnimating || !sourceRef.current || !targetRef.current) {
      // Hide all bolts when not animating
      boltRefs.current.forEach(bolt => {
        if (bolt) {
          bolt.style.opacity = '0';
        }
      });
      return;
    }
    
    // Start the animation sequence
    console.log(`Starting lightning bolt animation for ${path}`);
    
    // Calculate the vector from start to end
    const dx = endPosition.x - startPosition.x;
    const dy = endPosition.y - startPosition.y;
    
    // Function to animate a single bolt
    const animateBolt = (bolt: HTMLDivElement, index: number) => {
      // Each bolt needs to be placed at a different position along the path
      const position = index / (NUM_BOLTS - 1);
      
      // Add some randomness to the bolt position
      const jitter = 0.05; // 5% jitter
      const randomOffset = (Math.random() * 2 - 1) * jitter;
      const adjustedPosition = Math.max(0, Math.min(1, position + randomOffset));
      
      // Calculate the position
      const x = startPosition.x + dx * adjustedPosition;
      const y = startPosition.y + dy * adjustedPosition;
      
      // Set bolt position
      bolt.style.left = `${x}vw`;
      bolt.style.top = `${y}vh`;
      
      // Random rotation for each bolt
      const rotation = (Math.random() * 40 - 20);
      bolt.style.transform = `translate(-50%, -50%) rotate(${rotation}deg)`;
      
      // Different size for each bolt
      const scale = 0.8 + Math.random() * 0.4; // 80% to 120% size
      bolt.style.fontSize = `${scale * 16}px`;
      
      // Flash the bolt
      bolt.style.opacity = '1';
      bolt.style.transition = 'opacity 0.1s ease-in';
      
      // Hide after a short time
      setTimeout(() => {
        if (bolt) {
          bolt.style.opacity = '0';
          bolt.style.transition = 'opacity 0.2s ease-out';
        }
      }, 150);
    };
    
    // Initial animation for each bolt with staggered timing
    boltRefs.current.forEach((bolt, index) => {
      if (!bolt) return;
      
      const boltDelay = delay + (index * (duration / NUM_BOLTS));
      setTimeout(() => {
        if (bolt && isAnimating) {
          animateBolt(bolt, index);
        }
      }, boltDelay);
    });
    
    // Set up animation loop
    animationInterval.current = setInterval(() => {
      // Check if animation should still be running
      if (!isAnimating) {
        if (animationInterval.current) {
          clearInterval(animationInterval.current);
          animationInterval.current = null;
        }
        return;
      }
      
      // Update positions from refs each cycle
      if (sourceRef.current && targetRef.current) {
        const getElementPosition = (element: HTMLDivElement): Position => {
          const rect = element.getBoundingClientRect();
          const pageWidth = window.innerWidth;
          const pageHeight = window.innerHeight;
          
          return {
            x: ((rect.left + rect.width / 2) / pageWidth) * 100,
            y: ((rect.top + rect.height / 2) / pageHeight) * 100
          };
        };
        
        const newStartPos = getElementPosition(sourceRef.current);
        const newEndPos = getElementPosition(targetRef.current);
        
        if (Math.abs(newStartPos.x - startPosition.x) > 0.1 || 
            Math.abs(newStartPos.y - startPosition.y) > 0.1 ||
            Math.abs(newEndPos.x - endPosition.x) > 0.1 ||
            Math.abs(newEndPos.y - endPosition.y) > 0.1) {
          setStartPosition(newStartPos);
          setEndPosition(newEndPos);
        }
      }
      
      // Animate each bolt with staggered timing
      boltRefs.current.forEach((bolt, index) => {
        if (!bolt) return;
        
        const boltDelay = (index * (duration / NUM_BOLTS / 2));
        setTimeout(() => {
          if (bolt && isAnimating) {
            animateBolt(bolt, index);
          }
        }, boltDelay);
      });
    }, duration);
    
    // Clean up the interval on component unmount or when animation stops
    return () => {
      if (animationInterval.current) {
        clearInterval(animationInterval.current);
        animationInterval.current = null;
      }
      
      // Hide all bolts when cleaning up
      boltRefs.current.forEach(bolt => {
        if (bolt) {
          bolt.style.opacity = '0';
        }
      });
    };
  }, [isAnimating, startPosition, endPosition, sourceRef, targetRef, color, duration, delay, path]);

  // Create the dashed line path as a guide for the lightning bolts
  const linePath = {
    left: `${startPosition.x}vw`,
    top: `${startPosition.y}vh`,
    width: `${Math.sqrt(
      Math.pow(endPosition.x - startPosition.x, 2) + 
      Math.pow(endPosition.y - startPosition.y, 2)
    )}vw`,
    transform: `translate(-50%, -50%) rotate(${
      Math.atan2(
        endPosition.y - startPosition.y, 
        endPosition.x - startPosition.x
      ) * (180 / Math.PI)
    }deg)`,
    transformOrigin: 'left center'
  };

  if (!isAnimating || !sourceRef.current || !targetRef.current) {
    return null;
  }

  return (
    <>
      {/* Thin dashed line connecting elements */}
      <div
        style={{
          position: 'fixed',
          height: '1px',
          background: 'none',
          borderTop: `1px dashed ${color}`,
          opacity: isAnimating ? 0.3 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 9,
          pointerEvents: 'none',
          ...linePath
        }}
      />
      
      {/* Lightning bolt elements */}
      {Array.from({ length: NUM_BOLTS }).map((_, index) => (
        <div
          key={`bolt-${id}-${index}`}
          ref={el => {
            boltRefs.current[index] = el;
          }}
          style={{
            position: 'fixed',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            color: color,
            opacity: 0,
            zIndex: 20,
            pointerEvents: 'none',
            textShadow: `0 0 5px ${color}`
          }}
        >
          <FaBolt />
        </div>
      ))}
    </>
  );
};

export default LaserBeamAnimation; 