'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaShieldAlt, FaCloudDownloadAlt, FaGlobe, FaLock, FaDatabase, FaNetworkWired } from 'react-icons/fa';
import { MdSecurity } from 'react-icons/md';

type Destination = {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  position: { x: number; y: number };
};

const DeploymentFlexibility: React.FC = () => {
  const [activeDestination, setActiveDestination] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const destinations: Destination[] = [
    {
      id: 1,
      name: "Public Cloud",
      icon: <FaCloud size={24} />,
      description: "Deploy to AWS, Azure, or GCP",
      position: { x: 20, y: 20 },
    },
    {
      id: 2,
      name: "Private Cloud",
      icon: <FaServer size={24} />,
      description: "Run on your private infrastructure",
      position: { x: 80, y: 20 },
    },
    {
      id: 3,
      name: "Bare Metal",
      icon: <FaDatabase size={24} />,
      description: "High-performance dedicated hardware",
      position: { x: 20, y: 80 },
    },
    {
      id: 4,
      name: "Edge Network",
      icon: <FaNetworkWired size={24} />,
      description: "Distributed global edge nodes",
      position: { x: 80, y: 80 },
    },
  ];

  const generateCurvePath = (destination: Destination) => {
    // Center position
    const centerX = 50;
    const centerY = 50;
    
    // Destination box dimensions (approximated from CSS)
    const boxWidth = 25;  // width in percentage
    const boxHeight = 20; // height in percentage
    
    // Destination center position
    const destX = destination.position.x;
    const destY = destination.position.y;
    
    // Calculate box edges based on position
    const boxLeft = destX - boxWidth/2;
    const boxRight = destX + boxWidth/2;
    const boxTop = destY - boxHeight/2;
    const boxBottom = destY + boxHeight/2;
    
    // Determine intersection point of line from center to dest with dest box
    let intersectionX, intersectionY;
    
    // Calculate direction vector
    const dirX = destX - centerX;
    const dirY = destY - centerY;
    
    // Determine which edge of the box the line intersects with
    if (Math.abs(dirX / dirY) > boxWidth / boxHeight) {
      // Intersects with left or right edge
      if (dirX > 0) {
        intersectionX = boxLeft;
        intersectionY = centerY + dirY * (boxLeft - centerX) / dirX;
      } else {
        intersectionX = boxRight;
        intersectionY = centerY + dirY * (boxRight - centerX) / dirX;
      }
    } else {
      // Intersects with top or bottom edge
      if (dirY > 0) {
        intersectionY = boxTop;
        intersectionX = centerX + dirX * (boxTop - centerY) / dirY;
      } else {
        intersectionY = boxBottom;
        intersectionX = centerX + dirX * (boxBottom - centerY) / dirY;
      }
    }
    
    // Control points for curve
    const ctrlX1 = centerX + (intersectionX - centerX) * 0.3;
    const ctrlY1 = centerY + (intersectionY - centerY) * 0.1;
    const ctrlX2 = centerX + (intersectionX - centerX) * 0.7;
    const ctrlY2 = centerY + (intersectionY - centerY) * 0.9;

    return `M ${centerX} ${centerY} C ${ctrlX1} ${ctrlY1}, ${ctrlX2} ${ctrlY2}, ${intersectionX} ${intersectionY}`;
  };
  
  useEffect(() => {
    const animateDestinations = () => {
      // Cycle through destinations
      const nextIndex = activeDestination === null 
        ? 0 
        : (activeDestination + 1) % destinations.length;
      
      setActiveDestination(nextIndex);
      setIsAnimating(true);
      
      // Reset animation flag after animation completes
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
      
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimating(false);
      }, 2000);
    };

    // Start animation sequence
    const interval = setInterval(animateDestinations, 4000);
    animateDestinations(); // Start immediately
    
    return () => {
      clearInterval(interval);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [activeDestination, destinations.length]);
  
  return (
    <div className={styles.deploymentFlexibility}>
      <h2 className={styles.sectionTitle}>Deployment Flexibility</h2>
      <div className={styles.deploymentContainer} ref={containerRef}>
        <div className={styles.leftSection}>
          <div className={styles.shieldLabel}>
            <MdSecurity size={24} />
            <h3>Security & Compliance</h3>
          </div>
          <div className={styles.leftContent}>
            <h4>Deploy Anywhere</h4>
            <p>
              Maintain complete control over where your data resides. Deploy in environments 
              that meet your security requirements, compliance needs, and performance goals.
            </p>
          </div>
        </div>
        
        <div className={styles.centerSection}>
          <div className={styles.animationContainer}>
            {/* Connection Lines */}
            <svg className={styles.connectionSvg}>
              {destinations.map((dest) => (
                <path
                  key={dest.id}
                  d={generateCurvePath(dest)}
                  className={`${styles.connectionPath} ${
                    activeDestination === dest.id - 1 ? styles.activePath : ""
                  }`}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.3)"
                  strokeWidth="2"
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
            {destinations.map((dest) => (
              <div
                key={dest.id}
                className={`${styles.destinationBox} ${
                  activeDestination === dest.id - 1 ? styles.activeDestination : ""
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