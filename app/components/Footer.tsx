'use client';

import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <div className={styles.footerInfo}>
            <p className={styles.copyright}>
              © {new Date().getFullYear()} Radius Method. All rights reserved.
            </p>
            <p className={styles.address}>
              5550 Glades Road, Suite 500<br />
              Boca Raton, FL 33431
            </p>
          </div>
          <div className={styles.legalLinks}>
            <a href="https://archives.radiusmethod.com/about">Company</a>
            <a href="https://archives.radiusmethod.com/contact">Contact</a>
            <a href="https://archives.radiusmethod.com/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 