import React from 'react';

const ExcellenceIcon: React.FC<{ className?: string }> = ({ className }) => {
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
      
      {/* Star shape */}
      <path
        d="M40 15
           L44.5 29.5
           L60 29.5
           L47.5 38.5
           L52 53
           L40 44
           L28 53
           L32.5 38.5
           L20 29.5
           L35.5 29.5
           L40 15Z"
        fill="#333333"
        stroke="#B10DC9"
        strokeWidth="2"
      />
      
      {/* Inner star accent */}
      <path
        d="M40 22
           L43 32
           L53 32
           L45 38
           L48 48
           L40 42
           L32 48
           L35 38
           L27 32
           L37 32
           L40 22Z"
        fill="#B10DC9"
        opacity="0.3"
      />
      
      {/* Trophy cup */}
      <g>
        {/* Cup body */}
        <path
          d="M35 53
             L35 60
             C35 63 45 63 45 60
             L45 53"
          stroke="#B10DC9"
          strokeWidth="2"
          fill="none"
        />
        
        {/* Cup base */}
        <rect x="32" y="63" width="16" height="2" rx="1" fill="#B10DC9" />
        
        {/* Cup handles */}
        <path
          d="M35 55
             C30 55 30 50 35 50"
          stroke="#B10DC9"
          strokeWidth="1.5"
          fill="none"
        />
        <path
          d="M45 55
             C50 55 50 50 45 50"
          stroke="#B10DC9"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      
      {/* Number 1 in center */}
      <g>
        <rect x="38" y="38" width="4" height="12" rx="1" fill="#B10DC9" />
        <path d="M38 38 L40 36 L42 38" stroke="#B10DC9" strokeWidth="1.5" fill="none" />
      </g>
      
      {/* Circuit pattern */}
      <g opacity="0.7">
        {/* Corner patterns */}
        <path
          d="M15 15 L25 25"
          stroke="#B10DC9"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M65 15 L55 25"
          stroke="#B10DC9"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M15 65 L25 55"
          stroke="#B10DC9"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <path
          d="M65 65 L55 55"
          stroke="#B10DC9"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        
        {/* Circuit dots */}
        <circle cx="15" cy="15" r="2" fill="#B10DC9" />
        <circle cx="65" cy="15" r="2" fill="#B10DC9" />
        <circle cx="15" cy="65" r="2" fill="#B10DC9" />
        <circle cx="65" cy="65" r="2" fill="#B10DC9" />
      </g>
    </svg>
  );
};

export default ExcellenceIcon; 