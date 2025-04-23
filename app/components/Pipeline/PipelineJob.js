'use client';

import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Check, X, Loader2, Clock } from 'lucide-react';
import styles from './Pipeline.module.css';

/**
 * PipelineJob component for displaying a single job in a pipeline
 * @param {Object} props - Component props
 * @param {string} props.id - Job ID
 * @param {string} props.name - Job name
 * @param {string} props.status - Job status (success, failed, running, pending)
 * @param {string} props.type - Job type (build, test, deploy)
 * @param {string[]} props.dependencies - IDs of jobs this job depends on
 */
export default function PipelineJob({ id, name, status = 'pending', type, dependencies = [] }) {
  const [currentStatus, setCurrentStatus] = useState(status);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle status changes with animation
  useEffect(() => {
    if (status !== currentStatus) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setCurrentStatus(status);
        setIsAnimating(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [status, currentStatus]);

  return (
    <div
      id={`job-${id}`}
      className={classNames(styles.job, {
        [styles.jobBuild]: type === 'build',
        [styles.jobTest]: type === 'test',
        [styles.jobDeploy]: type === 'deploy',
        [styles.jobSuccess]: currentStatus === 'success',
        [styles.jobFailed]: currentStatus === 'failed',
        [styles.jobRunning]: currentStatus === 'running',
        [styles.jobPending]: currentStatus === 'pending',
        [styles.jobAnimating]: isAnimating,
      })}
    >
      <div className={styles.jobContent}>
        <span className={styles.jobName}>{name}</span>
        <div className={styles.jobStatus}>
          {getStatusIcon(currentStatus)}
        </div>
      </div>
    </div>
  );
}

function getStatusIcon(status) {
  switch (status) {
    case 'success':
      return <Check size={16} className={styles.successIcon} />;
    case 'failed':
      return <X size={16} className={styles.failedIcon} />;
    case 'running':
      return <Loader2 size={16} className={classNames(styles.runningIcon, styles.spin)} />;
    case 'pending':
    default:
      return <Clock size={16} className={styles.pendingIcon} />;
  }
}

PipelineJob.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['success', 'failed', 'running', 'pending']),
  type: PropTypes.oneOf(['build', 'test', 'deploy']).isRequired,
  dependencies: PropTypes.arrayOf(PropTypes.string),
}; 