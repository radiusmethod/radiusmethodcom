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
    
    // Calculate midpoints with some randomness
    const midX1 = centerX + (destX - centerX) * 0.3 + (Math.random() * 4 - 2);
    const midY1 = centerY + (destY - centerY) * 0.3 + (Math.random() * 4 - 2);
    
    const midX2 = centerX + (destX - centerX) * 0.6 + (Math.random() * 4 - 2);
    const midY2 = centerY + (destY - centerY) * 0.6 + (Math.random() * 4 - 2);
    
    // Create zigzag path
    return `M ${centerX} ${centerY} L ${midX1} ${midY1} L ${midX2} ${midY2} L ${destX} ${destY}`;
  }

  /**
   * Generate a path for air-gapped destinations
   */
  static generateAirGappedPath(destination: Position, centerX = 50, centerY = 50): string {
    const { x: destX, y: destY } = destination;
    
    // Calculate position for the padlock (approximately 60% of the way)
    const lockX = centerX + (destX - centerX) * 0.6;
    const lockY = centerY + (destY - centerY) * 0.6;
    
    // Calculate control points for the curve
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
    
    // Calculate control points for the curve
    const ctrlX = lockX + (destX - lockX) * 0.5;
    const ctrlY = lockY + (destY - lockY) * 0.5;
    
    // Create path from padlock to destination
    return `M ${lockX} ${lockY} Q ${ctrlX} ${ctrlY}, ${destX} ${destY}`;
  }

  /**
   * Calculate the padlock position for air-gapped paths
   */
  static calculatePadlockPosition(destination: Position, centerX = 50, centerY = 50): Position {
    const { x: destX, y: destY } = destination;
    
    // Padlock positioned approximately 60% of the way to destination
    const lockX = centerX + (destX - centerX) * 0.6;
    const lockY = centerY + (destY - centerY) * 0.6;
    
    return { x: lockX, y: lockY };
  }
} 