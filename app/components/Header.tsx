'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { withBasePath } from '../utils/basePath';

const Header: React.FC = () => {
  const [heatLevel, setHeatLevel] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const lastScrollPos = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  const lastHeatLevel = useRef(0);
  const stuckDetectionTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollDelta = Math.abs(currentScrollPos - lastScrollPos.current);
      lastScrollPos.current = currentScrollPos;
      
      // Accumulate scroll amount before applying heat
      scrollAccumulator.current += scrollDelta;
      
      // Throttle heat increase to create a more gradual effect
      if (scrollAccumulator.current > 30) {
        // Convert accumulated scroll to heat, with diminishing returns for rapid scrolling
        const heatIncrease = Math.min(5, scrollAccumulator.current * 0.05);
        scrollAccumulator.current = 0;
        
        // Increase heat based on scroll speed
        setHeatLevel(prevHeat => {
          const newHeat = Math.min(100, prevHeat + heatIncrease);
          
          // Start shaking if very hot
          if (newHeat > 80 && !isShaking) {
            setIsShaking(true);
          }
          
          return newHeat;
        });
      }
      
      // Clear any existing timeout for cooling
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      
      // Clear any stuck detection timeout
      if (stuckDetectionTimeout.current) {
        clearTimeout(stuckDetectionTimeout.current);
      }
      
      // Set timeout to cool down when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        coolDown();
      }, 100);
    };
    
    const coolDown = () => {
      // Store the current heat level before update
      const currentHeat = heatLevel;
      lastHeatLevel.current = currentHeat;
      
      setHeatLevel(prevHeat => {
        // Use a more aggressive cool-down rate for mid-range heat levels
        // This helps ensure we don't get stuck in the yellow range
        let coolingRate = 3; // Default cooling rate
        
        // If we're in the yellow zone (15-35), cool faster to get past it
        if (prevHeat > 15 && prevHeat < 35) {
          coolingRate = 6;
        }
        
        // Reduce cooling rate to make it cool down more slowly
        const newHeat = Math.max(0, prevHeat - coolingRate);
        
        // Stop shaking when cooled down enough
        if (newHeat <= 0) {
          setIsShaking(false);
        } else if (newHeat < 70 && isShaking) {
          setIsShaking(false);
        }
        
        // Continue cooling until heat is exactly zero
        if (newHeat > 0) {
          scrollTimeout.current = setTimeout(coolDown, 80);
          
          // Set a timeout to detect if we're stuck
          stuckDetectionTimeout.current = setTimeout(() => {
            // If heat hasn't changed or is stuck in yellow range (10-30),
            // force it to cool completely
            if (heatLevel === lastHeatLevel.current || 
               (heatLevel > 10 && heatLevel < 30)) {
              console.log('Detected stuck cooling, forcing to zero');
              setHeatLevel(0);
              setIsShaking(false);
            }
          }, 1000);
          
        } else if (prevHeat > 0 && newHeat === 0) {
          // Ensure we apply one final update with heat at exactly zero
          // This ensures the color is completely reset
          setTimeout(() => {
            setHeatLevel(0);
          }, 50);
        }
        
        return newHeat;
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      if (stuckDetectionTimeout.current) {
        clearTimeout(stuckDetectionTimeout.current);
      }
    };
  }, [isShaking, heatLevel]);
  
  // Calculate fire colors based on heat level
  const getFireColors = () => {
    // Create a fire-like color progression based on heat level
    if (heatLevel < 20) {
      // Normal to warm white/yellow (0-20%)
      return {
        red: 1 + (heatLevel * 0.05),  // Increase red slightly
        green: 1 + (heatLevel * 0.04), // Increase green a bit less
        blue: 1,                       // Keep blue mostly unchanged
        filter: `brightness(${1 + heatLevel * 0.01})` // Slight brightness increase
      };
    } else if (heatLevel < 50) {
      // Yellow to orange transition (20-50%)
      const normalizedHeat = (heatLevel - 20) / 30; // 0 to 1 in this range
      return {
        red: 2,                           // Red is high
        green: 1.8 - (normalizedHeat * 0.8), // Green decreases
        blue: 1 - (normalizedHeat * 0.6),   // Blue decreases more
        filter: `brightness(${1.2 + normalizedHeat * 0.3})` // More brightness
      };
    } else if (heatLevel < 80) {
      // Orange to red transition (50-80%)
      const normalizedHeat = (heatLevel - 50) / 30; // 0 to 1 in this range
      return {
        red: 2,                           // Red stays high
        green: 1 - (normalizedHeat * 0.6),  // Green continues to decrease
        blue: 0.4 - (normalizedHeat * 0.4),  // Blue decreases to almost zero
        filter: `brightness(${1.5 - normalizedHeat * 0.3})` // Brightness starts to decrease
      };
    } else {
      // Deep red to extremely hot red (80-100%)
      const normalizedHeat = (heatLevel - 80) / 20; // 0 to 1 in this range
      return {
        red: 2 + (normalizedHeat * 0.5),    // Red goes up even more
        green: 0.4 - (normalizedHeat * 0.3), // Green fades more
        blue: 0,                           // No blue
        filter: `brightness(${1.2 + normalizedHeat * 0.8})` // Gets very bright again
      };
    }
  };
  
  const fireColors = getFireColors();
  
  // Use SVG filters to only turn the filled parts (text) red
  const logoContainerClass = `${styles.logo} ${isShaking && heatLevel > 0 ? styles.logoShaking : ''}`;
  
  // Dynamic styles based on heat level
  const svgStyle = {
    filter: heatLevel > 0 ? `url(#fireFilter) ${fireColors.filter}` : 'none',
    transition: 'filter 0.2s ease',
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={logoContainerClass} ref={logoRef}>
          <Link href="/">
            {/* SVG Filter Definition */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
              <defs>
                <filter id="fireFilter" colorInterpolationFilters="sRGB">
                  {/* This filter creates a fire-like effect */}
                  <feColorMatrix
                    type="matrix"
                    values={`
                      ${fireColors.red} 0 0 0 0
                      0 ${fireColors.green} 0 0 0
                      0 0 ${fireColors.blue} 0 0
                      0 0 0 1 0
                    `}
                  />
                </filter>
              </defs>
            </svg>
            
            <Image 
              src={withBasePath('/images/rm_logo.svg')}
              alt="Radius Method Logo" 
              width={129} 
              height={32} 
              priority
              style={svgStyle}
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