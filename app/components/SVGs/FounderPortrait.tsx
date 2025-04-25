import React from 'react';

const FounderPortrait: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular Background */}
      <circle cx="150" cy="150" r="150" fill="#1E1E1E" />
      
      {/* Grid Pattern in Background */}
      <g opacity="0.15">
        <path d="M0 75H300" stroke="#FFF" strokeWidth="0.5" />
        <path d="M0 150H300" stroke="#FFF" strokeWidth="0.5" />
        <path d="M0 225H300" stroke="#FFF" strokeWidth="0.5" />
        
        <path d="M75 0V300" stroke="#FFF" strokeWidth="0.5" />
        <path d="M150 0V300" stroke="#FFF" strokeWidth="0.5" />
        <path d="M225 0V300" stroke="#FFF" strokeWidth="0.5" />
      </g>
      
      {/* Abstract Person Silhouette */}
      <path
        d="M150 80 
           C170 80, 185 95, 185 115 
           C185 135, 170 150, 150 150 
           C130 150, 115 135, 115 115 
           C115 95, 130 80, 150 80"
        fill="#333"
      />
      
      {/* Neck */}
      <path
        d="M135 150 
           L135 190 
           L165 190 
           L165 150"
        fill="#333"
      />
      
      {/* Shoulders */}
      <path
        d="M135 180 
           C120 190, 100 185, 90 200 
           L110 200
           L130 190
           L135 180"
        fill="#444"
      />
      <path
        d="M165 180 
           C180 190, 200 185, 210 200 
           L190 200
           L170 190
           L165 180"
        fill="#444"
      />
      
      {/* Abstract Suit */}
      <path
        d="M130 190
           L110 230
           L100 260
           L200 260
           L190 230
           L170 190"
        fill="#333"
      />
      
      {/* Tie */}
      <path
        d="M150 190
           L145 210
           L150 230
           L155 210
           L150 190"
        fill="#FF4136"
      />
      
      {/* Glasses */}
      <path
        d="M125 105
           L140 105
           L140 115
           L125 115
           Z"
        fill="none"
        stroke="#666"
        strokeWidth="2"
      />
      <path
        d="M160 105
           L175 105
           L175 115
           L160 115
           Z"
        fill="none"
        stroke="#666"
        strokeWidth="2"
      />
      <path
        d="M140 110 L160 110"
        stroke="#666"
        strokeWidth="2"
      />
      
      {/* Circuit-like patterns on the edges */}
      <g opacity="0.7">
        <path d="M50 50 L70 50 L70 60 L80 60" stroke="#0074D9" strokeWidth="1.5" />
        <path d="M250 50 L230 50 L230 60 L220 60" stroke="#0074D9" strokeWidth="1.5" />
        <path d="M50 250 L70 250 L70 240 L80 240" stroke="#0074D9" strokeWidth="1.5" />
        <path d="M250 250 L230 250 L230 240 L220 240" stroke="#0074D9" strokeWidth="1.5" />
        
        <circle cx="80" cy="60" r="3" fill="#0074D9" />
        <circle cx="220" cy="60" r="3" fill="#0074D9" />
        <circle cx="80" cy="240" r="3" fill="#0074D9" />
        <circle cx="220" cy="240" r="3" fill="#0074D9" />
      </g>
      
      {/* Border highlight */}
      <circle cx="150" cy="150" r="148" stroke="#0074D9" strokeWidth="2" strokeOpacity="0.5" fill="none" />
    </svg>
  );
};

export default FounderPortrait; 