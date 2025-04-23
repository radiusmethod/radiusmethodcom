'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);
  const [isMarketsOpen, setIsMarketsOpen] = useState<boolean>(false);
  const [isCyberSecurityOpen, setIsCyberSecurityOpen] = useState<boolean>(false);
  const [isCompanyOpen, setIsCompanyOpen] = useState<boolean>(false);
  const [isMoreOpen, setIsMoreOpen] = useState<boolean>(false);

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
            <li className={styles.navItem}
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}>
              <span className={styles.navLink}>Products</span>
              {isProductsOpen && (
                <ul className={styles.dropdown}>
                  <li className={styles.dropdownItem}>
                    <Link href="/products/crystal-tower" className={styles.dropdownLink}>Crystal Tower</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/products/crystal-grid" className={styles.dropdownLink}>Crystal Grid</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.navItem}
                onMouseEnter={() => setIsMarketsOpen(true)}
                onMouseLeave={() => setIsMarketsOpen(false)}>
              <span className={styles.navLink}>Markets</span>
              {isMarketsOpen && (
                <ul className={styles.dropdown}>
                  <li className={styles.dropdownItem}>
                    <Link href="/markets/defense" className={styles.dropdownLink}>Defense</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/markets/government" className={styles.dropdownLink}>Government</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/markets/intelligence" className={styles.dropdownLink}>Intelligence</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.navItem}
                onMouseEnter={() => setIsCyberSecurityOpen(true)}
                onMouseLeave={() => setIsCyberSecurityOpen(false)}>
              <span className={styles.navLink}>Cyber Security</span>
              {isCyberSecurityOpen && (
                <ul className={styles.dropdown}>
                  <li className={styles.dropdownItem}>
                    <Link href="/cyber-security/solutions" className={styles.dropdownLink}>Solutions</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/cyber-security/services" className={styles.dropdownLink}>Services</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.navItem}
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => setIsCompanyOpen(false)}>
              <span className={styles.navLink}>Company</span>
              {isCompanyOpen && (
                <ul className={styles.dropdown}>
                  <li className={styles.dropdownItem}>
                    <Link href="/about" className={styles.dropdownLink}>About</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/team" className={styles.dropdownLink}>Team</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/careers" className={styles.dropdownLink}>Careers</Link>
                  </li>
                </ul>
              )}
            </li>
            <li className={styles.navItem}
                onMouseEnter={() => setIsMoreOpen(true)}
                onMouseLeave={() => setIsMoreOpen(false)}>
              <span className={styles.navLink}>More</span>
              {isMoreOpen && (
                <ul className={styles.dropdown}>
                  <li className={styles.dropdownItem}>
                    <Link href="/news" className={styles.dropdownLink}>News</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/resources" className={styles.dropdownLink}>Resources</Link>
                  </li>
                  <li className={styles.dropdownItem}>
                    <Link href="/contact" className={styles.dropdownLink}>Contact</Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        
        <div className={styles.headerButtons}>
          <Link href="/careers" className={styles.headerLink}>
            We're Hiring
          </Link>
          <Link href="/get-started" className={styles.ctaButton}>
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 