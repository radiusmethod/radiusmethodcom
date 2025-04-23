import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import styles from './Pipeline.module.css';

/**
 * PipelineJob component
 * Renders a single job in the pipeline
 * 
 * @param {Object} props
 * @param {string} props.id - The unique identifier for the job
 * @param {string} props.name - The name of the job
 * @param {string} props.status - The status of the job (pending, running, success, failed)
 * @param {string} props.type - The type of job
 * @param {Function} props.onClick - Function to call when the job is clicked
 */
const PipelineJob = ({ id, name, status, type, onClick }) => {
  const jobClasses = classNames(
    styles.pipelineJob,
    styles[`job${status.charAt(0).toUpperCase() + status.slice(1)}`],
    { [styles.clickable]: !!onClick }
  );

  // Status icon based on job status
  const renderStatusIcon = () => {
    switch (status) {
      case 'success':
        return <span className={styles.statusIcon}>✓</span>;
      case 'running':
        return <span className={styles.statusIcon}>⟳</span>;
      case 'failed':
        return <span className={styles.statusIcon}>✗</span>;
      default:
        return <span className={styles.statusIcon}>•</span>;
    }
  };

  return (
    <div 
      id={`job-${id}`}
      className={jobClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      data-job-id={id}
    >
      <div className={styles.jobContent}>
        <div className={styles.jobStatus}>
          {renderStatusIcon()}
        </div>
        <div className={styles.jobInfo}>
          <div className={styles.jobName}>{name}</div>
          {type && <div className={styles.jobType}>{type}</div>}
        </div>
      </div>
    </div>
  );
};

PipelineJob.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['pending', 'running', 'success', 'failed']).isRequired,
  type: PropTypes.string,
  onClick: PropTypes.func
};

PipelineJob.defaultProps = {
  type: '',
  onClick: null
};

export default PipelineJob; 