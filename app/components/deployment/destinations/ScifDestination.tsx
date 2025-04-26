import React from 'react';

interface ScifDestinationProps {
  x: number;
  y: number;
  active: boolean;
}

const ScifDestination: React.FC<ScifDestinationProps> = ({ x, y, active }) => {
  // Base color variables
  const baseColor = active ? "#4A5568" : "#2D3748";
  const roofColor = active ? "#2C5282" : "#2A4365";
  const wallColor = active ? "#A0AEC0" : "#718096";
  const windowColor = active ? "#EBF8FF" : "#BEE3F8";
  const doorColor = active ? "#4299E1" : "#3182CE";
  const gridColor = active ? "#CBD5E0" : "#A0AEC0";
  
  // Building dimensions
  const buildingWidth = 50;
  const buildingHeight = 35;
  const buildingDepth = 30;
  
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg viewBox="-40 -40 80 80" width="100%" height="100%">
        {/* Faraday Cage Grid (subtle background effect) */}
        <g opacity={0.3}>
          {/* Vertical grid lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line 
              key={`v-grid-${i}`}
              x1={-25 + i * 10} 
              y1={-25} 
              x2={-25 + i * 10} 
              y2={25} 
              stroke={gridColor} 
              strokeWidth={0.5} 
            />
          ))}
          {/* Horizontal grid lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <line 
              key={`h-grid-${i}`}
              x1={-25} 
              y1={-25 + i * 10} 
              x2={25} 
              y2={-25 + i * 10} 
              stroke={gridColor} 
              strokeWidth={0.5} 
            />
          ))}
        </g>
        
        {/* Building Structure - Asymmetrical Third-Person View */}
        <g>
          {/* Floor/Base */}
          <rect 
            x={-buildingWidth/2} 
            y={-buildingHeight/2} 
            width={buildingWidth} 
            height={buildingDepth} 
            fill={baseColor} 
            stroke="#1A202C" 
            strokeWidth={1}
          />
          
          {/* Back Wall */}
          <rect 
            x={-buildingWidth/2} 
            y={-buildingHeight/2} 
            width={buildingWidth} 
            height={buildingHeight-10} 
            fill={wallColor} 
            stroke="#1A202C" 
            strokeWidth={1}
          />
          
          {/* Side Wall (right) */}
          <path 
            d={`M ${buildingWidth/2} ${-buildingHeight/2} 
                v ${buildingHeight-10} 
                l ${buildingDepth/4} ${-buildingDepth/4} 
                v ${-(buildingHeight-10-buildingDepth/4)} 
                z`}
            fill={wallColor} 
            stroke="#1A202C" 
            strokeWidth={1}
          />
          
          {/* Roof - Asymmetrical */}
          <path 
            d={`M ${-buildingWidth/2} ${-buildingHeight/2} 
                l ${buildingWidth/2} ${-buildingDepth/3}
                l ${buildingWidth/2} ${buildingDepth/3}
                l ${buildingDepth/4} ${-buildingDepth/4}
                l ${-buildingWidth/2} ${-buildingDepth/3}
                l ${-buildingWidth/2} ${buildingDepth/3}
                z`}
            fill={roofColor} 
            stroke="#1A202C" 
            strokeWidth={1}
          />
          
          {/* Door */}
          <rect 
            x={-10} 
            y={-buildingHeight/2 + buildingHeight - 20} 
            width={16} 
            height={20} 
            fill={doorColor} 
            stroke="#1A202C" 
            strokeWidth={0.5}
            rx={1}
          />
          
          {/* Door Handle */}
          <circle 
            cx={2} 
            cy={-buildingHeight/2 + buildingHeight - 10} 
            r={1.5} 
            fill="#E2E8F0" 
          />
          
          {/* Windows */}
          <rect 
            x={-buildingWidth/2 + 10} 
            y={-buildingHeight/2 + 10} 
            width={10} 
            height={10} 
            fill={windowColor} 
            stroke="#1A202C" 
            strokeWidth={0.5}
          />
          <rect 
            x={buildingWidth/2 - 20} 
            y={-buildingHeight/2 + 10} 
            width={10} 
            height={10} 
            fill={windowColor} 
            stroke="#1A202C" 
            strokeWidth={0.5}
          />
          
          {/* SCIF Label */}
          <text 
            x={0} 
            y={-buildingHeight/2 + buildingHeight - 30} 
            textAnchor="middle" 
            fill={active ? "#E2E8F0" : "#A0AEC0"} 
            fontSize={active ? "12px" : "10px"}
            fontWeight="bold"
          >
            SCIF
          </text>
        </g>
      </svg>
    </div>
  );
};

export default ScifDestination; 