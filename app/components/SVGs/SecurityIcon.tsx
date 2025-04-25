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
      {/* Background circle with subtle radial gradient */}
      <circle cx="40" cy="40" r="40" fill="url(#securityGradient)" />
      
      {/* Modern shield base */}
      <path
        d="M40 15
           L22 23
           L22 42
           C22 48 26 54 32 58
           C35 60 38 62 40 63
           C42 62 45 60 48 58
           C54 54 58 48 58 42
           L58 23
           L40 15Z"
        fill="#292929"
        stroke="#FF4136"
        strokeWidth="2"
      />
      
      {/* Inner shield section */}
      <path
        d="M40 20
           L26 26
           L26 42
           C26 46 29 51 34 54
           C36 55 38 57 40 58
           C42 57 44 55 46 54
           C51 51 54 46 54 42
           L54 26
           L40 20Z"
        fill="#333333"
      />
      
      {/* Lock body with subtle highlight */}
      <rect x="34" y="35" width="12" height="16" rx="2" fill="#FF4136" filter="url(#glow)" />
      
      {/* Lock shackle */}
      <path
        d="M36 35 
           L36 29
           C36 26, 39 24, 40 24
           C41 24, 44 26, 44 29
           L44 35"
        stroke="#FF4136"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Keyhole */}
      <circle cx="40" cy="41" r="2" fill="#222222" />
      <rect x="39" y="41" width="2" height="5" rx="1" fill="#222222" />
      
      {/* Digital circuit pattern overlay */}
      <g opacity="0.5">
        <path
          d="M40 15 L40 12"
          stroke="#FF4136"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        <path
          d="M22 30 L19 30"
          stroke="#FF4136"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        <path
          d="M58 30 L61 30"
          stroke="#FF4136"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        <path
          d="M32 63 L32 66"
          stroke="#FF4136"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        <path
          d="M48 63 L48 66"
          stroke="#FF4136"
          strokeWidth="1"
          strokeDasharray="1 2"
        />
        
        <circle cx="40" cy="12" r="1.5" fill="#FF4136" />
        <circle cx="19" cy="30" r="1.5" fill="#FF4136" />
        <circle cx="61" cy="30" r="1.5" fill="#FF4136" />
        <circle cx="32" cy="66" r="1.5" fill="#FF4136" />
        <circle cx="48" cy="66" r="1.5" fill="#FF4136" />
      </g>
      
      {/* Subtle data lines across the shield */}
      <path
        d="M30 34 L50 34"
        stroke="#FF4136"
        strokeWidth="0.5"
        strokeDasharray="1 3"
        opacity="0.3"
      />
      <path
        d="M26 42 L54 42"
        stroke="#FF4136"
        strokeWidth="0.5"
        strokeDasharray="1 3"
        opacity="0.3"
      />
      <path
        d="M29 50 L51 50"
        stroke="#FF4136"
        strokeWidth="0.5"
        strokeDasharray="1 3"
        opacity="0.3"
      />
      
      {/* Definitions for filters and gradients */}
      <defs>
        <radialGradient
          id="securityGradient"
          cx="40"
          cy="40"
          r="40"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.7" stopColor="#1A1A1A" />
          <stop offset="1" stopColor="#121212" />
        </radialGradient>
        
        <filter
          id="glow"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default SecurityIcon; 