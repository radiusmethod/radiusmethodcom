import React, { useEffect, useState } from 'react';
import ServerRackIcon from './ServerRackIcon';

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
      setIsReceiving(true);
      
      // Auto-reset the receiving state after animation completes
      const timer = setTimeout(() => {
        setIsReceiving(false);
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isReceivingPackage]);

  return (
    <div style={{ 
      position: 'absolute',
      left: `${x}px`,
      top: `${y}px`,
      transform: 'translate(-50%, -50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        width: '220px', 
        height: '220px'
      }}>
        <ServerRackIcon 
          isActive={active} 
          isReceiving={isReceiving} 
        />
      </div>
      
      {isReceiving && (
        <div 
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '240px',
            height: '240px',
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