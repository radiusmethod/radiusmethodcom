import React, { useEffect, useState } from 'react';
import { FaDatabase } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface BareMetalDestinationProps {
  x: number;
  y: number;
  active: boolean;
  isReceivingPackage?: boolean;
}

const BareMetalDestination: React.FC<BareMetalDestinationProps> = ({ 
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
      console.log(`BareMetalDestination at ${x},${y} RECEIVING PACKAGE`);
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
        <FaDatabase size={24} />
      </div>
      <h4 style={{
        color: isReceiving ? "#FFE44D" : active ? "#FFB81C" : "white"
      }}>Bare Metal</h4>
      <p>High-performance dedicated hardware</p>
      
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

export default BareMetalDestination; 