'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProductFeatures.module.css';
import { withBasePath } from '../utils/basePath';

const ProductFeatures: React.FC = () => {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContent}>
        <div className={styles.headerRow}>
          <div className={styles.logoColumn}>
            <Image 
              src={withBasePath('/images/crystal-tower-logo.svg')}
              alt="Crystal Tower Logo"
              width={56}
              height={65}
              priority
              className={styles.crystalLogo}
            />
          </div>
          <div className={styles.titleColumn}>
            <Image
              src={withBasePath('/images/crystal-tower-text.svg')}
              alt="Crystal Tower"
              width={421}
              height={23}
              priority
              className={styles.crystalText}
            />
            <h2 className={styles.tagline}>
              The cross-section of cyber security and defense technology.
            </h2>
          </div>
        </div>
        <div className={styles.featuresTextContainer}>
          <p className={styles.description}>
            Crystal Tower was purpose-built for defense agencies and contractors who need to deliver secure software in highly regulated environments.
          </p>
          <p className={styles.description}>
            Our platform integrates security and compliance throughout the development lifecycle.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures; 