'use client';

import React, { useEffect, useState } from 'react';
import styles from './Pipeline.module.css';

interface PipelineConnectionProps {
  sourceId: string;
  targetId: string;
  sourceType: string;
  targetType: string;
}

const PipelineConnection: React.FC<PipelineConnectionProps> = ({
  sourceId,
  targetId,
  sourceType,
  targetType
}) => {
  const [path, setPath] = useState<string>('');
  
  useEffect(() => {
    // In a real implementation, this would calculate the path between elements
    // based on their positions in the DOM
    const calculatePath = () => {
      // For demo purposes, we're using a predefined curved path
      // In a real app, we would calculate the actual coordinates
      
      // This assumes a horizontal layout with 3 columns
      const horizontalOffset = 200; // Distance between columns
      const curveControl = 50;      // Control point for curve
      
      // Determine if this is going across one or two columns
      const stageGap = targetType === sourceType ? 0 : 
                       (targetType === 'deploy' && sourceType === 'build') ? 2 : 1;
      
      // Simplified path for demo purposes
      return `M0,20 C${curveControl},20 ${horizontalOffset * stageGap - curveControl},20 ${horizontalOffset * stageGap},20`;
    };
    
    setPath(calculatePath());
    
    // In a real app, we would also add a resize observer or window resize listener
    // to recalculate paths when the layout changes
  }, [sourceId, targetId, sourceType, targetType]);

  return (
    <div className={styles.connection} data-source={sourceId} data-target={targetId}>
      <svg className={styles.connectionSvg} viewBox={`0 0 ${path ? '400 40' : '0 0'}`} preserveAspectRatio="none">
        <path d={path} className={styles.connectionPath} />
      </svg>
    </div>
  );
};

export default PipelineConnection; 