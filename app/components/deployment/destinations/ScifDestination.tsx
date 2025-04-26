import React, { useEffect, useState } from 'react';
import styles from '../../DeploymentFlexibility.module.css';
import Image from 'next/image';

interface ScifDestinationProps {
  x: number;
  y: number;
  active: boolean;
  isReceivingPackage?: boolean;
}

const ScifDestination: React.FC<ScifDestinationProps> = ({ 
  x, 
  y, 
  active, 
  isReceivingPackage = false 
}) => {
  // Add local state to manage the receiving animation
  const [isReceiving, setIsReceiving] = useState(false);
  
  // Use effect to handle the receiving package state
  useEffect(() => {
    if (isReceivingPackage) {
      console.log(`ScifDestination at ${x},${y} RECEIVING PACKAGE`);
      setIsReceiving(true);
      
      // Auto-reset the receiving state after animation completes
      const timer = setTimeout(() => {
        setIsReceiving(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isReceivingPackage, x, y]);
  
  return (
    <div 
      className={styles.scifSvg}
      style={{ 
        transform: 'translate(15px, -30px)',
        position: 'relative',
        width: '140%', 
        height: '140%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Image
        src="/images/destinations-scif.png"
        alt="SCIF Facility"
        width={215}
        height={215}
        style={{
          opacity: active ? 1 : 0.7,
          transition: 'opacity 0.3s ease',
          filter: isReceiving 
            ? 'drop-shadow(0 0 15px rgba(255, 184, 28, 0.8))'
            : active 
              ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' 
              : 'none'
        }}
        priority
      />
      {isReceiving && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,184,28,0.5) 0%, rgba(255,184,28,0) 70%)',
            transform: 'translate(-50%, -50%)',
            animation: 'pulse 1.5s ease-in-out',
            zIndex: -1,
            pointerEvents: 'none' // Ensure it doesn't interfere with interactions
          }}
        />
      )}
    </div>
  );
};

export default ScifDestination; 