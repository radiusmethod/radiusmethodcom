'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { getBasePath, withBasePath } from '../utils/basePath';

const HeroBanner: React.FC = () => {
  // Construct the background image URL with the base path
  const heroBackgroundStyle = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.85)), url(${withBasePath('/images/hero-background.jpg')})`
  };

  return (
    <section className={styles.hero} style={heroBackgroundStyle}>
      <div className={styles.heroContent}>
        <div className={styles.heroLayout}>
          <div className={styles.heroImageContainer}>
            <Image 
              src={withBasePath('/images/hero-image.png')}
              alt="Crystal Tower - Military-Compliant Software"
              width={700}
              height={350}
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroTitle}>
              Execute mission outcomes.
            </h1>
            <p className={styles.heroSubtitle}>
              The modern software factory for high-governance environments
            </p>
            <button className={styles.ctaButton}>
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 