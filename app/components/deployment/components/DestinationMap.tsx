import React, { useState, useEffect } from 'react';
import styles from '../../DeploymentFlexibility.module.css';
import { PathGenerator } from '../utils/PathGenerator';
import CloudDestination from '../destinations/CloudDestination';
import ScifDestination from '../destinations/ScifDestination';
import EdgeDestination from '../destinations/EdgeDestination';
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
  receivingDestination?: number | null;
}

const DestinationMap: React.FC<DestinationMapProps> = ({
  destinations,
  activeDestination,
  isAnimating,
  isPaused,
  pathsRef,
  animationCompleted = false,
  receivingDestination = null
}) => {
  // Map of index to destination ID for debugging
  React.useEffect(() => {
    console.log('DestinationMap - active destination index:', activeDestination);
    console.log('Destination mapping:', destinations.map((d, i) => ({ index: i, id: d.id })));
  }, [activeDestination, destinations]);

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
          // For SCIF destination (id: 2), add the diode to the path
          if (dest.id === 2) {
            const diodePosition = PathGenerator.calculateDiodePosition(dest.position, 50, 50);
            
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
                
                {/* Replace Shield with Diode Square - always visible */}
                <g 
                  transform={`translate(${diodePosition.x}, ${diodePosition.y})`}
                  className={styles.staticShield}
                >
                  {/* Inner group for rotation */}
                  <g transform="rotate(-45)">
                    {/* Diode Square */}
                    <rect 
                      width={10}
                      height={10}
                      x={-5}
                      y={-5}
                      fill="#64B5F6"
                      opacity={0.5}
                      stroke="#fff"
                      strokeWidth={0.5}
                      strokeOpacity={0.6}
                      rx={1}
                      ry={1}
                    />
                    
                    {/* DIODE text */}
                    <text
                      x={0}
                      y={-7}
                      textAnchor="middle"
                      fill="#ffffff"
                      opacity={0.7}
                      fontSize="3"
                      fontWeight="bold"
                      fontFamily="Arial, sans-serif"
                      style={{
                        filter: `drop-shadow(0 0 1px rgba(0, 0, 0, 0.5))`
                      }}
                    >
                      DIODE
                    </text>
                  </g>
                </g>
              </g>
            );
          }
          
          // For Edge destination (id: 4), use the edge path
          if (dest.id === 4) {
            return (
              <path
                id={`path-${dest.id}`}
                key={`bg-${dest.id}`}
                d={PathGenerator.generateEdgePath(dest.position)}
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
        // Simplest condition: highlight when this is the active destination 
        // and the full animation hasn't completed yet
        const isHighlighted = activeDestination === index && !animationCompleted;
        
        // Check if this destination is receiving a package
        const isReceivingPackage = receivingDestination === index;
        
        // Debug log to see which destinations should be highlighted
        console.log(`Destination ${index} (ID: ${dest.id}): activeDestination=${activeDestination}, isHighlighted=${isHighlighted}, isReceiving=${isReceivingPackage}, animationCompleted=${animationCompleted}`);
        
        // Special case for Government Cloud (id: 1) - first destination in array (index 0)
        if (dest.id === 1) {
          return (
            <div
              key={dest.id}
              className={`${styles.destinationBox} ${styles.cloudDestination}`}
              style={{
                left: `${dest.position.x}%`,
                top: `${dest.position.y}%`,
                transform: `translate(-50%, -50%)`,
                opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8,
                width: 'auto',
                height: 'auto',
                minWidth: '200px',
                minHeight: '170px'
              }}
            >
              <CloudDestination 
                x={dest.position.x} 
                y={dest.position.y} 
                active={isHighlighted}
                isReceivingPackage={isReceivingPackage} 
              />
            </div>
          );
        }
        
        // Use specific components for each destination type
        return (
          <div
            key={dest.id}
            className={`${styles.destinationBox} ${dest.id === 2 ? styles.scifDestinationBox : dest.id === 4 ? styles.edgeDestinationBox : ""}`}
            style={{
              left: `${dest.position.x}%`,
              top: `${dest.position.y}%`,
              transform: `translate(-50%, -50%)`,
              opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
            }}
          >
            {/* Render appropriate destination component based on ID */}
            {dest.id === 2 ? (
              <ScifDestination 
                x={dest.position.x} 
                y={dest.position.y} 
                active={isHighlighted} 
                isReceivingPackage={isReceivingPackage}
              />
            ) : dest.id === 4 ? (
              <EdgeDestination 
                id={dest.id.toString()}
                x={dest.position.x} 
                y={dest.position.y} 
                name={dest.name}
                description={dest.description}
                active={isHighlighted}
                isReceiving={isReceivingPackage} 
              />
            ) : dest.id === 3 ? (
              <BareMetalDestination
                key={dest.id}
                x={dest.position.x}
                y={dest.position.y}
                active={isHighlighted}
                isReceivingPackage={isReceivingPackage}
              />
            ) : (
              <div className={styles.destinationContent}>
                <div className={styles.destinationIcon} style={{
                  color: isHighlighted ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
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