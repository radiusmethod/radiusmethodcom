import React from 'react';

const SecurityIcon: React.FC<{ className?: string }> = ({ className }) => {
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
      
      {/* Shield base */}
      <path
        d="M40 15
           L20 25
           L20 45
           C20 55
           30 65
           40 70
           C50 65
           60 55
           60 45
           L60 25
           L40 15Z"
        fill="#333333"
        stroke="#FF4136"
        strokeWidth="2"
      />
      
      {/* Keyhole */}
      <circle cx="40" cy="40" r="8" fill="#FF4136" opacity="0.8" />
      <rect x="38" y="40" width="4" height="12" rx="2" fill="#FF4136" opacity="0.8" />
      
      {/* Circuit pattern around the shield */}
      <path
        d="M20 25 L15 25 L15 35"
        stroke="#FF4136"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M60 25 L65 25 L65 35"
        stroke="#FF4136"
        strokeWidth="1.5"
        fill="none"
      />
      <path
        d="M30 70 L30 75 L40 75 L50 75 L50 70"
        stroke="#FF4136"
        strokeWidth="1.5"
        fill="none"
      />
      
      {/* Small circuit nodes */}
      <circle cx="15" cy="35" r="2" fill="#FF4136" />
      <circle cx="65" cy="35" r="2" fill="#FF4136" />
      <circle cx="30" cy="75" r="2" fill="#FF4136" />
      <circle cx="50" cy="75" r="2" fill="#FF4136" />
      
      {/* Binary data overlay on shield */}
      <g opacity="0.4">
        <text x="27" y="35" fill="#FF4136" fontFamily="monospace" fontSize="4">01</text>
        <text x="50" y="35" fill="#FF4136" fontFamily="monospace" fontSize="4">10</text>
        <text x="30" y="60" fill="#FF4136" fontFamily="monospace" fontSize="4">01</text>
        <text x="45" y="60" fill="#FF4136" fontFamily="monospace" fontSize="4">10</text>
      </g>
    </svg>
  );
};

export default SecurityIcon; 