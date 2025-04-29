import React from 'react';

interface EdgeHangarIconProps {
  className?: string;
  isActive?: boolean;
}

const EdgeHangarIcon: React.FC<EdgeHangarIconProps> = ({
  className,
  isActive = false
}) => {
  // Color configuration based on active state
  const baseColor = isActive ? '#3d78c2' : '#2c5a8f';
  const accentColor = isActive ? '#64B5F6' : '#4a90e2';
  const groundColor = isActive ? '#555' : '#444';
  const runwayColor = isActive ? '#666' : '#555';
  const runwayMarkingColor = isActive ? '#fff' : '#ddd';
  
  return (
    <div className={className} style={{ 
      position: 'relative', 
      width: '100%', 
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      // Don't affect positioning with transforms
      transformStyle: 'preserve-3d'
    }}>
      <svg
        viewBox="0 0 200 120"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          width: '100%',
          height: '100%',
          filter: isActive ? 'drop-shadow(0 0 2px rgba(0, 0, 0, 0.3))' : 'none',
          transition: 'all 0.5s ease',
          opacity: isActive ? 1 : 0.85
        }}
      >
        {/* Sky background */}
        <rect
          x="0"
          y="0"
          width="200"
          height="70"
          fill="#1a1a2e"
          opacity="0.7"
        />
        
        {/* Ground */}
        <rect
          x="0"
          y="70"
          width="200"
          height="50"
          fill={groundColor}
        />
        
        {/* Runway */}
        <rect
          x="20"
          y="80"
          width="160"
          height="20"
          fill={runwayColor}
          rx="2"
        />
        
        {/* Runway markings */}
        <rect x="30" y="89" width="10" height="2" fill={runwayMarkingColor} />
        <rect x="50" y="89" width="10" height="2" fill={runwayMarkingColor} />
        <rect x="70" y="89" width="10" height="2" fill={runwayMarkingColor} />
        <rect x="90" y="89" width="10" height="2" fill={runwayMarkingColor} />
        <rect x="110" y="89" width="10" height="2" fill={runwayMarkingColor} />
        <rect x="130" y="89" width="10" height="2" fill={runwayMarkingColor} />
        <rect x="150" y="89" width="10" height="2" fill={runwayMarkingColor} />
        
        {/* Hangar building */}
        <path
          d="M 150,70 
             L 150,30 
             L 190,30 
             L 190,70 
             Z"
          fill={baseColor}
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Hangar roof */}
        <path
          d="M 145,30 
             L 170,15 
             L 195,30 
             Z"
          fill={accentColor}
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Hangar door */}
        <path
          d="M 160,70 
             L 160,40 
             L 180,40 
             L 180,70 
             Z"
          fill="#333"
          stroke="#000"
          strokeWidth="1"
        />
        
        {/* Windows */}
        <rect x="155" y="35" width="5" height="5" fill="#e6f0ff" opacity="0.8" />
        <rect x="165" y="35" width="5" height="5" fill="#e6f0ff" opacity="0.8" />
        <rect x="175" y="35" width="5" height="5" fill="#e6f0ff" opacity="0.8" />
        
        {/* Control tower */}
        <rect x="30" y="45" width="15" height="25" fill={baseColor} stroke="#000" strokeWidth="1" />
        <rect x="33" y="30" width="9" height="15" fill={accentColor} stroke="#000" strokeWidth="1" />
        <rect x="34" y="32" width="7" height="7" fill="#b8e0ff" opacity="0.8" />
        
        {/* Stars in sky */}
        <circle cx="15" cy="15" r="0.5" fill="#fff" opacity="0.8" />
        <circle cx="30" cy="25" r="0.5" fill="#fff" opacity="0.7" />
        <circle cx="45" cy="10" r="0.5" fill="#fff" opacity="0.9" />
        <circle cx="75" cy="20" r="0.5" fill="#fff" opacity="0.7" />
        <circle cx="100" cy="15" r="0.5" fill="#fff" opacity="0.8" />
        <circle cx="125" cy="25" r="0.5" fill="#fff" opacity="0.7" />
        <circle cx="140" cy="10" r="0.5" fill="#fff" opacity="0.9" />
        <circle cx="170" cy="5" r="0.5" fill="#fff" opacity="0.8" />
        
        {/* Runway lights */}
        <circle cx="25" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="50" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.2s" />
        </circle>
        <circle cx="75" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.4s" />
        </circle>
        <circle cx="100" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.6s" />
        </circle>
        <circle cx="125" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="0.8s" />
        </circle>
        <circle cx="150" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="1s" />
        </circle>
        <circle cx="175" y="80" r="1" fill="#FFE44D" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2s" repeatCount="indefinite" begin="1.2s" />
        </circle>
        
        {/* Tower warning light */}
        <circle cx="37.5" y="30" r="1.5" fill="red" opacity="0.8">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default EdgeHangarIcon; 