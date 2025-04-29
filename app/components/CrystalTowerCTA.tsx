'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaHandshake, FaShoppingCart } from 'react-icons/fa';
import styles from './CrystalTowerCTA.module.css';
import { withBasePath } from '../utils/basePath';

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
  const ctaOptions = [
    {
      id: 1,
      title: 'Schedule a Discovery Call',
      description: 'Explore how Crystal Tower can transform your secure software delivery',
      icon: <FaCalendarAlt size={32} />,
      link: 'https://calendar.app.google/NarysUM9aFDoY2fv7',
      color: '#FF5252', // Red accent
      colorRgb: '255, 82, 82'
    },
    {
      id: 2,
      title: 'Become a Value-Added Reseller',
      description: 'Join our partner ecosystem and deliver Crystal Tower solutions',
      icon: <FaHandshake size={32} />,
      link: 'https://forms.gle/aYCkuDsNxGhC7FNXA',
      color: '#FFB81C', // Gold accent
      colorRgb: '255, 184, 28'
    },
    {
      id: 3,
      title: 'Purchase on AWS Marketplace',
      description: 'Deploy Crystal Tower directly through AWS Marketplace',
      icon: <FaShoppingCart size={32} />,
      link: '#',
      buttonText: 'Coming Soon',
      color: '#1CFFBF', // Cyan accent
      colorRgb: '28, 255, 191',
      disabled: true
    }
  ];

  return (
    <section className={styles.ctaSection} id={id}>
      <div className={styles.backgroundEffects}>
        <div className={styles.gridPattern}></div>
        <div className={styles.particleEffect}></div>
      </div>
      
      <div className={styles.contentContainer}>
        <h2 className={styles.sectionTitle}>Transform Your Secure Software Delivery</h2>
        
        <div className={styles.cardsContainer}>
          {ctaOptions.map((option) => (
            <div 
              key={option.id} 
              className={styles.ctaCard}
              style={{ 
                '--card-color': option.color,
                '--card-color-rgb': option.colorRgb
              } as React.CSSProperties}
            >
              <div className={styles.iconContainer}>
                {option.icon}
              </div>
              
              <h3 className={styles.cardTitle}>{option.title}</h3>
              <p className={styles.cardDescription}>{option.description}</p>
              
              {option.disabled ? (
                <div className={styles.actionButton + ' ' + styles.disabled}>
                  {option.buttonText || 'Coming Soon'}
                </div>
              ) : (
                <Link 
                  href={option.link} 
                  className={styles.actionButton}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {option.buttonText || 'Get Started'}
                </Link>
              )}
            </div>
          ))}
        </div>
        
        <div className={styles.logoContainer}>
          <div className={styles.modelContainer}>
            <Image 
              src={withBasePath('/images/crystal-tower-3d-model.png')}
              alt="Crystal Tower 3D Model"
              width={180}
              height={150}
              className={styles.model}
            />
          </div>
          
          <Image 
            src={withBasePath('/images/crystal-tower-logo.svg')}
            alt="Crystal Tower"
            width={150}
            height={50}
            className={styles.logo}
          />
        </div>
      </div>
    </section>
  );
};

export default CrystalTowerCTA; 