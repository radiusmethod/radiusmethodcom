import React from 'react';
import HeroBanner from './components/HeroBanner';

export default function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Core Capabilities Section */}
      <section className="core-capabilities">
        <div className="section-content">
          <h2>Crystal Tower: The Modern Software Factory</h2>
          <div className="capabilities-grid">
            {/* This will be filled with the actual content later */}
            <div className="capability-card">Security-First Architecture</div>
            <div className="capability-card">Compliance Automation</div>
            <div className="capability-card">Deployment Flexibility</div>
            <div className="capability-card">Native AI Integration</div>
          </div>
        </div>
      </section>
      
      {/* Additional sections will be added as we develop the site */}
    </div>
  );
}
