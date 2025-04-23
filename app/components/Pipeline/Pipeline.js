'use client';

import { useState } from 'react';
import PipelineStage from './PipelineStage';
import styles from './Pipeline.module.css';

export default function Pipeline({ initialData = [] }) {
  const [pipelineData, setPipelineData] = useState(initialData);

  // Handle job status changes
  const handleJobStatusChange = (jobId, newStatus) => {
    setPipelineData(prevData => {
      return prevData.map(stage => ({
        ...stage,
        jobs: stage.jobs.map(job => 
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      }));
    });
  };

  return (
    <div className={styles.pipeline}>
      {pipelineData.map((stage, index) => (
        <PipelineStage
          key={`stage-${index}`}
          title={stage.title}
          jobs={stage.jobs}
          onJobStatusChange={handleJobStatusChange}
        />
      ))}
    </div>
  );
} 