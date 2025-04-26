/**
 * Utility for generating SVG paths for deployment destination animations
 */

interface Position {
  x: number;
  y: number;
}

interface Destination {
  id: number;
  name: string;
  description: string;
  position: Position;
}

export class PathGenerator {
  /**
   * Generates a curved path from center to destination
   */
  static generateCurvePath(destination: Position, centerX = 50, centerY = 50): string {
    const { x: destX, y: destY } = destination;
    const ctrlX1 = centerX + (destX - centerX) * 0.3;
    const ctrlY1 = centerY + (destY - centerY) * 0.3;
    const ctrlX2 = centerX + (destX - centerX) * 0.7;
    const ctrlY2 = centerY + (destY - centerY) * 0.7;
    return `M ${centerX} ${centerY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${destX} ${destY}`;
  }

  /**
   * Generates a lightning path for cloud destinations
   */
  static generateLightningPath(destination: Position, centerX = 50, centerY = 50): string {
    const { x: destX, y: destY } = destination;
    
    // Calculate the vector from center to destination
    const vecX = destX - centerX;
    const vecY = destY - centerY;
    
    // Calculate midpoints with controlled randomness (contained within path bounds)
    // Use the vectors to constrain randomness to be in the direction of travel
    const xDir = Math.sign(vecX);
    const yDir = Math.sign(vecY);
    
    // First midpoint: 30% along path with small controlled randomness
    const midX1 = centerX + (vecX * 0.3) + (xDir * Math.random() * 1.5);
    const midY1 = centerY + (vecY * 0.3) + (yDir * Math.random() * 1.5);
    
    // Second midpoint: 60% along path with small controlled randomness
    const midX2 = centerX + (vecX * 0.6) + (xDir * Math.random() * 1.5);
    const midY2 = centerY + (vecY * 0.6) + (yDir * Math.random() * 1.5);
    
    // Create zigzag path - always start exactly from center
    return `M ${centerX} ${centerY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${destX} ${destY}`;
  }

  /**
   * Generate a path for air-gapped destinations
   */
  static generateAirGappedPath(destination: Position, centerX = 50, centerY = 50): string {
    const { x: destX, y: destY } = destination;
    
    // Calculate position for the padlock (halfway down the path)
    const lockX = centerX + (destX - centerX) * 0.5;
    const lockY = centerY + (destY - centerY) * 0.5;
    
    // Use Bezier curve for smoother path
    const ctrlX1 = centerX + (lockX - centerX) * 0.5;
    const ctrlY1 = centerY + (lockY - centerY) * 0.5;
    
    // Create path to the padlock
    return `M ${centerX} ${centerY} Q ${ctrlX1} ${ctrlY1}, ${lockX} ${lockY}`;
  }

  /**
   * Generate path from padlock to destination
   */
  static generatePostAirGapPath(destination: Position, lockPosition: Position): string {
    const { x: destX, y: destY } = destination;
    const { x: lockX, y: lockY } = lockPosition;
    
    // Use Bezier curve for smoother path
    const ctrlX = lockX + (destX - lockX) * 0.5;
    const ctrlY = lockY + (destY - lockY) * 0.5;
    
    // Create path from padlock to destination
    return `M ${lockX} ${lockY} Q ${ctrlX} ${ctrlY}, ${destX} ${destY}`;
  }

  /**
   * Calculates the position of the padlock for air-gapped animations
   */
  static calculatePadlockPosition(
    destination: Position,
    centerX: number,
    centerY: number
  ): Position {
    // Position the padlock at 60% of the way to the destination
    const padlockRatio = 0.6;
    
    const dx = destination.x - centerX;
    const dy = destination.y - centerY;
    
    return {
      x: centerX + dx * padlockRatio,
      y: centerY + dy * padlockRatio
    };
  }
  
  /**
   * Calculate the package position along the air-gapped path
   * This is used for animating the package to the padlock
   */
  static calculatePackagePosition(destination: Position, progress: number, centerX = 50, centerY = 50): Position {
    const lockPosition = this.calculatePadlockPosition(destination, centerX, centerY);
    
    if (progress <= 0.5) {
      // Before the padlock, scale progress to 0-1 range for the first segment
      const scaledProgress = progress / 0.5;
      const { x: lockX, y: lockY } = lockPosition;
      
      // Linear interpolation between center and padlock
      return {
        x: centerX + (lockX - centerX) * scaledProgress,
        y: centerY + (lockY - centerY) * scaledProgress
      };
    } else {
      // After the padlock, scale progress to 0-1 range for the second segment
      const scaledProgress = (progress - 0.5) / 0.5;
      const { x: lockX, y: lockY } = lockPosition;
      const { x: destX, y: destY } = destination;
      
      // Linear interpolation between padlock and destination
      return {
        x: lockX + (destX - lockX) * scaledProgress,
        y: lockY + (destY - lockY) * scaledProgress
      };
    }
  }
} 