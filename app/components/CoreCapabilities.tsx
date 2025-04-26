'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CoreCapabilities.module.css';
import { withBasePath } from '../utils/basePath';

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
                  src={withBasePath('/images/icon-security.png')}
                  alt="Security-First Architecture"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Security-First<br />Architecture</h3>
                <p className={styles.capabilityDescription}>
                  Zero Trust secured with post-quantum encryption
                </p>
              </div>
            </div>
            
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityIcon}>
                <Image 
                  src={withBasePath('/images/icon-deployment.png')}
                  alt="Deployment Flexibility"
                  width={80}
                  height={80}
                  priority
                />
              </div>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Deployment<br />Flexibility</h3>
                <p className={styles.capabilityDescription}>
                  Deploy anywhere - cloud, edge, high or low security environments
                </p>
              </div>
            </div>
          </div>
          
          {/* Center logo */}
          <div className={styles.centerLogo}>
            <Image 
              src={withBasePath('/images/crystal-tower-logo.png')}
              alt="Crystal Tower Logo"
              width={220}
              height={330}
              priority
              className={styles.centerLogoImage}
            />
          </div>
          
          {/* Right capabilities */}
          <div className={styles.capabilitiesColumn}>
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Compliance<br />Automation</h3>
                <p className={styles.capabilityDescription}>
                  Real-time compliance<br />monitoring and validation
                </p>
              </div>
              <div className={styles.capabilityIcon}>
                <Image 
                  src={withBasePath('/images/icon-compliance.png')}
                  alt="Compliance Automation"
                  width={80}
                  height={80}
                  priority
                />
              </div>
            </div>
            
            <div className={styles.capabilityCard}>
              <div className={styles.capabilityText}>
                <h3 className={styles.capabilityTitle}>Native AI<br />Integration</h3>
                <p className={styles.capabilityDescription}>
                  AI woven throughout to<br />enhance productivity and security
                </p>
              </div>
              <div className={styles.capabilityIcon}>
                <Image 
                  src={withBasePath('/images/icon-ai.png')}
                  alt="Native AI Integration"
                  width={80}
                  height={80}
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities; 