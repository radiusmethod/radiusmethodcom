import React from 'react';
import { FaFighterJet } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface EdgeDeviceDestinationProps {
  x: number;
  y: number;
  active: boolean;
}

const EdgeDeviceDestination: React.FC<EdgeDeviceDestinationProps> = ({ x, y, active }) => {
  return (
    <div className={styles.destinationContent}>
      <div 
        className={styles.destinationIcon} 
        style={{
          color: active ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
        }}
      >
        <FaFighterJet size={24} />
      </div>
      <h4>Edge Device</h4>
      <p>Tactical military edge deployments</p>
    </div>
  );
};

export default EdgeDeviceDestination; 