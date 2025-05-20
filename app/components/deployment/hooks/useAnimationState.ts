import { useState, useCallback, useRef } from 'react';
import { AnimationController } from '../utils/AnimationController';
import { Destination } from '../components/DestinationMap';

export interface AnimationState {
  activeDestination: number | null;
  isAnimating: boolean;
  isPaused: boolean;
  isPackageAnimating: boolean;
  isLogoHighlighted: boolean;
  hasAnimationStarted: boolean;
  isDeploymentCompleted: boolean;
}

export interface AnimationControls {
  startAnimation: () => void;
  pauseAnimation: () => void;
  resumeAnimation: () => void;
  resetAnimation: () => void;
  completeAnimation: () => void;
}

interface UseAnimationStateProps {
  destinations: Destination[];
  onAnimationStart?: () => void;
  onAnimationComplete?: () => void;
  onDestinationChange?: (destination: number | null) => void;
}

export const useAnimationState = ({
  destinations,
  onAnimationStart,
  onAnimationComplete,
  onDestinationChange
}: UseAnimationStateProps): [AnimationState, AnimationControls] => {
  // Animation states
  const [activeDestination, setActiveDestination] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPackageAnimating, setIsPackageAnimating] = useState(false);
  const [isLogoHighlighted, setIsLogoHighlighted] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);
  const [isDeploymentCompleted, setIsDeploymentCompleted] = useState(false);
  
  // Controller reference
  const animationControllerRef = useRef<AnimationController | null>(null);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Initialize controller if not already initialized
  if (!animationControllerRef.current) {
    animationControllerRef.current = new AnimationController((state) => {
      if (state.activeDestination !== undefined) {
        setActiveDestination(state.activeDestination);
        if (onDestinationChange && state.activeDestination !== activeDestination) {
          onDestinationChange(state.activeDestination);
        }
      }
      if (state.isAnimating !== undefined) setIsAnimating(state.isAnimating);
      if (state.isPaused !== undefined) setIsPaused(state.isPaused);
      if (state.isPackageAnimating !== undefined) setIsPackageAnimating(state.isPackageAnimating);
      if (state.isLogoHighlighted !== undefined) setIsLogoHighlighted(state.isLogoHighlighted);
      if (state.hasAnimationStarted !== undefined) setHasAnimationStarted(state.hasAnimationStarted);
      if (state.isDeploymentCompleted !== undefined) setIsDeploymentCompleted(state.isDeploymentCompleted);
    });
  }

  const startAnimation = useCallback(() => {
    if (animationControllerRef.current) {
      animationControllerRef.current.startAnimation();
      if (onAnimationStart) {
        onAnimationStart();
      }
    }
  }, [onAnimationStart]);

  const pauseAnimation = useCallback(() => {
    if (animationControllerRef.current) {
      // Manually setting isPaused since controller might not have this method
      setIsPaused(true);
      setIsAnimating(false);
    }
  }, []);

  const resumeAnimation = useCallback(() => {
    if (animationControllerRef.current) {
      // Manually resuming animation states
      setIsPaused(false);
      setIsAnimating(true);
    }
  }, []);

  const resetAnimation = useCallback(() => {
    if (animationControllerRef.current) {
      // Clear any pending timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      
      // Reset all states
      setActiveDestination(null);
      setIsAnimating(false);
      setIsPaused(false);
      setIsPackageAnimating(false);
      setIsLogoHighlighted(false);
      setHasAnimationStarted(false);
      setIsDeploymentCompleted(false);
      
      // Reset the controller without directly calling resetAnimation
      // This is a workaround if the controller doesn't have this method
      animationControllerRef.current = new AnimationController((state) => {
        if (state.activeDestination !== undefined) {
          setActiveDestination(state.activeDestination);
        }
        if (state.isAnimating !== undefined) setIsAnimating(state.isAnimating);
        if (state.isPaused !== undefined) setIsPaused(state.isPaused);
        if (state.isPackageAnimating !== undefined) setIsPackageAnimating(state.isPackageAnimating);
        if (state.isLogoHighlighted !== undefined) setIsLogoHighlighted(state.isLogoHighlighted);
        if (state.hasAnimationStarted !== undefined) setHasAnimationStarted(state.hasAnimationStarted);
        if (state.isDeploymentCompleted !== undefined) setIsDeploymentCompleted(state.isDeploymentCompleted);
      });
    }
  }, []);

  const completeAnimation = useCallback(() => {
    if (animationControllerRef.current) {
      // Clear any pending timeouts
      timeoutsRef.current.forEach(clearTimeout);
      timeoutsRef.current = [];
      
      // Set final states
      setIsDeploymentCompleted(true);
      setIsAnimating(false);
      
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  }, [onAnimationComplete]);

  const state: AnimationState = {
    activeDestination,
    isAnimating,
    isPaused,
    isPackageAnimating,
    isLogoHighlighted,
    hasAnimationStarted,
    isDeploymentCompleted
  };

  const controls: AnimationControls = {
    startAnimation,
    pauseAnimation,
    resumeAnimation,
    resetAnimation,
    completeAnimation
  };

  return [state, controls];
};

export default useAnimationState; 