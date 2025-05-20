'use client';

import React, { useEffect } from 'react';
import styles from './contact.module.css';
import Script from 'next/script';

// Add type declaration for HubSpot
declare global {
  interface Window {
    hbspt: {
      forms: {
        create: (config: {
          region: string;
          portalId: string;
          formId: string;
        }) => void;
      };
    };
  }
}

export default function ContactPage() {
  useEffect(() => {
    // Initialize HubSpot form after the script loads
    if (window.hbspt) {
      window.hbspt.forms.create({
        region: "na1",
        portalId: "46526938",
        formId: "d241f50d-b454-44e9-987e-484e5bcc5ddd"
      });
    }
  }, []);

  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>Contact Us</h1>
          <p className={styles.heroSubtitle}>
            Get in touch with our team to learn how we can help secure your organization
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
              {/* HubSpot Form */}
              <div className={styles.hubspotForm}>
                <Script 
                  src="https://js.hsforms.net/forms/embed/46526938.js"
                  strategy="afterInteractive"
                />
                <div 
                  className="hs-form-frame" 
                  data-region="na1" 
                  data-form-id="d241f50d-b454-44e9-987e-484e5bcc5ddd" 
                  data-portal-id="46526938"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 