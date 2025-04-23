'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CoreCapabilities.module.css';

const CoreCapabilities: React.FC = () => {
  return (
    <section className={styles.capabilities}>
      <div className={styles.capabilitiesContent}>
        <h2 className={styles.capabilitiesTitle}>CORE CAPABILITIES</h2>
        
        <div className={styles.capabilitiesLayout}>
          {/* Left capabilities */}
          <div className={styles.capabilitiesColumn}>
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <Image 
                  src="/images/icon-security.png"
                  alt="Security-First Architecture"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Security-First<br />Architecture</h3>
                <p className={styles.capabilityDescription}>
                  Comprehensive security<br />integrated at every layer
                </p>
              </div>
            </div>
            
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <Image 
                  src="/images/icon-deployment.png"
                  alt="Deployment Flexibility"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Deployment<br />Flexibility</h3>
                <p className={styles.capabilityDescription}>
                  Supports diverse environments<br />and deployment models
                </p>
              </div>
            </div>
          </div>
          
          {/* Center logo */}
          <div className={styles.centerLogo}>
            <Image 
              src="/images/crystal-tower-logo.png"
              alt="Crystal Tower Logo"
              width={200}
              height={300}
              priority
            />
          </div>
          
          {/* Right capabilities */}
          <div className={styles.capabilitiesColumn}>
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <Image 
                  src="/images/icon-compliance.png"
                  alt="Compliance Automation"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Compliance<br />Automation</h3>
                <p className={styles.capabilityDescription}>
                  Real-time compliance<br />monitoring and validation
                </p>
              </div>
            </div>
            
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <Image 
                  src="/images/icon-ai.png"
                  alt="Native AI Integration"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Native AI<br />Integration</h3>
                <p className={styles.capabilityDescription}>
                  AI woven throughout to<br />enhance productivity
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities; 