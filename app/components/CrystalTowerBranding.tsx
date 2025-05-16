'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CrystalTowerBranding.module.css';
import { withBasePath } from '../utils/basePath';

interface CrystalTowerBrandingProps {
  taglineText?: string;
  customText?: string;
  className?: string;
}

const CrystalTowerBranding: React.FC<CrystalTowerBrandingProps> = ({ 
  taglineText = "The cross-section of cyber security and defense technology.",
  customText,
  className = ''
}) => {
  return (
    <div className={`${styles.brandingContainer} ${className}`}>
      <div className={styles.logoContainer}>
        <Image 
          src={withBasePath('/images/crystal-tower-logo.svg')}
          alt="Crystal Tower Logo"
          width={56}
          height={65}
          priority
          className={styles.crystalLogo}
        />
      </div>
      <div className={styles.textContainer}>
        {customText ? (
          <h2 className={styles.customText}>{customText}</h2>
        ) : (
          <Image
            src={withBasePath('/images/crystal-tower-text.svg')}
            alt="Crystal Tower"
            width={421}
            height={23}
            priority
            className={styles.crystalText}
          />
        )}
        <h2 className={styles.tagline}>
          {taglineText}
        </h2>
      </div>
    </div>
  );
};

export default CrystalTowerBranding; 