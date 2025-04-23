'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProductFeatures.module.css';
import { withBasePath } from '../utils/basePath';

const ProductFeatures: React.FC = () => {
  return (
    <section className={styles.features}>
      <div className={styles.featuresContent}>
        <div className={styles.featuresLayout}>
          <div className={styles.featuresTextContainer}>
            <h2 className={styles.featuresTitle}>
              The cross-section of cyber security<br />and defense technology
            </h2>
            <p className={styles.featuresDescription}>
              Crystal Tower was purpose-built for defense agencies and contractors who need to deliver 
              secure software in highly regulated environments. Our platform integrates security and 
              compliance throughout the development lifecycle.
            </p>
            <button className={styles.ctaButton}>
              Learn More
            </button>
          </div>
          <div className={styles.featuresImageContainer}>
            <div className={styles.productImage}>
              <div className={styles.productIcon}>
                <Image 
                  src={withBasePath('/images/crystal-tower-logo.png')}
                  alt="Crystal Tower Logo"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <Image 
                src={withBasePath('/images/crystal-tower-laptop.png')}
                alt="Crystal Tower Software Platform"
                width={600}
                height={400}
                className={styles.productImageShadow}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures; 