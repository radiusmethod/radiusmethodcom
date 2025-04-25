import React from 'react';

const SecurityIcon: React.FC<{ className?: string }> = ({ className }) => {
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
      <circle cx="100" cy="100" r="100" fill="url(#securityBgGradient)" />
      
      {/* Subtle Tech Grid Background */}
      <g opacity="0.08">
        <path d="M0 50H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 100H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 150H200" stroke="#FFF" strokeWidth="0.8" />
        
        <path d="M50 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M100 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M150 0V200" stroke="#FFF" strokeWidth="0.8" />
      </g>
      
      {/* Shield with Gradient */}
      <g filter="url(#shieldGlow)">
        <path
          d="M100 40
             L150 55
             C150 55, 150 120, 100 160
             C50 120, 50 55, 50 55
             L100 40Z"
          fill="url(#shieldGradient)"
          stroke="#7FDBFF"
          strokeWidth="1.5"
          strokeOpacity="0.8"
        />
      </g>
      
      {/* Inner Shield */}
      <path
        d="M100 50
           L140 62
           C140 62, 140 115, 100 150
           C60 115, 60 62, 60 62
           L100 50Z"
        fill="url(#innerShieldGradient)"
        stroke="#0074D9"
        strokeWidth="0.8"
        strokeOpacity="0.6"
      />
      
      {/* Lock Body */}
      <g filter="url(#lockGlow)">
        <rect
          x="80"
          y="85"
          width="40"
          height="35"
          rx="5"
          fill="url(#lockGradient)"
          stroke="#7FDBFF"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
        
        {/* Lock Shackle */}
        <path
          d="M90 85
             C90 75, 110 75, 110 85"
          stroke="#7FDBFF"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        
        {/* Keyhole */}
        <circle
          cx="100"
          cy="100"
          r="7"
          fill="#1A1A1A"
          stroke="#7FDBFF"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        <path
          d="M100 105 L100 110"
          stroke="#7FDBFF"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>
      
      {/* Digital Security Elements */}
      <g>
        {/* Binary Background Pattern */}
        <g opacity="0.4">
          <text x="70" y="75" fontFamily="monospace" fontSize="4" fill="#0074D9">101001</text>
          <text x="110" y="75" fontFamily="monospace" fontSize="4" fill="#0074D9">010110</text>
          <text x="70" y="130" fontFamily="monospace" fontSize="4" fill="#0074D9">110101</text>
          <text x="110" y="130" fontFamily="monospace" fontSize="4" fill="#0074D9">001011</text>
        </g>
        
        {/* Circuit Patterns */}
        <g opacity="0.6">
          <path
            d="M60 62
               L40 62
               L40 100"
            stroke="#0074D9"
            strokeWidth="1"
            strokeDasharray="2,2"
            fill="none"
          />
          
          <path
            d="M140 62
               L160 62
               L160 100"
            stroke="#0074D9"
            strokeWidth="1"
            strokeDasharray="2,2"
            fill="none"
          />
          
          <path
            d="M40 100
               L40 140
               L70 140"
            stroke="#0074D9"
            strokeWidth="1"
            strokeDasharray="2,2"
            fill="none"
          />
          
          <path
            d="M160 100
               L160 140
               L130 140"
            stroke="#0074D9"
            strokeWidth="1"
            strokeDasharray="2,2"
            fill="none"
          />
          
          {/* Connection Nodes */}
          <circle cx="40" cy="62" r="2" fill="#0074D9" />
          <circle cx="40" cy="100" r="2" fill="#0074D9" />
          <circle cx="40" cy="140" r="2" fill="#0074D9" />
          <circle cx="70" cy="140" r="2" fill="#0074D9" />
          
          <circle cx="160" cy="62" r="2" fill="#0074D9" />
          <circle cx="160" cy="100" r="2" fill="#0074D9" />
          <circle cx="160" cy="140" r="2" fill="#0074D9" />
          <circle cx="130" cy="140" r="2" fill="#0074D9" />
        </g>
      </g>
      
      {/* Scanning Effect */}
      <rect
        x="60"
        y="60"
        width="80"
        height="2"
        fill="url(#scanGradient)"
        opacity="0.8"
      >
        <animate
          attributeName="y"
          values="60;140;60"
          dur="4s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.8;0.4;0.8"
          dur="4s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Shield Glow Pulse */}
      <circle
        cx="100"
        cy="100"
        r="70"
        fill="none"
        stroke="#0074D9"
        strokeWidth="1"
        opacity="0.2"
      >
        <animate
          attributeName="r"
          values="70;75;70"
          dur="2s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.2;0.1;0.2"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      
      {/* Definitions for Gradients and Filters */}
      <defs>
        <radialGradient id="securityBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0074D9" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0074D9" stopOpacity="0.1" />
        </linearGradient>
        
        <linearGradient id="innerShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0074D9" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#1A1A1A" stopOpacity="0.1" />
        </linearGradient>
        
        <linearGradient id="lockGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        
        <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0074D9" stopOpacity="0" />
          <stop offset="50%" stopColor="#7FDBFF" />
          <stop offset="100%" stopColor="#0074D9" stopOpacity="0" />
        </linearGradient>
        
        <filter id="shieldGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="lockGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default SecurityIcon; 