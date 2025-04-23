'use client';

import React from 'react';
import { Job, JobStatus } from './Pipeline';
import styles from './Pipeline.module.css';

interface PipelineJobProps {
  job: Job;
}

const PipelineJob: React.FC<PipelineJobProps> = ({ job }) => {
  const getStatusIcon = (status: JobStatus) => {
    switch (status) {
      case 'success':
        return (
          <div className={`${styles.statusIcon} ${styles.statusSuccess}`}>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66675 10.1147L12.7947 3.98602L13.7381 4.92935L6.66675 12.0007L2.42875 7.76268L3.37208 6.81935L6.66675 10.1147Z" fill="currentColor" />
            </svg>
          </div>
        );
      case 'running':
        return (
          <div className={`${styles.statusIcon} ${styles.statusRunning}`}>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        );
      case 'failed':
        return (
          <div className={`${styles.statusIcon} ${styles.statusFailed}`}>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 3.5L3.5 12.5M3.5 3.5L12.5 12.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
      case 'pending':
      default:
        return (
          <div className={`${styles.statusIcon} ${styles.statusPending}`}>
            <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3V8L11 11M8 1.5C4.41015 1.5 1.5 4.41015 1.5 8C1.5 11.5899 4.41015 14.5 8 14.5C11.5899 14.5 14.5 11.5899 14.5 8C14.5 4.41015 11.5899 1.5 8 1.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        );
    }
  };

  return (
    <div className={`${styles.job} ${styles[`job${job.status.charAt(0).toUpperCase() + job.status.slice(1)}`]}`}>
      {getStatusIcon(job.status)}
      <div className={styles.jobInfo}>
        <span className={styles.jobName}>{job.name}</span>
        <span className={styles.jobType}>{job.type}</span>
      </div>
      <button className={styles.jobAction}>
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 3.5V12.5M12.5 8H3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>
    </div>
  );
};

export default PipelineJob; 