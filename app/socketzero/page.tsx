'use client';

import React, { useEffect } from 'react';
import styles from './socketzero.module.css';
import SocketZeroDemo from '../components/SocketZeroDemo';

export default function SocketZeroPage() {
  useEffect(() => {
    const getLatest = async () => {
      const response = await fetch('https://radiusmethod-public-downloads.s3.us-east-1.amazonaws.com/socketzero/latest.json');
      const latest = await response.json();
      let placeholder = document.querySelector("#placeholder");
      if (placeholder) {
        placeholder.innerHTML = `Client Installation (<strong>v${latest.version}</strong>)`;
      }
      let downloadsContainer = document.querySelector("#downloads");
      if (downloadsContainer) {
        downloadsContainer.innerHTML = ""; // Clear previous content
        if (latest.downloads) {
          for (const platform in latest.downloads) {
            let platformName = platform === "darwin" ? "macOS" : platform;
            let platformElement = document.createElement("div");
            platformElement.classList.add(styles.platform);
            platformElement.innerHTML = platformName.charAt(0).toUpperCase() + platformName.slice(1); // Capitalize first letter
            downloadsContainer.appendChild(platformElement);
            for (const arch in latest.downloads[platform]) {
              let url = latest.downloads[platform][arch];
              let linkElement = document.createElement("div");
              linkElement.classList.add(styles.downloadItem);
              linkElement.innerHTML = `<a href="${url}" target="_blank">${arch.toUpperCase()}</a>`;
              downloadsContainer.appendChild(linkElement);
            }
          }
        } else {
          downloadsContainer.innerHTML = "No downloads available."
        }
      }
    };
    getLatest();
  }, []);

  return (
    <div className={styles.socketZeroPage}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>SocketZero</h1>
          <p className={styles.heroSubtitle}>
            Military-grade Zero Trust access for your most critical applications
          </p>
        </div>
      </section>

      {/* Demo Section */}
      <section className={styles.demoSection}>
        <div className={styles.container}>
          <SocketZeroDemo />
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentSection}>
            <p className={styles.introText}>
              SocketZero, a Zero Trust technology that allows organizations to securely enable users to access private network resources without being on/inside the network or altering network topologies. It uses continuous authentication to vet the authorization privileges of the user and only allows them to connect to resources on a need-to-access basis through encrypted tunnels. This unified zero trust architecture provides significant benefits to warfighters by ensuring secure and reliable access to mission-critical information across all data and infrastructure, regardless of their location.
            </p>

            <h2 className={styles.sectionTitle}>How SocketZero works</h2>
            <p className={styles.sectionText}>
              SocketZero has two main components: the client and the receiver.
            </p>

            <div className={styles.componentsGrid}>
              <div className={styles.componentCard}>
                <h3>Client</h3>
                <p>The client is installed on a user's laptop or computer and is intended to support multiple operating systems: MacOS, Windows and Linux. The client is intended to be user friendly and is the main entry point for users to access applications.</p>
              </div>
              <div className={styles.componentCard}>
                <h3>Receiver</h3>
                <p>The receiver is set up by an organization's infrastructure team either on a Kubernetes Big Bang cluster or another server based infrastructure. The receiver is also the centralized point of configuration for applications, role based access.</p>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Key advantages of SocketZero</h2>
            <p className={styles.sectionText}>The following lists other key innovative commercialization features of SocketZero:</p>
            
            <ul className={styles.featuresList}>
              <li>Eliminates the need for virtual private networks (VPN). VPNs are highly permissive and don't allow for micro segmentation.</li>
              <li>Introduces the concept of continuous vetting for both a person and a device. This means continuous validation of the security posture of someone connecting to an asset.</li>
              <li>Disguises traffic as HTTPS traffic which makes it difficult if not impossible for an adversary to discover.</li>
              <li>Allows for any TCP or UDP based network connected application to be privately hosted but publicly accessible without compromising security.</li>
              <li>Works with the known and adopted standard of Container Orchestration platform Kubernetes. SocketZero works already with the Air Force standard Kubernetes Big Bang and Iron Bank hardened image which enables a CTF and/or ATO.</li>
              <li>Encrypts all traffic regardless if it's already encrypted or not. If it's already encrypted, it's doubly encrypted, using Post Quantum Cryptography.</li>
              <li>Traffic is also compressed, which saves valuable dollars on bandwidth costs!</li>
            </ul>

            <h2 className={styles.sectionTitle}>Client Installation</h2>
            <div className={styles.downloadSection}>
              <div id="placeholder" className={styles.versionInfo}></div>
              <div id="downloads" className={styles.downloadsGrid}></div>
            </div>

            <h2 className={styles.sectionTitle}>Linux Installation</h2>
            <p className={styles.sectionText}>Linux installation requires a few additional steps:</p>
            <ol className={styles.installSteps}>
              <li>Download the AppImage.</li>
              <li>Make it executable: <code>chmod +x SocketZero.AppImage</code></li>
              <li>Run it: <code>./SocketZero.AppImage</code></li>
              <li>Linux will prompt for sudo password to install the service (on first launch).</li>
              <li>The app launches normally.</li>
            </ol>

            <h2 className={styles.sectionTitle}>Receiver Installation / Information</h2>
            <ul className={styles.resourceList}>
              <li><a href="#" className={styles.resourceLink}>Big Bang Helm Chart</a></li>
              <li><a href="#" className={styles.resourceLink}>Repo1 Iron Bank Source Code</a></li>
              <li><a href="#" className={styles.resourceLink}>Iron Bank Repository</a></li>
              <li><a href="#" className={styles.resourceLink}>VAT</a></li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
} 