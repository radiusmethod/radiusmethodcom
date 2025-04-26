'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaDatabase, FaNetworkWired, FaLock, FaFighterJet, FaBox, FaSpinner, FaRedo, FaBolt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { withBasePath } from '../utils/basePath';

// Import destination components
import CloudDestination from './deployment/destinations/CloudDestination';
import ScifDestination from './deployment/destinations/ScifDestination';
import EdgeDeviceDestination from './deployment/destinations/EdgeDeviceDestination';
import BareMetalDestination from './deployment/destinations/BareMetalDestination';

// Import utilities
import { PathGenerator } from './deployment/utils/PathGenerator';
import { AnimationController } from './deployment/utils/AnimationController';

type Destination = {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  position: { x: number; y: number };
};

type Props = {
  id?: string;
};

const DeploymentFlexibility: React.FC<Props> = ({ id }) => {
  // Basic animation states
  const [activeDestination, setActiveDestination] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPackageAnimating, setIsPackageAnimating] = useState(false);
  const [isLogoHighlighted, setIsLogoHighlighted] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);
  const [isDeploymentCompleted, setIsDeploymentCompleted] = useState(false);
  
  // References
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationControllerRef = useRef<AnimationController | null>(null);
  
  // Define destinations in their positions (clockwise from top-left)
  const destinations: Destination[] = [
    {
      id: 1, // Top-left
      name: "Government Clouds",
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

  // Initialize animation controller
  useEffect(() => {
    animationControllerRef.current = new AnimationController((state) => {
      if (state.activeDestination !== undefined) setActiveDestination(state.activeDestination);
      if (state.isAnimating !== undefined) setIsAnimating(state.isAnimating);
      if (state.isPaused !== undefined) setIsPaused(state.isPaused);
      if (state.isPackageAnimating !== undefined) setIsPackageAnimating(state.isPackageAnimating);
      if (state.isLogoHighlighted !== undefined) setIsLogoHighlighted(state.isLogoHighlighted);
      if (state.hasAnimationStarted !== undefined) setHasAnimationStarted(state.hasAnimationStarted);
      if (state.isDeploymentCompleted !== undefined) setIsDeploymentCompleted(state.isDeploymentCompleted);
    });
    
    return () => {
      if (animationControllerRef.current) {
        animationControllerRef.current.clearTimeouts();
      }
    };
  }, []);
  
  // Function to start the animation
  const startAnimation = () => {
    if (animationControllerRef.current) {
      animationControllerRef.current.startAnimation();
    }
  };

  // Set up event listener to start animation from an external trigger
  useEffect(() => {
    // Event handler for manual start
    const handleStartAnimation = () => {
      console.log("Received external trigger to start animation");
      startAnimation();
    };
    
    // Add event listener
    window.addEventListener('start-deployment-animation', handleStartAnimation);
    
    // Cleanup
    return () => {
      window.removeEventListener('start-deployment-animation', handleStartAnimation);
    };
  }, []);

  // Set up intersection observer to trigger animation on scroll
  useEffect(() => {
    if (!sectionRef.current || hasAnimationStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // When the section comes into view
        if (entries[0].isIntersecting && !hasAnimationStarted) {
          console.log("Section in view, starting animation");
          startAnimation();
        }
      },
      { threshold: 0.3 } // Start when 30% of section is visible
    );

    // Start observing
    observer.observe(sectionRef.current);

    // Cleanup
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [hasAnimationStarted]);
  
  return (
    <div className={styles.deploymentFlexibility} ref={sectionRef} id={id}>
      <h2 className={styles.sectionTitle}>Deployment Flexibility</h2>
      <p className={styles.sectionSubtitle}>
        Maintain complete control over where your data resides, meeting security requirements, compliance needs, and performance goals.
      </p>
      
      <div className={styles.deploymentContainer} ref={containerRef}>
        <div className={styles.leftSection}>
          <div className={`${styles.pipelineCard} ${isDeploymentCompleted ? styles.completedCard : ''}`}>
            <div className={styles.cardHeader}>
              <div className={styles.spinnerContainer}>
                <div className={`${styles.spinnerOuter} ${isDeploymentCompleted ? styles.completedSpinner : ''}`}>
                  {isDeploymentCompleted ? (
                    <BsCheckCircleFill className={styles.checkIcon} />
                  ) : (
                    <FaSpinner className={styles.spinnerIcon} />
                  )}
                </div>
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
              {destinations.map((dest) => (
                <path
                  key={`bg-${dest.id}`}
                  d={PathGenerator.generateCurvePath(dest.position)}
                  className={styles.inactivePath}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeLinecap="round"
                  strokeWidth={2}
                />
              ))}
              
              {/* Active animated paths */}
              {destinations.map((dest, index) => {
                // Check if this is the Government Clouds destination (id: 1)
                if (dest.id === 1 && activeDestination === index && (isAnimating || isPaused)) {
                  return (
                    <g key={`lightning-${dest.id}`}>
                      {/* Keep the original path gray */}
                      <path
                        d={PathGenerator.generateCurvePath(dest.position)}
                        className={styles.inactivePath}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeLinecap="round"
                        strokeWidth={2}
                      />
                      
                      {/* Add lightning bolt animation */}
                      {isAnimating && (
                        <g className={styles.lightningContainer}>
                          <path
                            d={PathGenerator.generateLightningPath(dest.position)}
                            className={styles.lightningPath}
                            fill="none"
                            stroke="#64B5F6"
                            strokeLinecap="round"
                            strokeWidth={2}
                          />
                          <circle 
                            className={styles.lightningBolt}
                            r="3" 
                            fill="#ffffff"
                          >
                            <animateMotion
                              dur="1.5s"
                              repeatCount="1"
                              path={PathGenerator.generateLightningPath(dest.position)}
                            />
                          </circle>
                        </g>
                      )}
                    </g>
                  );
                } else if (dest.id === 2 && activeDestination === index && (isAnimating || isPaused)) {
                  // Special path for Classified Networks (air-gapped)
                  const padlockPosition = PathGenerator.calculatePadlockPosition(dest.position);
                  
                  return (
                    <g key={`airgap-${dest.id}`}>
                      {/* Path to the padlock */}
                      <path
                        d={PathGenerator.generateAirGappedPath(dest.position)}
                        className={`${styles.connectionPath} ${
                          isAnimating ? styles.animatingPath : (isPaused ? styles.pausedPath : "")
                        }`}
                        fill="none"
                        stroke="#FFB81C"
                        strokeLinecap="round"
                        strokeWidth={2.5}
                      />
                      
                      {/* Path after the padlock (visible if animation completed) */}
                      {isPaused && (
                        <path
                          d={PathGenerator.generatePostAirGapPath(dest.position, padlockPosition)}
                          className={styles.pausedPath}
                          fill="none"
                          stroke="#FFB81C"
                          strokeLinecap="round"
                          strokeWidth={2.5}
                        />
                      )}
                      
                      {/* Padlock icon */}
                      {(isAnimating || isPaused) && (
                        <g 
                          transform={`translate(${padlockPosition.x}, ${padlockPosition.y})`}
                          className={styles.padlockIcon}
                        >
                          <circle 
                            r={4} 
                            fill="#FFB81C" 
                            opacity={0.5} 
                          />
                          <FaLock 
                            color="#FFB81C" 
                            size={isPaused ? 6 : 5}
                            style={{
                              transform: `translate(-3px, -3px)`,
                              filter: `drop-shadow(0 0 3px rgba(255, 184, 28, 0.7))`
                            }}
                          />
                        </g>
                      )}
                    </g>
                  );
                } else if (activeDestination === index && (isAnimating || isPaused)) {
                  // Default golden path for other destinations
                  return (
                    <path
                      key={`active-${dest.id}`}
                      d={PathGenerator.generateCurvePath(dest.position)}
                      className={`${styles.connectionPath} ${
                        isAnimating ? styles.animatingPath : (isPaused ? styles.pausedPath : "")
                      }`}
                      fill="none"
                      stroke="#FFB81C"
                      strokeLinecap="round"
                      strokeWidth={2.5}
                    />
                  );
                }
                return null;
              })}
            </svg>
            
            {/* Center Logo */}
            <div className={styles.centerContent}>
              <div className={`${styles.crystalLogoContainer} ${isLogoHighlighted ? styles.logoHighlighted : ''}`}>
                <div className={styles.logoGlow}></div>
                <Image
                  src={withBasePath('/images/crystal-tower-logo.png')}
                  alt="Crystal Tower Logo"
                  width={80}
                  height={80}
                  className={styles.crystalLogoImage}
                />
              </div>
            </div>
            
            {/* Destination Boxes */}
            {destinations.map((dest, index) => {
              const isActive = activeDestination === index && (isAnimating || isPaused);
              
              // Special case for Government Cloud (first destination)
              if (dest.id === 1) {
                return (
                  <div
                    key={dest.id}
                    className={`${styles.destinationBox} ${styles.cloudDestination} ${
                      isActive ? styles.activeDestination : ""
                    }`}
                    style={{
                      left: `${dest.position.x}%`,
                      top: `${dest.position.y}%`,
                      transform: `translate(-50%, -50%)`,
                      opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
                    }}
                  >
                    <CloudDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  </div>
                );
              }
              
              // Use specific components for each destination type
              return (
                <div
                  key={dest.id}
                  className={`${styles.destinationBox} ${
                    isActive ? styles.activeDestination : ""
                  }`}
                  style={{
                    left: `${dest.position.x}%`,
                    top: `${dest.position.y}%`,
                    transform: `translate(-50%, -50%)`,
                    opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
                  }}
                >
                  {/* Render appropriate destination component based on ID */}
                  {dest.id === 2 ? (
                    <ScifDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  ) : dest.id === 4 ? (
                    <EdgeDeviceDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  ) : dest.id === 3 ? (
                    <BareMetalDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  ) : (
                    <div className={styles.destinationContent}>
                      <div className={styles.destinationIcon} style={{
                        color: isActive ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
                      }}>{dest.icon}</div>
                      <h4>{dest.name}</h4>
                      <p>{dest.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Redeploy button */}
      <button 
        onClick={startAnimation}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          background: '#FFB81C',
          color: '#000',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 100
        }}
        title="Redeploy"
      >
        <FaRedo size={18} />
      </button>
    </div>
  );
};

export default DeploymentFlexibility; 