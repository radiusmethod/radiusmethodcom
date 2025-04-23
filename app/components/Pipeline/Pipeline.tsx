'use client';

import React, { useState } from 'react';
import PipelineStage from './PipelineStage';
import styles from './Pipeline.module.css';

export type JobStatus = 'success' | 'running' | 'failed' | 'pending';

export interface Job {
  id: string;
  name: string;
  status: JobStatus;
  type: 'build' | 'test' | 'deploy';
  dependencies?: string[];
}

interface PipelineProps {
  jobs: Job[];
  showDependencies?: boolean;
}

const Pipeline: React.FC<PipelineProps> = ({ 
  jobs,
  showDependencies = true
}) => {
  const [activeTab, setActiveTab] = useState<'stage' | 'dependencies'>('stage');
  const [showDeps, setShowDeps] = useState(showDependencies);

  // Group jobs by type
  const buildJobs = jobs.filter(job => job.type === 'build');
  const testJobs = jobs.filter(job => job.type === 'test');
  const deployJobs = jobs.filter(job => job.type === 'deploy');

  return (
    <div className={styles.pipelineContainer}>
      <div className={styles.pipelineHeader}>
        <h2 className={styles.pipelineTitle}>Pipeline</h2>
        <div className={styles.piplineStats}>
          <span className={styles.statItem}>
            Jobs <span className={styles.statCount}>{jobs.length}</span>
          </span>
          <span className={styles.statItem}>
            Tests <span className={styles.statCount}>{testJobs.length}</span>
          </span>
        </div>
      </div>
      
      <div className={styles.pipelineControls}>
        <div className={styles.groupingTabs}>
          <span className={styles.groupingLabel}>Group jobs by</span>
          <div className={styles.tabs}>
            <button 
              className={`${styles.tabButton} ${activeTab === 'stage' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('stage')}
            >
              Stage
            </button>
            <button 
              className={`${styles.tabButton} ${activeTab === 'dependencies' ? styles.activeTab : ''}`}
              onClick={() => setActiveTab('dependencies')}
            >
              Job dependencies
            </button>
          </div>
        </div>
        
        <div className={styles.toggleContainer}>
          <span className={styles.toggleLabel}>Show dependencies</span>
          <button 
            className={`${styles.toggleButton} ${showDeps ? styles.toggleActive : ''}`}
            onClick={() => setShowDeps(!showDeps)}
            aria-pressed={showDeps}
          >
            <span className={styles.toggleIndicator}></span>
          </button>
        </div>
      </div>
      
      <div className={styles.pipelineStages}>
        <PipelineStage 
          title="Build" 
          jobs={buildJobs} 
          showDependencies={showDeps}
          allJobs={jobs}
        />
        <PipelineStage 
          title="Test" 
          jobs={testJobs} 
          showDependencies={showDeps}
          allJobs={jobs}
        />
        <PipelineStage 
          title="Deploy" 
          jobs={deployJobs} 
          showDependencies={showDeps}
          allJobs={jobs}
        />
      </div>
    </div>
  );
};

export default Pipeline; 