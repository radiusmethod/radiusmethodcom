'use client';

import React, { useEffect, useState } from 'react';
import styles from './contact.module.css';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { withBasePath } from '../utils/basePath';

// Import HubSpotForm component with no SSR to prevent hydration issues
const HubSpotForm = dynamic(() => import('../components/HubSpotForm'), {
  ssr: false
});

export default function ContactPage() {
  // Generate a unique key when the component mounts or the path changes
  const pathname = usePathname();
  const [mountKey, setMountKey] = useState('initial');
  
  // Update the key whenever the pathname changes to force remount
  useEffect(() => {
    // Generate a new key each time we navigate to this page
    setMountKey(`form-${Date.now()}`);
  }, [pathname]);

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Contact Crystal Tower</h1>
          <p className={styles.heroSubtitle}>
            Get in touch with our team to learn how we can secure your organization with AI-powered capabilities
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <div className={styles.contactContent}>
            <div className={styles.contactInfo}>
              <h2>Let's Connect</h2>
              <p>
                Interested in implementing Crystal Tower for your mission-critical operations? 
                Have questions about our AI-powered security capabilities? Want to become a partner? We're here to help.
              </p>
              <div className={styles.contactDetails}>
                <div className={styles.contactItem}>
                  <h3>Address</h3>
                  <p>5550 Glades Road, Suite 500<br />Boca Raton, FL 33431</p>
                </div>
                <div className={styles.contactItem}>
                  <h3>Email</h3>
                  <p>info@radiusmethod.com</p>
                </div>
              </div>
            </div>
            <div className={styles.formContainer}>
              {/* HubSpot Form Component with unique key to force remount */}
              <div className={styles.hubspotForm}>
                <HubSpotForm
                  key={mountKey} // This forces the component to remount
                  region="na1"
                  portalId="46526938"
                  formId="d241f50d-b454-44e9-987e-484e5bcc5ddd"
                  className="hs-form-frame"
                  useWhiteBackground={true}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 