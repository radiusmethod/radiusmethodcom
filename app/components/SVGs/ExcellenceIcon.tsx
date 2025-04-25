import React from 'react';

const ExcellenceIcon: React.FC<{ className?: string }> = ({ className }) => {
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
      <circle cx="100" cy="100" r="100" fill="url(#excellenceBgGradient)" />
      
      {/* Subtle Tech Grid Background */}
      <g opacity="0.08">
        <path d="M0 50H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 100H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 150H200" stroke="#FFF" strokeWidth="0.8" />
        
        <path d="M50 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M100 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M150 0V200" stroke="#FFF" strokeWidth="0.8" />
      </g>
      
      {/* Trophy Base */}
      <path
        d="M80 150 H120 C125 150, 130 145, 130 140 L70 140 C70 145, 75 150, 80 150Z"
        fill="url(#baseGradient)"
        stroke="#B10DC9"
        strokeWidth="1.5"
        filter="url(#baseGlow)"
      />
      
      {/* Trophy Cup Body */}
      <path
        d="M75 140 
           L75 110 
           C75 100, 80 95, 85 95 
           L115 95 
           C120 95, 125 100, 125 110 
           L125 140 
           Z"
        fill="url(#trophyGradient)"
        stroke="#B10DC9"
        strokeWidth="1.5"
        filter="url(#cupGlow)"
      />
      
      {/* Trophy Handles */}
      <path
        d="M75 115 
           C65 115, 60 110, 60 100 
           C60 90, 65 85, 75 85"
        fill="none"
        stroke="#B10DC9"
        strokeWidth="2"
      />
      
      <path
        d="M125 115 
           C135 115, 140 110, 140 100 
           C140 90, 135 85, 125 85"
        fill="none"
        stroke="#B10DC9"
        strokeWidth="2"
      />
      
      {/* Trophy Stand Neck */}
      <rect 
        x="95" 
        y="140" 
        width="10" 
        height="15" 
        fill="url(#neckGradient)"
        stroke="#B10DC9"
        strokeWidth="0.8"
      />
      
      {/* Excellence Star */}
      <g filter="url(#starGlow)">
        <path
          d="M100 50 L107 75 L130 75 L112 90 L120 115 L100 100 L80 115 L88 90 L70 75 L93 75 Z"
          fill="url(#starGradient)"
          stroke="#B10DC9"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="1;0.8;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
      </g>
      
      {/* Excellence Data Points */}
      <g>
        {/* Tech Elements */}
        <g opacity="0.4">
          <circle 
            cx="70" 
            cy="60" 
            r="3" 
            fill="none" 
            stroke="#B10DC9" 
            strokeWidth="0.8" 
          />
          <circle 
            cx="130" 
            cy="60" 
            r="3" 
            fill="none" 
            stroke="#B10DC9" 
            strokeWidth="0.8" 
          />
          <circle 
            cx="100" 
            cy="30" 
            r="3" 
            fill="none" 
            stroke="#B10DC9" 
            strokeWidth="0.8" 
          />
          
          {/* Connection Lines */}
          <path 
            d="M100 30 L100 50" 
            stroke="#B10DC9" 
            strokeWidth="0.8" 
            strokeDasharray="2,2"
          />
          <path 
            d="M70 60 L93 75" 
            stroke="#B10DC9" 
            strokeWidth="0.8" 
            strokeDasharray="2,2"
          />
          <path 
            d="M130 60 L107 75" 
            stroke="#B10DC9" 
            strokeWidth="0.8" 
            strokeDasharray="2,2"
          />
        </g>
        
        {/* Digital Particles */}
        <g>
          <circle cx="100" cy="40" r="1" fill="#B10DC9">
            <animate 
              attributeName="opacity" 
              values="0;1;0" 
              dur="2s" 
              repeatCount="indefinite" 
            />
          </circle>
          <circle cx="85" cy="65" r="1" fill="#B10DC9">
            <animate 
              attributeName="opacity" 
              values="0;1;0" 
              dur="1.5s" 
              repeatCount="indefinite" 
              begin="0.5s"
            />
          </circle>
          <circle cx="115" cy="65" r="1" fill="#B10DC9">
            <animate 
              attributeName="opacity" 
              values="0;1;0" 
              dur="2.5s" 
              repeatCount="indefinite" 
            />
          </circle>
        </g>
        
        {/* Binary/Hex Code */}
        <g opacity="0.4">
          <text x="90" y="40" fontFamily="monospace" fontSize="4" fill="#B10DC9">110</text>
          <text x="65" y="110" fontFamily="monospace" fontSize="4" fill="#B10DC9">5F</text>
          <text x="125" y="110" fontFamily="monospace" fontSize="4" fill="#B10DC9">A3</text>
        </g>
      </g>
      
      {/* Excellence Ribbons */}
      <g filter="url(#ribbonGlow)">
        <path
          d="M85 120 Q90 115, 95 120 L95 130 Q90 125, 85 130 Z"
          fill="url(#ribbonGradient)"
          stroke="#B10DC9"
          strokeWidth="0.8"
        />
        <path
          d="M115 120 Q110 115, 105 120 L105 130 Q110 125, 115 130 Z"
          fill="url(#ribbonGradient)"
          stroke="#B10DC9"
          strokeWidth="0.8"
        />
      </g>
      
      {/* Excellence Glow Effect */}
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="url(#glowGradient)"
        strokeWidth="1"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          values="0.2;0.1;0.2"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="r"
          values="60;65;60"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Definitions */}
      <defs>
        <radialGradient id="excellenceBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D0B3B" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        
        <linearGradient id="trophyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D0B3B" />
          <stop offset="50%" stopColor="#B10DC9" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3D0B3B" />
        </linearGradient>
        
        <linearGradient id="neckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D0B3B" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </linearGradient>
        
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D0B3B" />
          <stop offset="50%" stopColor="#B10DC9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3D0B3B" />
        </linearGradient>
        
        <linearGradient id="ribbonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3D0B3B" />
          <stop offset="50%" stopColor="#B10DC9" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#3D0B3B" />
        </linearGradient>
        
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B10DC9" />
          <stop offset="100%" stopColor="#B10DC9" stopOpacity="0.2" />
        </linearGradient>
        
        <filter id="baseGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="cupGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="starGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="ribbonGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default ExcellenceIcon; 