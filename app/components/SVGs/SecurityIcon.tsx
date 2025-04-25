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
      
      {/* 3D Shield */}
      <g filter="url(#shieldGlow)">
        {/* Shield Body */}
        <path
          d="M100 40
             L160 60
             C160 60, 150 140, 100 170
             C50 140, 40 60, 40 60
             L100 40Z"
          fill="url(#shieldGradient)"
          stroke="#0074D9"
          strokeWidth="1.5"
        >
          <animate
            attributeName="opacity"
            values="1;0.9;1"
            dur="3s"
            repeatCount="indefinite"
          />
        </path>
        
        {/* Shield Inner */}
        <path
          d="M100 55
             L145 70
             C145 70, 135 130, 100 155
             C65 130, 55 70, 55 70
             L100 55Z"
          fill="url(#innerShieldGradient)"
          stroke="#7FDBFF"
          strokeWidth="0.8"
          strokeOpacity="0.8"
        />
        
        {/* Shield Highlight */}
        <path
          d="M100 70
             L130 80
             C130 80, 120 120, 100 135
             C80 120, 70 80, 70 80
             L100 70Z"
          fill="url(#highlightGradient)"
          stroke="#7FDBFF"
          strokeWidth="0.5"
          strokeOpacity="0.5"
        />
      </g>
      
      {/* Shield Emblem */}
      <path
        d="M85 100 L115 100 M100 85 L100 115"
        stroke="#7FDBFF"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.8"
      >
        <animate
          attributeName="opacity"
          values="0.8;1;0.8"
          dur="2s"
          repeatCount="indefinite"
        />
      </path>
      
      {/* Subtle Pulse Effect */}
      <circle
        cx="100"
        cy="100"
        r="60"
        fill="none"
        stroke="url(#pulseGradient)"
        strokeWidth="0.5"
        opacity="0.3"
      >
        <animate
          attributeName="r"
          values="60;65;60"
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
        <radialGradient id="securityBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0074D9" />
          <stop offset="100%" stopColor="#001F3F" />
        </linearGradient>
        
        <linearGradient id="innerShieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0074D9" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#001F3F" stopOpacity="0.6" />
        </linearGradient>
        
        <linearGradient id="highlightGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FDBFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0074D9" stopOpacity="0.1" />
        </linearGradient>
        
        <linearGradient id="pulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FDBFF" />
          <stop offset="100%" stopColor="#0074D9" />
        </linearGradient>
        
        <filter id="shieldGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default SecurityIcon; 