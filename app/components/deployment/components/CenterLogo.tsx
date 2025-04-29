import React from 'react';
import Image from 'next/image';
import styles from '../../DeploymentFlexibility.module.css';
import { withBasePath } from '../../../utils/basePath';

interface CenterLogoProps {
  isLogoHighlighted: boolean;
  logoRef: React.RefObject<HTMLDivElement>;
}

const CenterLogo: React.FC<CenterLogoProps> = ({
  isLogoHighlighted,
  logoRef
}) => {
  return (
    <div className={styles.centerContent}>
      <div 
        ref={logoRef}
        className={`${styles.crystalLogoContainer} ${isLogoHighlighted ? styles.logoHighlighted : ''}`}
      >
        <div className={styles.logoGlow}></div>
        <Image
          src={withBasePath('/images/crystal-tower-logo.png')}
          alt="Crystal Tower Logo"
          width={80}
          height={80}
          className={styles.crystalLogoImage}
        />
      </div>
    </div>
  );
};

export default CenterLogo; 