'use client';

import PipelineJob from './PipelineJob';
import styles from './Pipeline.module.css';

export default function PipelineStage({ title, jobs, onJobStatusChange }) {
  return (
    <div className={styles.stage}>
      <div className={styles.stageHeader}>{title}</div>
      <div className={styles.stageJobs}>
        {jobs.map((job, index) => (
          <PipelineJob 
            key={job.id || `job-${index}`}
            id={job.id}
            name={job.name}
            status={job.status}
            type={job.type || 'default'}
            dependencies={job.dependencies}
            onStatusChange={(newStatus) => onJobStatusChange(job.id, newStatus)}
          />
        ))}
      </div>
    </div>
  );
} 