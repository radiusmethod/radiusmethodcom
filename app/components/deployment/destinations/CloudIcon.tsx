import React from 'react';

interface CloudIconProps {
  className?: string;
  title?: string;
  isActive?: boolean;
  isReceiving?: boolean;
}

const CloudIcon: React.FC<CloudIconProps> = ({ 
  className, 
  title = "Government Clouds", 
  isActive = false,
  isReceiving = false 
}) => {
  // Make colors more vibrant when active, but not yellow
  const baseColor = isActive ? '#c0d5ff' : '#adbdff';
  const highlightColor = isActive ? '#dae3ff' : '#dae3ff';
  const shadowColor = isActive ? '#6a82d0' : '#6a82d0';
  const textColor = '#fff';

  // Override colors if receiving a package (yellow pulse)
  const receivingBaseColor = '#FFE44D';
  const receivingHighlightColor = '#FFF4B3';
  const receivingShadowColor = '#FFB81C';

  return (
    <div className={className} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      border: 'none',
      borderRadius: '50%',
      boxShadow: 'none',
      zIndex: isActive || isReceiving ? 5 : 'auto',
      transition: 'all 0.3s ease',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <svg
        viewBox="0 0 240 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: isReceiving 
            ? 'drop-shadow(0 0 10px rgba(255, 228, 77, 0.3))' // Reduced glow effect
            : isActive 
              ? 'drop-shadow(0 0 5px rgba(173, 189, 255, 0.4))' 
              : 'none',
          transition: 'all 0.5s ease',
          // Control opacity for active state without changing position
          opacity: isActive ? 1 : 0.85
        }}
      >
        {/* Animations */}
        <defs>
          <linearGradient id={`cloud-gradient-${isReceiving ? 'receiving' : isActive ? 'active' : 'inactive'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isReceiving ? receivingHighlightColor : highlightColor} />
            <stop offset="100%" stopColor={isReceiving ? receivingBaseColor : baseColor} />
          </linearGradient>
          
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>

        {/* Cloud base */}
        <g filter="url(#shadow)">
          {/* Bottom layer - shadow base */}
          <path
            d="M190,130 
               C205,130 215,125 220,115 
               C225,105 225,95 220,90 
               C224,75 220,65 210,60 
               C208,40 195,30 180,25 
               C165,20 140,20 120,35 
               C110,25 90,20 75,25 
               C60,30 55,40 55,50 
               C45,45 30,45 20,60 
               C10,75 12,95 20,105 
               C25,115 35,120 45,125 
               C55,128 95,130 190,130 
               Z"
            fill={isReceiving ? receivingShadowColor : shadowColor}
          />
          
          {/* Middle layer */}
          <path
            d="M185,125 
               C200,125 210,120 215,110 
               C220,100 220,90 215,85 
               C219,70 215,60 205,55 
               C203,35 190,25 175,20 
               C160,15 135,15 115,30 
               C105,20 85,15 70,20 
               C55,25 50,35 50,45 
               C40,40 25,40 15,55 
               C5,70 7,90 15,100 
               C20,110 30,115 40,120 
               C50,123 90,125 185,125 
               Z"
            fill={isReceiving ? receivingBaseColor : baseColor}
          />
          
          {/* Top layer / highlights */}
          <path
            d="M180,120 
               C195,120 205,115 210,105 
               C215,95 215,85 210,80 
               C214,65 210,55 200,50 
               C198,30 185,20 170,15 
               C155,10 130,10 110,25 
               C100,15 80,10 65,15 
               C50,20 45,30 45,40 
               C35,35 20,35 10,50 
               C0,65 2,85 10,95 
               C15,105 25,110 35,115 
               C45,118 85,120 180,120 
               Z"
            fill={`url(#cloud-gradient-${isReceiving ? 'receiving' : isActive ? 'active' : 'inactive'})`}
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
        </g>

        {/* Text in the center of the cloud */}
        <text
          x="120"
          y="85"
          textAnchor="middle"
          fill={textColor}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="22"
          filter="url(#shadow)"
        >
          Government
        </text>
        <text
          x="120"
          y="110"
          textAnchor="middle"
          fill={textColor}
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
          fontSize="22"
          filter="url(#shadow)"
        >
          Clouds
        </text>
      </svg>
    </div>
  );
};

export default CloudIcon; 