import { useEffect, useState } from 'react';
import styles from './Pipeline.module.css';

/**
 * PipelineConnector component for drawing connection lines between jobs
 * @param {Object} props - Component props
 * @param {string} props.fromId - ID of the source job
 * @param {string} props.toId - ID of the target job
 * @param {string} props.status - Status of the connection (success, failed, running, pending)
 */
export default function PipelineConnector({ fromId, toId, status = 'pending' }) {
  const [line, setLine] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });
  const [isRendered, setIsRendered] = useState(false);

  // Calculate line coordinates based on element positions
  useEffect(() => {
    const calculateLineCoordinates = () => {
      const fromElement = document.getElementById(`job-${fromId}`);
      const toElement = document.getElementById(`job-${toId}`);

      if (!fromElement || !toElement) {
        return;
      }

      const fromRect = fromElement.getBoundingClientRect();
      const toRect = toElement.getBoundingClientRect();

      // Calculate midpoints and offset for parent container
      const parentContainer = fromElement.closest(`.${styles.pipelineContent}`);
      const parentRect = parentContainer ? parentContainer.getBoundingClientRect() : { left: 0, top: 0 };

      // Calculate the center right of the source element
      const x1 = fromRect.right - parentRect.left;
      const y1 = fromRect.top + fromRect.height / 2 - parentRect.top;

      // Calculate the center left of the target element
      const x2 = toRect.left - parentRect.left;
      const y2 = toRect.top + toRect.height / 2 - parentRect.top;

      setLine({ x1, y1, x2, y2 });
      setIsRendered(true);
    };

    // Calculate initially after render and on window resize
    calculateLineCoordinates();
    window.addEventListener('resize', calculateLineCoordinates);
    
    // Recalculate after a short delay to ensure elements are fully rendered
    const timeout = setTimeout(() => {
      calculateLineCoordinates();
    }, 100);

    return () => {
      window.removeEventListener('resize', calculateLineCoordinates);
      clearTimeout(timeout);
    };
  }, [fromId, toId]);

  if (!isRendered) {
    return null;
  }

  return (
    <svg className={styles.connectionLine}>
      <line
        x1={line.x1}
        y1={line.y1}
        x2={line.x2}
        y2={line.y2}
        stroke={getStrokeColor(status)}
        strokeWidth="2"
        strokeDasharray={status === 'running' ? '4 2' : 'none'}
      />
    </svg>
  );
}

function getStrokeColor(status) {
  switch (status) {
    case 'success':
      return '#38a169'; // Green
    case 'failed':
      return '#e53e3e'; // Red
    case 'running':
      return '#d69e2e'; // Yellow
    case 'pending':
    default:
      return '#718096'; // Gray
  }
} 