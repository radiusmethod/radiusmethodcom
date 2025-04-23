'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './PipelineDemo.module.css';
import { FaCheckCircle, FaTimesCircle, FaClock, FaSpinner, FaRedo } from 'react-icons/fa';

type JobStatus = 'success' | 'running' | 'failed' | 'pending';

interface Job {
  id: string;
  name: string;
  status: JobStatus;
  type: 'build' | 'test' | 'evaluate' | 'analysis' | 'deploy';
  dependencies?: string[];
  executionTime: number; // Time in milliseconds to complete the job
  startTime?: number; // When the job started running
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
  // Create a reference to track pipeline container visibility
  const pipelineRef = useRef<HTMLDivElement>(null);
  
  // Reference to store the animation interval
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Initial pipeline configuration
  const getInitialJobs = (): Job[] => [
    // Build stage jobs
    {
      id: 'build-1',
      name: 'Initialize Project',
      status: 'pending',
      type: 'build',
      executionTime: 1500, // 1.5 seconds
    },
    {
      id: 'build-2',
      name: 'Compile Source',
      status: 'pending',
      type: 'build',
      dependencies: ['build-1'],
      executionTime: 3000, // 3 seconds
    },
    {
      id: 'build-3',
      name: 'Generate Assets',
      status: 'pending',
      type: 'build',
      dependencies: ['build-1'],
      executionTime: 2200, // 2.2 seconds
    },
    
    // Test stage jobs
    {
      id: 'test-1',
      name: 'Unit Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['build-2'],
      executionTime: 2800, // 2.8 seconds
    },
    {
      id: 'test-2',
      name: 'Integration Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['build-2', 'build-3'],
      executionTime: 4000, // 4 seconds
    },
    {
      id: 'test-3',
      name: 'Performance Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['test-1'],
      executionTime: 3500, // 3.5 seconds
    },
    
    // Evaluate stage jobs
    {
      id: 'eval-1',
      name: 'Security Scans',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['test-1', 'test-2'],
      executionTime: 2500, // 2.5 seconds
    },
    {
      id: 'eval-2',
      name: 'Code Quality',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['test-3'],
      executionTime: 1800, // 1.8 seconds
    },
    {
      id: 'eval-3',
      name: 'Compliance Check',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['eval-1'],
      executionTime: 2000, // 2 seconds
    },
    
    // Analysis stage jobs (AI-powered)
    {
      id: 'analysis-1',
      name: 'Security Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-1'],
      executionTime: 3200, // 3.2 seconds
    },
    {
      id: 'analysis-2',
      name: 'Code Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-2'],
      executionTime: 4500, // 4.5 seconds
    },
    {
      id: 'analysis-3',
      name: 'Performance',
      status: 'pending',
      type: 'analysis',
      dependencies: ['test-3'],
      executionTime: 3800, // 3.8 seconds
    },
    {
      id: 'analysis-4',
      name: 'Vulnerability Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-1', 'analysis-1'],
      executionTime: 2700, // 2.7 seconds
    },
    
    // Deploy stage jobs
    {
      id: 'deploy-1',
      name: 'Staging Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['analysis-1', 'analysis-2'],
      executionTime: 5000, // 5 seconds
    },
    {
      id: 'deploy-2',
      name: 'Production Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['deploy-1', 'analysis-3', 'analysis-4'],
      executionTime: 6000, // 6 seconds
    }
  ];
  
  // State to hold the current status of all jobs
  const [jobs, setJobs] = useState<Job[]>(getInitialJobs());
  
  // Cleanup function for the animation interval
  const stopAnimation = () => {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  };
  
  // Check if all dependencies for a job are completed successfully
  const areDependenciesMet = (job: Job, allJobs: Job[]) => {
    if (!job.dependencies || job.dependencies.length === 0) {
      return true;
    }
    
    // For each dependency, check if it exists and is completed successfully
    return job.dependencies.every(depId => {
      const dependency = allJobs.find(j => j.id === depId);
      return dependency && dependency.status === 'success';
    });
  };
  
  // Start the pipeline animation
  const startPipelineAnimation = () => {
    // Stop any existing animation
    stopAnimation();
    
    // Reset all jobs to pending state
    setJobs(getInitialJobs());
    
    // Start a regular interval to update job states
    animationIntervalRef.current = setInterval(() => {
      setJobs(currentJobs => {
        let jobsChanged = false;
        const now = Date.now();
        const updatedJobs = [...currentJobs];
        
        // Process each job
        updatedJobs.forEach((job, index) => {
          // If job is running and has completed its execution time, mark as success
          if (job.status === 'running' && job.startTime && now - job.startTime >= job.executionTime) {
            updatedJobs[index] = { ...job, status: 'success' };
            jobsChanged = true;
          }
          // If job is pending and all dependencies are met, start it
          else if (job.status === 'pending' && areDependenciesMet(job, updatedJobs)) {
            updatedJobs[index] = { 
              ...job, 
              status: 'running', 
              startTime: now 
            };
            jobsChanged = true;
          }
        });
        
        // If all jobs are completed, stop the animation
        if (updatedJobs.every(job => job.status === 'success')) {
          stopAnimation();
        }
        
        // Only update state if changes were made
        return jobsChanged ? updatedJobs : currentJobs;
      });
    }, 100); // Check every 100ms for updates
  };
  
  // Handle reset button click
  const handleReset = () => {
    startPipelineAnimation();
  };
  
  // Set up intersection observer to detect when pipeline comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          startPipelineAnimation();
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );
    
    if (pipelineRef.current) {
      observer.observe(pipelineRef.current);
    }
    
    // Clean up on unmount
    return () => {
      if (pipelineRef.current) {
        observer.unobserve(pipelineRef.current);
      }
      stopAnimation();
    };
  }, []);
  
  // Group jobs by type for rendering
  const buildJobs = jobs.filter(job => job.type === 'build');
  const testJobs = jobs.filter(job => job.type === 'test');
  const evaluateJobs = jobs.filter(job => job.type === 'evaluate');
  const analysisJobs = jobs.filter(job => job.type === 'analysis');
  const deployJobs = jobs.filter(job => job.type === 'deploy');

  return (
    <div className={`${styles.pipelineDemo} ${className}`} ref={pipelineRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>AI-Powered Pipeline</h2>
          <p className={styles.description}>
            Enhancing development workflows with AI-driven analysis and intelligent automation
          </p>
          <button 
            className={styles.resetButton}
            onClick={handleReset}
            aria-label="Reset Pipeline"
          >
            <FaRedo /> Reset Demo
          </button>
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
          <StatusIconComponent className={status === 'running' ? styles.spinningIcon : ''} />
        </div>
        <div className={styles.jobInfo}>
          <div className={styles.jobName}>{name}</div>
        </div>
      </div>
    </div>
  );
}

export default PipelineDemo; 