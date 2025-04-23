import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import PipelineStage from './PipelineStage';
import styles from './Pipeline.module.css';

/**
 * Pipeline component
 * Displays a complete workflow pipeline with stages and jobs
 * 
 * @param {Object} props
 * @param {Array} props.stages - Array of stage objects
 * @param {Function} props.onJobClick - Function to call when a job is clicked
 * @param {boolean} props.isLoading - Flag to indicate if pipeline data is loading
 * @param {boolean} props.showConnections - Whether to show dependency connections between jobs
 */
const Pipeline = ({ stages, onJobClick, isLoading, showConnections }) => {
  const [connections, setConnections] = useState([]);
  
  // Calculate dependency lines between jobs
  useEffect(() => {
    if (!showConnections) {
      setConnections([]);
      return;
    }
    
    const calculateConnections = () => {
      const newConnections = [];
      
      // Get all job elements by their data-job-id
      stages.forEach(stage => {
        stage.jobs.forEach(job => {
          if (job.dependencies && job.dependencies.length > 0) {
            job.dependencies.forEach(depId => {
              const jobEl = document.querySelector(`[data-job-id="${job.id}"]`);
              const depEl = document.querySelector(`[data-job-id="${depId}"]`);
              
              if (jobEl && depEl) {
                const jobRect = jobEl.getBoundingClientRect();
                const depRect = depEl.getBoundingClientRect();
                
                newConnections.push({
                  id: `${depId}-${job.id}`,
                  from: {
                    id: depId,
                    x: depRect.right,
                    y: depRect.top + depRect.height / 2
                  },
                  to: {
                    id: job.id,
                    x: jobRect.left,
                    y: jobRect.top + jobRect.height / 2
                  },
                  status: job.status
                });
              }
            });
          }
        });
      });
      
      setConnections(newConnections);
    };
    
    // Calculate connections after a short delay to ensure DOM elements are rendered
    const timer = setTimeout(calculateConnections, 300);
    
    // Recalculate connections on window resize
    window.addEventListener('resize', calculateConnections);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculateConnections);
    };
  }, [stages, showConnections]);
  
  // Draw an SVG path between two points
  const getPath = (from, to) => {
    const distance = to.x - from.x;
    const controlPoint = distance / 2;
    
    return `M ${from.x} ${from.y} 
            C ${from.x + controlPoint} ${from.y}, 
              ${to.x - controlPoint} ${to.y}, 
              ${to.x} ${to.y}`;
  };
  
  if (isLoading) {
    return (
      <div className={styles.pipelineLoading}>
        <div className={styles.loader}></div>
        <p>Loading pipeline...</p>
      </div>
    );
  }
  
  return (
    <div className={styles.pipelineContainer}>
      <div className={styles.pipeline}>
        {stages.map((stage) => (
          <PipelineStage
            key={stage.id || stage.name}
            name={stage.name}
            jobs={stage.jobs}
            onJobClick={onJobClick}
          />
        ))}
      </div>
      
      {/* Render connections between jobs */}
      {showConnections && connections.length > 0 && (
        <svg className={styles.connections}>
          {connections.map((connection) => (
            <path
              key={connection.id}
              d={getPath(connection.from, connection.to)}
              className={classNames(styles.connectionPath, {
                [styles.connectionSuccess]: connection.status === 'success',
                [styles.connectionFailed]: connection.status === 'failed',
                [styles.connectionRunning]: connection.status === 'running',
                [styles.connectionPending]: connection.status === 'pending'
              })}
            />
          ))}
        </svg>
      )}
    </div>
  );
};

Pipeline.propTypes = {
  stages: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string.isRequired,
      jobs: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          status: PropTypes.oneOf(['pending', 'running', 'success', 'failed']).isRequired,
          type: PropTypes.string,
          dependencies: PropTypes.arrayOf(PropTypes.string)
        })
      ).isRequired
    })
  ).isRequired,
  onJobClick: PropTypes.func,
  isLoading: PropTypes.bool,
  showConnections: PropTypes.bool
};

Pipeline.defaultProps = {
  onJobClick: null,
  isLoading: false,
  showConnections: true
};

export default Pipeline; 