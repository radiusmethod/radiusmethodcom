'use client';

import React from 'react';
import styles from './HeroBanner.module.css';

const HeroBanner: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
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