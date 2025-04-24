'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaDatabase, FaNetworkWired, FaLock, FaFighterJet, FaBox, FaSpinner } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

type Destination = {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  position: { x: number; y: number };
};

const DeploymentFlexibility: React.FC = () => {
  const [activeDestination, setActiveDestination] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPackageAnimating, setIsPackageAnimating] = useState(false);
  const [isLogoHighlighted, setIsLogoHighlighted] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const packageTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const logoHighlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define destinations in their positions (clockwise from top-left)
  const destinations: Destination[] = [
    {
      id: 1, // Top-left
      name: "Government Cloud",
      icon: <FaCloud size={24} />,
      description: "Deploy on AWS and Azure GovCloud",
      position: { x: 20, y: 20 },
    },
    {
      id: 2, // Top-right
      name: "Classified Networks",
      icon: <FaLock size={24} />,
      description: "Secure classified infrastructure and cloud",
      position: { x: 80, y: 20 },
    },
    {
      id: 4, // Bottom-right
      name: "Edge Device",
      icon: <FaFighterJet size={24} />,
      description: "Tactical military edge deployments",
      position: { x: 80, y: 80 },
    },
    {
      id: 3, // Bottom-left
      name: "Bare Metal",
      icon: <FaDatabase size={24} />,
      description: "High-performance dedicated hardware",
      position: { x: 20, y: 80 },
    },
  ];

  const generateCurvePath = (destination: Destination) => {
    // Center position
    const centerX = 50;
    const centerY = 50;
    
    // Destination position
    const destX = destination.position.x;
    const destY = destination.position.y;
    
    // Control points for curve (simplified for better visibility)
    const ctrlX1 = centerX + (destX - centerX) * 0.3;
    const ctrlY1 = centerY + (destY - centerY) * 0.3;
    const ctrlX2 = centerX + (destX - centerX) * 0.7;
    const ctrlY2 = centerY + (destY - centerY) * 0.7;

    // Path from center to destination (for proper animation flow)
    return `M ${centerX} ${centerY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${destX} ${destY}`;
  };
  
  useEffect(() => {
    const startAnimation = () => {
      // First start the package animation from card to Crystal Tower
      setIsPackageAnimating(true);
      
      // Reset package animation after it completes
      if (packageTimeoutRef.current) {
        clearTimeout(packageTimeoutRef.current);
      }
      
      if (logoHighlightTimeoutRef.current) {
        clearTimeout(logoHighlightTimeoutRef.current);
      }
      
      // After package reaches Crystal Tower, start path animation to destination
      packageTimeoutRef.current = setTimeout(() => {
        setIsPackageAnimating(false);
        setIsLogoHighlighted(true);
        
        // Briefly highlight logo when package arrives
        logoHighlightTimeoutRef.current = setTimeout(() => {
          // Start animation for current destination line
          setIsAnimating(true);
        }, 200);
        
        // After line animation completes, pause in red state
        if (animationTimeoutRef.current) {
          clearTimeout(animationTimeoutRef.current);
        }
        
        animationTimeoutRef.current = setTimeout(() => {
          setIsLogoHighlighted(false);
          setIsAnimating(false);
          setIsPaused(true);
          
          // After pausing, move to next destination
          if (pauseTimeoutRef.current) {
            clearTimeout(pauseTimeoutRef.current);
          }
          
          pauseTimeoutRef.current = setTimeout(() => {
            const nextIndex = (activeDestination + 1) % destinations.length;
            setActiveDestination(nextIndex);
            setIsPaused(false);
            
            // Start the cycle again
            startAnimation();
          }, 2000); // Pause for 2 seconds at destination
        }, 2000); // Line animation takes 2 seconds
      }, 1000); // Package animation takes 1 second
    };
    
    // Start the animation sequence
    startAnimation();
    
    // Clean up
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
      if (packageTimeoutRef.current) {
        clearTimeout(packageTimeoutRef.current);
      }
      if (logoHighlightTimeoutRef.current) {
        clearTimeout(logoHighlightTimeoutRef.current);
      }
    };
  }, [activeDestination, destinations.length]);
  
  return (
    <div className={styles.deploymentFlexibility}>
      <h2 className={styles.sectionTitle}>Deployment Flexibility</h2>
      <p className={styles.sectionSubtitle}>
        Maintain complete control over where your data resides, meeting security requirements, compliance needs, and performance goals.
      </p>
      
      <div className={styles.deploymentContainer} ref={containerRef}>
        <div className={styles.leftSection}>
          <div className={styles.pipelineCard}>
            <div className={styles.cardHeader}>
              <div className={styles.spinnerContainer}>
                <FaSpinner className={styles.spinnerIcon} />
              </div>
              <h4 className={styles.cardTitle}>Production Deployment</h4>
            </div>
          </div>
          
          {/* Package animation */}
          {isPackageAnimating && (
            <div className={styles.packageContainer}>
              <FaBox className={styles.packageIcon} />
            </div>
          )}
        </div>
        
        <div className={styles.centerSection}>
          <div className={styles.animationContainer}>
            {/* Connection Lines */}
            <svg 
              className={styles.connectionSvg} 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Background inactive paths - always visible */}
              {destinations.map((dest, index) => (
                <path
                  key={`bg-${dest.id}`}
                  d={generateCurvePath(dest)}
                  className={styles.inactivePath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeLinecap="round"
                  strokeWidth={2}
                />
              ))}
              
              {/* Active animated path */}
              {destinations.map((dest, index) => (
                activeDestination === index && (
                  <path
                    key={`active-${dest.id}`}
                    d={generateCurvePath(dest)}
                    className={`${styles.connectionPath} ${
                      isAnimating ? styles.animatingPath : (isPaused ? styles.pausedPath : "")
                    }`}
                    fill="none"
                    stroke="#ca3e31"
                    strokeLinecap="round"
                    strokeWidth={2.5}
                  />
                )
              ))}
            </svg>
            
            {/* Center Logo */}
            <div className={styles.centerContent}>
              <div className={`${styles.crystalLogoContainer} ${isLogoHighlighted ? styles.logoHighlighted : ''}`}>
                <div className={styles.logoGlow}></div>
                <Image
                  src="/images/crystal-tower-logo.png"
                  alt="Crystal Tower Logo"
                  width={80}
                  height={80}
                  className={styles.crystalLogoImage}
                />
              </div>
            </div>
            
            {/* Destination Boxes */}
            {destinations.map((dest, index) => (
              <div
                key={dest.id}
                className={`${styles.destinationBox} ${
                  activeDestination === index && (isAnimating || isPaused) ? styles.activeDestination : ""
                }`}
                style={{
                  left: `${dest.position.x}%`,
                  top: `${dest.position.y}%`,
                  transform: `translate(-50%, -50%)`,
                  opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
                }}
              >
                <div className={styles.destinationContent}>
                  <div className={styles.destinationIcon} style={{
                    color: activeDestination === index && (isAnimating || isPaused) ? "#ca3e31" : "rgba(255, 255, 255, 0.7)"
                  }}>{dest.icon}</div>
                  <h4>{dest.name}</h4>
                  <p>{dest.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeploymentFlexibility; 