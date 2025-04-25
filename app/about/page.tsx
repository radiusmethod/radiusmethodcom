import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { withBasePath } from '../utils/basePath';
import SectionSeparator from '../components/SectionSeparator';
import styles from './about.module.css';

// Import SVG components
import MissionGraphic from '../components/SVGs/MissionGraphic';
import FounderPortrait from '../components/SVGs/FounderPortrait';
import MarketplacePreview from '../components/SVGs/MarketplacePreview';
import TeamMember from '../components/SVGs/TeamMember';
import SecurityIcon from '../components/SVGs/SecurityIcon';
import InnovationIcon from '../components/SVGs/InnovationIcon';
import IntegrityIcon from '../components/SVGs/IntegrityIcon';
import ExcellenceIcon from '../components/SVGs/ExcellenceIcon';

export const metadata: Metadata = {
  title: 'About | Radius Method',
  description: 'Learn about Radius Method, our mission, and our commitment to secure DevSecOps solutions for government and enterprise.',
};

export default function AboutPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>About Radius Method</h1>
          <p className={styles.heroSubtitle}>
            Securing America's digital infrastructure through innovative DevSecOps solutions
          </p>
        </div>
      </section>

      {/* Techy Separator */}
      <SectionSeparator />

      {/* Mission & Vision Section */}
      <section className={styles.missionSection}>
        <div className={styles.container}>
          <div className={styles.missionContent}>
            <div className={styles.missionText}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p>
                At Radius Method, we're dedicated to creating secure, scalable software solutions that protect our nation's most critical digital infrastructure. Our team of experts brings years of experience in cybersecurity, cloud architecture, and DevSecOps to help government agencies and enterprises navigate the increasingly complex threat landscape.
              </p>
            </div>
            <div className={styles.missionImage}>
              <div className={styles.roundedImage}>
                <MissionGraphic />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techy Separator */}
      <SectionSeparator />

      {/* Founder Quote Section */}
      <section className={styles.quoteSection}>
        <div className={styles.container}>
          <div className={styles.quoteContent}>
            <div className={styles.quoteImage}>
              <div className={styles.founderImage}>
                <FounderPortrait />
              </div>
            </div>
            <div className={styles.quoteText}>
              <blockquote>
                "The cyber security industry is very misunderstood today. We are in an active state of fighting an invisible war whether we know it or not. This is what fuels me to want to help organizations understand their objectives and protect them. The way a cyber security architecture is designed is not a one-size-fits-all. It requires the deepest knowledge of vulnerabilities of an organization in order to help them find their strengths."
              </blockquote>
              <cite>– Danny Gershman, Founder and CEO</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Techy Separator */}
      <SectionSeparator />

      {/* Contract Vehicles Section */}
      <section className={styles.contractSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Contract Vehicles</h2>
          
          <div className={styles.contractCards}>
            <div className={styles.contractCard}>
              <h3>GSA Multiple Award Contract</h3>
              <div className={styles.contractDetails}>
                <p><strong>GSA Contract Number:</strong> 47QTCA25D002T</p>
                <p><strong>Period of Performance:</strong> Dec 6, 2024 to Dec 5, 2029</p>
                <p><strong>SINS:</strong> 54151S, 518210C</p>
                <p><strong>DUNS:</strong> UBFJZ7XQXMM5</p>
                <p><strong>CAGE:</strong> 97HZ8</p>
                <p><strong>PRIMARY NAICS:</strong> 541511</p>
                <p><strong>OTHER NAICS:</strong> 518210, 541512, 541513, 541519, 541990, 611420</p>
              </div>
            </div>
            
            <div className={styles.contractCard}>
              <h3>Platform One Solutions Marketplace</h3>
              <div className={styles.contractDetails}>
                <p>
                  Radius Method's DevSecOps as a Service is available and awardable in the P1 Marketplace. 
                  For more information visit: <a href="https://p1-marketplace.com" target="_blank" rel="noopener noreferrer">p1-marketplace.com</a>
                </p>
                <div className={styles.marketplacePreview}>
                  <div className={styles.marketplaceImage}>
                    <MarketplacePreview />
                  </div>
                  <p>The P1 Solutions Marketplace is a digital repository of post-competition, 5-minute long readily-awardable pitch videos, which address the Government's greatest requirements in hardware, software and service solutions.</p>
                </div>
                <div className={styles.downloadButton}>
                  <a href="#" className={styles.button}>Download Current Capabilities One Pager</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Techy Separator */}
      <SectionSeparator />

      {/* Team Section */}
      <section className={styles.teamSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Leadership Team</h2>
          <p className={styles.teamDescription}>
            Our team brings decades of experience in cyber security, software development, and government contracting to deliver innovative solutions for our clients.
          </p>
          
          <div className={styles.teamGrid}>
            {/* Team member cards would go here - using placeholder content */}
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <div className={styles.memberImage}>
                  <TeamMember variant="primary" />
                </div>
              </div>
              <h3>Danny Gershman</h3>
              <p className={styles.teamRole}>Founder & CEO</p>
              <p className={styles.teamBio}>
                An expert in cyber security with over 15 years of experience protecting critical infrastructure and developing secure solutions for government agencies.
              </p>
            </div>
            
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <div className={styles.memberImage}>
                  <TeamMember variant="secondary" />
                </div>
              </div>
              <h3>John Doe</h3>
              <p className={styles.teamRole}>Chief Technology Officer</p>
              <p className={styles.teamBio}>
                A seasoned technologist with expertise in cloud architecture who ensures our solutions maintain the highest standards of security and performance.
              </p>
            </div>
            
            <div className={styles.teamCard}>
              <div className={styles.teamImage}>
                <div className={styles.memberImage}>
                  <TeamMember variant="tertiary" />
                </div>
              </div>
              <h3>Jane Doe</h3>
              <p className={styles.teamRole}>VP of Government Relations</p>
              <p className={styles.teamBio}>
                With extensive experience in defense and intelligence sectors, helping clients navigate complex security requirements and compliance protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Techy Separator */}
      <SectionSeparator />

      {/* Core Values Section */}
      <section className={styles.valuesSection}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>Our Core Values</h2>
          
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <SecurityIcon />
              </div>
              <h3>Security First</h3>
              <p>
                We prioritize security in everything we do, ensuring that our solutions protect the most sensitive data and systems.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <InnovationIcon />
              </div>
              <h3>Continuous Innovation</h3>
              <p>
                We constantly push the boundaries of what's possible, developing new approaches to solve complex security challenges.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <IntegrityIcon />
              </div>
              <h3>Integrity</h3>
              <p>
                We operate with the highest ethical standards, building trust with our clients and partners through transparency and honesty.
              </p>
            </div>
            
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <ExcellenceIcon />
              </div>
              <h3>Excellence</h3>
              <p>
                We are committed to delivering exceptional quality in all our products and services, exceeding expectations at every turn.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Techy Separator */}
      <SectionSeparator />

      {/* Contact CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2>Ready to Secure Your Organization?</h2>
            <p>
              Contact us today to learn how Radius Method can help protect your most critical assets with our innovative DevSecOps solutions.
            </p>
            <a href="/contact" className={styles.ctaButton}>Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
} 