import React from 'react';
import { FaRedo } from 'react-icons/fa';
import styles from '../../DeploymentFlexibility.module.css';

interface ControlButtonsProps {
  onRedeployClick: () => void;
  onTestClick?: () => void;
  showTestButton?: boolean;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onRedeployClick,
  onTestClick,
  showTestButton = false
}) => {
  return (
    <>
      {/* Redeploy button */}
      <button 
        onClick={onRedeployClick}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          background: '#FFB81C',
          color: '#000',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 100
        }}
        title="Redeploy"
      >
        <FaRedo size={18} />
      </button>
      
      {/* Test Animation Button (conditionally rendered) */}
      {showTestButton && onTestClick && (
        <button 
          onClick={onTestClick}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            padding: '10px 15px',
            background: '#FF4081',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            zIndex: 9999,
            fontWeight: 'bold'
          }}
        >
          Test SCIF Animation
        </button>
      )}
    </>
  );
};

export default ControlButtons; 