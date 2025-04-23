'use client';

import React from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';

const HeroBanner: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <div className={styles.heroImageContainer}>
          <Image 
            src="/images/hero-image.png"
            alt="Crystal Tower - Military-Compliant Software"
            width={800}
            height={400}
            className={styles.heroImage}
            priority
          />
        </div>
        <h1 className={styles.heroTitle}>
          Don't build a bunch of tools - 
          <br />
          execute mission outcomes.
        </h1>
        <button className={styles.ctaButton}>
          Schedule a Demo
        </button>
      </div>
    </section>
  );
};

export default HeroBanner; 