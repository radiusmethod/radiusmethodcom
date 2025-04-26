import React from 'react';
import styles from '../../DeploymentFlexibility.module.css';
import Image from 'next/image';

interface ScifDestinationProps {
  x: number;
  y: number;
  active: boolean;
}

const ScifDestination: React.FC<ScifDestinationProps> = ({ x, y, active }) => {
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
          filter: active ? 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))' : 'none'
        }}
        priority
      />
    </div>
  );
};

export default ScifDestination; 