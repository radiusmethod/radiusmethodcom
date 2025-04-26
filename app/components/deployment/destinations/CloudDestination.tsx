import React, { useEffect, useState } from 'react';
import CloudIcon from '../../CloudIcon';
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
  
  // Add debug logging to make sure the active state is passed correctly
  console.log(`CloudDestination active=${active}, x=${x}, y=${y}`);
  
  // Use effect to log when active state changes
  useEffect(() => {
    if (active) {
      console.log(`CloudDestination at ${x},${y} ACTIVATED`);
    }
  }, [active, x, y]);
  
  // Use effect to handle the receiving package state
  useEffect(() => {
    if (isReceivingPackage) {
      console.log(`CloudDestination at ${x},${y} RECEIVING PACKAGE`);
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
        // Ensure no position changes during animations
        position: 'relative',
        width: '200px', // Increased from 100px to 200px
        height: '170px', // Increased from 100px to 170px
        // Don't apply any additional transforms here to avoid position issues
        transform: 'none'
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