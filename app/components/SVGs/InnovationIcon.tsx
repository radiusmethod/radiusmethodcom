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
      
      {/* Subtle Tech Grid Background */}
      <g opacity="0.08">
        <path d="M0 50H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 100H200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M0 150H200" stroke="#FFF" strokeWidth="0.8" />
        
        <path d="M50 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M100 0V200" stroke="#FFF" strokeWidth="0.8" />
        <path d="M150 0V200" stroke="#FFF" strokeWidth="0.8" />
      </g>
      
      {/* Main Light Bulb */}
      <g filter="url(#bulbGlow)">
        {/* Bulb Glass */}
        <path
          d="M100 40
             C120 40, 135 55, 135 85
             C135 95, 130 105, 125 115
             C120 125, 115 135, 115 145
             L85 145
             C85 135, 80 125, 75 115
             C70 105, 65 95, 65 85
             C65 55, 80 40, 100 40Z"
          fill="url(#bulbGradient)"
          strokeWidth="1.5"
          stroke="#7FDBFF"
          strokeOpacity="0.8"
        />
        
        {/* Bulb Base */}
        <path
          d="M85 145
             L85 160
             H115
             L115 145"
          fill="url(#baseGradient)"
          stroke="#7FDBFF"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
        
        {/* Metal Rings */}
        <path
          d="M82 160
             H118"
          stroke="#7FDBFF"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        <path
          d="M85 165
             H115"
          stroke="#7FDBFF"
          strokeWidth="2"
          strokeOpacity="0.9"
        />
        
        {/* Base Thread */}
        <path
          d="M90 165
             L90 175
             H110
             L110 165"
          fill="url(#threadGradient)"
          stroke="#7FDBFF"
          strokeWidth="1"
          strokeOpacity="0.8"
        />
      </g>
      
      {/* Idea Sparks/Energy */}
      <g filter="url(#sparkGlow)">
        {/* Center Spark */}
        <circle cx="100" cy="80" r="12" fill="url(#sparkGradient)" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.7;0.9" dur="2s" repeatCount="indefinite" />
          <animate attributeName="r" values="12;10;12" dur="2s" repeatCount="indefinite" />
        </circle>
        
        {/* Energy Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={`ray-${i}`} opacity={0.7 + (i % 2) * 0.2}>
            <line
              x1="100"
              y1="80"
              x2={100 + 20 * Math.cos(angle * Math.PI / 180)}
              y2={80 + 20 * Math.sin(angle * Math.PI / 180)}
              stroke="url(#rayGradient)"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <animate 
                attributeName="stroke-width" 
                values={i % 2 === 0 ? "2;1;2" : "1;2;1"} 
                dur={`${1.5 + i * 0.1}s`} 
                repeatCount="indefinite" 
              />
            </line>
          </g>
        ))}
      </g>
      
      {/* Circuit Patterns */}
      <g>
        {/* Connection Lines */}
        <path
          d="M30 30
             L50 50
             L50 70
             C50 75, 55 75, 60 70
             L80 70"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.6"
          fill="none"
        />
        
        <path
          d="M170 30
             L150 50
             L150 70
             C150 75, 145 75, 140 70
             L120 70"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.6"
          fill="none"
        />
        
        <path
          d="M30 170
             L50 150
             L60 150
             L75 135"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.6"
          fill="none"
        />
        
        <path
          d="M170 170
             L150 150
             L140 150
             L125 135"
          stroke="#0074D9"
          strokeWidth="1"
          strokeDasharray="2,2"
          opacity="0.6"
          fill="none"
        />
        
        {/* Connection Nodes */}
        <circle cx="30" cy="30" r="3" fill="#0074D9" opacity="0.8" />
        <circle cx="170" cy="30" r="3" fill="#0074D9" opacity="0.8" />
        <circle cx="30" cy="170" r="3" fill="#0074D9" opacity="0.8" />
        <circle cx="170" cy="170" r="3" fill="#0074D9" opacity="0.8" />
        
        <circle cx="80" cy="70" r="2" fill="#0074D9" opacity="0.8" />
        <circle cx="120" cy="70" r="2" fill="#0074D9" opacity="0.8" />
        <circle cx="75" cy="135" r="2" fill="#0074D9" opacity="0.8" />
        <circle cx="125" cy="135" r="2" fill="#0074D9" opacity="0.8" />
      </g>
      
      {/* Binary Data Elements */}
      <g opacity="0.6">
        <text x="50" y="40" fontFamily="monospace" fontSize="5" fill="#0074D9">10010</text>
        <text x="130" y="40" fontFamily="monospace" fontSize="5" fill="#0074D9">01101</text>
        <text x="40" y="160" fontFamily="monospace" fontSize="5" fill="#0074D9">11001</text>
        <text x="130" y="160" fontFamily="monospace" fontSize="5" fill="#0074D9">10110</text>
      </g>
      
      {/* Definitions for Gradients and Filters */}
      <defs>
        <radialGradient id="innovationBgGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#252525" />
          <stop offset="100%" stopColor="#1A1A1A" />
        </radialGradient>
        
        <linearGradient id="bulbGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FDBFF" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#7FDBFF" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0074D9" stopOpacity="0.3" />
        </linearGradient>
        
        <linearGradient id="baseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#444" />
          <stop offset="100%" stopColor="#222" />
        </linearGradient>
        
        <linearGradient id="threadGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555" />
          <stop offset="100%" stopColor="#333" />
        </linearGradient>
        
        <radialGradient id="sparkGradient" cx="50%" cy="50%" r="50%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF" />
          <stop offset="50%" stopColor="#7FDBFF" />
          <stop offset="100%" stopColor="#0074D9" />
        </radialGradient>
        
        <linearGradient id="rayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#7FDBFF" />
          <stop offset="100%" stopColor="#0074D9" />
        </linearGradient>
        
        <filter id="bulbGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        
        <filter id="sparkGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
};

export default InnovationIcon; 