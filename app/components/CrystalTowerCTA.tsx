'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './CrystalTowerCTA.module.css';
import { withBasePath } from '../utils/basePath';
import CrystalTowerBranding from './CrystalTowerBranding';

type Props = {
  id?: string;
};

// Helper function to convert hex to rgb
const hexToRgb = (hex: string): string => {
  // Remove # if present
  hex = hex.replace('#', '');
  
  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  return `${r}, ${g}, ${b}`;
};

const CrystalTowerCTA: React.FC<Props> = ({ id }) => {
  return (
    <section className={styles.ctaSection} id={id}>
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.particleEffect}></div>
      </div>
      
      <div className={styles.contentContainer}>
        <div className={styles.brandingWrapper}>
          <CrystalTowerBranding
            taglineText="Transform Your Secure Software Delivery"
            className={styles.crystalTowerCTABranding}
          />
        </div>
        
        <div className={styles.cardsContainer}>
          {/* Learn More Card */}
          <div className={styles.ctaCard}>
            <div className={styles.cardIconContainer}>
              <Image 
                src={withBasePath('/images/call-to-action/calendar.svg')}
                alt="Calendar icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Want to learn more?</h3>
            <p className={styles.cardDescription}>
              Explore how Crystal Tower can transform your secure software delivery.
            </p>
            <Link 
              href="https://calendar.app.google/NarysUM9aFDoY2fv7" 
              className={styles.cardButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Schedule call
            </Link>
          </div>

          {/* Join Platform Card */}
          <div className={styles.ctaCard}>
            <div className={styles.cardIconContainer}>
              <Image 
                src={withBasePath('/images/call-to-action/join.svg')}
                alt="Join icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Join our platform</h3>
            <p className={styles.cardDescription}>
              Become a value-added reseller and deliver Crystal Tower solutions.
            </p>
            <Link 
              href="https://forms.gle/aYCkuDsNxGhC7FNXA" 
              className={styles.cardButton}
              target="_blank"
              rel="noopener noreferrer"
            >
              Partner with us
            </Link>
          </div>

          {/* AWS Marketplace Card */}
          <div className={styles.ctaCard}>
            <div className={styles.cardIconContainer}>
              <Image 
                src={withBasePath('/images/call-to-action/shopping-cart.svg')}
                alt="Shopping cart icon"
                width={32}
                height={32}
              />
            </div>
            <h3 className={styles.cardTitle}>Purchase on AWS Marketplace</h3>
            <p className={styles.cardDescription}>
              Deploy Crystal Tower directly through AWS Marketplace.
            </p>
            <div className={styles.disabledButton}>
              Coming Soon
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CrystalTowerCTA; 