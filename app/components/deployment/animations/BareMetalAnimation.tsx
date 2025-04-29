import React, { useRef, useEffect, useState } from 'react';
import { FaServer } from 'react-icons/fa';
import { Position, createPointToPointAnimation } from '../utils/MotionPathUtils';

// Define the AnimationInstance type locally since it's not exported from MotionPathUtils
interface AnimationInstance {
  play: () => void;
  pause: () => void;
  cancel: () => void;
}

export interface BareMetalAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
  onDestinationReceive?: () => void;
}

const BareMetalAnimation: React.FC<BareMetalAnimationProps> = ({
  isAnimating,
  isActive,
  centerPosition,
  destinationPosition,
  onAnimationComplete,
  onDestinationReceive
}) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<AnimationInstance | null>(null);
  const [hasCompleted, setHasCompleted] = useState(false);

  // Reset completion state when destination changes
  useEffect(() => {
    setHasCompleted(false);
  }, [destinationPosition]);

  // Handle animation
  useEffect(() => {
    // Clean up function
    const cleanUp = () => {
      if (animationRef.current) {
        animationRef.current.cancel();
        animationRef.current = null;
      }
    };

    // If we're animating and have a valid element
    if (isAnimating && packageRef.current && !hasCompleted) {
      const duration = 1500; // Duration in milliseconds
      
      // Create the animation from center to destination
      animationRef.current = createPointToPointAnimation(
        packageRef.current,
        centerPosition,
        destinationPosition,
        {
          duration: 1500,
          easing: 'easeOutQuad',
          onComplete: () => {
            setHasCompleted(true);
            if (onAnimationComplete) {
              onAnimationComplete();
            }
            if (onDestinationReceive) {
              onDestinationReceive();
            }
          }
        }
      );
    } else if (!isAnimating) {
      cleanUp();
    }

    return cleanUp;
  }, [isAnimating, centerPosition, destinationPosition, hasCompleted, onAnimationComplete, onDestinationReceive]);

  // Only show the package when animating
  if (!isAnimating && !isActive) {
    return null;
  }

  return (
    <div
      ref={packageRef}
      style={{
        position: 'absolute',
        width: '30px',
        height: '30px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        backgroundColor: 'rgba(64, 100, 200, 0.8)',
        boxShadow: '0 0 10px rgba(64, 100, 200, 0.5)',
        opacity: isAnimating ? 1 : 0,
        transform: 'translate(-50%, -50%)',
        zIndex: 100,
        transition: 'opacity 0.3s ease',
        // Start at the center position
        left: `${centerPosition.x}%`,
        top: `${centerPosition.y}%`,
      }}
    >
      <FaServer
        size={15}
        color="#ffffff"
        style={{
          animation: isAnimating ? 'pulse 1s infinite alternate' : 'none',
        }}
      />
      
      {/* Add a CSS keyframe for the pulse animation */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.9);
            opacity: 0.8;
          }
          100% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default BareMetalAnimation; 