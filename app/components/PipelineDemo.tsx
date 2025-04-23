'use client';

import React from 'react';
import styles from './PipelineDemo.module.css';
import { FaCheckCircle, FaTimesCircle, FaClock, FaSpinner } from 'react-icons/fa';

type JobStatus = 'success' | 'running' | 'failed' | 'pending';

interface Job {
  id: string;
  name: string;
  status: JobStatus;
  type: 'build' | 'test' | 'evaluate' | 'analysis' | 'deploy';
  dependencies?: string[];
}

// Define component props with TypeScript
interface PipelineDemoProps {
  className?: string;
}

interface StageProps {
  title: string;
  children: React.ReactNode;
}

interface JobProps {
  name: string;
  type: string;
  status: 'success' | 'running' | 'failed' | 'pending';
}

// Status icon mapping
const StatusIcon = {
  success: FaCheckCircle,
  running: FaSpinner,
  failed: FaTimesCircle,
  pending: FaClock,
};

const PipelineDemo: React.FC<PipelineDemoProps> = ({ className }) => {
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
      name: 'Security Scans',
      status: 'success',
      type: 'evaluate',
      dependencies: ['test-1', 'test-2']
    },
    {
      id: 'eval-2',
      name: 'Code Quality',
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
    
    // Analysis stage jobs (AI-powered)
    {
      id: 'analysis-1',
      name: 'Security Review',
      status: 'running',
      type: 'analysis',
      dependencies: ['eval-1']
    },
    {
      id: 'analysis-2',
      name: 'Code Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-2']
    },
    {
      id: 'analysis-3',
      name: 'Performance',
      status: 'pending',
      type: 'analysis',
      dependencies: ['test-3']
    },
    {
      id: 'analysis-4',
      name: 'Vulnerability Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-1', 'analysis-1']
    },
    
    // Deploy stage jobs
    {
      id: 'deploy-1',
      name: 'Staging Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['analysis-1', 'analysis-2']
    },
    {
      id: 'deploy-2',
      name: 'Production Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['deploy-1', 'analysis-3', 'analysis-4']
    }
  ];

  // Group jobs by type
  const buildJobs = sampleJobs.filter(job => job.type === 'build');
  const testJobs = sampleJobs.filter(job => job.type === 'test');
  const evaluateJobs = sampleJobs.filter(job => job.type === 'evaluate');
  const analysisJobs = sampleJobs.filter(job => job.type === 'analysis');
  const deployJobs = sampleJobs.filter(job => job.type === 'deploy');

  console.log('Rendering PipelineDemo with jobs:', sampleJobs.length);

  return (
    <div className={`${styles.pipelineDemo} ${className}`}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>AI-Powered Pipelines</h2>
          <p className={styles.description}>
            Enhancing development workflows with AI-driven analysis and intelligent automation
          </p>
        </div>
        
        <div className={styles.pipelineContainer}>
          <div className={styles.pipelineStages}>
            <Stage title="Build">
              {buildJobs.map(job => (
                <Job key={job.id} name={job.name} type={job.type} status={job.status} />
              ))}
            </Stage>
            
            <Stage title="Test">
              {testJobs.map(job => (
                <Job key={job.id} name={job.name} type={job.type} status={job.status} />
              ))}
            </Stage>
            
            <Stage title="Evaluate">
              {evaluateJobs.map(job => (
                <Job key={job.id} name={job.name} type={job.type} status={job.status} />
              ))}
            </Stage>
            
            <Stage title="AI-Powered Analysis">
              {analysisJobs.map(job => (
                <Job key={job.id} name={job.name} type={job.type} status={job.status} />
              ))}
            </Stage>
            
            <Stage title="Deploy">
              {deployJobs.map(job => (
                <Job key={job.id} name={job.name} type={job.type} status={job.status} />
              ))}
            </Stage>
          </div>
        </div>
      </div>
    </div>
  );
};

// Stage component
function Stage({ title, children }: StageProps) {
  // Check if this is the AI Analysis stage and apply special styling
  const isAIStage = title === "AI-Powered Analysis";
  const stageClassName = isAIStage 
    ? `${styles.stage} ${styles.aiAnalysisStage}` 
    : styles.stage;
    
  return (
    <div className={stageClassName}>
      <h3 className={styles.stageTitle}>
        {title}
      </h3>
      <div className={styles.jobsList}>
        {children}
      </div>
    </div>
  );
}

// Job component
function Job({ name, type, status }: JobProps) {
  const StatusIconComponent = StatusIcon[status];
  
  // Special class for AI Analysis jobs
  const isAnalysisJob = type === 'analysis';
  const jobClassName = `${styles.job} ${styles[`job${status.charAt(0).toUpperCase()}${status.slice(1)}`]} ${isAnalysisJob ? styles.analysisJob : ''}`;
  
  return (
    <div className={styles.jobWrapper}>
      <div className={jobClassName}>
        <div className={styles[`status${status.charAt(0).toUpperCase()}${status.slice(1)}`]}>
          <StatusIconComponent />
        </div>
        <div className={styles.jobInfo}>
          <div className={styles.jobName}>{name}</div>
          <div className={styles.jobType}>{isAnalysisJob ? 'AI analysis' : type}</div>
        </div>
      </div>
    </div>
  );
}

export default PipelineDemo; 