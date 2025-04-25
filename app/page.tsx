import React from 'react';
import HeroBanner from './components/HeroBanner';
import SectionSeparator from './components/SectionSeparator';
import ProductFeatures from './components/ProductFeatures';
import CoreCapabilities from './components/CoreCapabilities';
import PipelineDemo from './components/PipelineDemo';
import DeploymentFlexibility from './components/DeploymentFlexibility';
import SocketZeroDemo from './components/SocketZeroDemo';

export default function Home() {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <HeroBanner />
      
      {/* Techy Separator */}
      <SectionSeparator />
      
      {/* Product Features Section */}
      <ProductFeatures />
      
      {/* Techy Separator */}
      <SectionSeparator />
      
      {/* Core Capabilities Section */}
      <CoreCapabilities />
      
      {/* Techy Separator */}
      <SectionSeparator />

      {/* Socket Zero Demo Section */}
      <SocketZeroDemo id="socket-zero-section" />
      
      {/* Techy Separator */}
      <SectionSeparator />
      
      {/* Pipeline Demo Section */}
      <PipelineDemo />
      
      {/* Techy Separator */}
      <SectionSeparator />
      
      {/* Deployment Flexibility Section */}
      <DeploymentFlexibility id="deployment-section" />
    </div>
  );
}
