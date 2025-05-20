'use client';

import React from 'react';
import Image from 'next/image';
import styles from './CoreCapabilities.module.css';
import { withBasePath } from '../utils/basePath';

const CoreCapabilities: React.FC = () => {
  return (
    <section className={styles.capabilities}>
      <div className={styles.capabilitiesContent}>
        <h2 className={styles.capabilitiesTitle}>Core Capabilities</h2>
        
        <div className={styles.capabilitiesGrid}>
          <div className={styles.capabilityCard}>
            <div className={styles.capabilityIcon}>
              <Image 
                src={withBasePath('/images/core-capabilities/shield.svg')}
                alt="Security-First Architecture"
                width={48}
                height={48}
                priority
              />
            </div>
            <div className={styles.capabilityText}>
              <h3 className={styles.capabilityTitle}>Security-First Architecture</h3>
              <p className={styles.capabilityDescription}>
                Zero Trust secured with post-quantum encryption.
              </p>
            </div>
          </div>
          
          <div className={styles.capabilityCard}>
            <div className={styles.capabilityIcon}>
              <Image 
                src={withBasePath('/images/core-capabilities/clipboard.svg')}
                alt="Compliance Automation"
                width={48}
                height={48}
                priority
              />
            </div>
            <div className={styles.capabilityText}>
              <h3 className={styles.capabilityTitle}>Compliance Automation</h3>
              <p className={styles.capabilityDescription}>
                Real-time compliance monitoring and validation.
              </p>
            </div>
          </div>
          
          <div className={styles.capabilityCard}>
            <div className={styles.capabilityIcon}>
              <Image 
                src={withBasePath('/images/core-capabilities/package.svg')}
                alt="Deployment Flexibility"
                width={48}
                height={48}
                priority
              />
            </div>
            <div className={styles.capabilityText}>
              <h3 className={styles.capabilityTitle}>Deployment Flexibility</h3>
              <p className={styles.capabilityDescription}>
                Deploy anywhere - commercial/government clouds, air-gapped networks, and tactical edge.
              </p>
            </div>
          </div>
          
          <div className={styles.capabilityCard}>
            <div className={styles.capabilityIcon}>
              <Image 
                src={withBasePath('/images/core-capabilities/brain.svg')}
                alt="Native AI Integration"
                width={48}
                height={48}
                priority
              />
            </div>
            <div className={styles.capabilityText}>
              <h3 className={styles.capabilityTitle}>Native AI Integration</h3>
              <p className={styles.capabilityDescription}>
                AI woven throughout to enhance productivity and security.
              </p>
            </div>
          </div>
        </div>
        
        <div className={styles.learnMoreContainer}>
          <button className={styles.learnMoreButton}>
            <span className={styles.arrowIcon}>↓</span> Learn how it works
          </button>
        </div>
      </div>
    </section>
  );
};

export default CoreCapabilities; 