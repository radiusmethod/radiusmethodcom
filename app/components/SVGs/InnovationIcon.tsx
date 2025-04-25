import React from 'react';

const InnovationIcon: React.FC<{ className?: string }> = ({ className }) => {
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
      <circle cx="100" cy="100" r="100" fill="url(#innovationBgGradient)" />
      
      {/* Light Bulb with Glow Effect */}
      <g filter="url(#bulbGlow)">
        {/* Main Bulb Glass */}
        <path
          d="M100 40
             C125 40, 145 60, 145 90
             C145 105, 135 115, 125 125
             C120 130, 115 135, 115 145
             L85 145
             C85 135, 80 130, 75 125
             C65 115, 55 105, 55 90
             C55 60, 75 40, 100 40Z"
          fill="url(#bulbGradient)"
          stroke="#FFDC00"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="1;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Highlights */}
        <path
          d="M115 70
             C120 80, 120 90, 115 100
             C110 110, 100 115, 90 110"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        
        {/* Bulb Base */}
        <path
          d="M85 145
             L85 155
             H115
             L115 145"
          fill="url(#baseGradient)"
          stroke="#FFDC00"
          strokeWidth="1.5"
        />
        
        {/* Metal Rings */}
        <path
          d="M83 155
             H117"
          stroke="#FFDC00"
          strokeWidth="2"
        />
        <path
          d="M85 160
             H115"
          stroke="#FFDC00"
          strokeWidth="2"
        />
        
        {/* Base Thread */}
        <path
          d="M88 160
             L88 170
             H112
             L112 160"
          fill="url(#threadGradient)"
          stroke="#FFDC00"
          strokeWidth="1"
        />
      </g>
      
      {/* Light Rays */}
      <g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={`ray-${i}`}
            x1="100"
            y1="70"
            x2={100 + 25 * Math.cos(angle * Math.PI / 180)}
            y2={70 + 25 * Math.sin(angle * Math.PI / 180)}
            stroke="#FFDC00"
            strokeWidth="1"
            strokeOpacity="0.7"
            strokeLinecap="round"
          >
            <animate 
              attributeName="opacity" 
              values={i % 2 === 0 ? "0.7;0.2;0.7" : "0.2;0.7;0.2"} 
              dur={`${1.5 + i * 0.1}s`} 
              repeatCount="indefinite" 
            />
          </line>
        ))}
      </g>
      
      {/* Central Light Glow */}
      <circle
        cx="100"
        cy="70"
        r="15"
        fill="url(#glowGradient)"
        opacity="0.8"
      >
        <animate
          attributeName="r"
          values="15;17;15"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Pulse Effect */}
      <circle
        cx="100"
        cy="100"
        r="65"
        fill="none"
        stroke="url(#pulseGradient)"
        strokeWidth="0.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="65;70;65"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.3;0.1;0.3"
          dur="4s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Definitions */}
      <defs>
        <radialGradient id="innovationBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <radialGradient id="bulbGradient" cx="100" cy="70" r="80" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFDC00" stopOpacity="0.8" />
          <stop offset="70%" stopColor="#B7950B" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#7D6608" stopOpacity="0.3" />
        </radialGradient>
        
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B7950B" />
          <stop offset="100%" stopColor="#7D6608" />
        </linearGradient>
        
        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9A7D0A" />
          <stop offset="100%" stopColor="#5C4C06" />
        </linearGradient>
        
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#FFDC00" />
          <stop offset="100%" stopColor="#B7950B" />
        </radialGradient>
        
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFDC00" />
          <stop offset="100%" stopColor="#B7950B" />
        </linearGradient>
        
        <filter id="bulbGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default InnovationIcon; 