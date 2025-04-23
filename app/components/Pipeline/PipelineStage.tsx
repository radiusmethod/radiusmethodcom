'use client';

import React from 'react';
import PipelineJob from './PipelineJob';
import PipelineConnection from './PipelineConnection';
import { Job } from './Pipeline';
import styles from './Pipeline.module.css';

interface PipelineStageProps {
  title: string;
  jobs: Job[];
  showDependencies: boolean;
  allJobs: Job[];
}

const PipelineStage: React.FC<PipelineStageProps> = ({
  title,
  jobs,
  showDependencies,
  allJobs
}) => {
  return (
    <div className={styles.stage}>
      <h3 className={styles.stageTitle}>{title}</h3>
      <div className={styles.jobsList}>
        {jobs.map(job => (
          <div key={job.id} className={styles.jobWrapper}>
            <PipelineJob job={job} />
            {showDependencies && job.dependencies && job.dependencies.map(depId => {
              const sourceJob = allJobs.find(j => j.id === depId);
              if (sourceJob) {
                return (
                  <PipelineConnection 
                    key={`${depId}-${job.id}`}
                    sourceId={depId}
                    targetId={job.id}
                    sourceType={sourceJob.type}
                    targetType={job.type}
                  />
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineStage; 