import React from 'react';
import { FaDatabase } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface BareMetalDestinationProps {
  x: number;
  y: number;
  active: boolean;
}

const BareMetalDestination: React.FC<BareMetalDestinationProps> = ({ x, y, active }) => {
  return (
    <div className={styles.destinationContent}>
      <div 
        className={styles.destinationIcon} 
        style={{
          color: active ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
        }}
      >
        <FaDatabase size={24} />
      </div>
      <h4>Bare Metal</h4>
      <p>High-performance dedicated hardware</p>
    </div>
  );
};

export default BareMetalDestination; 