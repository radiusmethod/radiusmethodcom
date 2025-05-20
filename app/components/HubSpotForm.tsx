import React from 'react';
import Script from 'next/script';

interface HubSpotFormProps {
  region: string;
  portalId: string;
  formId: string;
  className?: string;
  useWhiteBackground?: boolean;
}

export default function HubSpotForm({
  region,
  portalId,
  formId,
  className,
  useWhiteBackground = true
}: HubSpotFormProps) {
  return (
    <div 
      className={className} 
      style={{ 
        width: '100%', 
        margin: 0,
        padding: 0,
        display: 'block'
      }}
    >
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
        style={{
          backgroundColor: useWhiteBackground ? 'white' : 'transparent',
          color: useWhiteBackground ? 'inherit' : 'white',
          border: 'none',
          borderRadius: useWhiteBackground ? '4px' : '0',
          padding: '0',
          margin: '0',
          boxShadow: 'none',
          minHeight: '380px'
        }}
      />
    </div>
  );
} 