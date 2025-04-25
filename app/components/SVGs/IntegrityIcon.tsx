import React from 'react';

const IntegrityIcon: React.FC<{ className?: string }> = ({ className }) => {
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
      
      {/* Outer circle */}
      <circle
        cx="40"
        cy="40"
        r="25"
        stroke="#7FDBFF"
        strokeWidth="2"
        fill="#333333"
      />
      
      {/* Balance scale */}
      <g>
        {/* Center stand */}
        <rect x="39" y="25" width="2" height="30" fill="#7FDBFF" />
        
        {/* Base of scale */}
        <rect x="32" y="55" width="16" height="3" rx="1" fill="#7FDBFF" />
        <rect x="36" y="52" width="8" height="3" rx="1" fill="#7FDBFF" />
        
        {/* Balance arm */}
        <rect x="25" y="29" width="30" height="2" fill="#7FDBFF" />
        
        {/* Scale dishes */}
        <circle cx="25" cy="35" r="6" fill="#333333" stroke="#7FDBFF" strokeWidth="1.5" />
        <circle cx="55" cy="35" r="6" fill="#333333" stroke="#7FDBFF" strokeWidth="1.5" />
        
        {/* Connecting chains */}
        <line x1="25" y1="29" x2="25" y2="35" stroke="#7FDBFF" strokeWidth="1" strokeDasharray="1 1" />
        <line x1="55" y1="29" x2="55" y2="35" stroke="#7FDBFF" strokeWidth="1" strokeDasharray="1 1" />
      </g>
      
      {/* Check mark in the center */}
      <path
        d="M35 40 L38 43 L45 36"
        stroke="#7FDBFF"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Circuit pattern */}
      <g opacity="0.7">
        {/* Top pattern */}
        <path
          d="M40 15 L40 20"
          stroke="#7FDBFF"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="40" cy="15" r="2" fill="#7FDBFF" />
        
        {/* Bottom pattern */}
        <path
          d="M40 65 L40 70"
          stroke="#7FDBFF"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="40" cy="70" r="2" fill="#7FDBFF" />
        
        {/* Left pattern */}
        <path
          d="M15 40 L20 40"
          stroke="#7FDBFF"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="15" cy="40" r="2" fill="#7FDBFF" />
        
        {/* Right pattern */}
        <path
          d="M65 40 L70 40"
          stroke="#7FDBFF"
          strokeWidth="1.5"
          fill="none"
        />
        <circle cx="65" cy="40" r="2" fill="#7FDBFF" />
      </g>
    </svg>
  );
};

export default IntegrityIcon; 