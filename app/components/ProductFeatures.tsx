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
            taglineText="Where artificial intelligence meets enterprise-grade security"
          />
        </div>
        <div className={styles.featuresTextContainer}>
          <p className={styles.description}>
            Crystal Tower embeds AI-powered execution at every stage of the development lifecycle, from requirements to deployment and ongoing operations.
          </p>
          <p className={styles.description}>
            Our platform has security and compliance engineered into the foundation, with intelligence at every layer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures; 