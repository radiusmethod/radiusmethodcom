import React, { useEffect, useState } from 'react';

interface EdgeSatelliteIconProps {
  className?: string;
  isActive?: boolean;
  isReceiving?: boolean;
  isSending?: boolean;
}

const EdgeSatelliteIcon: React.FC<EdgeSatelliteIconProps> = ({
  className,
  isActive = false,
  isReceiving = false,
  isSending = false
}) => {
  // Add subtle movement animation to the satellite
  const [rotation, setRotation] = useState(0);
  
  // Log states for debugging
  console.log(`EdgeSatelliteIcon: isActive=${isActive}, isReceiving=${isReceiving}, isSending=${isSending}`);
  
  // Color configuration based on states
  const baseColor = isActive ? '#c0d5ff' : '#adbdff';
  const accentColor = isActive ? '#64B5F6' : '#4a90e2'; 
  const panelColor = isActive ? '#e6f0ff' : '#dae3ff';
  
  // Override colors if receiving/sending (yellow for receiving, blue for sending)
  const receivingColor = '#FFE44D';
  const sendingColor = '#64B5F6';
  
  // Determine active colors
  const bodyColor = isReceiving ? receivingColor : isSending ? sendingColor : baseColor;
  
  // Create subtle floating animation for the satellite
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    
    const animateSatellite = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Oscillate between -3 and 3 degrees over 10 seconds
      const newRotation = Math.sin(elapsed / 2000) * 3;
      setRotation(newRotation);
      
      animationFrame = requestAnimationFrame(animateSatellite);
    };
    
    animationFrame = requestAnimationFrame(animateSatellite);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);
  
  return (
    <div className={className} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
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
          opacity: isActive ? 1 : 0.85,
          transform: `rotate(${rotation}deg)`
        }}
      >
        {/* Satellite Body */}
        <rect
          x="40"
          y="45"
          width="40"
          height="30"
          rx="4"
          fill={bodyColor}
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
              values={`${sendingColor};${accentColor};${sendingColor}`}
              dur="1.5s"
              repeatCount="2"
            />
          )}
        </rect>
        
        {/* Solar Panels */}
        <rect
          x="10"
          y="55"
          width="30"
          height="10"
          fill={panelColor}
          filter="url(#shadow)"
        />
        <rect
          x="80"
          y="55"
          width="30"
          height="10"
          fill={panelColor}
          filter="url(#shadow)"
        />
        
        {/* Panel Connectors */}
        <rect x="35" y="57" width="5" height="6" fill={accentColor} />
        <rect x="80" y="57" width="5" height="6" fill={accentColor} />
        
        {/* Antenna */}
        <line
          x1="60"
          y1="45"
          x2="60"
          y2="35"
          stroke={accentColor}
          strokeWidth="2"
          filter="url(#shadow)"
        />
        <circle
          cx="60"
          cy="32"
          r="3"
          fill={accentColor}
          filter="url(#shadow)"
        />
        
        {/* Dish */}
        <ellipse
          cx="50"
          cy="50"
          rx="6"
          ry="5"
          fill="#e6f0ff"
          transform="rotate(-20, 50, 50)"
          strokeWidth="1"
          stroke={accentColor}
          filter="url(#shadow)"
        />
        
        {/* Signal waves when receiving/sending */}
        {(isReceiving || isSending) && (
          <>
            {/* Downward signal */}
            <path
              d={isSending ? "M 60,75 Q 60,95 60,115" : "M 60,32 Q 60,15 60,0"}
              stroke={isReceiving ? receivingColor : sendingColor}
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
            
            {/* Wider signal */}
            <path
              d={isSending ? "M 60,75 Q 70,95 80,115" : "M 60,32 Q 70,15 80,0"}
              stroke={isReceiving ? receivingColor : sendingColor}
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
              d={isSending ? "M 60,75 Q 50,95 40,115" : "M 60,32 Q 50,15 40,0"}
              stroke={isReceiving ? receivingColor : sendingColor}
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
                begin="0.4s"
              />
            </path>
          </>
        )}
        
        {/* Filters */}
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
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
        Satellite
      </div>
    </div>
  );
};

export default EdgeSatelliteIcon; 