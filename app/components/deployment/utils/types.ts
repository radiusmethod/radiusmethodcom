/**
 * Common type definitions for deployment animations
 */

// Define position interface
export interface Position {
  x: number;
  y: number;
}

// Define animation types
export type AnimationTarget = 'cloud' | 'kubernetes' | 'scif' | 'airGapped';

// Define animation callback interface
export interface AnimationCallbacks {
  onStart?: () => void;
  onComplete?: () => void;
  onUpdate?: (progress: number) => void;
  onTransform?: () => void;
} 