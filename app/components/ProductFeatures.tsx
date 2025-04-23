'use client';

import React from 'react';
import Image from 'next/image';
import styles from './ProductFeatures.module.css';

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
              <Image 
                src="/images/crystal-tower-laptop.png"
                alt="Crystal Tower Software Platform"
                width={600}
                height={400}
                className={styles.productImageShadow}
                priority
              />
              <div className={styles.productIcon}>
                <Image 
                  src="/images/crystal-tower-icon.png"
                  alt="Crystal Tower Icon"
                  width={80}
                  height={80}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductFeatures; 