'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaDatabase, FaNetworkWired, FaLock, FaFighterJet, FaBox, FaSpinner, FaRedo } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';

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
  
  // References
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
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

  // Path generation function
  const generateCurvePath = (destination: Destination) => {
    const centerX = 50;
    const centerY = 50;
    const destX = destination.position.x;
    const destY = destination.position.y;
    const ctrlX1 = centerX + (destX - centerX) * 0.3;
    const ctrlY1 = centerY + (destY - centerY) * 0.3;
    const ctrlX2 = centerX + (destX - centerX) * 0.7;
    const ctrlY2 = centerY + (destY - centerY) * 0.7;
    return `M ${centerX} ${centerY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${destX} ${destY}`;
  };
  
  // Function to start the animation
  const startAnimation = () => {
    console.log("Starting the animation");
    
    // Reset states
    setActiveDestination(0);
    setIsAnimating(false);
    setIsPaused(false);
    setIsLogoHighlighted(false);
    setHasAnimationStarted(true);
    
    // First, show the package animation
    setIsPackageAnimating(true);
    
    // After 2.5 seconds, highlight the Crystal Tower logo
    setTimeout(() => {
      setIsPackageAnimating(false);
      setIsLogoHighlighted(true);
      console.log("Package reached Crystal Tower");
      
      // After 0.7 seconds, start the first path animation (destination 0)
      setTimeout(() => {
        setIsAnimating(true);
        console.log("Path animation started to destination 0");
        
        // After 2 seconds, complete path animation and pause
        setTimeout(() => {
          setIsAnimating(false);
          setIsPaused(true);
          console.log("Path animation completed, paused at destination 0");
          
          // After 1.5 seconds, move to next destination (1)
          setTimeout(() => {
            setIsPaused(false);
            setActiveDestination(1); // Move to the next destination (index 1)
            console.log("Moving to destination 1");
            
            // Start animating to the second destination
            setTimeout(() => {
              setIsAnimating(true);
              console.log("Animating to destination 1");
              
              // After 2 seconds, complete path animation and pause
              setTimeout(() => {
                setIsAnimating(false);
                setIsPaused(true);
                console.log("Path animation to destination 1 completed");
                
                // After 1.5 seconds, move to next destination (2)
                setTimeout(() => {
                  setIsPaused(false);
                  setActiveDestination(2); // Move to the next destination (index 2)
                  console.log("Moving to destination 2");
                  
                  // Start animating to the third destination
                  setTimeout(() => {
                    setIsAnimating(true);
                    console.log("Animating to destination 2");
                    
                    // After 2 seconds, complete path animation and pause
                    setTimeout(() => {
                      setIsAnimating(false);
                      setIsPaused(true);
                      console.log("Path animation to destination 2 completed");
                      
                      // After 1.5 seconds, move to next destination (3)
                      setTimeout(() => {
                        setIsPaused(false);
                        setActiveDestination(3); // Move to the next destination (index 3)
                        console.log("Moving to destination 3");
                        
                        // Start animating to the fourth destination
                        setTimeout(() => {
                          setIsAnimating(true);
                          console.log("Animating to destination 3");
                          
                          // After 2 seconds, complete path animation and pause
                          setTimeout(() => {
                            setIsAnimating(false);
                            setIsPaused(true);
                            console.log("Path animation to destination 3 completed");
                            
                            // After 1.5 seconds, reset everything
                            setTimeout(() => {
                              setIsPaused(false);
                              setIsLogoHighlighted(false);
                              setActiveDestination(0);
                              console.log("Animation cycle completed");
                            }, 1500);
                          }, 2000);
                        }, 500);
                      }, 1500);
                    }, 2000);
                  }, 500);
                }, 1500);
              }, 2000);
            }, 500);
          }, 1500);
        }, 2000);
      }, 700);
    }, 2500);
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
          <div className={styles.pipelineCard}>
            <div className={styles.cardHeader}>
              <div className={styles.spinnerContainer}>
                <div className={styles.spinnerOuter}>
                  <FaSpinner className={styles.spinnerIcon} />
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
                activeDestination === index && (isAnimating || isPaused) && (
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