/**
 * Utility for controlling the deployment animation sequence
 */

type AnimationState = {
  isAnimating: boolean;
  isPaused: boolean;
  isPackageAnimating: boolean;
  isLogoHighlighted: boolean;
  hasAnimationStarted: boolean;
  isDeploymentCompleted: boolean;
  activeDestination: number | null;
};

type AnimationCallback = (state: Partial<AnimationState>) => void;

// Global variable to track the overall animation state
// This helps prevent animation loops when AnimationController is re-instantiated
let hasResetBeenCalled = false;

export class AnimationController {
  private initialState: AnimationState = {
    isAnimating: false,
    isPaused: false,
    isPackageAnimating: false,
    isLogoHighlighted: false,
    hasAnimationStarted: false,
    isDeploymentCompleted: false,
    activeDestination: null
  };

  private updateCallback: AnimationCallback;
  private timeouts: NodeJS.Timeout[] = [];

  constructor(updateCallback: AnimationCallback) {
    this.updateCallback = updateCallback;
  }

  /**
   * Starts the full animation sequence
   */
  startAnimation(): void {
    this.clearTimeouts();
    
    // Reset to initial state
    this.updateCallback({
      activeDestination: null,
      isAnimating: false,
      isPaused: false,
      isLogoHighlighted: false,
      hasAnimationStarted: true,
      isDeploymentCompleted: false
    });
    
    // First, show the package animation
    this.updateCallback({ isPackageAnimating: true });
    
    // After 2 seconds, highlight the Crystal Tower logo
    this.scheduleTimeout(() => {
      this.updateCallback({ 
        isPackageAnimating: false,
        isLogoHighlighted: true 
      });
      
      // After 560ms, start the first path animation (destination 0 - Government Clouds)
      this.scheduleTimeout(() => {
        this.updateCallback({ 
          activeDestination: 0,
          isAnimating: true 
        });
        
        // After 1600ms, complete path animation and pause
        this.scheduleTimeout(() => {
          this.updateCallback({
            isAnimating: false,
            isPaused: true
          });
          
          // Start sequence for the next destination
          this.animateNextDestination(1);
        }, 1600);
      }, 560);
    }, 2000);
  }

  /**
   * Animate to the next destination in sequence
   */
  private animateNextDestination(destinationIndex: number): void {
    if (destinationIndex >= 4) {
      // All destinations completed
      this.completeAnimation();
      return;
    }

    // Map from destinationIndex to descriptive name for logging
    const destinationName = [
      "Government Clouds", 
      "Classified Networks", 
      "Edge Device", 
      "Bare Metal"
    ][destinationIndex] || "Unknown";

    // After 1200ms pause, move to next destination
    this.scheduleTimeout(() => {
      this.updateCallback({
        isPaused: false,
        activeDestination: destinationIndex
      });
      
      // Wait a bit longer before animating to give time for component to stabilize
      const animationDelay = destinationIndex === 2 ? 800 : 400; // Extra delay for Edge destination
      
      // Start animating to the destination
      this.scheduleTimeout(() => {
        this.updateCallback({ isAnimating: true });
        
        // After 1600ms, complete path animation and pause
        this.scheduleTimeout(() => {
          this.updateCallback({
            isAnimating: false,
            isPaused: true
          });
          
          // Continue to next destination after a longer pause
          const nextDestinationDelay = 1200;
          setTimeout(() => {
            this.animateNextDestination(destinationIndex + 1);
          }, nextDestinationDelay);
        }, 1600);
      }, animationDelay);
    }, 1200);
  }

  /**
   * Complete the animation cycle
   */
  public completeAnimation(): void {
    // After final pause, reset and complete deployment
    this.scheduleTimeout(() => {
      this.updateCallback({
        isPaused: false,
        isLogoHighlighted: false,
        activeDestination: null,
        isDeploymentCompleted: true
      });
    }, 1200);
  }

  /**
   * Schedule a timeout and keep track of it
   */
  private scheduleTimeout(callback: () => void, delay: number): void {
    const timeout = setTimeout(callback, delay);
    this.timeouts.push(timeout);
  }

  /**
   * Clear all pending timeouts
   */
  clearTimeouts(): void {
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  /**
   * Reset animation state
   */
  reset(): void {
    this.clearTimeouts();
    
    // Update our global tracker
    hasResetBeenCalled = true;
    
    // Reset all global animation state variables 
    // This is needed to properly reset any module-level variables in animation components
    // that might be tracking state across component remounts
    if (typeof window !== 'undefined') {
      const resetEvent = new CustomEvent('reset-animation-state');
      window.dispatchEvent(resetEvent);
    }
    
    // Reset back to initial state
    this.updateCallback(this.initialState);
    
    // Delay slightly to ensure animations reset properly
    setTimeout(() => {
      hasResetBeenCalled = false;
    }, 100);
  }
} 