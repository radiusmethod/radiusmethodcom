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
      <rect width="500" height="350" rx="12" fill="#111111" />
      
      {/* Grid Background */}
      <g opacity="0.2">
        <path d="M0 50H500" stroke="#444" strokeWidth="0.5" />
        <path d="M0 100H500" stroke="#444" strokeWidth="0.5" />
        <path d="M0 150H500" stroke="#444" strokeWidth="0.5" />
        <path d="M0 200H500" stroke="#444" strokeWidth="0.5" />
        <path d="M0 250H500" stroke="#444" strokeWidth="0.5" />
        <path d="M0 300H500" stroke="#444" strokeWidth="0.5" />
        
        <path d="M50 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M100 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M150 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M200 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M250 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M300 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M350 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M400 0V350" stroke="#444" strokeWidth="0.5" />
        <path d="M450 0V350" stroke="#444" strokeWidth="0.5" />
      </g>
      
      {/* Network Connections */}
      <g>
        {/* Network Nodes */}
        <circle cx="120" cy="100" r="15" fill="#FF4136" opacity="0.9" />
        <circle cx="240" cy="80" r="15" fill="#0074D9" opacity="0.9" />
        <circle cx="350" cy="120" r="15" fill="#2ECC40" opacity="0.9" />
        <circle cx="180" cy="220" r="15" fill="#FFDC00" opacity="0.9" />
        <circle cx="300" cy="260" r="15" fill="#B10DC9" opacity="0.9" />
        <circle cx="400" cy="200" r="15" fill="#FF851B" opacity="0.9" />
        <circle cx="100" cy="280" r="15" fill="#7FDBFF" opacity="0.9" />
        
        {/* Connection Lines */}
        <line x1="120" y1="100" x2="240" y2="80" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="240" y1="80" x2="350" y2="120" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="350" y1="120" x2="400" y2="200" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="400" y1="200" x2="300" y2="260" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="300" y1="260" x2="180" y2="220" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="180" y1="220" x2="100" y2="280" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="100" y1="280" x2="120" y2="100" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="240" y1="80" x2="180" y2="220" stroke="#AAAAAA" strokeWidth="2" />
        <line x1="350" y1="120" x2="300" y2="260" stroke="#AAAAAA" strokeWidth="2" />
      </g>
      
      {/* Shield in Center */}
      <g transform="translate(210, 155)">
        <path 
          d="M40,0 L40,0 C62,0 80,18 80,40 L80,60 C80,82 62,100 40,100 L40,100 C18,100 0,82 0,60 L0,40 C0,18 18,0 40,0 Z" 
          fill="#222222" 
          stroke="#FF4136" 
          strokeWidth="3"
        />
        <path 
          d="M34,20 L46,20 L46,50 L34,50 Z" 
          fill="#FF4136" 
        />
        <circle 
          cx="40" 
          cy="65" 
          r="8" 
          fill="#FF4136" 
        />
      </g>
      
      {/* Binary Data Stream */}
      <g opacity="0.7">
        <text x="20" y="40" fill="#3A3" fontFamily="monospace" fontSize="12">01101001</text>
        <text x="90" y="40" fill="#3A3" fontFamily="monospace" fontSize="12">10110100</text>
        <text x="160" y="40" fill="#3A3" fontFamily="monospace" fontSize="12">00111010</text>
        <text x="430" y="40" fill="#3A3" fontFamily="monospace" fontSize="12">10001111</text>
        
        <text x="40" y="330" fill="#3A3" fontFamily="monospace" fontSize="12">11001010</text>
        <text x="120" y="330" fill="#3A3" fontFamily="monospace" fontSize="12">01010101</text>
        <text x="320" y="330" fill="#3A3" fontFamily="monospace" fontSize="12">10101100</text>
        <text x="400" y="330" fill="#3A3" fontFamily="monospace" fontSize="12">01110011</text>
      </g>
    </svg>
  );
};

export default MissionGraphic; 