'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './HeroBanner.module.css';
import { withBasePath } from '../utils/basePath';

interface HeroBannerBackgroundProps {
  useVideo?: boolean;
}

const HeroBannerBackground: React.FC<HeroBannerBackgroundProps> = ({ useVideo = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoPath = withBasePath('/video/3489086027-preview.mp4');

  return (
    <div className={styles.videoContainer}>
      {useVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className={styles.videoBackground}
          poster={withBasePath('/images/hero-background.jpg')}
          width="1920"
          height="1080"
        >
          <source src={videoPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={withBasePath('/images/hero-image_3.png')}
          alt="Hero Banner"
          fill
          className={styles.videoBackground}
          priority
          sizes="100vw"
        />
      )}
      <div className={styles.overlay}></div>
    </div>
  );
};

const HeroBanner: React.FC = () => {
  // Toggle this to true to use the video background
  const useVideo = false;
  return (
    <section className={styles.hero}>
      <HeroBannerBackground useVideo={useVideo} />
      <div className={styles.heroContent}>
        <div className={styles.centeredContent}>
          <div className={styles.textGroup}>
            <h1 className={styles.heroTitle}>
              Execute mission outcomes
            </h1>
            <p className={styles.heroSubtitle}>
              with the modern software factory for high-governance environments.
            </p>
          </div>
          <Link href="#crystal-tower" className={styles.ctaButton}>
            Learn about Crystal Tower
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroBanner; 