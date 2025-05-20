import React, { useEffect, useState } from 'react';
import CloudIcon from './CloudIcon';
import styles from '../../DeploymentFlexibility.module.css';

interface CloudDestinationProps {
  x: number;
  y: number;
  active: boolean;
  isReceivingPackage?: boolean;
}

const CloudDestination: React.FC<CloudDestinationProps> = ({ 
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
      className={styles.cloudContainer}
      style={{
        // Ensure consistent positioning regardless of state
        position: 'relative',
        width: '200px', 
        height: '170px',
        // Contain any rotation animations to prevent affecting position
        transformStyle: 'preserve-3d',
        transformOrigin: 'center center',
        perspective: '1000px'
      }}
    >
      <CloudIcon 
        isActive={active} 
        isReceiving={isReceiving}
        title="GovCloud" 
        className={`${styles.cloudIcon} ${isReceiving ? styles.receiving : ''}`}
      />
    </div>
  );
};

export default CloudDestination; 