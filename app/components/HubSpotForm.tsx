import React, { useEffect, useState } from 'react';
import Script from 'next/script';

interface HubSpotFormProps {
  region: string;
  portalId: string;
  formId: string;
  className?: string;
}

export default function HubSpotForm({
  region,
  portalId,
  formId,
  className
}: HubSpotFormProps) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerId = `hubspot-form-container-${formId}`;

  useEffect(() => {
    // Only create the form if the script has loaded
    if (scriptLoaded && typeof window !== 'undefined' && window.hbspt) {
      // Clear the container first to prevent duplicate forms
      const container = document.getElementById(containerId);
      if (container) {
        container.innerHTML = '';
      }
      
      // Create HubSpot form
      window.hbspt.forms.create({
        region: region,
        portalId: portalId,
        formId: formId,
        target: `#${containerId}`,
      });
    }
  }, [scriptLoaded, formId, portalId, region, containerId]);

  return (
    <div className={className}>
      <Script
        src="//js.hsforms.net/forms/v2.js"
        strategy="afterInteractive"
        onReady={() => setScriptLoaded(true)}
      />
      <div id={containerId}></div>
    </div>
  );
} 