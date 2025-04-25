import React from 'react';

const FounderPortrait: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular Background with gradient */}
      <circle cx="150" cy="150" r="150" fill="url(#founderBgGradient)" />
      
      {/* Tech pattern background */}
      <g opacity="0.1">
        {/* Grid lines */}
        <path d="M0 75H300" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 150H300" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 225H300" stroke="#FFF" strokeWidth="0.8" />
        
        <path d="M75 0V300" stroke="#FFF" strokeWidth="0.8" />
        <path d="M150 0V300" stroke="#FFF" strokeWidth="0.8" />
        <path d="M225 0V300" stroke="#FFF" strokeWidth="0.8" />
        
        {/* Circuit-like patterns */}
        {[25, 125, 175, 275].map((pos, i) => (
          <path 
            key={`circuit-h-${i}`}
            d={`M0 ${pos} H15 Q20 ${pos} 25 ${pos+5} V${pos+20} H55`}
            stroke="#0074D9"
            strokeWidth="0.8"
            fill="none"
          />
        ))}
        
        {[45, 95, 195, 245].map((pos, i) => (
          <path 
            key={`circuit-v-${i}`}
            d={`M${pos} 0 V15 Q${pos} 20 ${pos+5} 25 H${pos+20} V55`}
            stroke="#0074D9"
            strokeWidth="0.8"
            fill="none"
          />
        ))}
      </g>
      
      {/* Professional Silhouette */}
      <g filter="url(#silhouetteShadow)">
        {/* Head/Face */}
        <path
          d="M150 70 
             C180 70, 200 100, 200 130
             C200 160, 180 180, 150 180
             C120 180, 100 160, 100 130
             C100 100, 120 70, 150 70"
          fill="#2A2A2A"
        />
        
        {/* Neck */}
        <path
          d="M135 180 
             V200
             H165
             V180"
          fill="#2A2A2A"
        />
        
        {/* Shoulders */}
        <path
          d="M135 195
             C110 195, 85 210, 85 245
             H215
             C215 210, 190 195, 165 195"
          fill="#2A2A2A"
        />
        
        {/* Suit lapels */}
        <path
          d="M135 195
             L130 245
             H170
             L165 195"
          fill="#363636"
        />
        
        {/* Tie */}
        <path
          d="M150 195
             L140 215
             L150 245
             L160 215
             L150 195"
          fill="url(#tieGradient)"
        />
      </g>
      
      {/* Subtle facial features */}
      <g opacity="0.6">
        {/* Eyes */}
        <ellipse cx="130" cy="115" rx="8" ry="4" fill="#444" />
        <ellipse cx="170" cy="115" rx="8" ry="4" fill="#444" />
        
        {/* Glasses */}
        <path
          d="M115 115
             H145
             Q150 115, 150 120
             Q150 125, 155 125
             H165
             Q170 125, 170 120
             Q170 115, 175 115
             H185"
          stroke="#666"
          strokeWidth="1.5"
          fill="none"
        />
        
        {/* Slight mouth indication */}
        <path
          d="M135 145
             Q150 155, 165 145"
          stroke="#444"
          strokeWidth="1"
          fill="none"
        />
      </g>
      
      {/* Digital Elements Overlay */}
      <g>
        {/* Tech "neural" connection patterns */}
        <path
          d="M30 30
             L60 60"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.8"
        />
        <path
          d="M270 30
             L240 60"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.8"
        />
        <path
          d="M30 270
             L60 240"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.8"
        />
        <path
          d="M270 270
             L240 240"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2 3"
          opacity="0.8"
        />
        
        {/* Connection dots */}
        <circle cx="30" cy="30" r="3" fill="#0074D9" filter="url(#glowBlue)" />
        <circle cx="270" cy="30" r="3" fill="#0074D9" filter="url(#glowBlue)" />
        <circle cx="30" cy="270" r="3" fill="#0074D9" filter="url(#glowBlue)" />
        <circle cx="270" cy="270" r="3" fill="#0074D9" filter="url(#glowBlue)" />
        
        {/* Binary data effects */}
        <text x="75" y="40" fontFamily="monospace" fontSize="7" fill="#0074D9" opacity="0.8">01101100</text>
        <text x="180" y="40" fontFamily="monospace" fontSize="7" fill="#0074D9" opacity="0.8">10110011</text>
        <text x="75" y="270" fontFamily="monospace" fontSize="7" fill="#0074D9" opacity="0.8">11100101</text>
        <text x="180" y="270" fontFamily="monospace" fontSize="7" fill="#0074D9" opacity="0.8">00101101</text>
      </g>
      
      {/* Animated pulse ring */}
      <circle 
        cx="150" 
        cy="150" 
        r="148" 
        stroke="url(#pulseGradient)" 
        strokeWidth="1.5" 
        strokeOpacity="0.6" 
        fill="none"
      >
        <animate attributeName="stroke-opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" />
        <animate attributeName="r" values="148;145;148" dur="3s" repeatCount="indefinite" />
      </circle>
      
      {/* Outer ring with animated dash offset */}
      <circle
        cx="150"
        cy="150"
        r="145"
        stroke="#0074D9"
        strokeWidth="0.5"
        strokeDasharray="3,6"
        fill="none"
      >
        <animate attributeName="stroke-dashoffset" from="0" to="20" dur="5s" repeatCount="indefinite" />
      </circle>
      
      {/* Definitions for gradients and filters */}
      <defs>
        <radialGradient id="founderBgGradient" cx="150" cy="150" r="150" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#252525" />
          <stop offset="1" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="tieGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4136" />
          <stop offset="100%" stopColor="#85144b" />
        </linearGradient>
        
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0074D9" />
          <stop offset="100%" stopColor="#7FDBFF" />
        </linearGradient>
        
        <filter id="silhouetteShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#000" floodOpacity="0.3" />
        </filter>
        
        <filter id="glowBlue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default FounderPortrait; 