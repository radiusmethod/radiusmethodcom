'use client';

import React from 'react';
import styles from './SectionSeparator.module.css';

const SectionSeparator: React.FC = () => {
  return (
    <div className={styles.separatorContainer}>
      <div className={styles.separatorContent}>
        <div className={styles.line}></div>
        <div className={styles.codeElements}>
          <span className={styles.bracket}>&lt;</span>
          <span className={styles.slash}>/</span>
          <span className={styles.bracket}>&gt;</span>
        </div>
        <div className={styles.line}></div>
      </div>
      <div className={styles.gridBg}></div>
    </div>
  );
};

export default SectionSeparator; 