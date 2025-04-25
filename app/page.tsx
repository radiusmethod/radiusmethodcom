import React from 'react';
import HeroBanner from './components/HeroBanner';
import SectionSeparator from './components/SectionSeparator';
import ProductFeatures from './components/ProductFeatures';
import CoreCapabilities from './components/CoreCapabilities';
import PipelineDemo from './components/PipelineDemo';
import DeploymentFlexibility from './components/DeploymentFlexibility';

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
      
      {/* Pipeline Demo Section */}
      <PipelineDemo />
      
      {/* Deployment Flexibility Section */}
      <DeploymentFlexibility id="deployment-section" />
    </div>
  );
}
