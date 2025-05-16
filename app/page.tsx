import React from 'react';
import HeroBanner from './components/HeroBanner';
import ProductFeatures from './components/ProductFeatures';
import CoreCapabilities from './components/CoreCapabilities';
import PipelineDemo from './components/PipelineDemo';
import DeploymentFlexibility from './components/DeploymentFlexibility';
import SocketZeroDemo from './components/SocketZeroDemo';
import CustomerShowcase from './components/CustomerShowcase';
import CrystalTowerCTA from './components/CrystalTowerCTA';

export default function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Product Features Section */}
      <ProductFeatures />
      
      {/* Core Capabilities Section */}
      <CoreCapabilities />

      {/* Socket Zero Demo Section */}
      <SocketZeroDemo id="socket-zero-section" />
      
      {/* Pipeline Demo Section */}
      <PipelineDemo id="pipeline-section" />
      
      {/* Deployment Flexibility Section */}
      <DeploymentFlexibility id="deployment-section" />
      
      {/* Call to Action Section */}
      <CrystalTowerCTA id="cta-section" />
      
      {/* Customer Showcase Section */}
      <CustomerShowcase id="customers-section" />
    </div>
  );
}
