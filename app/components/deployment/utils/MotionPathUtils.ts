/**
 * Utility for animation paths and motion
 */

export interface MotionPathOptions {
  duration?: number;
  easing?: string;
  loop?: boolean;
  autoplay?: boolean;
  onComplete?: () => void;
  onStart?: () => void;
  onUpdate?: (progress: number) => void;
}

export interface Position {
  x: number;
  y: number;
}

// Simple easing functions
const Easing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => t * (2 - t),
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeOutElastic: (t: number) => {
    const p = 0.3;
    return Math.pow(2, -10 * t) * Math.sin((t - p / 4) * (2 * Math.PI) / p) + 1;
  }
};

interface AnimationInstance {
  play: () => void;
  pause: () => void;
  cancel: () => void;
}

/**
 * Creates a point-to-point animation using requestAnimationFrame
 * @param element The element to animate
 * @param startPoint Starting position
 * @param endPoint Ending position
 * @param options Animation options
 * @returns The animation instance
 */
export function createPointToPointAnimation(
  element: HTMLElement | null, 
  startPoint: Position,
  endPoint: Position, 
  options: MotionPathOptions = {}
): AnimationInstance | null {
  if (!element) {
    console.error('Animation failed: element not available');
    return null;
  }
  
  // Default options
  const duration = options.duration || 800;
  const easingName = options.easing || 'easeOutQuad';
  const easingFn = Easing[easingName as keyof typeof Easing] || Easing.easeOutQuad;
  
  // Make element visible at starting position
  element.style.opacity = '1';
  element.style.left = `${startPoint.x}%`;
  element.style.top = `${startPoint.y}%`;
  element.style.transform = 'translate(-50%, -50%)';
  
  // Animation state
  let startTime: number | null = null;
  let animationId: number | null = null;
  let isPlaying = false;
  
  // Animation function
  const animate = (timestamp: number) => {
    if (!startTime) startTime = timestamp;
    
    const elapsed = timestamp - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easingFn(progress);
    
    // Calculate new position
    const newX = startPoint.x + (endPoint.x - startPoint.x) * eased;
    const newY = startPoint.y + (endPoint.y - startPoint.y) * eased;
    
    // Update element position
    element.style.left = `${newX}%`;
    element.style.top = `${newY}%`;
    
    // Call update callback
    if (options.onUpdate) {
      options.onUpdate(progress);
    }
    
    // Continue animation if not complete
    if (progress < 1 && isPlaying) {
      animationId = requestAnimationFrame(animate);
    } else if (progress >= 1) {
      // Animation complete
      isPlaying = false;
      if (options.onComplete) {
        options.onComplete();
      }
    }
  };
  
  // Animation control methods
  const play = () => {
    if (!isPlaying) {
      isPlaying = true;
      startTime = null; // Reset start time
      if (options.onStart) {
        options.onStart();
      }
      animationId = requestAnimationFrame(animate);
    }
  };
  
  const pause = () => {
    isPlaying = false;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  };
  
  const cancel = () => {
    pause();
    // Reset to start position
    element.style.left = `${startPoint.x}%`;
    element.style.top = `${startPoint.y}%`;
  };
  
  // Create animation instance
  const instance: AnimationInstance = {
    play,
    pause,
    cancel
  };
  
  // Auto-play if specified
  if (options.autoplay !== false) {
    play();
  }
  
  return instance;
}

/**
 * Create an animation with a pause/transform in the middle (for SCIF animations)
 */
export function createTransformAnimation(
  packageElement: HTMLElement | null,
  cdElement: HTMLElement | null,
  startPoint: Position,
  midPoint: Position,
  endPoint: Position,
  options: MotionPathOptions = {}
) {
  if (!packageElement || !cdElement) {
    console.error('Transform animation failed: elements not available');
    return null;
  }
  
  // Duration for each segment
  const segmentDuration = (options.duration || 1600) / 2;
  
  // Timeline to manage sequence
  const timeline = {
    firstAnimation: null as AnimationInstance | null,
    secondAnimation: null as AnimationInstance | null,
    onTransformCallback: null as (() => void) | null,
    onCompleteCallback: null as (() => void) | null,
    
    start: function() {
      console.log('Starting transform animation sequence');
      
      // Hide CD element initially
      cdElement.style.opacity = '0';
      
      // First animation (package to midpoint)
      this.firstAnimation = createPointToPointAnimation(
        packageElement,
        startPoint,
        midPoint,
        {
          duration: segmentDuration,
          easing: 'easeOutQuad',
          onComplete: () => {
            console.log('First animation complete, transforming at midpoint');
            
            // Hide package element
            packageElement.style.opacity = '0';
            
            // Show CD element at midpoint
            cdElement.style.opacity = '1';
            cdElement.style.left = `${midPoint.x}%`;
            cdElement.style.top = `${midPoint.y}%`;
            cdElement.style.transform = 'translate(-50%, -50%)';
            
            // Call transform callback if provided
            if (this.onTransformCallback) {
              this.onTransformCallback();
            }
            
            // Add small delay before starting second animation
            setTimeout(() => {
              // Start second animation (CD to endpoint)
              this.secondAnimation = createPointToPointAnimation(
                cdElement,
                midPoint,
                endPoint,
                {
                  duration: segmentDuration,
                  easing: 'easeInQuad',
                  onComplete: () => {
                    console.log('Second animation complete');
                    
                    // Hide CD at the end
                    cdElement.style.opacity = '0';
                    
                    // Call complete callback if provided
                    if (this.onCompleteCallback) {
                      this.onCompleteCallback();
                    }
                  }
                }
              );
            }, 200); // 200ms delay for visibility
          }
        }
      );
      
      return this;
    },
    
    onTransform: function(callback: () => void) {
      this.onTransformCallback = callback;
      return this;
    },
    
    onComplete: function(callback: () => void) {
      this.onCompleteCallback = callback;
      return this;
    }
  };
  
  return timeline;
}

/**
 * Utility to create SVG path element programmatically
 * Used for rendering visual paths in the SVG container
 */
export function createSvgPath(
  startPoint: { x: number, y: number }, 
  endPoint: { x: number, y: number }, 
  curvature: number = 10
): string {
  // Simple curved path with some curvature
  const midX = (startPoint.x + endPoint.x) / 2;
  const midY = (startPoint.y + endPoint.y) / 2 - curvature;
  
  return `M${startPoint.x},${startPoint.y} Q${midX},${midY} ${endPoint.x},${endPoint.y}`;
} 