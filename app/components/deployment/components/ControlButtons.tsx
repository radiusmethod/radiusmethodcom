import React from 'react';
import { FaRedo } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface ControlButtonsProps {
  onRedeployClick: () => void;
  isEnabled?: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ 
  onRedeployClick, 
  isEnabled = true
}) => {
  return (
    <div className={styles.controlButtons}>
      <button 
        className={`${styles.redeployButton} ${!isEnabled ? styles.disabled : ''}`}
        onClick={isEnabled ? onRedeployClick : undefined}
        disabled={!isEnabled}
        aria-label="Redeploy"
        title={isEnabled ? "Redeploy the application" : "Deployment in progress"}
      >
        <FaRedo size={16} /> Redeploy
      </button>
    </div>
  );
};

export default ControlButtons; 