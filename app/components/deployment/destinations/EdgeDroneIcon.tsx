import React, { useEffect, useState } from 'react';

interface EdgeDroneIconProps {
  className?: string;
  isActive?: boolean;
  isReceiving?: boolean;
}

const EdgeDroneIcon: React.FC<EdgeDroneIconProps> = ({
  className,
  isActive = false,
  isReceiving = false
}) => {
  // Add subtle movement animation to the drone
  const [hoverOffset, setHoverOffset] = useState(0);
  
  // Log states for debugging
  console.log(`EdgeDroneIcon: isActive=${isActive}, isReceiving=${isReceiving}`);
  
  // Color configuration based on states
  const baseColor = isActive ? '#c0d5ff' : '#adbdff';
  const accentColor = isActive ? '#64B5F6' : '#4a90e2';
  const darkAccentColor = isActive ? '#3d88db' : '#3d78c2';
  
  // Override colors if receiving (yellow)
  const receivingColor = '#FFE44D';
  
  // Determine active colors
  const bodyColor = isReceiving ? receivingColor : baseColor;
  
  // Create subtle hovering animation for the drone
  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    
    const animateDrone = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      
      // Oscillate between -2 and 2 pixels over 2 seconds
      const newOffset = Math.sin(elapsed / 1000) * 2;
      setHoverOffset(newOffset);
      
      animationFrame = requestAnimationFrame(animateDrone);
    };
    
    animationFrame = requestAnimationFrame(animateDrone);
    
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
          filter: isReceiving
            ? 'drop-shadow(0 0 8px rgba(255, 228, 77, 0.6))'
            : isActive 
              ? 'drop-shadow(0 0 5px rgba(100, 181, 246, 0.4))' 
              : 'none',
          transition: 'all 0.5s ease',
          opacity: isActive ? 1 : 0.85,
          transform: `translateY(${hoverOffset}px)`
        }}
      >
        {/* Drone body */}
        <path
          d="M 60,50 
             L 40,65 
             L 35,80 
             L 85,80 
             L 80,65 
             Z"
          fill={bodyColor}
          filter="url(#shadow)"
          stroke={darkAccentColor}
          strokeWidth="1"
        >
          {isReceiving && (
            <animate 
              attributeName="opacity"
              values="0.9;1;0.9"
              dur="1.2s"
              repeatCount="2"
            />
          )}
        </path>
        
        {/* Drone cockpit */}
        <path
          d="M 50,60 
             L 56,52 
             L 64,52 
             L 70,60
             Z"
          fill={accentColor}
          filter="url(#shadow)"
        />
        
        {/* Wings */}
        <path
          d="M 35,70 
             L 15,75 
             L 20,80 
             L 40,75 
             Z"
          fill={darkAccentColor}
          filter="url(#shadow)"
        />
        
        <path
          d="M 85,70 
             L 105,75 
             L 100,80 
             L 80,75 
             Z"
          fill={darkAccentColor}
          filter="url(#shadow)"
        />
        
        {/* Tail */}
        <path
          d="M 60,80 
             L 55,90 
             L 65,90 
             Z"
          fill={darkAccentColor}
          filter="url(#shadow)"
        />
        
        {/* Engine exhausts */}
        <circle cx="45" cy="76" r="2" fill="#e6f0ff" />
        <circle cx="75" cy="76" r="2" fill="#e6f0ff" />
        
        {/* Landing gear */}
        <line x1="45" y1="80" x2="45" y2="85" stroke="#333" strokeWidth="2" />
        <line x1="75" y1="80" x2="75" y2="85" stroke="#333" strokeWidth="2" />
        <circle cx="45" cy="86" r="2" fill="#333" />
        <circle cx="75" cy="86" r="2" fill="#333" />
        
        {/* Antenna */}
        <line x1="60" y1="55" x2="60" y2="48" stroke="#333" strokeWidth="1" />
        <circle cx="60" cy="47" r="1" fill="#333" />
        
        {/* Flight trails when active */}
        {isActive && (
          <>
            <path
              d="M 15,75 Q 5,76 -5,77"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,2"
            >
              <animate 
                attributeName="stroke-dashoffset"
                from="0"
                to="8"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
            <path
              d="M 105,75 Q 115,76 125,77"
              stroke="rgba(255, 255, 255, 0.4)"
              strokeWidth="1"
              fill="none"
              strokeDasharray="2,2"
            >
              <animate 
                attributeName="stroke-dashoffset"
                from="0"
                to="8"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </>
        )}
        
        {/* Signal waves when receiving */}
        {isReceiving && (
          <path
            d="M 60,50 Q 60,40 60,30"
            stroke={receivingColor}
            strokeWidth="2"
            fill="none"
            strokeDasharray="3,3"
            opacity="0.8"
          >
            <animate 
              attributeName="stroke-dashoffset"
              from="0"
              to="12"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        )}
        
        {/* Filters */}
        <defs>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
      </svg>
      
      {/* Ground shadow */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        width: '60%',
        height: '5px',
        borderRadius: '50%',
        background: 'rgba(0,0,0,0.2)',
        filter: 'blur(2px)'
      }} />
      
      {/* Text label */}
      <div style={{
        position: 'absolute',
        bottom: '-25px',
        textAlign: 'center',
        fontSize: '14px',
        fontWeight: 'bold',
        color: isReceiving ? receivingColor : isActive ? '#FFB81C' : '#fff',
        textShadow: '0 1px 3px rgba(0,0,0,0.4)',
        width: '100%'
      }}>
        Edge Aircraft
      </div>
    </div>
  );
};

export default EdgeDroneIcon; 