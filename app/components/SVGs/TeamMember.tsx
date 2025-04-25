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
      
      {/* Grid background pattern */}
      <g opacity="0.05">
        <path d="M0 125H250" stroke="#FFFFFF" strokeWidth="0.5" />
        <path d="M125 0V250" stroke="#FFFFFF" strokeWidth="0.5" />
        {[0, 25, 50, 75, 100, 150, 175, 200, 225].map((pos) => (
          <React.Fragment key={`grid-${pos}`}>
            <path d={`M0 ${pos}H250`} stroke="#FFFFFF" strokeWidth="0.3" />
            <path d={`M${pos} 0V250`} stroke="#FFFFFF" strokeWidth="0.3" />
          </React.Fragment>
        ))}
      </g>
      
      {/* Professional silhouette */}
      <g>
        {/* Head */}
        <ellipse cx="125" cy="90" rx="30" ry="35" fill="#292929" />
        
        {/* Neck and shoulders */}
        <path
          d="M125 125
             C85 125, 55 150, 55 190
             H195
             C195 150, 165 125, 125 125Z"
          fill="#292929"
        />
        
        {/* Suit collar */}
        <path
          d="M125 125
             L105 190
             H145
             L125 125Z"
          fill="#333333"
        />
        
        {/* Subtle tie or necklace based on variant */}
        {variant === 'primary' && (
          <path
            d="M125 135
               L120 160
               L125 190
               L130 160
               L125 135Z"
            fill={currentColors.accent}
            opacity="0.8"
          />
        )}
        
        {variant === 'secondary' && (
          <path
            d="M125 135
               C115 145, 115 165, 125 175
               C135 165, 135 145, 125 135Z"
            fill={currentColors.accent}
            opacity="0.8"
          />
        )}
        
        {variant === 'tertiary' && (
          <path
            d="M115 145
               L125 155
               L135 145
               L135 170
               L125 180
               L115 170
               L115 145Z"
            fill={currentColors.accent}
            opacity="0.8"
          />
        )}
      </g>
      
      {/* Subtle facial features */}
      {variant === 'primary' && (
        <g opacity="0.7">
          <ellipse cx="112" cy="85" rx="5" ry="3" fill="#222222" />
          <ellipse cx="138" cy="85" rx="5" ry="3" fill="#222222" />
          <path d="M115 105 Q125 110 135 105" stroke="#222222" strokeWidth="1.5" fill="none" />
        </g>
      )}
      
      {variant === 'secondary' && (
        <g opacity="0.7">
          <ellipse cx="112" cy="85" rx="5" ry="3" fill="#222222" />
          <ellipse cx="138" cy="85" rx="5" ry="3" fill="#222222" />
          <path d="M115 105 H135" stroke="#222222" strokeWidth="1.5" fill="none" />
        </g>
      )}
      
      {variant === 'tertiary' && (
        <g opacity="0.7">
          <ellipse cx="112" cy="85" rx="5" ry="3" fill="#222222" />
          <ellipse cx="138" cy="85" rx="5" ry="3" fill="#222222" />
          <path d="M115 105 Q125 100 135 105" stroke="#222222" strokeWidth="1.5" fill="none" />
        </g>
      )}
      
      {/* Tech-inspired circuit-like elements */}
      <g opacity="0.5">
        <path 
          d="M50 50 L75 50 L75 75" 
          stroke={currentColors.accent} 
          strokeWidth="1" 
          fill="none"
        />
        <path 
          d="M200 50 L175 50 L175 75" 
          stroke={currentColors.accent} 
          strokeWidth="1" 
          fill="none"
        />
        <path 
          d="M50 200 L75 200 L75 175" 
          stroke={currentColors.accent} 
          strokeWidth="1" 
          fill="none"
        />
        <path 
          d="M200 200 L175 200 L175 175" 
          stroke={currentColors.accent} 
          strokeWidth="1" 
          fill="none"
        />
        
        <circle cx="75" cy="75" r="2" fill={currentColors.accent} />
        <circle cx="175" cy="75" r="2" fill={currentColors.accent} />
        <circle cx="75" cy="175" r="2" fill={currentColors.accent} />
        <circle cx="175" cy="175" r="2" fill={currentColors.accent} />
      </g>
      
      {/* Subtle border highlight */}
      <circle 
        cx="125" 
        cy="125" 
        r="123" 
        stroke={currentColors.accent} 
        strokeWidth="1.5" 
        strokeOpacity="0.4" 
        fill="none" 
      />
    </svg>
  );
};

export default TeamMember; 