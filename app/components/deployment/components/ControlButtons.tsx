import React from 'react';
import { FaRedo } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface ControlButtonsProps {
  onRedeployClick: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({ onRedeployClick }) => {
  return (
    <div className={styles.controlButtons}>
      <button 
        className={styles.redeployButton}
        onClick={onRedeployClick}
        aria-label="Redeploy"
      >
        <FaRedo size={16} /> Redeploy
      </button>
    </div>
  );
};

export default ControlButtons; 