import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Position } from '../utils/AnimationUtils';

interface UseScifAnimationProps {
  isAnimating: boolean;
  isActive: boolean;
  activeDestination: number | null;
  centerPosition: Position;
  destinationPosition: Position;
  onAnimationComplete?: () => void;
}

export const useScifAnimation = ({
  isAnimating,
  isActive,
  activeDestination,
  centerPosition,
  destinationPosition,
  onAnimationComplete
}: UseScifAnimationProps) => {
  const packageRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Run SCIF animation effect
  useEffect(() => {
    // Skip if not active or not animating
    if (!isActive || !isAnimating || activeDestination !== 2) {
      return;
    }

    console.log("SCIF animation starting");

    // Clean up any existing animation
    if (timelineRef.current) {
      timelineRef.current.kill();
      timelineRef.current = null;
    }

    // Clear any existing animations first
    gsap.killTweensOf('#package-icon');
    gsap.killTweensOf('#cd-icon');

    // Calculate positions in pixels for more predictable positioning
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Get absolute positions for SVG elements
    const svgElement = document.querySelector('.connectionSvg');
    const svgRect = svgElement?.getBoundingClientRect();
    
    if (!svgRect) {
      console.error("Could not find SVG element");
      return;
    }
    
    // Calculate shield position (halfway point)
    const shieldPosition = {
      x: svgRect.left + (svgRect.width * destinationPosition.x / 100),
      y: svgRect.top + (svgRect.height * destinationPosition.y / 100)
    };
    
    // Calculate shield midpoint
    const shieldMidpoint = {
      x: centerX + (shieldPosition.x - centerX) * 0.6,
      y: centerY + (shieldPosition.y - centerY) * 0.6
    };
    
    console.log("Animation positions:", { centerX, centerY, shieldMidpoint, destination: shieldPosition });
    
    // Create a master timeline
    const masterTimeline = gsap.timeline();
    
    // 1. Initial setup - ensure elements exist and set initial state
    masterTimeline.set('#package-icon', { 
      autoAlpha: 0,  // Start hidden
      scale: 1,
      x: centerX, 
      y: centerY
    });
    
    masterTimeline.set('#cd-icon', { 
      autoAlpha: 0,  // Start hidden
      scale: 1,
      x: shieldMidpoint.x,
      y: shieldMidpoint.y
    });
    
    // 2. Show and animate package from center to shield
    masterTimeline.to('#package-icon', { 
      autoAlpha: 1,   // Fade in
      duration: 0.3   // Quick fade in
    });
    
    // Simple linear animation from center to shield midpoint
    masterTimeline.to('#package-icon', {
      duration: 1.5,
      x: shieldMidpoint.x,
      y: shieldMidpoint.y,
      ease: "power1.inOut",
      onComplete: () => {
        console.log('Package reached shield'); // Debug
      }
    });
    
    // 3. Hide package at shield
    masterTimeline.to('#package-icon', {
      autoAlpha: 0,
      duration: 0.3
    });
    
    // 4. Show CD at shield position
    masterTimeline.to('#cd-icon', {
      autoAlpha: 1,
      duration: 0.3
    });
    
    // 5. Animate CD from shield to destination
    masterTimeline.to('#cd-icon', {
      duration: 1.5,
      x: shieldPosition.x,
      y: shieldPosition.y,
      ease: "power1.inOut",
      onComplete: () => {
        console.log('CD reached destination'); // Debug
      }
    });
    
    // 6. Fade out CD at destination
    masterTimeline.to('#cd-icon', {
      autoAlpha: 0,
      duration: 0.3,
      onComplete: () => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }
    });
    
    // Play the animation
    masterTimeline.play();
    
    // Store reference for cleanup
    timelineRef.current = masterTimeline;
    
    // Clean up function
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      gsap.set('#package-icon', { autoAlpha: 0 });
      gsap.set('#cd-icon', { autoAlpha: 0 });
    };
  }, [
    isAnimating,
    isActive,
    activeDestination,
    centerPosition,
    destinationPosition,
    onAnimationComplete
  ]);

  return {
    packageRef,
    cdRef
  };
};

export default useScifAnimation; 