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
    console.log("Starting the animation sequence");
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
      console.log("Package reached Crystal Tower");
      
      // After 560ms, start the first path animation (destination 0 - Government Clouds)
      this.scheduleTimeout(() => {
        console.log("Setting active destination to 0 (Government Clouds)");
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
          console.log("Path animation completed, paused at destination 0");
          
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
      console.log("All destinations completed - now animation cycle is complete");
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
      console.log(`Moving to destination ${destinationIndex} (${destinationName})`);
      this.updateCallback({
        isPaused: false,
        activeDestination: destinationIndex
      });
      
      // Start animating to the destination after 400ms
      this.scheduleTimeout(() => {
        console.log(`Animating to destination ${destinationIndex} (${destinationName})`);
        this.updateCallback({ isAnimating: true });
        
        // After 1600ms, complete path animation and pause
        this.scheduleTimeout(() => {
          console.log(`Path animation to destination ${destinationIndex} (${destinationName}) completed`);
          this.updateCallback({
            isAnimating: false,
            isPaused: true
          });
          
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
      console.log("Animation cycle completed, deployment successful");
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
    console.log(`Clearing ${this.timeouts.length} pending timeouts`);
    this.timeouts.forEach(clearTimeout);
    this.timeouts = [];
  }

  /**
   * Reset animation state
   */
  reset(): void {
    console.log("Resetting animation controller");
    this.clearTimeouts();
    this.updateCallback(this.initialState);
  }
} 