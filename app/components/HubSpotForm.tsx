import React from 'react';
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
  return (
    <div className={className}>
      <Script
        src={`https://js.hsforms.net/forms/embed/${portalId}.js`}
        defer
        strategy="afterInteractive"
      />
      <div 
        className="hs-form-frame" 
        data-region={region} 
        data-form-id={formId} 
        data-portal-id={portalId}
      />
    </div>
  );
} 