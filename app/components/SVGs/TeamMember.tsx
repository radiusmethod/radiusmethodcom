import React from 'react';

interface TeamMemberProps {
  className?: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
  className,
  variant = 'primary'
}) => {
  // Color variations based on variant
  const colors = {
    primary: {
      accent: '#FF4136',
      secondary: '#0074D9',
      bg: '#1A1A1A'
    },
    secondary: {
      accent: '#0074D9',
      secondary: '#FF4136',
      bg: '#1A1A1A'
    },
    tertiary: {
      accent: '#2ECC40',
      secondary: '#FF4136',
      bg: '#1A1A1A'
    }
  };
  
  const currentColors = colors[variant];
  
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Circular background */}
      <circle cx="125" cy="125" r="125" fill={currentColors.bg} />
      
      {/* Tech pattern overlay */}
      <g opacity="0.07">
        {/* Horizontal lines */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path 
            key={`h-${i}`} 
            d={`M25 ${i * 25} H225`} 
            stroke="#FFFFFF" 
            strokeWidth="1"
          />
        ))}
        
        {/* Vertical lines */}
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path 
            key={`v-${i}`} 
            d={`M${i * 25} 25 V225`} 
            stroke="#FFFFFF" 
            strokeWidth="1"
          />
        ))}
      </g>
      
      {/* Circuit-like patterns */}
      <g opacity="0.4">
        <path 
          d="M50 50 L75 50 L75 75" 
          stroke={currentColors.accent} 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M200 50 L175 50 L175 75" 
          stroke={currentColors.accent} 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M50 200 L75 200 L75 175" 
          stroke={currentColors.accent} 
          strokeWidth="1.5" 
          fill="none"
        />
        <path 
          d="M200 200 L175 200 L175 175" 
          stroke={currentColors.accent} 
          strokeWidth="1.5" 
          fill="none"
        />
      </g>
      
      {/* Abstract person silhouette */}
      <g>
        {/* Head */}
        <circle cx="125" cy="90" r="35" fill="#333333" />
        
        {/* Body shape */}
        <path
          d="M90 180 
             C90 130, 160 130, 160 180"
          fill="#333333"
        />
        
        {/* Abstract facial features depending on variant */}
        {variant === 'primary' && (
          <g>
            <rect x="110" y="80" width="30" height="5" fill={currentColors.accent} />
            <circle cx="125" cy="100" r="3" fill={currentColors.accent} />
          </g>
        )}
        
        {variant === 'secondary' && (
          <g>
            <circle cx="110" y="85" r="3" fill={currentColors.accent} />
            <circle cx="140" y="85" r="3" fill={currentColors.accent} />
            <path d="M110 105 H140" stroke={currentColors.accent} strokeWidth="2" />
          </g>
        )}
        
        {variant === 'tertiary' && (
          <g>
            <path d="M110 85 H140" stroke={currentColors.accent} strokeWidth="2" />
            <circle cx="125" cy="100" r="5" fill={currentColors.accent} />
          </g>
        )}
      </g>
      
      {/* Device in hand */}
      <g>
        <rect 
          x="100" 
          y="150" 
          width="50" 
          height="30" 
          rx="2" 
          fill="#2D2D2D" 
          stroke={currentColors.secondary} 
          strokeWidth="1.5"
        />
        <rect 
          x="105" 
          y="155" 
          width="40" 
          height="20" 
          rx="1" 
          fill={currentColors.secondary} 
          opacity="0.3"
        />
      </g>
      
      {/* Subtle border highlight */}
      <circle 
        cx="125" 
        cy="125" 
        r="123" 
        stroke={currentColors.accent} 
        strokeWidth="2" 
        strokeOpacity="0.3" 
        fill="none" 
      />
    </svg>
  );
};

export default TeamMember; 