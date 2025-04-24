'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaShieldAlt, FaSatelliteDish } from 'react-icons/fa';

interface DeploymentDestination {
  id: string;
  name: string;
  icon: React.ReactNode;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  description: string;
}

const DeploymentFlexibility: React.FC = () => {
  const [activeDeployment, setActiveDeployment] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const animationActive = useRef<boolean>(false);

  const destinations: DeploymentDestination[] = [
    {
      id: 'commercial-cloud',
      name: 'Commercial Cloud',
      icon: <FaCloud className={styles.destinationIcon} />,
      position: 'top-left',
      description: 'Secure deployments to major cloud providers'
    },
    {
      id: 'on-premises',
      name: 'On-premises Data Center',
      icon: <FaServer className={styles.destinationIcon} />,
      position: 'top-right',
      description: 'Deploy to your own infrastructure'
    },
    {
      id: 'classified-network',
      name: 'Classified Network',
      icon: <FaShieldAlt className={styles.destinationIcon} />,
      position: 'bottom-left',
      description: 'Secure government and classified environments'
    },
    {
      id: 'tactical-edge',
      name: 'Tactical Edge',
      icon: <FaSatelliteDish className={styles.destinationIcon} />,
      position: 'bottom-right',
      description: 'Field-ready deployments for remote operations'
    }
  ];

  // Start the animation sequence
  const startAnimationSequence = () => {
    if (animationActive.current) return;
    
    animationActive.current = true;
    let counter = 0;
    
    // Initial animation sequence
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 2000);
    
    const rotateDeployments = () => {
      const nextIndex = counter % destinations.length;
      setActiveDeployment(destinations[nextIndex].id);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
      counter++;
    };

    // Set the first destination immediately
    rotateDeployments();
    
    // Rotate every 5 seconds to allow animation to complete
    animationRef.current = setInterval(rotateDeployments, 5000);
  };

  // Stop the animation sequence
  const stopAnimationSequence = () => {
    if (animationRef.current) {
      clearInterval(animationRef.current);
      animationRef.current = null;
    }
    animationActive.current = false;
  };

  // Handle intersection observer for triggering animations when the component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            startAnimationSequence();
          } else {
            stopAnimationSequence();
          }
        });
      },
      { threshold: 0.2 } // Start when 20% of the component is visible
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
      stopAnimationSequence();
    };
  }, []);

  // Get line coordinates for connections between center and destinations
  const getLineCoordinates = (position: string) => {
    // These values create connections similar to the reference image
    switch (position) {
      case 'top-left':
        return { x1: '50%', y1: '50%', x2: '25%', y2: '25%' };
      case 'top-right':
        return { x1: '50%', y1: '50%', x2: '75%', y2: '25%' };
      case 'bottom-left':
        return { x1: '50%', y1: '50%', x2: '25%', y2: '75%' };
      case 'bottom-right':
        return { x1: '50%', y1: '50%', x2: '75%', y2: '75%' };
      default:
        return { x1: '0%', y1: '0%', x2: '0%', y2: '0%' };
    }
  };
  
  // Generate bezier curve paths for more interesting animations
  const generateCurvePath = (position: string) => {
    const start = { x: 50, y: 50 }; // Center
    let end, control1, control2;
    
    switch (position) {
      case 'top-left':
        end = { x: 25, y: 25 };
        control1 = { x: 45, y: 40 };
        control2 = { x: 40, y: 30 };
        break;
      case 'top-right':
        end = { x: 75, y: 25 };
        control1 = { x: 55, y: 40 };
        control2 = { x: 60, y: 30 };
        break;
      case 'bottom-left':
        end = { x: 25, y: 75 };
        control1 = { x: 40, y: 60 };
        control2 = { x: 35, y: 70 };
        break;
      case 'bottom-right':
        end = { x: 75, y: 75 };
        control1 = { x: 60, y: 60 };
        control2 = { x: 65, y: 70 };
        break;
      default:
        end = { x: 50, y: 50 };
        control1 = { x: 50, y: 50 };
        control2 = { x: 50, y: 50 };
    }
    
    return `M${start.x},${start.y} C${control1.x},${control1.y} ${control2.x},${control2.y} ${end.x},${end.y}`;
  };

  return (
    <section className={`${styles.deploymentFlexibility} ${isAnimating ? styles.isAnimating : ''}`} ref={componentRef}>
      <h2 className={styles.sectionTitle}>Deployment Flexibility</h2>
      <div className={styles.deploymentContainer}>
        {/* 3D Environment wrapper */}
        <div className={styles.scene3d}>
          {/* SVG overlay for connector lines */}
          <svg className={styles.connectorsSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              
              <linearGradient id="activeLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ca3e31" />
                <stop offset="100%" stopColor="#ff5842" />
              </linearGradient>
            </defs>
            
            {destinations.map((destination) => {
              const coords = getLineCoordinates(destination.position);
              const curvePath = generateCurvePath(destination.position);
              const isActive = activeDeployment === destination.id;
              
              return (
                <g key={`connector-${destination.id}`}>
                  {/* Base connector line - always visible */}
                  <path
                    d={curvePath}
                    className={styles.connectorLine}
                    fill="none"
                  />
                  
                  {/* Active line overlay with glow effect */}
                  {isActive && (
                    <path
                      d={curvePath}
                      className={styles.activeConnectorLine}
                      fill="none"
                      filter="url(#glow)"
                      strokeLinecap="round"
                    />
                  )}
                  
                  {/* Animated dots for active connector */}
                  {isActive && (
                    <>
                      <circle 
                        className={styles.movingDot}
                        r="0.8"
                      >
                        <animateMotion
                          dur="2s"
                          repeatCount="3"
                          path={curvePath}
                        />
                      </circle>
                      
                      <circle 
                        className={styles.pulseDot}
                        r="1.2"
                      >
                        <animateMotion
                          begin="0.3s"
                          dur="2s"
                          repeatCount="3"
                          path={curvePath}
                        />
                      </circle>
                      
                      <circle 
                        className={styles.trailDot}
                        r="0.5"
                      >
                        <animateMotion
                          begin="0.6s"
                          dur="2s"
                          repeatCount="3"
                          path={curvePath}
                        />
                      </circle>
                    </>
                  )}
                  
                  {/* Connection dots on active connector */}
                  {isActive && (
                    <>
                      <circle cx={coords.x1} cy={coords.y1} r="1.2" className={styles.connectorDot}>
                        <animate attributeName="r" values="0.8;1.2;0.8" dur="1s" repeatCount="indefinite" />
                      </circle>
                      <circle cx={coords.x2} cy={coords.y2} r="1.2" className={styles.connectorDot}>
                        <animate attributeName="r" values="0.8;1.2;0.8" dur="1s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                </g>
              );
            })}
          </svg>
          
          {/* Crystal Tower centerpiece */}
          <div className={`${styles.crystalTower} ${isAnimating ? styles.towerAnimating : ''}`}>
            <div className={styles.crystalLogoContainer}>
              <div className={styles.logoGlow}></div>
              <Image 
                src="/images/crystal-tower-logo.png" 
                alt="Crystal Tower Logo" 
                width={140} 
                height={140}
                className={styles.crystalLogoImage}
              />
            </div>
            <div className={styles.towerLabel}>CRYSTAL TOWER</div>
          </div>

          {/* Deployment destinations */}
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className={`${styles.deploymentDestination} ${styles[destination.position]} ${activeDeployment === destination.id ? styles.active : ''}`}
            >
              <div className={styles.destinationContent}>
                {destination.icon}
                <h3>{destination.name}</h3>
                <p>{destination.description}</p>
              </div>
              {activeDeployment === destination.id && (
                <div className={styles.destinationPulse}></div>
              )}
            </div>
          ))}

          {/* Deployment flexibility shield at bottom */}
          <div className={styles.deploymentShield}>
            <div className={styles.shieldIcon}></div>
            <div className={styles.shieldLabel}>Deployment Flexibility</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeploymentFlexibility; 