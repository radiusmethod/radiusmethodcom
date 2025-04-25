import React from 'react';

const IntegrityIcon: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Circle with Gradient */}
      <circle cx="100" cy="100" r="100" fill="url(#integrityBgGradient)" />
      
      {/* Subtle Tech Grid Background */}
      <g opacity="0.08">
        <path d="M0 50H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 100H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 150H200" stroke="#FFF" strokeWidth="0.8" />
        
        <path d="M50 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M100 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M150 0V200" stroke="#FFF" strokeWidth="0.8" />
      </g>
      
      {/* Balance Scale Base */}
      <path
        d="M100 150
           L140 150
           C145 150, 147 145, 147 140
           L53 140
           C53 145, 55 150, 60 150
           L100 150Z"
        fill="url(#baseGradient)"
        stroke="#FFDC00"
        strokeWidth="1.5"
        strokeOpacity="0.8"
        filter="url(#baseGlow)"
      />
      
      {/* Central Pillar */}
      <rect
        x="98"
        y="65"
        width="4"
        height="75"
        fill="url(#pillarGradient)"
        stroke="#FFDC00"
        strokeWidth="0.5"
        strokeOpacity="0.8"
      />
      
      {/* Crossbar */}
      <rect
        x="65"
        y="65"
        width="70"
        height="4"
        fill="url(#barGradient)"
        stroke="#FFDC00"
        strokeWidth="0.5"
        strokeOpacity="0.8"
      />
      
      {/* Left Scale Pan */}
      <g filter="url(#panGlow)">
        <ellipse
          cx="65"
          cy="85"
          rx="20"
          ry="5"
          fill="url(#panGradient)"
          stroke="#FFDC00"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        
        {/* Pan Suspension Lines */}
        <path
          d="M65 65 L65 80"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeDasharray="1,1"
        />
        <path
          d="M55 67 L60 82"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeDasharray="1,1"
        />
        <path
          d="M75 67 L70 82"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeDasharray="1,1"
        />
      </g>
      
      {/* Right Scale Pan */}
      <g filter="url(#panGlow)">
        <ellipse
          cx="135"
          cy="85"
          rx="20"
          ry="5"
          fill="url(#panGradient)"
          stroke="#FFDC00"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        
        {/* Pan Suspension Lines */}
        <path
          d="M135 65 L135 80"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeDasharray="1,1"
        />
        <path
          d="M125 67 L130 82"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeDasharray="1,1"
        />
        <path
          d="M145 67 L140 82"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeDasharray="1,1"
        />
      </g>
      
      {/* Balance Scale Items - Simple Integrity Symbols */}
      <g filter="url(#itemGlow)">
        {/* Document with Checkmark on Left Pan */}
        <rect
          x="60"
          y="75"
          width="10"
          height="12"
          rx="1"
          fill="#FFDC00"
          fillOpacity="0.2"
          stroke="#FFDC00"
          strokeWidth="0.8"
        />
        <path
          d="M62 80 L64 83 L68 77"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Document with Checkmark on Right Pan */}
        <rect
          x="130"
          y="75"
          width="10"
          height="12"
          rx="1"
          fill="#FFDC00"
          fillOpacity="0.2"
          stroke="#FFDC00"
          strokeWidth="0.8"
        />
        <path
          d="M132 80 L134 83 L138 77"
          stroke="#FFDC00"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      
      {/* Digital Elements */}
      <g>
        {/* Circular Connection Lines */}
        <circle
          cx="100"
          cy="40"
          r="15"
          fill="none"
          stroke="#FFDC00"
          strokeWidth="0.8"
          strokeOpacity="0.4"
          strokeDasharray="2,2"
        />
        
        {/* Integrity Data Flow */}
        <g opacity="0.6">
          <path
            d="M100 55
               L100 65"
            stroke="#FFDC00"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          
          <path
            d="M130 40
               L135 60"
            stroke="#FFDC00"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          
          <path
            d="M70 40
               L65 60"
            stroke="#FFDC00"
            strokeWidth="1"
            strokeDasharray="2,2"
          />
          
          {/* Connection Nodes */}
          <circle cx="100" cy="55" r="2" fill="#FFDC00" />
          <circle cx="130" cy="40" r="2" fill="#FFDC00" />
          <circle cx="70" cy="40" r="2" fill="#FFDC00" />
        </g>
        
        {/* Binary/Hex Code */}
        <g opacity="0.4">
          <text x="90" y="40" fontFamily="monospace" fontSize="4" fill="#FFDC00">1010</text>
          <text x="50" y="110" fontFamily="monospace" fontSize="4" fill="#FFDC00">E5F2</text>
          <text x="135" y="110" fontFamily="monospace" fontSize="4" fill="#FFDC00">A7B3</text>
        </g>
      </g>
      
      {/* Animated Balance Indicator */}
      <circle
        cx="100"
        cy="65"
        r="3"
        fill="#FFDC00"
        opacity="0.8"
      >
        <animate
          attributeName="opacity"
          values="0.8;0.4;0.8"
          dur="3s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Balance Scale Glow Effect */}
      <ellipse
        cx="100"
        cy="100"
        rx="70"
        ry="50"
        fill="none"
        stroke="#FFDC00"
        strokeWidth="0.5"
        opacity="0.1"
      >
        <animate
          attributeName="ry"
          values="50;55;50"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.1;0.05;0.1"
          dur="4s"
          repeatCount="indefinite"
        />
      </ellipse>
      
      {/* Definitions */}
      <defs>
        <radialGradient id="integrityBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D3208" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        
        <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D3208" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#3D3208" />
          <stop offset="50%" stopColor="#FFDC00" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3D3208" />
        </linearGradient>
        
        <linearGradient id="panGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D3208" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        
        <filter id="baseGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="panGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="itemGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default IntegrityIcon; 