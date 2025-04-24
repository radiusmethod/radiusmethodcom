'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaDatabase, FaNetworkWired } from 'react-icons/fa';
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
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Define destinations in their positions (clockwise from top-left)
  const destinations: Destination[] = [
    {
      id: 1, // Top-left
      name: "Public Cloud",
      icon: <FaCloud size={24} />,
      description: "Deploy to AWS, Azure, or GCP",
      position: { x: 20, y: 20 },
    },
    {
      id: 2, // Top-right
      name: "Private Cloud",
      icon: <FaServer size={24} />,
      description: "Run on your private infrastructure",
      position: { x: 80, y: 20 },
    },
    {
      id: 4, // Bottom-right
      name: "Edge Network",
      icon: <FaNetworkWired size={24} />,
      description: "Distributed global edge nodes",
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

    return `M ${centerX} ${centerY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${destX} ${destY}`;
  };
  
  useEffect(() => {
    const animateDestinations = () => {
      // Cycle through destinations in clockwise order
      const nextIndex = (activeDestination + 1) % destinations.length;
      
      // Set the new active destination
      setActiveDestination(nextIndex);
      setIsAnimating(true);
      
      // Reset animation flag after animation completes
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      // Keep animation state active for 3 seconds
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 3000);
    };

    // Start animation sequence
    const interval = setInterval(animateDestinations, 5000);
    
    // Clean up
    return () => {
      clearInterval(interval);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [activeDestination, destinations.length]);
  
  return (
    <div className={styles.deploymentFlexibility}>
      <div className={styles.deploymentContainer} ref={containerRef}>
        <div className={styles.leftSection}>
          <div className={styles.pipelineCard}>
            <div className={styles.cardHeader}>
              <BsCheckCircleFill className={styles.checkIcon} />
              <h4 className={styles.cardTitle}>Deployment Flexibility</h4>
            </div>
            <p className={styles.cardText}>
              Maintain complete control over where your data resides. Deploy in environments 
              that meet your security requirements, compliance needs, and performance goals.
            </p>
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
              {/* Connection from card to center with arrows */}
              <defs>
                <marker
                  id="cardArrow"
                  viewBox="0 0 10 10"
                  refX="5"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="rgba(60, 179, 113, 0.5)" />
                </marker>
              </defs>
              
              {/* Multiple arrow paths to Crystal Tower */}
              <path
                d="M 0,50 L 10,50"
                fill="none"
                stroke="rgba(60, 179, 113, 0.5)"
                strokeWidth={1.5}
                markerEnd="url(#cardArrow)"
              />
              <path
                d="M 14,50 L 24,50"
                fill="none"
                stroke="rgba(60, 179, 113, 0.5)"
                strokeWidth={1.5}
                markerEnd="url(#cardArrow)"
              />
              <path
                d="M 28,50 L 38,50"
                fill="none"
                stroke="rgba(60, 179, 113, 0.5)"
                strokeWidth={1.5}
                markerEnd="url(#cardArrow)"
              />
              <path
                d="M 42,50 L 49,50"
                fill="none"
                stroke="rgba(60, 179, 113, 0.5)"
                strokeWidth={1.5}
                markerEnd="url(#cardArrow)"
              />
              
              {destinations.map((dest, index) => (
                <path
                  key={dest.id}
                  d={generateCurvePath(dest)}
                  className={`${styles.connectionPath} ${
                    activeDestination === index ? styles.activePath : ""
                  }`}
                  fill="none"
                  stroke={activeDestination === index ? "#ca3e31" : "rgba(255, 255, 255, 0.3)"}
                  strokeLinecap="round"
                  strokeWidth={activeDestination === index ? 3 : 2}
                />
              ))}
            </svg>
            
            {/* Center Logo */}
            <div className={styles.centerContent}>
              <div className={styles.crystalLogoContainer}>
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
                  activeDestination === index ? styles.activeDestination : ""
                }`}
                style={{
                  left: `${dest.position.x}%`,
                  top: `${dest.position.y}%`,
                  transform: `translate(-50%, -50%)`,
                }}
              >
                <div className={styles.destinationContent}>
                  <div className={styles.destinationIcon}>{dest.icon}</div>
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