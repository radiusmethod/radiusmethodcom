import React from 'react';
import CloudIcon from '../../CloudIcon';
import styles from '../../DeploymentFlexibility.module.css';

interface CloudDestinationProps {
  x: number;
  y: number;
  active: boolean;
}

const CloudDestination: React.FC<CloudDestinationProps> = ({ x, y, active }) => {
  return (
    <div className={styles.cloudContainer}>
      <CloudIcon 
        isActive={active} 
        title="GovCloud" 
        className={styles.cloudIcon}
      />
    </div>
  );
};

export default CloudDestination; 