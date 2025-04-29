import React from 'react';

interface EdgeSatelliteDishIconProps {
  className?: string;
  isActive?: boolean;
  isReceiving?: boolean;
  isSending?: boolean;
}

const EdgeSatelliteDishIcon: React.FC<EdgeSatelliteDishIconProps> = ({
  className,
  isActive = false,
  isReceiving = false,
  isSending = false
}) => {
  // Log states for debugging
  console.log(`EdgeSatelliteDishIcon: isActive=${isActive}, isReceiving=${isReceiving}, isSending=${isSending}`);
  
  // Color configuration based on states
  const baseColor = isActive ? '#c0d5ff' : '#adbdff';
  const accentColor = isActive ? '#64B5F6' : '#4a90e2';
  const highlightColor = isActive ? '#e6f0ff' : '#dae3ff';
  
  // Override colors if receiving/sending (yellow for receiving, blue for sending)
  const receivingColor = '#FFE44D';
  const sendingColor = '#64B5F6';
  
  // Determine active colors
  const dishColor = isReceiving ? receivingColor : isSending ? sendingColor : baseColor;
  const standColor = isActive ? accentColor : '#6a82d0';
  
  return (
    <div className={className} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // Avoid styling that affects positioning
      transformStyle: 'preserve-3d',
      transformOrigin: 'center center',
      perspective: '1000px'
    }}>
      <svg
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: isReceiving || isSending
            ? `drop-shadow(0 0 8px ${isReceiving ? 'rgba(255, 228, 77, 0.6)' : 'rgba(100, 181, 246, 0.6)'})`
            : isActive 
              ? 'drop-shadow(0 0 5px rgba(100, 181, 246, 0.4))' 
              : 'none',
          transition: 'all 0.5s ease',
          opacity: isActive ? 1 : 0.85
        }}
      >
        {/* Base and stand */}
        <rect
          x="45"
          y="90"
          width="30"
          height="8"
          rx="2"
          fill="#6a82d0"
          filter="url(#shadow)"
        />
        
        <rect
          x="55"
          y="60"
          width="10"
          height="30"
          fill={standColor}
          filter="url(#shadow)"
        />
        
        {/* Dish */}
        <ellipse
          cx="60"
          cy="50"
          rx="30"
          ry="25"
          fill={dishColor}
          transform="rotate(20, 60, 50)"
          filter="url(#shadow)"
        >
          {isReceiving && (
            <animate 
              attributeName="opacity"
              values="0.9;1;0.9"
              dur="1.2s"
              repeatCount="2"
            />
          )}
          {isSending && (
            <animate 
              attributeName="fill"
              values={`${sendingColor};${highlightColor};${sendingColor}`}
              dur="1.5s"
              repeatCount="2"
            />
          )}
        </ellipse>
        
        {/* Dish interior shading */}
        <ellipse
          cx="60"
          cy="50"
          rx="22"
          ry="18"
          fill={isActive ? highlightColor : '#b8c4f5'}
          transform="rotate(20, 60, 50)"
          filter="url(#shadow)"
          opacity="0.7"
        />
        
        {/* Receiver arm */}
        <line
          x1="60"
          y1="50"
          x2="80"
          y2="35"
          stroke={accentColor}
          strokeWidth="2"
          filter="url(#shadow)"
        />
        
        {/* Receiver */}
        <circle
          cx="80"
          cy="35"
          r="4"
          fill={isActive ? accentColor : '#6a82d0'}
          filter="url(#shadow)"
        />
        
        {/* Signal waves - visible when sending */}
        {isSending && (
          <>
            <path
              d="M 60,30 Q 70,10 85,-5"
              stroke={sendingColor}
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,4"
              opacity="0.8"
            >
              <animate 
                attributeName="stroke-dashoffset"
                from="0"
                to="16"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M 60,30 Q 75,5 95,-15"
              stroke={sendingColor}
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,4"
              opacity="0.6"
            >
              <animate 
                attributeName="stroke-dashoffset"
                from="0"
                to="16"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.2s"
              />
            </path>
            <path
              d="M 60,30 Q 80,0 105,-25"
              stroke={sendingColor}
              strokeWidth="2"
              fill="none"
              strokeDasharray="4,4"
              opacity="0.4"
            >
              <animate 
                attributeName="stroke-dashoffset"
                from="0"
                to="16"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.4s"
              />
            </path>
          </>
        )}
        
        {/* Filters */}
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
      </svg>
      
      {/* Text label */}
      <div style={{
        position: 'absolute',
        bottom: '-25px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        color: isReceiving ? receivingColor : isSending ? sendingColor : isActive ? '#FFB81C' : '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.4)',
        width: '100%'
      }}>
        Ground Station
      </div>
    </div>
  );
};

export default EdgeSatelliteDishIcon; 