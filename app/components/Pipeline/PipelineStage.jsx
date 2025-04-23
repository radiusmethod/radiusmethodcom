import React from 'react';
import PropTypes from 'prop-types';
import PipelineJob from './PipelineJob';
import styles from './Pipeline.module.css';

/**
 * PipelineStage component
 * Renders a single stage in the pipeline with its jobs
 * 
 * @param {Object} props
 * @param {string} props.name - The name of the stage
 * @param {Array} props.jobs - Array of job objects in this stage
 * @param {Function} props.onJobClick - Function to call when a job is clicked
 */
const PipelineStage = ({ name, jobs, onJobClick }) => {
  const statusCount = {
    success: jobs.filter(job => job.status === 'success').length,
    running: jobs.filter(job => job.status === 'running').length,
    failed: jobs.filter(job => job.status === 'failed').length,
    pending: jobs.filter(job => job.status === 'pending').length
  };

  // Calculate overall stage status
  let stageStatus = 'pending';
  if (statusCount.failed > 0) {
    stageStatus = 'failed';
  } else if (statusCount.running > 0) {
    stageStatus = 'running';
  } else if (statusCount.success === jobs.length) {
    stageStatus = 'success';
  }

  return (
    <div className={styles.pipelineStage}>
      <div className={`${styles.stageHeader} ${styles[`stage${stageStatus.charAt(0).toUpperCase() + stageStatus.slice(1)}`]}`}>
        <h3>{name}</h3>
        <div className={styles.stageStats}>
          {statusCount.success > 0 && <span className={styles.stageStatSuccess}>{statusCount.success}</span>}
          {statusCount.running > 0 && <span className={styles.stageStatRunning}>{statusCount.running}</span>}
          {statusCount.failed > 0 && <span className={styles.stageStatFailed}>{statusCount.failed}</span>}
          {statusCount.pending > 0 && <span className={styles.stageStatPending}>{statusCount.pending}</span>}
        </div>
      </div>

      <div className={styles.stageJobs}>
        {jobs.map((job) => (
          <PipelineJob
            key={job.id}
            id={job.id}
            name={job.name}
            status={job.status}
            type={job.type}
            onClick={onJobClick ? () => onJobClick(job) : undefined}
          />
        ))}
      </div>
    </div>
  );
};

PipelineStage.propTypes = {
  name: PropTypes.string.isRequired,
  jobs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['pending', 'running', 'success', 'failed']).isRequired,
      type: PropTypes.string,
      dependencies: PropTypes.arrayOf(PropTypes.string)
    })
  ).isRequired,
  onJobClick: PropTypes.func
};

PipelineStage.defaultProps = {
  onJobClick: null
};

export default PipelineStage; 