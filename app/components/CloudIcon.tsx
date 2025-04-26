import React from 'react';

interface CloudIconProps {
  className?: string;
  title?: string;
  isActive?: boolean;
}

const CloudIcon: React.FC<CloudIconProps> = ({ className, title = "Government Clouds", isActive = false }) => {
  const baseColor = isActive ? '#FFB81C' : '#adbdff';
  const highlightColor = isActive ? '#ffcd5e' : '#dae3ff';
  const shadowColor = isActive ? '#c28c00' : '#6a82d0';
  const textColor = isActive ? '#333' : '#fff';

  return (
    <div className={className} style={{ position: 'relative', width: '100%', height: '100%' }}>
      <svg
        viewBox="0 0 240 180"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          filter: isActive ? 'drop-shadow(0 0 10px rgba(255, 184, 28, 0.6))' : 'none',
          transition: 'all 0.5s ease',
        }}
      >
        {/* Animations */}
        <defs>
          <linearGradient id={`cloud-gradient-${isActive ? 'active' : 'inactive'}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={highlightColor} />
            <stop offset="100%" stopColor={baseColor} />
          </linearGradient>
          
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="rgba(0,0,0,0.3)" />
          </filter>

          {/* Animation for floating effect */}
          <animateTransform
            id="floatAnimation"
            attributeName="transform"
            attributeType="XML"
            type="translate"
            values="0,0; 0,-5; 0,0"
            dur="4s"
            repeatCount="indefinite"
          />
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
            fill={shadowColor}
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
            fill={baseColor}
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0,0; 0,-3; 0,0"
              dur="4s"
              repeatCount="indefinite"
              additive="sum"
            />
          </path>
          
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
            fill={`url(#cloud-gradient-${isActive ? 'active' : 'inactive'})`}
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="translate"
              values="0,0; 0,-5; 0,0"
              dur="4s"
              repeatCount="indefinite"
            />
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