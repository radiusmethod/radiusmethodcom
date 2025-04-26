import React, { useEffect, useState } from 'react';
import { FaFighterJet } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface EdgeDeviceDestinationProps {
  x: number;
  y: number;
  active: boolean;
  isReceivingPackage?: boolean;
}

const EdgeDeviceDestination: React.FC<EdgeDeviceDestinationProps> = ({ 
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
      console.log(`EdgeDeviceDestination at ${x},${y} RECEIVING PACKAGE`);
      setIsReceiving(true);
      
      // Auto-reset the receiving state after animation completes
      const timer = setTimeout(() => {
        setIsReceiving(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isReceivingPackage, x, y]);

  return (
    <div className={styles.destinationContent} style={{ position: 'relative' }}>
      <div 
        className={styles.destinationIcon} 
        style={{
          color: isReceiving ? "#FFE44D" : active ? "#FFB81C" : "rgba(255, 255, 255, 0.85)",
          // Don't use transform that changes position, use filter for visual effect
          filter: isReceiving 
            ? 'drop-shadow(0 0 10px rgba(255, 228, 77, 0.8))' 
            : active 
              ? 'drop-shadow(0 0 5px rgba(255, 184, 28, 0.5))' 
              : 'none',
          transition: 'all 0.3s ease'
        }}
      >
        <FaFighterJet size={24} />
      </div>
      <h4 style={{
        color: isReceiving ? "#FFE44D" : active ? "#FFB81C" : "white"
      }}>Edge Device</h4>
      <p>Tactical military edge deployments</p>
      
      {isReceiving && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,228,77,0.4) 0%, rgba(255,228,77,0) 70%)',
            transform: 'translate(-50%, -50%)',
            zIndex: -1,
            pointerEvents: 'none'
          }}
        />
      )}
    </div>
  );
};

export default EdgeDeviceDestination; 