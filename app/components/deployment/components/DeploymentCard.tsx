import React from 'react';
import { FaBox, FaSpinner } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import styles from '../../DeploymentFlexibility.module.css';

interface DeploymentCardProps {
  isDeploymentCompleted: boolean;
  isPackageAnimating: boolean;
}

const DeploymentCard: React.FC<DeploymentCardProps> = ({
  isDeploymentCompleted,
  isPackageAnimating
}) => {
  return (
    <div className={`${styles.pipelineCard} ${isDeploymentCompleted ? styles.completedCard : ''}`}>
      <div className={styles.cardHeader}>
        <div className={styles.spinnerContainer}>
          <div className={`${styles.spinnerOuter} ${isDeploymentCompleted ? styles.completedSpinner : ''}`}>
            {isDeploymentCompleted ? (
              <BsCheckCircleFill className={styles.checkIcon} />
            ) : (
              <FaSpinner className={styles.spinnerIcon} />
            )}
          </div>
        </div>
        <h4 className={styles.cardTitle}>Production Deployment</h4>
      </div>
      
      {/* Package animation inside the card */}
      {isPackageAnimating && (
        <div className={styles.packageContainer}>
          <FaBox className={styles.packageIcon} />
        </div>
      )}
    </div>
  );
};

export default DeploymentCard; 