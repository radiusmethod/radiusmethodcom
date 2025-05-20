import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { Position } from '../utils/types';

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
    // Check if we're on the SCIF destination by index (1), not ID
    const isScifDestination = activeDestination === 1;
    
    if (!isAnimating || !isActive || !isScifDestination) {
      return;
    }

    // Animation starting

    const packageElement = document.getElementById('package-icon');
    const cdElement = document.getElementById('cd-icon');

    if (packageElement) {
      packageRef.current = packageElement as HTMLDivElement;
    }
    
    if (cdElement) {
      cdRef.current = cdElement as HTMLDivElement;
    }
    
    // Calculate shield position (60% of the way to destination)
    const shieldPosition = {
      x: centerPosition.x + (destinationPosition.x - centerPosition.x) * 0.6,
      y: centerPosition.y + (destinationPosition.y - centerPosition.y) * 0.6
    };
    
    // Create the animation timeline
    const timeline = gsap.timeline({
      onComplete: () => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    });

    if (packageRef.current && cdRef.current) {
      // Initial setup
      gsap.set(packageRef.current, {
        display: 'block',
        opacity: 0,
        left: `${centerPosition.x}%`,
        top: `${centerPosition.y}%`,
        xPercent: -50,
        yPercent: -50
      });
      
      gsap.set(cdRef.current, {
        display: 'block',
        opacity: 0,
        left: `${shieldPosition.x}%`,
        top: `${shieldPosition.y}%`,
        xPercent: -50,
        yPercent: -50
      });

      // Show package
      timeline.to(packageRef.current, {
        opacity: 1,
        duration: 0.3
      });

      // Animate package to shield
      timeline.to(packageRef.current, {
        left: `${shieldPosition.x}%`,
        top: `${shieldPosition.y}%`,
        duration: 1.2,
        ease: "power2.inOut"
      });

      // Hide package at shield
      timeline.to(packageRef.current, {
        opacity: 0,
        duration: 0.3
      });

      // Show CD at shield
      timeline.to(cdRef.current, {
        opacity: 1,
        duration: 0.3
      });

      // Animate CD to destination
      timeline.to(cdRef.current, {
        left: `${destinationPosition.x}%`,
        top: `${destinationPosition.y}%`,
        duration: 1.2,
        ease: "power2.inOut"
      });

      // Fade out CD at destination
      timeline.to(cdRef.current, {
        opacity: 0,
        duration: 0.3
      });
    }

    return () => {
      timeline.kill();
      
      // Hide elements when component unmounts or animation is stopped
      if (packageRef.current) {
        gsap.set(packageRef.current, { display: 'none', opacity: 0 });
      }
      
      if (cdRef.current) {
        gsap.set(cdRef.current, { display: 'none', opacity: 0 });
      }
    };
  }, [isAnimating, isActive, activeDestination, centerPosition, destinationPosition, onAnimationComplete]);

  return { packageRef, cdRef };
}

export default useScifAnimation; 