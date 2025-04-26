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
    console.log("Starting the animation");
    this.clearTimeouts();
    
    // Reset to initial state
    this.updateCallback({
      activeDestination: 0,
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
      console.log("Package reached Crystal Tower");
      
      // After 560ms, start the first path animation (destination 0)
      this.scheduleTimeout(() => {
        this.updateCallback({ isAnimating: true });
        console.log("Path animation started to destination 0");
        
        // After 1600ms, complete path animation and pause
        this.scheduleTimeout(() => {
          this.updateCallback({
            isAnimating: false,
            isPaused: true
          });
          console.log("Path animation completed, paused at destination 0");
          
          // Start sequence for each destination
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

    // After 1200ms pause, move to next destination
    this.scheduleTimeout(() => {
      this.updateCallback({
        isPaused: false,
        activeDestination: destinationIndex
      });
      console.log(`Moving to destination ${destinationIndex}`);
      
      // Start animating to the destination after 400ms
      this.scheduleTimeout(() => {
        this.updateCallback({ isAnimating: true });
        console.log(`Animating to destination ${destinationIndex}`);
        
        // After 1600ms, complete path animation and pause
        this.scheduleTimeout(() => {
          this.updateCallback({
            isAnimating: false,
            isPaused: true
          });
          console.log(`Path animation to destination ${destinationIndex} completed`);
          
          // Continue to next destination
          this.animateNextDestination(destinationIndex + 1);
        }, 1600);
      }, 400);
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
      console.log("Animation cycle completed, deployment successful");
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
    this.updateCallback(this.initialState);
  }
} 