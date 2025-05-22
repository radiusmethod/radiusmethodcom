'use client';

import React from 'react';
import Script from 'next/script';

interface HubSpotTrackingProps {
  portalId: string;
}

const HubSpotTracking: React.FC<HubSpotTrackingProps> = ({ portalId }) => {
  return (
    <Script
      id="hs-script-loader"
      strategy="afterInteractive"
      src={`https://js.hs-scripts.com/${portalId}.js`}
    />
  );
};

export default HubSpotTracking; 