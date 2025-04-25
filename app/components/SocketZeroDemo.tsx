'use client';

import React, { useState, useCallback } from 'react';
import styles from './SocketZeroDemo.module.css';
import { FaLock, FaUnlock, FaIdCard, FaCheckCircle } from 'react-icons/fa';

type Props = {
  id?: string;
};

// Screen states for the demo
enum ScreenState {
  LOGIN = 'login',
  APP_TILES = 'app_tiles',
}

const SocketZeroDemo: React.FC<Props> = ({ id }) => {
  // Track the current screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(ScreenState.LOGIN);
  
  // Track if CAC card is "inserted"
  const [isCacConnected, setIsCacConnected] = useState(false);
  
  // Simulate CAC card connection
  const handleConnectCac = useCallback(() => {
    console.log("CAC connect button clicked");
    setIsCacConnected(true);
    
    // After a brief delay, show the app tiles screen
    setTimeout(() => {
      setCurrentScreen(ScreenState.APP_TILES);
      console.log("Transitioning to app tiles screen");
    }, 1500);
  }, []);
  
  return (
    <section id={id} className={styles.socketZeroDemo}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Zero Trust Access</h2>
        <p className={styles.sectionSubtitle}>
          Secure access to critical applications with SocketZero, our military-grade Zero Trust solution
        </p>
        
        {/* Test button outside laptop for debugging */}
        <div 
          onClick={handleConnectCac} 
          style={{ 
            marginBottom: '20px', 
            padding: '10px 20px', 
            backgroundColor: 'blue', 
            color: 'white', 
            cursor: 'pointer', 
            borderRadius: '4px',
            display: currentScreen === ScreenState.LOGIN ? 'block' : 'none'
          }}
        >
          Test Button (Click me if laptop button doesn't work)
        </div>
        
        <div className={styles.laptopContainer}>
          {/* Laptop Frame SVG */}
          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              {/* Screen Content based on current state */}
              <div 
                className={styles.screenContent}
                onClick={(e) => {
                  // Only handle clicks on the screen content, not on buttons inside it
                  if ((e.target as HTMLElement).className === styles.screenContent) {
                    console.log("Screen content clicked");
                  }
                }}
              >
                {currentScreen === ScreenState.LOGIN ? (
                  <LoginScreen 
                    isCacConnected={isCacConnected} 
                    onConnectCac={handleConnectCac} 
                  />
                ) : (
                  <AppTilesScreen />
                )}
              </div>
            </div>
            <div className={styles.laptopBase}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Login Screen Component
interface LoginScreenProps {
  isCacConnected: boolean;
  onConnectCac: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ isCacConnected, onConnectCac }) => {
  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginHeader}>
        <h3>SocketZero</h3>
        <p>Secure Access Portal</p>
      </div>
      
      <div className={styles.loginForm}>
        <div className={styles.cacCardSection}>
          <div className={`${styles.cacCard} ${isCacConnected ? styles.cacCardConnected : ''}`}>
            <FaIdCard size={40} />
            <span>{isCacConnected ? 'CAC Connected' : 'Insert CAC'}</span>
          </div>
          
          <div className={styles.cacStatus}>
            {isCacConnected ? (
              <div className={styles.cacConnected}>
                <FaCheckCircle size={24} />
                <span>Authentication successful</span>
              </div>
            ) : (
              <div 
                role="button"
                className={styles.connectButton}
                onClick={onConnectCac}
                onKeyDown={(e) => e.key === 'Enter' && onConnectCac()}
                tabIndex={0}
                style={{
                  backgroundColor: '#d13c2e',
                  color: 'white',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  position: 'relative',
                  zIndex: 1000,
                  display: 'inline-block',
                  margin: '0 auto'
                }}
              >
                Connect CAC
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.securityInfo}>
          <div className={styles.securityBadge}>
            <FaLock size={16} />
            <span>Zero Trust Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Application Tiles Screen Component
const AppTilesScreen: React.FC = () => {
  const apps = [
    { id: 'crystal-tower', name: 'Crystal Tower', shortName: 'C', color: '#D13C2E' },
    { id: 'gitlab', name: 'Gitlab', shortName: 'G', color: '#D13C2E' },
    // Add more apps as needed
  ];
  
  return (
    <div className={styles.appTilesScreen}>
      <div className={styles.socketZeroHeader}>
        <div className={styles.headerTitle}>
          <h3>Radius Method</h3>
          <p>socketzero.crystaltower.prod.rm.radiusmethod.us</p>
        </div>
        <button className={styles.disconnectButton}>
          Disconnect
        </button>
      </div>
      
      <div className={styles.tilesContainer}>
        {apps.map(app => (
          <div key={app.id} className={styles.appTile}>
            <div 
              className={styles.tileIcon} 
              style={{ backgroundColor: app.color }}
            >
              {app.shortName}
            </div>
            <div className={styles.tileStatus}>
              <span className={styles.statusDot}></span>
              <span className={styles.appName}>{app.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocketZeroDemo; 