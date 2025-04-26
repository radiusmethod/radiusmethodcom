import React from 'react';
import { FaShieldAlt } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';
import { PathGenerator } from '../utils/PathGenerator';
import CloudDestination from '../destinations/CloudDestination';
import ScifDestination from '../destinations/ScifDestination';
import EdgeDeviceDestination from '../destinations/EdgeDeviceDestination';
import BareMetalDestination from '../destinations/BareMetalDestination';

// Define the Destination type
export type Destination = {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  position: { x: number; y: number };
};

interface DestinationMapProps {
  destinations: Destination[];
  activeDestination: number | null;
  isAnimating: boolean;
  isPaused: boolean;
  pathsRef: React.RefObject<SVGPathElement[]>;
  animationCompleted?: boolean;
}

const DestinationMap: React.FC<DestinationMapProps> = ({
  destinations,
  activeDestination,
  isAnimating,
  isPaused,
  pathsRef,
  animationCompleted = false
}) => {
  return (
    <div className={styles.animationContainer}>
      {/* Connection Lines */}
      <svg 
        className={styles.connectionSvg} 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {/* Background inactive paths - always visible */}
        {destinations.map((dest, index) => {
          // For SCIF destination (id: 2), add the shield to the path
          if (dest.id === 2) {
            const shieldPosition = PathGenerator.calculatePadlockPosition(dest.position, 50, 50);
            
            return (
              <g key={`bg-${dest.id}`}>
                {/* Gray base path */}
                <path
                  id={`path-${dest.id}`}
                  d={PathGenerator.generateAirGappedPath(dest.position)}
                  className={styles.inactivePath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeLinecap="round"
                  strokeWidth={2}
                />
                
                {/* Shield in the middle of the path - always visible */}
                <g 
                  transform={`translate(${shieldPosition.x}, ${shieldPosition.y})`}
                  className={styles.staticShield}
                >
                  <circle 
                    r={5} 
                    fill="#64B5F6" 
                    opacity={0.3} 
                  />
                  <FaShieldAlt 
                    color="#64B5F6" 
                    size={7}
                    style={{
                      transform: `translate(-3.5px, -3.5px)`,
                      filter: `drop-shadow(0 0 5px rgba(100, 181, 246, 0.8))`
                    }}
                  />
                </g>
              </g>
            );
          }
          
          // For all other destinations, just draw the regular path
          return (
            <path
              id={`path-${dest.id}`}
              key={`bg-${dest.id}`}
              d={PathGenerator.generateCurvePath(dest.position)}
              className={styles.inactivePath}
              fill="none"
              stroke="rgba(255, 255, 255, 0.3)"
              strokeLinecap="round"
              strokeWidth={2}
              ref={el => {
                if (el && pathsRef.current) {
                  pathsRef.current[dest.id] = el;
                }
              }}
            />
          );
        })}
      </svg>
      
      {/* Destination Boxes */}
      {destinations.map((dest, index) => {
        // Only apply active class when animation is completed, not during animation
        // If animating or paused but not completed, don't add active class
        const isActiveHighlighted = activeDestination === index && animationCompleted;
        // Still track which destination is active for animation purposes
        const isActive = activeDestination === index && (isAnimating || isPaused);
        
        // Special case for Government Cloud (id: 1) - first destination in array (index 0)
        if (dest.id === 1) {
          return (
            <div
              key={dest.id}
              className={`${styles.destinationBox} ${styles.cloudDestination} ${
                isActiveHighlighted ? styles.activeDestination : ""
              }`}
              style={{
                left: `${dest.position.x}%`,
                top: `${dest.position.y}%`,
                transform: `translate(-50%, -50%)`,
                opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
              }}
            >
              <CloudDestination x={dest.position.x} y={dest.position.y} active={isActiveHighlighted} />
            </div>
          );
        }
        
        // Use specific components for each destination type
        return (
          <div
            key={dest.id}
            className={`${styles.destinationBox} ${
              isActiveHighlighted ? styles.activeDestination : ""
            } ${dest.id === 2 ? styles.scifDestinationBox : ""}`}
            style={{
              left: `${dest.position.x}%`,
              top: `${dest.position.y}%`,
              transform: `translate(-50%, -50%)`,
              opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
            }}
          >
            {/* Render appropriate destination component based on ID */}
            {dest.id === 2 ? (
              <ScifDestination x={dest.position.x} y={dest.position.y} active={isActiveHighlighted} />
            ) : dest.id === 4 ? (
              <EdgeDeviceDestination x={dest.position.x} y={dest.position.y} active={isActiveHighlighted} />
            ) : dest.id === 3 ? (
              <BareMetalDestination x={dest.position.x} y={dest.position.y} active={isActiveHighlighted} />
            ) : (
              <div className={styles.destinationContent}>
                <div className={styles.destinationIcon} style={{
                  color: isActiveHighlighted ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
                }}>{dest.icon}</div>
                <h4>{dest.name}</h4>
                <p>{dest.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DestinationMap; 