import React from 'react';

const InnovationIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background circle */}
      <circle cx="40" cy="40" r="40" fill="#1A1A1A" />
      
      {/* Lightbulb */}
      <path
        d="M40 15
           C30 15 22 23 22 33
           C22 39 25 44 30 47
           L30 55
           L50 55
           L50 47
           C55 44 58 39 58 33
           C58 23 50 15 40 15Z"
        fill="#333333"
        stroke="#0074D9"
        strokeWidth="2"
      />
      
      {/* Bulb base */}
      <rect x="30" y="55" width="20" height="5" rx="1" fill="#0074D9" />
      <rect x="32" y="60" width="16" height="5" rx="1" fill="#0074D9" />
      
      {/* Lightbulb rays */}
      <path d="M40 10 L40 5" stroke="#0074D9" strokeWidth="2" />
      <path d="M30 12 L27 7" stroke="#0074D9" strokeWidth="2" />
      <path d="M20 20 L15 17" stroke="#0074D9" strokeWidth="2" />
      <path d="M15 33 L10 33" stroke="#0074D9" strokeWidth="2" />
      <path d="M20 46 L15 49" stroke="#0074D9" strokeWidth="2" />
      <path d="M50 12 L53 7" stroke="#0074D9" strokeWidth="2" />
      <path d="M60 20 L65 17" stroke="#0074D9" strokeWidth="2" />
      <path d="M65 33 L70 33" stroke="#0074D9" strokeWidth="2" />
      <path d="M60 46 L65 49" stroke="#0074D9" strokeWidth="2" />
      
      {/* Inner light */}
      <path
        d="M40 20
           C35 20 30 25 30 30
           C30 35 35 38 40 40
           C45 38 50 35 50 30
           C50 25 45 20 40 20Z"
        fill="#0074D9"
        opacity="0.5"
      />
      
      {/* Circuit-like pattern inside */}
      <path
        d="M36 35 L36 45 L44 45 L44 35"
        stroke="#0074D9"
        strokeWidth="1.5"
        fill="none"
      />
      <circle cx="40" cy="40" r="2" fill="#0074D9" />

      {/* Binary data within */}
      <g opacity="0.7">
        <text x="36" y="27" fill="#0074D9" fontFamily="monospace" fontSize="4">01</text>
        <text x="41" y="27" fill="#0074D9" fontFamily="monospace" fontSize="4">10</text>
      </g>
    </svg>
  );
};

export default InnovationIcon; 