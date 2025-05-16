'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';
import { getBasePath, withBasePath } from '../utils/basePath';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <div className={styles.logo}>
            <Image
              src={withBasePath('/images/rm_logo.svg')}
              alt="Radius Method Logo"
              width={150}
              height={50}
              priority
            />
          </div>
          <p className={styles.tagline}>
            The modern software factory for high-governance environments
          </p>
        </div>

        <div className={styles.footerNav}>
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Products</h3>
            <ul>
              <li><Link href="/">Crystal Tower</Link></li>
              <li><Link href="/">Security Solutions</Link></li>
              <li><Link href="/">Compliance Tools</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Markets</h3>
            <ul>
              <li><Link href="/">Defense</Link></li>
              <li><Link href="/">Government</Link></li>
              <li><Link href="/">Regulated Industries</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul>
              <li><Link href="/">About Us</Link></li>
              <li><Link href="/">Careers</Link></li>
              <li><Link href="/">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Radius Method. All rights reserved.
          </p>
          <div className={styles.legalLinks}>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 