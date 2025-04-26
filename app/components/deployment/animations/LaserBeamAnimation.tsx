import React, { useEffect, useRef } from 'react';
// Import anime.js using a more compatible approach with Next.js
import * as anime from 'animejs';

interface Position {
  x: number;
  y: number;
}

export interface LaserBeamAnimationProps {
  id: string;
  startPosition: Position;
  endPosition: Position;
  color?: string;
  thickness?: number;
  duration?: number;
  delay?: number;
  isAnimating: boolean;
}

const LaserBeamAnimation: React.FC<LaserBeamAnimationProps> = ({
  id,
  startPosition,
  endPosition,
  color = '#00ff00',
  thickness = 2,
  duration = 1500,
  delay = 0,
  isAnimating
}) => {
  const pathRef = useRef<SVGPathElement>(null);
  const animationRef = useRef<any>(null);

  // Create SVG path for the laser beam
  const pathData = `M${startPosition.x},${startPosition.y} L${endPosition.x},${endPosition.y}`;

  // Calculate the path length for the dashoffset animation
  const getPathLength = (): number => {
    if (pathRef.current) {
      return pathRef.current.getTotalLength();
    }
    // Fallback: calculate the distance between points
    const dx = endPosition.x - startPosition.x;
    const dy = endPosition.y - startPosition.y;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Set up the animation
  useEffect(() => {
    if (isAnimating && pathRef.current) {
      // Stop any existing animation
      if (animationRef.current) {
        // We need to use the raw DOM API since we can't access anime.remove
        if (pathRef.current) {
          pathRef.current.style.strokeDashoffset = String(getPathLength());
        }
      }

      // Create the animation - using Type assertions to resolve TS issues
      // @ts-ignore - Working around anime.js types
      const animation = anime.animate(pathRef.current, {
        strokeDashoffset: [getPathLength(), 0],
        easing: 'easeInOutSine',
        duration: duration,
        delay: delay,
        direction: 'alternate',
        loop: true
      });
      
      animationRef.current = animation;
    } else if (!isAnimating && pathRef.current) {
      // Reset animation state
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = String(getPathLength());
      }
      animationRef.current = null;
    }

    // Clean up on unmount
    return () => {
      if (animationRef.current && animationRef.current.pause) {
        animationRef.current.pause();
      }
      animationRef.current = null;
    };
  }, [isAnimating, duration, delay]);

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 10,
        opacity: isAnimating ? 1 : 0,
        transition: 'opacity 0.3s ease'
      }}
    >
      <path
        id={`laser-path-${id}`}
        ref={pathRef}
        d={pathData}
        stroke={color}
        strokeWidth={thickness}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={getPathLength()}
        strokeDashoffset={getPathLength()}
      />
    </svg>
  );
};

export default LaserBeamAnimation; 