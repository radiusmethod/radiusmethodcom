'use client';

import React from 'react';
import styles from './PipelineDemo.module.css';

type JobStatus = 'success' | 'running' | 'failed' | 'pending';

interface Job {
  id: string;
  name: string;
  status: JobStatus;
  type: 'build' | 'test' | 'evaluate' | 'deploy';
  dependencies?: string[];
}

const PipelineDemo: React.FC = () => {
  // Create a sample pipeline with interconnected jobs
  const sampleJobs: Job[] = [
    // Build stage jobs
    {
      id: 'build-1',
      name: 'Initialize Project',
      status: 'success',
      type: 'build',
    },
    {
      id: 'build-2',
      name: 'Compile Source',
      status: 'success',
      type: 'build',
      dependencies: ['build-1']
    },
    {
      id: 'build-3',
      name: 'Generate Assets',
      status: 'success',
      type: 'build',
      dependencies: ['build-1']
    },
    
    // Test stage jobs
    {
      id: 'test-1',
      name: 'Unit Tests',
      status: 'success',
      type: 'test',
      dependencies: ['build-2']
    },
    {
      id: 'test-2',
      name: 'Integration Tests',
      status: 'running',
      type: 'test',
      dependencies: ['build-2', 'build-3']
    },
    {
      id: 'test-3',
      name: 'Performance Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['test-1']
    },
    
    // Evaluate stage jobs
    {
      id: 'eval-1',
      name: 'Security Scan',
      status: 'success',
      type: 'evaluate',
      dependencies: ['test-1', 'test-2']
    },
    {
      id: 'eval-2',
      name: 'Quality Analysis',
      status: 'running',
      type: 'evaluate',
      dependencies: ['test-3']
    },
    {
      id: 'eval-3',
      name: 'Compliance Check',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['eval-1']
    },
    
    // Deploy stage jobs
    {
      id: 'deploy-1',
      name: 'Staging Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['eval-1', 'eval-2']
    },
    {
      id: 'deploy-2',
      name: 'Production Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['deploy-1', 'eval-3']
    }
  ];

  // Group jobs by type
  const buildJobs = sampleJobs.filter(job => job.type === 'build');
  const testJobs = sampleJobs.filter(job => job.type === 'test');
  const evaluateJobs = sampleJobs.filter(job => job.type === 'evaluate');
  const deployJobs = sampleJobs.filter(job => job.type === 'deploy');

  console.log('Rendering PipelineDemo with jobs:', sampleJobs.length);

  // Simple StatusIcon component
  const StatusIcon = ({ status }: { status: JobStatus }) => {
    switch (status) {
      case 'success':
        return <div className={styles.statusSuccess}>✓</div>
      case 'running':
        return <div className={styles.statusRunning}>⟳</div>
      case 'failed':
        return <div className={styles.statusFailed}>✗</div>
      default:
        return <div className={styles.statusPending}>•</div>
    }
  };

  // Simple Job component
  const JobItem = ({ job }: { job: Job }) => (
    <div className={`${styles.job} ${styles[`job${job.status.charAt(0).toUpperCase() + job.status.slice(1)}`]}`}>
      <StatusIcon status={job.status} />
      <div className={styles.jobInfo}>
        <span className={styles.jobName}>{job.name}</span>
        <span className={styles.jobType}>{job.type}</span>
      </div>
    </div>
  );

  // Simple Stage component
  const Stage = ({ title, jobs }: { title: string, jobs: Job[] }) => (
    <div className={styles.stage}>
      <h3 className={styles.stageTitle}>{title}</h3>
      <div className={styles.jobsList}>
        {jobs.map(job => (
          <div key={job.id} className={styles.jobWrapper}>
            <JobItem job={job} />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={styles.pipelineDemo}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Visualize Your Development Pipeline</h2>
          <p className={styles.description}>
            Track your build, test, and deployment processes in real-time with our intuitive pipeline visualization.
          </p>
        </div>
        
        <div className={styles.pipelineContainer}>
          <div className={styles.pipelineStages}>
            <Stage title="Build" jobs={buildJobs} />
            <Stage title="Test" jobs={testJobs} />
            <Stage title="Evaluate" jobs={evaluateJobs} />
            <Stage title="Deploy" jobs={deployJobs} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PipelineDemo; 