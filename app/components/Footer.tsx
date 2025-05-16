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
              <li><Link href="/products">All Products</Link></li>
              <li><Link href="/products/crystal-tower">Crystal Tower</Link></li>
              <li><Link href="/products/security">Security Solutions</Link></li>
            </ul>
          </div>

          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Company</h3>
            <ul>
              <li><Link href="/company">About Us</Link></li>
              <li><Link href="/company/team">Our Team</Link></li>
              <li><Link href="/careers">Careers</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Articles</h3>
            <ul>
              <li><Link href="/articles">All Articles</Link></li>
              <li><Link href="/articles/case-studies">Case Studies</Link></li>
              <li><Link href="/articles/blog">Blog</Link></li>
            </ul>
          </div>
          
          <div className={styles.footerColumn}>
            <h3 className={styles.columnTitle}>Contact</h3>
            <ul>
              <li><Link href="/contact">Contact Us</Link></li>
              <li><Link href="/support">Support</Link></li>
              <li><Link href="/get-started">Get Started</Link></li>
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
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 