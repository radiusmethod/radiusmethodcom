'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { withBasePath } from '../utils/basePath';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src={withBasePath('/images/rm_logo.svg')}
              alt="Radius Method Logo" 
              width={129} 
              height={32} 
              priority
            />
          </Link>
        </div>
        
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/products" className={styles.navLink}>Products</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/company" className={styles.navLink}>Company</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/articles" className={styles.navLink}>Articles</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.headerButtons}>
          <Link href="/get-started" className={styles.ctaButton}>
            Sign up now
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 