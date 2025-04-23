'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isCapabilitiesOpen, setIsCapabilitiesOpen] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logo}>
          <Link href="/">
            <Image 
              src="/images/rm_logo.png" 
              alt="Radius Method Logo" 
              width={180} 
              height={60} 
              priority
            />
          </Link>
        </div>
        
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>Home</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>About</Link>
            </li>
            <li className={styles.navItem} 
                onMouseEnter={() => setIsCapabilitiesOpen(true)}
                onMouseLeave={() => setIsCapabilitiesOpen(false)}>
              <span className={styles.navLink}>Capabilities</span>
              {isCapabilitiesOpen && (
                <ul className={styles.dropdown}>
                  <li className={styles.dropdownItem}>
                    <span className={styles.dropdownHeader}>Crystal Stack</span>
                    <ul className={styles.nestedDropdown}>
                      <li><Link href="/capabilities/crystal-grid" className={styles.dropdownLink}>Crystal Grid</Link></li>
                      <li><Link href="/capabilities/crystal-tower" className={styles.dropdownLink}>Crystal Tower</Link></li>
                    </ul>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/capabilities/deadfall" className={styles.dropdownLink}>Deadfall</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/capabilities/landmine" className={styles.dropdownLink}>Landmine</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/capabilities/socketzero" className={styles.dropdownLink}>SocketZero</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/capabilities/sphere" className={styles.dropdownLink}>Sphere</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/capabilities/syphonforge" className={styles.dropdownLink}>SyphonForge</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/capabilities/services" className={styles.dropdownLink}>Services</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.navItem}>
              <Link href="/articles" className={styles.navLink}>Articles</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/oss" className={styles.navLink}>OSS</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/news" className={styles.navLink}>News</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/join-us" className={styles.navLink}>Join Us</Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header; 