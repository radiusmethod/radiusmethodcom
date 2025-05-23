'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';
import { withBasePath } from '../utils/basePath';

// Separate client component for the animated logo
// This isolates the useSearchParams hook in its own client component
const AnimatedLogo = () => {
  const [heatLevel, setHeatLevel] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [cooldownActive, setCooldownActive] = useState(false);
  const [animationEnabled, setAnimationEnabled] = useState(false);
  const lastScrollPos = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const scrollAccumulator = useRef(0);
  
  // Check for the feature flag in query params on component mount
  // Since this is a separate client component, we can access window directly
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const angryParam = urlParams.get('angry');
      setAnimationEnabled(angryParam === '1');
    }
  }, []);
  
  // Create a more reliable cooldown mechanism - only active when animation is enabled
  useEffect(() => {
    if (!animationEnabled) return;
    
    let cooldownInterval: NodeJS.Timeout | null = null;
    
    // If cooldown is active, start a steady interval to reduce heat
    if (cooldownActive && heatLevel > 0) {
      cooldownInterval = setInterval(() => {
        setHeatLevel(prevHeat => {
          const newHeat = Math.max(0, prevHeat - 2);
          
          // If we've reached zero heat, clear the interval and stop cooldown
          if (newHeat === 0) {
            setCooldownActive(false);
            if (isShaking) {
              setIsShaking(false);
            }
          } else if (newHeat < 70 && isShaking) {
            // Stop shaking when cooled down enough
            setIsShaking(false);
          }
          
          return newHeat;
        });
      }, 100);
    }
    
    // Clean up the interval when component unmounts or cooldown state changes
    return () => {
      if (cooldownInterval) {
        clearInterval(cooldownInterval);
      }
    };
  }, [cooldownActive, isShaking, heatLevel, animationEnabled]);

  // Only set up scroll event listener if animation is enabled
  useEffect(() => {
    if (!animationEnabled) {
      // Reset heat level and shaking when animation is disabled
      setHeatLevel(0);
      setIsShaking(false);
      return;
    }
    
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const scrollDelta = Math.abs(currentScrollPos - lastScrollPos.current);
      lastScrollPos.current = currentScrollPos;
      
      // Stop any active cooldown
      setCooldownActive(false);
      
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
      
      // Set timeout to start cooldown when scrolling stops
      scrollTimeout.current = setTimeout(() => {
        setCooldownActive(true);
      }, 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [isShaking, animationEnabled]);
  
  // Force reset to zero when the component unmounts or on page navigation
  useEffect(() => {
    return () => {
      setHeatLevel(0);
      setIsShaking(false);
    };
  }, []);
  
  // Calculate fire colors based on heat level
  const getFireColors = () => {
    // If animation is disabled, return neutral colors
    if (!animationEnabled) {
      return {
        red: 1,
        green: 1,
        blue: 1,
        filter: 'none'
      };
    }
    
    // Handle the case when heat is zero explicitly
    if (heatLevel === 0) {
      return {
        red: 1,
        green: 1,
        blue: 1,
        filter: 'none'
      };
    }
    
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
  
  // Apply shaking animation only if animation is enabled
  const logoContainerClass = `${styles.logo} ${animationEnabled && isShaking && heatLevel > 0 ? styles.logoShaking : ''}`;
  
  // Explicit check for animation enabled and heat level to apply filter
  const svgStyle = !animationEnabled || heatLevel === 0
    ? { filter: 'none' } 
    : {
        filter: `url(#fireFilter) ${fireColors.filter}`,
        transition: 'filter 0.2s ease',
      };

  return (
    <div className={logoContainerClass} ref={logoRef}>
      <Link href="/">
        {/* SVG Filter Definition - only render if animation is enabled */}
        {animationEnabled && (
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
        )}
        
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
  );
};

// Regular logo that doesn't depend on useSearchParams
const RegularLogo = () => {
  return (
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
  );
};

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsMenuOpen, setProductsMenuOpen] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuOpen) {
        const target = event.target as HTMLElement;
        const isMenuButton = target.closest(`.${styles.mobileMenuButton}`);
        const isMenuContent = target.closest(`.${styles.mobileMenuContent}`);
        
        if (!isMenuButton && !isMenuContent) {
          setMobileMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [mobileMenuOpen]);

  // Close products menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (productsMenuOpen && productsMenuRef.current) {
        const target = event.target as HTMLElement;
        if (!productsMenuRef.current.contains(target)) {
          setProductsMenuOpen(false);
        }
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [productsMenuOpen]);

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProductsMenu = () => {
    setProductsMenuOpen(!productsMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        {/* Use Suspense for the client component that might cause CSR bailout */}
        <Suspense fallback={<RegularLogo />}>
          <AnimatedLogo />
        </Suspense>
        
        {/* Desktop Navigation */}
        <nav className={`${styles.navigation} ${styles.desktopNav}`}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="https://archives.radiusmethod.com/about" className={styles.navLink}>Company</a>
            </li>
            <li className={`${styles.navItem} ${styles.hasDropdown}`}>
              <button 
                className={`${styles.navLink} ${styles.dropdownButton}`}
                onClick={toggleProductsMenu}
                aria-expanded={productsMenuOpen}
              >
                Products
              </button>
              {productsMenuOpen && (
                <div className={styles.dropdownMenu} ref={productsMenuRef}>
                  <Link href="/socketzero" className={styles.dropdownItem}>
                    SocketZero
                  </Link>
                </div>
              )}
            </li>
            <li className={styles.navItem}>
              <a href="https://archives.radiusmethod.com/news" className={styles.navLink}>News</a>
            </li>
            <li className={styles.navItem}>
              <a href="https://archives.radiusmethod.com/articles" className={styles.navLink}>Articles</a>
            </li>
            <li className={styles.navItem}>
              <Link href="/contact" className={styles.navLink}>Contact</Link>
            </li>
          </ul>
        </nav>
        
        <div className={`${styles.headerButtons} ${styles.desktopButtons}`}>
          <Link href="/contact" className={styles.ctaButton}>
            Sign up now
          </Link>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={mobileMenuOpen}
        >
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
          <span className={`${styles.hamburgerLine} ${mobileMenuOpen ? styles.hamburgerLineOpen : ''}`}></span>
        </button>
        
        {/* Mobile Menu Dropdown */}
        <div className={`${styles.mobileMenuContent} ${mobileMenuOpen ? styles.mobileMenuOpen : ''}`}>
          <nav className={styles.mobileNav}>
            <ul className={styles.mobileNavList}>
              <li className={styles.mobileNavItem}>
                <a href="https://archives.radiusmethod.com/about" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                  Company
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <div className={styles.mobileNavGroup}>
                  <span className={styles.mobileNavGroupTitle}>Products</span>
                  <Link href="/socketzero" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                    SocketZero
                  </Link>
                </div>
              </li>
              <li className={styles.mobileNavItem}>
                <a href="https://archives.radiusmethod.com/news" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                  News
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <a href="https://archives.radiusmethod.com/articles" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                  Articles
                </a>
              </li>
              <li className={styles.mobileNavItem}>
                <Link href="/contact" className={styles.mobileNavLink} onClick={() => setMobileMenuOpen(false)}>
                  Contact
                </Link>
              </li>
              <li className={styles.mobileNavItem}>
                <Link href="/contact" className={styles.mobileCtaButton} onClick={() => setMobileMenuOpen(false)}>
                  Sign up now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 