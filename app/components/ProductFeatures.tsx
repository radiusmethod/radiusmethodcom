'use client';

import React from 'react';
import styles from './ProductFeatures.module.css';
import CrystalTowerBranding from './CrystalTowerBranding';

const ProductFeatures: React.FC = () => {
  return (
    <section className={styles.features} id="crystal-tower">
      <div className={styles.featuresContent}>
        <div className={styles.headerRow}>
          <CrystalTowerBranding 
            taglineText="The cross-section of cyber security and defense technology."
          />
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