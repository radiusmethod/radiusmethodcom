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
  onTransform?: () => void;
}

export interface AnimationOptions {
  destPosition: Position;
  packageSelector: HTMLElement | null;
  cdSelector?: HTMLElement | null;
  pathId?: string;
  centerPosition?: Position;
  duration?: number;
  shieldPosition?: Position;
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
 * Creates a Secure Compartmented Information Facility (SCIF) animation
 * Animates a package transforming into a CD at a security checkpoint
 */
export function createScifAnimation(options: AnimationOptions, callbacks?: AnimationCallbacks): gsap.core.Timeline {
  const { 
    packageSelector, 
    cdSelector, 
    destPosition, 
    shieldPosition,
    centerPosition = { x: 50, y: 50 }, 
    duration = 0.8 // Faster animation
  } = options;
  
  // Create timeline
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

  if (!packageSelector || !cdSelector) {
    console.error('Package or CD element not found for SCIF animation');
    return timeline;
  }
  
  if (!shieldPosition) {
    console.error('Shield position not provided for SCIF animation');
    return timeline;
  }

  // Animate package to shield
  timeline.to(packageSelector, {
    x: 0,
    y: 0,
    left: `${shieldPosition.x}%`,
    top: `${shieldPosition.y}%`,
    duration: duration * 0.4,
    ease: "power2.out"
  });
  
  // Transform at shield (hide package, show CD)
  timeline.to(packageSelector, {
    opacity: 0,
    duration: 0.2
  }).call(() => {
    if (callbacks?.onTransform) {
      callbacks.onTransform();
    }
  });
  
  // Show CD
  timeline.to(cdSelector, {
    opacity: 1,
    duration: 0.2
  });
  
  // Animate CD to destination
  timeline.to(cdSelector, {
    x: 0,
    y: 0,
    left: `${destPosition.x}%`,
    top: `${destPosition.y}%`,
    duration: duration * 0.4,
    ease: "power2.in"
  });
  
  // Fade out CD at destination
  timeline.to(cdSelector, {
    opacity: 0,
    duration: 0.3
  });
  
  return timeline;
}

/**
 * Creates an Air-Gapped animation with security checkpoint
 */
export function createAirGappedAnimation(options: AnimationOptions, callbacks?: AnimationCallbacks): gsap.core.Timeline {
  const { 
    packageSelector, 
    destPosition, 
    centerPosition = { x: 50, y: 50 }, 
    duration = 0.8 // Faster animation
  } = options;
  
  // Create timeline
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
    console.error('Package element not found for Air-Gapped animation');
    return timeline;
  }

  // Calculate padlock position
  const padlockPos = PathGenerator.calculatePadlockPosition(
    destPosition,
    centerPosition.x,
    centerPosition.y
  );
  
  // Move to padlock
  timeline.to(packageSelector, {
    x: 0,
    y: 0,
    left: `${padlockPos.x}%`,
    top: `${padlockPos.y}%`,
    duration: duration * 0.5,
    ease: "power2.out"
  });
  
  // Transform at padlock
  timeline.to(packageSelector, {
    scale: 0.8,
    rotation: 180,
    duration: 0.3
  }).call(() => {
    if (callbacks?.onTransform) {
      callbacks.onTransform();
    }
  });
  
  // Return to normal
  timeline.to(packageSelector, {
    scale: 1,
    duration: 0.2
  });
  
  // Move to destination
  timeline.to(packageSelector, {
    x: 0,
    y: 0,
    left: `${destPosition.x}%`,
    top: `${destPosition.y}%`,
    duration: duration * 0.5,
    ease: "power2.in"
  });
  
  // Fade out
  timeline.to(packageSelector, {
    opacity: 0,
    duration: 0.3
  });
  
  return timeline;
}

/**
 * Creates a Cloud animation
 */
export function createCloudAnimation(options: AnimationOptions, callbacks?: AnimationCallbacks): gsap.core.Timeline {
  const { 
    packageSelector, 
    destPosition, 
    centerPosition = { x: 50, y: 50 }, 
    duration = 0.8 // Faster animation
  } = options;
  
  // Create timeline
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
    console.error('Package element not found for Cloud animation');
    return timeline;
  }

  // Move to destination with a slight bounce
  timeline.to(packageSelector, {
    x: 0,
    y: 0,
    left: `${destPosition.x}%`,
    top: `${destPosition.y}%`,
    duration: duration,
    ease: "power2.out"
  });
  
  // Fade out
  timeline.to(packageSelector, {
    opacity: 0,
    duration: 0.3
  });
  
  return timeline;
}

/**
 * Creates a Kubernetes animation
 */
export function createKubernetesAnimation(options: AnimationOptions, callbacks?: AnimationCallbacks): gsap.core.Timeline {
  const { 
    packageSelector, 
    destPosition, 
    centerPosition = { x: 50, y: 50 }, 
    duration = 0.8 // Faster animation
  } = options;
  
  // Create timeline
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
    console.error('Package element not found for Kubernetes animation');
    return timeline;
  }

  // Move to destination with a special easing
  timeline.to(packageSelector, {
    x: 0,
    y: 0,
    left: `${destPosition.x}%`,
    top: `${destPosition.y}%`,
    duration: duration,
    ease: "back.out(1.2)" // Special easing with slight overshoot
  });
  
  // Fade out
  timeline.to(packageSelector, {
    opacity: 0,
    duration: 0.3
  });
  
  return timeline;
}

/**
 * Creates an animation timeline for a specific destination
 */
export function createDestinationAnimation(
  target: AnimationTarget,
  options: AnimationOptions,
  callbacks?: AnimationCallbacks
): gsap.core.Timeline {
  // Use dedicated functions for each animation type
  if (target === 'scif') {
    return createScifAnimation(options, callbacks);
  }
  
  if (target === 'airGapped') {
    return createAirGappedAnimation(options, callbacks);
  }
  
  if (target === 'cloud') {
    return createCloudAnimation(options, callbacks);
  }
  
  if (target === 'kubernetes') {
    return createKubernetesAnimation(options, callbacks);
  }
  
  // Default animation as fallback
  const { 
    destPosition, 
    packageSelector, 
    centerPosition = { x: 50, y: 50 }, 
    duration = 0.8 // Faster animation
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

  // Default animation
  timeline.to(packageSelector, {
    x: 0,
    y: 0,
    left: `${destPosition.x}%`,
    top: `${destPosition.y}%`,
    duration: duration,
    ease: "power1.inOut"
  });

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