import React, { useMemo, useEffect, useState } from 'react';
import styles from '../../DeploymentFlexibility.module.css';
import EdgeSatelliteDishIcon from './EdgeSatelliteDishIcon';
import EdgeHangarIcon from './EdgeHangarIcon';
import EdgeSatelliteIcon from './EdgeSatelliteIcon';
import EdgeDroneIcon from './EdgeDroneIcon';

interface EdgeDestinationProps {
  id: string;
  x: number;
  y: number;
  name: string;
  description: string;
  active: boolean;
  isReceiving: boolean;
}

const EdgeDestination: React.FC<EdgeDestinationProps> = ({
  id,
  x,
  y,
  name,
  description,
  active,
  isReceiving
}) => {
  // State for each component to track active signals
  const [isSatelliteReceiving, setIsSatelliteReceiving] = useState(false);
  const [isSatelliteSending, setIsSatelliteSending] = useState(false);
  const [isDroneReceiving, setIsDroneReceiving] = useState(false);
  
  // Calculate the ground station position - this should match the endpoint
  // of the Edge animation path (40% from center to destination horizontally,
  // 50% vertically)
  const groundStationPosition = useMemo(() => {
    // Calculate from destination assuming center is at 50,50
    const centerX = 50;
    const centerY = 50;
    
    return {
      x: centerX + (x - centerX) * 0.4,
      y: centerY + (y - centerY) * 0.5
    };
  }, [x, y]);
  
  // Debug logging
  console.log('Ground station position:', groundStationPosition);
  
  // Determine if dish is receiving or sending
  const isDishReceiving = isReceiving;
  const isDishSending = active && isReceiving;
  
  // Handle receiving package animation sequence
  useEffect(() => {
    if (isReceiving) {
      console.log('Starting Edge Destination animation sequence');
      
      // First, satellite dish receives the package
      setIsSatelliteReceiving(true);
      
      // After 1s, satellite starts sending to the satellite in the sky
      const satelliteSendingTimeout = setTimeout(() => {
        setIsSatelliteSending(true);
      }, 1000);
      
      // After 2s, satellite in the sky receives
      const satelliteReceivingTimeout = setTimeout(() => {
        setIsSatelliteReceiving(true);
      }, 2000);
      
      // After 3s, the drone receives
      const droneReceivingTimeout = setTimeout(() => {
        setIsDroneReceiving(true);
      }, 3000);
      
      return () => {
        clearTimeout(satelliteSendingTimeout);
        clearTimeout(satelliteReceivingTimeout);
        clearTimeout(droneReceivingTimeout);
      };
    }
  }, [isReceiving]);
  
  return (
    <div className={styles.destination} style={{ left: `${x}%`, top: `${y}%` }}>
      {/* Background with hangar and runway */}
      <div className={styles.destinationIcon}>
        <EdgeHangarIcon isActive={active} />
      </div>
      
      {/* Satellite dish positioned at the ground station */}
      <div style={{ 
        position: 'absolute',
        left: `${(groundStationPosition.x - x)}%`,
        top: `${(groundStationPosition.y - y)}%`,
        width: '50px',
        height: '50px',
        zIndex: 3,
        transform: 'translate(-50%, -50%)'
      }}>
        <EdgeSatelliteDishIcon 
          isActive={active} 
          isReceiving={isDishReceiving}
          isSending={isDishSending}
        />
      </div>
      
      {/* Satellite in the sky - top middle */}
      <div style={{ 
        position: 'absolute',
        top: '10px',
        left: '75px',
        width: '50px',
        height: '50px',
        zIndex: 2
      }}>
        <EdgeSatelliteIcon 
          isActive={active} 
          isReceiving={isSatelliteReceiving}
          isSending={isSatelliteSending}
        />
      </div>
      
      {/* Drone/aircraft on the runway - right side */}
      <div style={{ 
        position: 'absolute',
        bottom: '30px',
        right: '30px',
        width: '60px',
        height: '45px',
        zIndex: 4
      }}>
        <EdgeDroneIcon 
          isActive={active} 
          isReceiving={isDroneReceiving}
        />
      </div>
      
      {/* Destination label */}
      <div className={styles.destinationLabel}>
        <strong>{name}</strong>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default EdgeDestination; 