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
      
      {/* Traditional Balance Scale */}
      <g filter="url(#scaleGlow)">
        {/* Base Line */}
        <rect
          x="50"
          y="155"
          width="100"
          height="5"
          rx="2"
          fill="url(#baseGradient)"
          stroke="#FF4136"
          strokeWidth="1"
        />
        
        {/* Vertical Pillar */}
        <rect
          x="97"
          y="70"
          width="6"
          height="85"
          fill="url(#pillarGradient)"
          stroke="#FF4136"
          strokeWidth="1"
        />
        
        {/* Pivot Point */}
        <circle
          cx="100"
          cy="70"
          r="10"
          fill="url(#pivotGradient)"
          stroke="#FF4136"
          strokeWidth="1.5"
        />
        
        {/* Crossbar */}
        <rect
          x="30"
          y="65"
          width="140"
          height="5"
          rx="2"
          fill="url(#barGradient)"
          stroke="#FF4136"
          strokeWidth="1"
          transform-origin="100 70"
        >
          <animate
            attributeName="transform"
            type="rotate"
            values="0 100 70;1 100 70;0 100 70;-1 100 70;0 100 70"
            dur="5s"
            repeatCount="indefinite"
          />
        </rect>
        
        {/* Left Scale Connections */}
        <g>
          <circle 
            cx="55" 
            cy="70" 
            r="5" 
            fill="url(#pivotGradient)" 
            stroke="#FF4136" 
            strokeWidth="1"
          />
          
          {/* Left Bowl */}
          <path
            d="M40 120 
               C40 110, 70 110, 70 120
               C70 125, 40 125, 40 120
               Z"
            fill="url(#bowlGradient)"
            stroke="#FF4136"
            strokeWidth="2"
          >
            <animate
              attributeName="d"
              values="M40 120 C40 110, 70 110, 70 120 C70 125, 40 125, 40 120 Z;
                      M40 119 C40 109, 70 109, 70 119 C70 124, 40 124, 40 119 Z;
                      M40 120 C40 110, 70 110, 70 120 C70 125, 40 125, 40 120 Z;
                      M40 121 C40 111, 70 111, 70 121 C70 126, 40 126, 40 121 Z;
                      M40 120 C40 110, 70 110, 70 120 C70 125, 40 125, 40 120 Z"
              dur="5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Left Chains */}
          <line 
            x1="55" 
            y1="70" 
            x2="55" 
            y2="115" 
            stroke="#FF4136" 
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="115;114;115;116;115"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="55" 
            y1="70" 
            x2="45" 
            y2="115" 
            stroke="#FF4136" 
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="115;114;115;116;115"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="55" 
            y1="70" 
            x2="65" 
            y2="115" 
            stroke="#FF4136" 
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="115;114;115;116;115"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
        </g>
        
        {/* Right Scale Connections */}
        <g>
          <circle 
            cx="145" 
            cy="70" 
            r="5" 
            fill="url(#pivotGradient)" 
            stroke="#FF4136" 
            strokeWidth="1"
          />
          
          {/* Right Bowl */}
          <path
            d="M130 120 
               C130 110, 160 110, 160 120
               C160 125, 130 125, 130 120
               Z"
            fill="url(#bowlGradient)"
            stroke="#FF4136"
            strokeWidth="2"
          >
            <animate
              attributeName="d"
              values="M130 120 C130 110, 160 110, 160 120 C160 125, 130 125, 130 120 Z;
                      M130 121 C130 111, 160 111, 160 121 C160 126, 130 126, 130 121 Z;
                      M130 120 C130 110, 160 110, 160 120 C160 125, 130 125, 130 120 Z;
                      M130 119 C130 109, 160 109, 160 119 C160 124, 130 124, 130 119 Z;
                      M130 120 C130 110, 160 110, 160 120 C160 125, 130 125, 130 120 Z"
              dur="5s"
              repeatCount="indefinite"
            />
          </path>
          
          {/* Right Chains */}
          <line 
            x1="145" 
            y1="70" 
            x2="145" 
            y2="115" 
            stroke="#FF4136" 
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="115;116;115;114;115"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="145" 
            y1="70" 
            x2="135" 
            y2="115" 
            stroke="#FF4136" 
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="115;116;115;114;115"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
          <line 
            x1="145" 
            y1="70" 
            x2="155" 
            y2="115" 
            stroke="#FF4136" 
            strokeWidth="1.5"
          >
            <animate
              attributeName="y2"
              values="115;116;115;114;115"
              dur="5s"
              repeatCount="indefinite"
            />
          </line>
        </g>
      </g>
      
      {/* Subtle Glow */}
      <circle
        cx="100"
        cy="100"
        r="65"
        fill="none"
        stroke="url(#glowGradient)"
        strokeWidth="0.5"
        opacity="0.2"
      >
        <animate
          attributeName="opacity"
          values="0.2;0.1;0.2"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Definitions */}
      <defs>
        <radialGradient id="integrityBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B71C1C" />
          <stop offset="100%" stopColor="#7F0000" />
        </linearGradient>
        
        <linearGradient id="pillarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B71C1C" />
          <stop offset="100%" stopColor="#7F0000" />
        </linearGradient>
        
        <linearGradient id="pivotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4136" />
          <stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>
        
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B71C1C" />
          <stop offset="50%" stopColor="#FF4136" />
          <stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>
        
        <linearGradient id="bowlGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B71C1C" />
          <stop offset="100%" stopColor="#7F0000" />
        </linearGradient>
        
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF4136" />
          <stop offset="100%" stopColor="#B71C1C" />
        </linearGradient>
        
        <filter id="scaleGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default IntegrityIcon; 