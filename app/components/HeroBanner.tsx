'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { withBasePath } from '../utils/basePath';

const HeroBanner: React.FC = () => {
  // Create an absolute video URL
  const videoPath = withBasePath('/video/3489086027-preview.mp4');
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Log the path for debugging
  useEffect(() => {
    console.log('Video path:', videoPath);
    
    // Add event listeners to debug video loading
    const videoElement = videoRef.current;
    if (videoElement) {
      videoElement.addEventListener('loadstart', () => console.log('Video: loadstart event fired'));
      videoElement.addEventListener('canplay', () => console.log('Video: canplay event fired'));
      videoElement.addEventListener('playing', () => console.log('Video: playing event fired'));
      videoElement.addEventListener('error', (e) => console.error('Video error:', videoElement.error));
      
      // Force load video
      videoElement.load();
    }
  }, [videoPath]);

  return (
    <section className={styles.hero}>
      {/* Video Background */}
      <div className={styles.videoContainer}>
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline 
          className={styles.videoBackground}
          poster={withBasePath('/images/hero-background.jpg')}
          controls
        >
          <source 
            src={videoPath}
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        <div className={styles.overlay}></div>
      </div>
      
      <div className={styles.heroContent}>
        <div className={styles.heroLayout}>
          <div className={styles.heroImageContainer}>
            <div className={styles.imageCard}>
              <Image 
                src={withBasePath('/images/hero-image.png')}
                alt="Crystal Tower - Military-Compliant Software"
                width={700}
                height={350}
                className={styles.heroImage}
                priority
              />
            </div>
          </div>
          <div className={styles.heroTextContainer}>
            <h1 className={styles.heroTitle}>
              Execute mission outcomes.
            </h1>
            <p className={styles.heroSubtitle}>
              The modern software factory for high-governance environments
            </p>
            <button className={styles.ctaButton}>
              Schedule a Demo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 