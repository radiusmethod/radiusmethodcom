import React from 'react';

const TeamMemberSilhouette: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Ultra minimal silhouette - single shape with gradient fill for subtle depth */}
      <path
        d="M100 35
           C120 35, 135 50, 135 75
           C135 95, 120 110, 100 110
           C80 110, 65 95, 65 75
           C65 50, 80 35, 100 35Z
           
           M85 110
           L85 120
           L115 120
           L115 110
           
           M85 120
           C65 120, 45 145, 45 180
           L155 180
           C155 145, 135 120, 115 120"
        fill="url(#silhouetteGradient)"
      />
      
      <defs>
        <linearGradient id="silhouetteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#555555" />
          <stop offset="100%" stopColor="#333333" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default TeamMemberSilhouette; 