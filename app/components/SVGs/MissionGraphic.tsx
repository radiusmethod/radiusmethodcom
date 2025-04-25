import React from 'react';

const MissionGraphic: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 500 350"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background with gradient */}
      <rect width="500" height="350" rx="12" fill="url(#missionBgGradient)" />
      
      {/* Grid Background */}
      <g opacity="0.15">
        {[0, 50, 100, 150, 200, 250, 300, 350].map((y, i) => (
          <path key={`h-${i}`} d={`M0 ${y}H500`} stroke="#444" strokeWidth="0.5" />
        ))}
        
        {[0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500].map((x, i) => (
          <path key={`v-${i}`} d={`M${x} 0V350`} stroke="#444" strokeWidth="0.5" />
        ))}
      </g>
      
      {/* Security Network Mesh */}
      <g>
        {/* Secure Nodes */}
        <circle cx="120" cy="100" r="12" fill="url(#nodeGradient1)" filter="url(#glowSmall)" />
        <circle cx="240" cy="80" r="12" fill="url(#nodeGradient2)" filter="url(#glowSmall)" />
        <circle cx="350" cy="120" r="12" fill="url(#nodeGradient3)" filter="url(#glowSmall)" />
        <circle cx="180" cy="220" r="12" fill="url(#nodeGradient4)" filter="url(#glowSmall)" />
        <circle cx="300" cy="260" r="12" fill="url(#nodeGradient5)" filter="url(#glowSmall)" />
        <circle cx="400" cy="200" r="12" fill="url(#nodeGradient3)" filter="url(#glowSmall)" />
        <circle cx="100" cy="280" r="12" fill="url(#nodeGradient2)" filter="url(#glowSmall)" />
        
        {/* Node pulse animations */}
        <circle cx="120" cy="100" r="18" stroke="#FF4136" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="12;24;12" dur="4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="300" cy="260" r="18" stroke="#B10DC9" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="12;24;12" dur="4s" repeatCount="indefinite" begin="1s" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="400" cy="200" r="18" stroke="#2ECC40" strokeWidth="1" opacity="0.3">
          <animate attributeName="r" values="12;24;12" dur="4s" repeatCount="indefinite" begin="2s" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="4s" repeatCount="indefinite" begin="2s" />
        </circle>
        
        {/* Secure Connection Lines */}
        <line x1="120" y1="100" x2="240" y2="80" stroke="url(#lineGradient1)" strokeWidth="1.5" />
        <line x1="240" y1="80" x2="350" y2="120" stroke="url(#lineGradient2)" strokeWidth="1.5" />
        <line x1="350" y1="120" x2="400" y2="200" stroke="url(#lineGradient3)" strokeWidth="1.5" />
        <line x1="400" y1="200" x2="300" y2="260" stroke="url(#lineGradient4)" strokeWidth="1.5" />
        <line x1="300" y1="260" x2="180" y2="220" stroke="url(#lineGradient5)" strokeWidth="1.5" />
        <line x1="180" y1="220" x2="100" y2="280" stroke="url(#lineGradient6)" strokeWidth="1.5" />
        <line x1="100" y1="280" x2="120" y2="100" stroke="url(#lineGradient7)" strokeWidth="1.5" />
        <line x1="240" y1="80" x2="180" y2="220" stroke="url(#lineGradient8)" strokeWidth="1.5" strokeDasharray="4 2" />
        <line x1="350" y1="120" x2="300" y2="260" stroke="url(#lineGradient9)" strokeWidth="1.5" strokeDasharray="4 2" />
        
        {/* Data transfer animations */}
        <circle cx="0" cy="0" r="3" fill="#FF4136" opacity="0.9" filter="url(#glowDot)">
          <animateMotion path="M120,100 L240,80" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="#0074D9" opacity="0.9" filter="url(#glowDot)">
          <animateMotion path="M240,80 L350,120" dur="3s" repeatCount="indefinite" begin="0.5s" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="#2ECC40" opacity="0.9" filter="url(#glowDot)">
          <animateMotion path="M300,260 L180,220" dur="3s" repeatCount="indefinite" begin="1.5s" />
        </circle>
        <circle cx="0" cy="0" r="3" fill="#B10DC9" opacity="0.9" filter="url(#glowDot)">
          <animateMotion path="M180,220 L100,280" dur="3s" repeatCount="indefinite" begin="2s" />
        </circle>
      </g>
      
      {/* Central Security Shield */}
      <g transform="translate(220, 145)">
        <path 
          d="M30,0 L30,0 C50,0 65,15 65,35 L65,50 C65,70 50,85 30,85 L30,85 C10,85 -5,70 -5,50 L-5,35 C-5,15 10,0 30,0 Z" 
          fill="url(#shieldGradient)" 
          stroke="#FF4136" 
          strokeWidth="2.5"
          filter="url(#glowLarge)"
        />
        <path 
          d="M20,35 L30,45 L55,20" 
          stroke="#FF4136" 
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
      
      {/* Binary Data Stream */}
      <g opacity="0.6">
        <text x="20" y="40" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">01101001</text>
        <text x="90" y="40" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">10110100</text>
        <text x="160" y="40" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">00111010</text>
        <text x="420" y="40" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">10001111</text>
        
        <text x="40" y="330" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">11001010</text>
        <text x="120" y="330" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">01010101</text>
        <text x="310" y="330" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">10101100</text>
        <text x="390" y="330" fill="#3A3" fontFamily="monospace" fontSize="10" filter="url(#glowText)">01110011</text>
      </g>
      
      {/* Additional security elements */}
      <g>
        {/* Lock icons */}
        <path d="M40,60 C40,53 45,48 50,48 C55,48 60,53 60,58 L60,65 L40,65 L40,60 Z" fill="#333333" stroke="#FF4136" strokeWidth="1" />
        <rect x="35" y="65" width="30" height="20" rx="2" fill="#333333" stroke="#FF4136" strokeWidth="1" />
        <circle cx="50" cy="75" r="3" fill="#FF4136" />
        
        <path d="M440,290 C440,283 445,278 450,278 C455,278 460,283 460,288 L460,295 L440,295 L440,290 Z" fill="#333333" stroke="#2ECC40" strokeWidth="1" />
        <rect x="435" y="295" width="30" height="20" rx="2" fill="#333333" stroke="#2ECC40" strokeWidth="1" />
        <circle cx="450" cy="305" r="3" fill="#2ECC40" />
      </g>
      
      {/* Gradient and filter definitions */}
      <defs>
        <radialGradient id="missionBgGradient" cx="250" cy="175" r="250" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#151515" />
          <stop offset="1" stopColor="#0a0a0a" />
        </radialGradient>
        
        <radialGradient id="nodeGradient1" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#FF6E64" />
          <stop offset="1" stopColor="#FF4136" />
        </radialGradient>
        
        <radialGradient id="nodeGradient2" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#4192E3" />
          <stop offset="1" stopColor="#0074D9" />
        </radialGradient>
        
        <radialGradient id="nodeGradient3" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#5EEA6C" />
          <stop offset="1" stopColor="#2ECC40" />
        </radialGradient>
        
        <radialGradient id="nodeGradient4" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#FFEA70" />
          <stop offset="1" stopColor="#FFDC00" />
        </radialGradient>
        
        <radialGradient id="nodeGradient5" cx="0.5" cy="0.5" r="0.5" gradientUnits="objectBoundingBox">
          <stop offset="0" stopColor="#D74DE3" />
          <stop offset="1" stopColor="#B10DC9" />
        </radialGradient>
        
        <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF4136" />
          <stop offset="100%" stopColor="#0074D9" />
        </linearGradient>
        
        <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0074D9" />
          <stop offset="100%" stopColor="#2ECC40" />
        </linearGradient>
        
        <linearGradient id="lineGradient3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2ECC40" />
          <stop offset="100%" stopColor="#FF851B" />
        </linearGradient>
        
        <linearGradient id="lineGradient4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF851B" />
          <stop offset="100%" stopColor="#B10DC9" />
        </linearGradient>
        
        <linearGradient id="lineGradient5" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B10DC9" />
          <stop offset="100%" stopColor="#FFDC00" />
        </linearGradient>
        
        <linearGradient id="lineGradient6" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFDC00" />
          <stop offset="100%" stopColor="#7FDBFF" />
        </linearGradient>
        
        <linearGradient id="lineGradient7" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7FDBFF" />
          <stop offset="100%" stopColor="#FF4136" />
        </linearGradient>
        
        <linearGradient id="lineGradient8" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0074D9" />
          <stop offset="100%" stopColor="#FFDC00" />
        </linearGradient>
        
        <linearGradient id="lineGradient9" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#2ECC40" />
          <stop offset="100%" stopColor="#B10DC9" />
        </linearGradient>
        
        <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#333333" />
          <stop offset="100%" stopColor="#222222" />
        </linearGradient>
        
        <filter id="glowSmall" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="glowLarge" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="glowDot" x="-300%" y="-300%" width="600%" height="600%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="glowText" x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default MissionGraphic; 