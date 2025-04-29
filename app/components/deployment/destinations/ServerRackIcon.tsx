import React from 'react';

interface ServerRackIconProps {
  className?: string;
  isActive?: boolean;
  isReceiving?: boolean;
}

const ServerRackIcon: React.FC<ServerRackIconProps> = ({
  className,
  isActive = false,
  isReceiving = false
}) => {
  // Color configuration based on states
  const baseColor = isActive ? '#c0d5ff' : '#adbdff';
  const accentColor = isActive ? '#64B5F6' : '#4a90e2';
  const highlightColor = isActive ? '#e6f0ff' : '#dae3ff';
  const darkColor = isActive ? '#335588' : '#224477';
  
  // Override colors if receiving (yellow)
  const receivingColor = '#FFE44D';
  const receivingHighlight = '#FFF4B3';
  
  // Determine active colors
  const primaryColor = isReceiving ? receivingColor : baseColor;
  const secondaryColor = isReceiving ? receivingHighlight : highlightColor;
  
  return (
    <div className={className} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transformStyle: 'preserve-3d',
      transformOrigin: 'center center'
    }}>
      <svg
        viewBox="0 0 200 140"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: isReceiving 
            ? 'drop-shadow(0 0 8px rgba(255, 228, 77, 0.6))' 
            : isActive 
              ? 'drop-shadow(0 0 5px rgba(100, 181, 246, 0.4))' 
              : 'none',
          transition: 'all 0.5s ease',
          opacity: isActive ? 1 : 0.85
        }}
      >
        {/* Floor/Base */}
        <rect x="20" y="120" width="160" height="10" fill={darkColor} rx="2" filter="url(#shadow)" />
        
        {/* Server Rack 1 (left) */}
        <g transform="translate(40, 40)">
          {/* Rack frame */}
          <rect x="0" y="0" width="40" height="80" fill={darkColor} rx="2" filter="url(#shadow)" />
          
          {/* Server units */}
          <rect x="2" y="5" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="7" width="4" height="2" fill={secondaryColor} />
          <rect x="10" y="7" width="4" height="2" fill={secondaryColor} />
          <rect x="30" y="7" width="4" height="6" fill={secondaryColor} />
          
          <rect x="2" y="18" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="20" width="4" height="2" fill={secondaryColor} />
          <rect x="10" y="20" width="4" height="2" fill={secondaryColor} />
          <rect x="30" y="20" width="4" height="6" fill={secondaryColor} />
          
          <rect x="2" y="31" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="33" width="4" height="2" fill={secondaryColor} />
          <rect x="10" y="33" width="4" height="2" fill={secondaryColor} />
          <rect x="30" y="33" width="4" height="6" fill={secondaryColor} />
          
          <rect x="2" y="44" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="46" width="4" height="2" fill={secondaryColor} />
          <rect x="10" y="46" width="4" height="2" fill={secondaryColor} />
          <rect x="30" y="46" width="4" height="6" fill={secondaryColor} />
          
          <rect x="2" y="57" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="59" width="4" height="2" fill={secondaryColor} />
          <rect x="10" y="59" width="4" height="2" fill={secondaryColor} />
          <rect x="30" y="59" width="4" height="6" fill={secondaryColor} />
          
          <rect x="2" y="70" width="36" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="72" width="4" height="2" fill={secondaryColor} />
          <rect x="10" y="72" width="4" height="2" fill={secondaryColor} />
          <rect x="30" y="72" width="4" height="4" fill={secondaryColor} />
        </g>
        
        {/* Server Rack 2 (middle) */}
        <g transform="translate(90, 30)">
          {/* Rack frame */}
          <rect x="0" y="0" width="40" height="90" fill={darkColor} rx="2" filter="url(#shadow)" />
          
          {/* Server units with lights - more detailed on the main rack */}
          <rect x="2" y="5" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="7" width="2" height="2" fill={secondaryColor} />
          <rect x="8" y="7" width="2" height="2" fill={secondaryColor} />
          <rect x="12" y="7" width="2" height="2" fill={receivingHighlight} />
          <rect x="30" y="6" width="6" height="8" fill={secondaryColor} />
          
          <rect x="2" y="18" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="20" width="2" height="2" fill={secondaryColor} />
          <rect x="8" y="20" width="2" height="2" fill="#FF5252" /> {/* Red error light */}
          <rect x="12" y="20" width="2" height="2" fill={secondaryColor} />
          <rect x="30" y="19" width="6" height="8" fill={secondaryColor} />
          
          <rect x="2" y="31" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="33" width="2" height="2" fill={secondaryColor} />
          <rect x="8" y="33" width="2" height="2" fill={secondaryColor} />
          <rect x="12" y="33" width="2" height="2" fill={secondaryColor} />
          <rect x="30" y="32" width="6" height="8" fill={secondaryColor} />
          
          <rect x="2" y="44" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="46" width="2" height="2" fill={secondaryColor} />
          <rect x="8" y="46" width="2" height="2" fill={secondaryColor} />
          <rect x="12" y="46" width="2" height="2" fill="#4CAF50" /> {/* Green status */}
          <rect x="30" y="45" width="6" height="8" fill={secondaryColor} />
          
          <rect x="2" y="57" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="59" width="2" height="2" fill={secondaryColor} />
          <rect x="8" y="59" width="2" height="2" fill={secondaryColor} />
          <rect x="12" y="59" width="2" height="2" fill={secondaryColor} />
          <rect x="30" y="58" width="6" height="8" fill={secondaryColor} />
          
          <rect x="2" y="70" width="36" height="10" fill={primaryColor} rx="1" />
          <rect x="4" y="72" width="2" height="2" fill={secondaryColor} />
          <rect x="8" y="72" width="2" height="2" fill={secondaryColor} />
          <rect x="12" y="72" width="2" height="2" fill="#FFB81C" /> {/* Amber warning */}
          <rect x="30" y="71" width="6" height="8" fill={secondaryColor} />
          
          <rect x="2" y="83" width="36" height="5" fill={accentColor} rx="1" />
          
          {/* Blinking lights when receiving */}
          {isReceiving && (
            <>
              <rect x="4" y="7" width="2" height="2" fill={receivingColor}>
                <animate attributeName="opacity" values="1;0.5;1" dur="0.8s" repeatCount="3" />
              </rect>
              <rect x="8" y="20" width="2" height="2" fill={receivingColor}>
                <animate attributeName="opacity" values="1;0.5;1" dur="1.2s" repeatCount="3" begin="0.1s" />
              </rect>
              <rect x="12" y="33" width="2" height="2" fill={receivingColor}>
                <animate attributeName="opacity" values="1;0.5;1" dur="0.9s" repeatCount="3" begin="0.2s" />
              </rect>
              <rect x="4" y="46" width="2" height="2" fill={receivingColor}>
                <animate attributeName="opacity" values="1;0.5;1" dur="1.1s" repeatCount="3" begin="0.3s" />
              </rect>
              <rect x="8" y="59" width="2" height="2" fill={receivingColor}>
                <animate attributeName="opacity" values="1;0.5;1" dur="1.0s" repeatCount="3" begin="0.4s" />
              </rect>
              <rect x="12" y="72" width="2" height="2" fill={receivingColor}>
                <animate attributeName="opacity" values="1;0.5;1" dur="0.7s" repeatCount="3" begin="0.5s" />
              </rect>
            </>
          )}
        </g>
        
        {/* Server Rack 3 (right) */}
        <g transform="translate(140, 50)">
          {/* Rack frame */}
          <rect x="0" y="0" width="30" height="70" fill={darkColor} rx="2" filter="url(#shadow)" />
          
          {/* Server units */}
          <rect x="2" y="5" width="26" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="7" width="3" height="2" fill={secondaryColor} />
          <rect x="20" y="7" width="5" height="4" fill={secondaryColor} />
          
          <rect x="2" y="16" width="26" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="18" width="3" height="2" fill={secondaryColor} />
          <rect x="20" y="18" width="5" height="4" fill={secondaryColor} />
          
          <rect x="2" y="27" width="26" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="29" width="3" height="2" fill={secondaryColor} />
          <rect x="20" y="29" width="5" height="4" fill={secondaryColor} />
          
          <rect x="2" y="38" width="26" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="40" width="3" height="2" fill={secondaryColor} />
          <rect x="20" y="40" width="5" height="4" fill={secondaryColor} />
          
          <rect x="2" y="49" width="26" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="51" width="3" height="2" fill={secondaryColor} />
          <rect x="20" y="51" width="5" height="4" fill={secondaryColor} />
          
          <rect x="2" y="60" width="26" height="8" fill={primaryColor} rx="1" />
          <rect x="4" y="62" width="3" height="2" fill={secondaryColor} />
          <rect x="20" y="62" width="5" height="4" fill={secondaryColor} />
        </g>
        
        {/* Server room floor and background elements */}
        <rect x="20" y="120" width="160" height="3" fill={accentColor} rx="1" />
        
        {/* Cables between racks (subtle) */}
        <path d="M 80 70 C 85 70, 90 60, 90 60" stroke={accentColor} strokeWidth="1" fill="none" />
        <path d="M 80 80 C 85 80, 90 75, 90 75" stroke={accentColor} strokeWidth="1" fill="none" />
        <path d="M 130 60 C 135 60, 140 60, 140 65" stroke={accentColor} strokeWidth="1" fill="none" />
        <path d="M 130 80 C 135 80, 140 80, 140 85" stroke={accentColor} strokeWidth="1" fill="none" />
        
        {/* Title at the bottom */}
        <text
          x="100"
          y="135"
          textAnchor="middle"
          fill={isReceiving ? receivingColor : isActive ? "#FFB81C" : "#fff"}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="12"
          filter="url(#shadow)"
        >
          Bare Metal
        </text>
        
        {/* Filters */}
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>
          
          {/* Glow filter for when receiving */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Receiving animation overlay */}
        {isReceiving && (
          <rect
            x="20" 
            y="30" 
            width="160" 
            height="90" 
            fill="none" 
            stroke={receivingColor}
            strokeWidth="3"
            strokeOpacity="0.6"
            rx="5"
            filter="url(#glow)"
          >
            <animate 
              attributeName="stroke-opacity"
              values="0.6;0.2;0.6"
              dur="1.5s"
              repeatCount="3"
            />
          </rect>
        )}
      </svg>
    </div>
  );
};

export default ServerRackIcon; 