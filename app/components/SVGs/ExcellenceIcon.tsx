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
      
      {/* Gold Star with 3D Effect */}
      <g filter="url(#starGlow)">
        {/* Main Star Shape */}
        <path
          d="M100 40
             L120 82
             L165 85
             L130 115
             L140 160
             L100 135
             L60 160
             L70 115
             L35 85
             L80 82
             L100 40Z"
          fill="url(#starGradient)"
          stroke="#FFD700"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="1;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Inner Star Highlight */}
        <path
          d="M100 55
             L115 85
             L150 88
             L125 110
             L132 140
             L100 120
             L68 140
             L75 110
             L50 88
             L85 85
             L100 55Z"
          fill="url(#innerStarGradient)"
          stroke="#FFD700"
          strokeWidth="0.5"
          strokeOpacity="0.8"
        />
        
        {/* Star Center Glow */}
        <circle
          cx="100"
          cy="100"
          r="12"
          fill="url(#glowGradient)"
          opacity="0.7"
        >
          <animate
            attributeName="opacity"
            values="0.7;0.5;0.7"
            dur="2s"
            repeatCount="indefinite"
          />
        </circle>
      </g>
      
      {/* Light Rays */}
      <g>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <line
            key={`ray-${i}`}
            x1="100"
            y1="100"
            x2={100 + 30 * Math.cos(angle * Math.PI / 180)}
            y2={100 + 30 * Math.sin(angle * Math.PI / 180)}
            stroke="#FFD700"
            strokeWidth="0.5"
            strokeOpacity="0.3"
            strokeDasharray="1,2"
          >
            <animate 
              attributeName="strokeOpacity" 
              values={i % 2 === 0 ? "0.3;0.1;0.3" : "0.1;0.3;0.1"} 
              dur={`${2 + i * 0.1}s`} 
              repeatCount="indefinite" 
            />
          </line>
        ))}
      </g>
      
      {/* Subtle Shimmer Effect */}
      <g>
        {[40, 60, 80, 100, 120, 140, 160].map((y, i) => (
          <path
            key={`shimmer-${i}`}
            d={`M50 ${y} L150 ${y + (i % 2 ? 5 : -5)}`}
            stroke="#FFD700"
            strokeWidth="0.3"
            strokeOpacity={0.1 + (i % 3) * 0.05}
            strokeDasharray="1,3"
          >
            <animate
              attributeName="strokeOpacity"
              values={`${0.1 + (i % 3) * 0.05};${0.05 + (i % 3) * 0.05};${0.1 + (i % 3) * 0.05}`}
              dur={`${3 + i * 0.2}s`}
              repeatCount="indefinite"
            />
          </path>
        ))}
      </g>
      
      {/* Pulse Effect */}
      <circle
        cx="100"
        cy="100"
        r="65"
        fill="none"
        stroke="url(#pulseGradient)"
        strokeWidth="0.5"
        opacity="0.2"
      >
        <animate
          attributeName="r"
          values="65;70;65"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;0.1;0.2"
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
        
        <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="50%" stopColor="#FFC125" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        
        <linearGradient id="innerStarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF8DC" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
        
        <radialGradient id="glowGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#FFD700" />
        </radialGradient>
        
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD700" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
        
        <filter id="starGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default ExcellenceIcon; 