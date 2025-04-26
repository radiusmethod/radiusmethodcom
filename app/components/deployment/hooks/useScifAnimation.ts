import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { Position } from '../utils/AnimationUtils';

interface ScifAnimationOptions {
  isAnimating: boolean;
  isActive: boolean;
  activeDestination: number | null;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
}

export function useScifAnimation({
  isAnimating,
  isActive,
  activeDestination,
  centerPosition,
  destinationPosition,
  onAnimationComplete
}: ScifAnimationOptions) {
  const packageRef = useRef<HTMLDivElement | null>(null);
  const cdRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    const isScifDestination = activeDestination === 2;
    
    if (!isAnimating || !isActive || !isScifDestination) {
      return;
    }

    const packageElement = document.getElementById('package-icon');
    const cdElement = document.getElementById('cd-icon');

    if (packageElement) {
      packageRef.current = packageElement as HTMLDivElement;
    }
    
    if (cdElement) {
      cdRef.current = cdElement as HTMLDivElement;
    }
    
    // Create the animation timeline
    const timeline = gsap.timeline({
      onComplete: onAnimationComplete
    });

    if (packageRef.current && cdRef.current) {
      // Initial setup
      gsap.set(packageRef.current, {
        display: 'block',
        left: centerPosition.x,
        top: centerPosition.y
      });
      
      gsap.set(cdRef.current, {
        display: 'block',
        left: centerPosition.x,
        top: centerPosition.y
      });

      // Animate the package first
      timeline.to(packageRef.current, {
        left: destinationPosition.x,
        top: destinationPosition.y,
        duration: 1.5,
        ease: "power2.inOut"
      });

      // Then animate the CD
      timeline.to(cdRef.current, {
        left: destinationPosition.x,
        top: destinationPosition.y,
        duration: 1.5,
        ease: "power2.inOut",
        delay: 0.2
      });
    }

    return () => {
      timeline.kill();
      
      // Hide elements when component unmounts or animation is stopped
      if (packageRef.current) {
        gsap.set(packageRef.current, { display: 'none' });
      }
      
      if (cdRef.current) {
        gsap.set(cdRef.current, { display: 'none' });
      }
    };
  }, [isAnimating, isActive, activeDestination, centerPosition, destinationPosition, onAnimationComplete]);

  return { packageRef, cdRef };
}

export default useScifAnimation; 