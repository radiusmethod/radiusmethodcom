import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { PathGenerator } from './PathGenerator';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin);

// Define animation types
export type AnimationTarget = 'cloud' | 'kubernetes' | 'scif' | 'airGapped';

// Define position interfaces
export interface Position {
  x: number;
  y: number;
}

// Define air-gapped animation config
export interface AirGappedAnimationConfig {
  padlockPosition: Position;
  path: string;
}

// Define animation callback interface
export interface AnimationCallbacks {
  onStart?: () => void;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
}

export interface AnimationOptions {
  destPosition: Position;
  packageSelector: HTMLElement | null;
  pathId?: string;
  centerPosition?: Position;
  duration?: number;
}

/**
 * Animation Manager - Follows Single Responsibility Principle
 * Each method handles one specific type of animation
 */
export class AnimationManager {
  /**
   * Create a package animation to a cloud destination
   */
  public static createCloudAnimation(
    centerPos: Position,
    destPos: Position,
    elementSelector: string,
    callbacks?: AnimationCallbacks
  ): gsap.core.Timeline {
    // Kill any existing animations of this element
    gsap.killTweensOf(elementSelector);
    
    // Create timeline
    const tl = gsap.timeline({
      onStart: callbacks?.onStart,
      onComplete: callbacks?.onComplete
    });
    
    // Set initial position
    tl.set(elementSelector, {
      left: `${centerPos.x}%`,
      top: `${centerPos.y}%`,
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      scale: 1
    });
    
    // Animate to destination
    tl.to(elementSelector, {
      left: `${destPos.x}%`,
      top: `${destPos.y}%`,
      duration: 1.5,
      ease: "power2.inOut"
    });
    
    // Fade out at destination
    tl.to({}, { duration: 0.3 })
      .to(elementSelector, {
        opacity: 0,
        duration: 0.3
      });
    
    return tl;
  }
  
  /**
   * Create a package-to-CD animation for SCIF destination
   */
  public static createScifAnimation(
    centerPos: Position,
    shieldPos: Position,
    destPos: Position,
    packageSelector: string,
    cdSelector: string,
    callbacks?: AnimationCallbacks
  ): gsap.core.Timeline {
    // Kill any existing animations
    gsap.killTweensOf(packageSelector);
    gsap.killTweensOf(cdSelector);
    
    // Create timeline
    const tl = gsap.timeline({
      onStart: callbacks?.onStart,
      onComplete: callbacks?.onComplete
    });
    
    // 1. Position and show package at center
    tl.set(packageSelector, {
      left: `${centerPos.x}%`,
      top: `${centerPos.y}%`,
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      scale: 1,
      display: 'block'
    });
    
    // Hide CD initially
    tl.set(cdSelector, {
      opacity: 0,
      display: 'none'
    });
    
    // 2. Move package to shield
    tl.to(packageSelector, {
      left: `${shieldPos.x}%`,
      top: `${shieldPos.y}%`,
      duration: 1.2,
      ease: "power2.inOut",
      onComplete: () => {
        console.log("Package reached shield");
      }
    });
    
    // 3. Transform at shield (hide package, show CD)
    tl.call(() => {
      // Hide package
      gsap.set(packageSelector, {
        opacity: 0,
        display: 'none'
      });
      
      // Show CD at exact shield position
      gsap.set(cdSelector, {
        left: `${shieldPos.x}%`,
        top: `${shieldPos.y}%`,
        xPercent: -50,
        yPercent: -50,
        opacity: 1,
        scale: 1,
        display: 'block'
      });
    });
    
    // Small pause to make transformation visible
    tl.to({}, { duration: 0.2 });
    
    // 4. Move CD to destination
    tl.to(cdSelector, {
      left: `${destPos.x}%`,
      top: `${destPos.y}%`,
      duration: 1.2,
      ease: "power2.inOut"
    });
    
    // 5. Fade out CD at destination
    tl.to({}, { duration: 0.3 })
      .to(cdSelector, {
        opacity: 0,
        duration: 0.3
      });
    
    return tl;
  }
  
  /**
   * Create a generic destination animation (Edge, Bare Metal)
   */
  public static createGenericAnimation(
    centerPos: Position,
    destPos: Position,
    elementSelector: string,
    pathSelector: string,
    callbacks?: AnimationCallbacks
  ): gsap.core.Timeline {
    // Kill any existing animations
    gsap.killTweensOf(elementSelector);
    
    // Create timeline
    const tl = gsap.timeline({
      onStart: callbacks?.onStart,
      onComplete: callbacks?.onComplete
    });
    
    // Highlight path
    tl.set(pathSelector, {
      stroke: "rgba(255, 255, 255, 0.3)",
      strokeWidth: 2
    });
    
    // Position package at center
    tl.set(elementSelector, {
      left: `${centerPos.x}%`,
      top: `${centerPos.y}%`,
      xPercent: -50,
      yPercent: -50,
      opacity: 1,
      scale: 1
    });
    
    // Highlight path
    tl.to(pathSelector, {
      stroke: "#FFB81C",
      strokeWidth: 2.5,
      duration: 0.5,
      ease: "power1.inOut"
    });
    
    // Move package to destination
    tl.to(elementSelector, {
      left: `${destPos.x}%`,
      top: `${destPos.y}%`,
      duration: 1.5,
      ease: "power2.inOut"
    });
    
    // Fade out at destination
    tl.to({}, { duration: 0.3 })
      .to(elementSelector, {
        opacity: 0,
        duration: 0.3
      });
    
    return tl;
  }
}

/**
 * Creates an animation timeline for a specific destination
 */
export function createDestinationAnimation(
  target: AnimationTarget,
  options: AnimationOptions,
  callbacks?: AnimationCallbacks
): gsap.core.Timeline {
  const { 
    destPosition, 
    packageSelector, 
    pathId, 
    centerPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 }, 
    duration = 2 
  } = options;
  
  const timeline = gsap.timeline({
    paused: true,
    onStart: callbacks?.onStart,
    onComplete: callbacks?.onComplete,
    onUpdate: () => {
      if (callbacks?.onUpdate) {
        callbacks.onUpdate(timeline.progress());
      }
    }
  });

  if (!packageSelector) {
    console.error('Package element not found');
    return timeline;
  }

  // Common animation setup
  timeline.set(packageSelector, {
    opacity: 0,
    x: centerPosition.x,
    y: centerPosition.y,
    scale: 1
  });

  // Show the package
  timeline.to(packageSelector, {
    opacity: 1,
    duration: 0.3
  });

  // Animation varies by destination type
  switch (target) {
    case 'cloud':
      // Cloud-specific animation
      timeline.to(packageSelector, {
        x: destPosition.x,
        y: destPosition.y,
        duration: duration,
        ease: "power1.inOut"
      });
      break;
      
    case 'kubernetes':
      // Kubernetes-specific animation
      timeline.to(packageSelector, {
        x: destPosition.x,
        y: destPosition.y,
        duration: duration,
        ease: "power2.inOut"
      });
      break;
      
    case 'scif':
    case 'airGapped':
      // Air-gapped animation with lock 
      // Calculate padlock position - this is a simplified version
      const padlockPos = PathGenerator.calculatePadlockPosition(
        destPosition,
        centerPosition.x,
        centerPosition.y
      );
      
      // First move to the padlock
      timeline.to(packageSelector, {
        x: padlockPos.x,
        y: padlockPos.y,
        duration: duration * 0.6,
        ease: "power1.inOut"
      });
      
      // Pause at the padlock
      timeline.to(packageSelector, {
        scale: 0.8,
        rotation: 180,
        duration: 0.4
      });
      
      // Transform and continue to destination
      timeline.to(packageSelector, {
        scale: 1,
        duration: 0.2
      });
      
      // Move to final destination
      timeline.to(packageSelector, {
        x: destPosition.x,
        y: destPosition.y,
        duration: duration * 0.4,
        ease: "power1.inOut"
      });
      break;
      
    default:
      // Default animation
      timeline.to(packageSelector, {
        x: destPosition.x,
        y: destPosition.y,
        duration: duration,
        ease: "power1.inOut"
      });
  }

  // Fade out at the end
  timeline.to(packageSelector, {
    opacity: 0,
    duration: 0.3
  });

  return timeline;
}

export function setupAirGappedAnimation(
  destPosition: Position, 
  centerPosition: Position, 
  animationRef: React.RefObject<SVGPathElement>, 
  animationDuration: number
): AirGappedAnimationConfig {

  // Calculate the padlock position
  const padlockPosition = PathGenerator.calculatePadlockPosition(
    destPosition, 
    centerPosition.x, 
    centerPosition.y
  );

  // Generate air-gapped path
  const path = PathGenerator.generateAirGappedPath(
    destPosition, 
    centerPosition.x, 
    centerPosition.y
  );

  return {
    padlockPosition,
    path
  };
} 