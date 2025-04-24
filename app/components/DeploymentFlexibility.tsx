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
  // Using a ref to track current index to avoid closure issues
  const activeIndexRef = useRef<number>(0);
  const [activeDestination, setActiveDestination] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPackageAnimating, setIsPackageAnimating] = useState(false);
  const [isLogoHighlighted, setIsLogoHighlighted] = useState(false);
  
  // Animation timing refs
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
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

  // Clear all timeouts
  const clearAllTimeouts = () => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  };

  // Add timeout with tracking
  const addTimeout = (callback: () => void, delay: number) => {
    const timeoutId = setTimeout(() => {
      callback();
    }, delay);
    timeoutsRef.current.push(timeoutId);
    return timeoutId;
  };

  // Path generation function
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
    // Start fresh
    clearAllTimeouts();
    
    function runAnimationCycle() {
      // Reset states
      setIsPackageAnimating(false);
      setIsAnimating(false);
      setIsPaused(false);
      setIsLogoHighlighted(false);
      
      // 1. Start with package animation
      setIsPackageAnimating(true);
      
      // 2. After package animation completes, highlight logo
      addTimeout(() => {
        setIsPackageAnimating(false);
        setIsLogoHighlighted(true);
        
        // 3. Start path animation
        addTimeout(() => {
          setIsAnimating(true);
          
          // 4. Complete path animation and pause
          addTimeout(() => {
            setIsAnimating(false);
            setIsPaused(true);
            
            // 5. Move to next destination
            addTimeout(() => {
              setIsPaused(false);
              setIsLogoHighlighted(false);
              
              // Update to next destination
              activeIndexRef.current = (activeIndexRef.current + 1) % destinations.length;
              setActiveDestination(activeIndexRef.current);
              
              // 6. Start next cycle
              addTimeout(runAnimationCycle, 500);
            }, 1500);
          }, 2000);
        }, 700);
      }, 2500);
    }
    
    // Start the animation
    runAnimationCycle();
    
    // Cleanup
    return clearAllTimeouts;
  }, []);
  
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
            
            {/* Package animation inside the card */}
            {isPackageAnimating && (
              <div className={styles.packageContainer}>
                <FaBox className={styles.packageIcon} />
              </div>
            )}
          </div>
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
                    stroke="#FFB81C"
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
                    color: activeDestination === index && (isAnimating || isPaused) ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
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