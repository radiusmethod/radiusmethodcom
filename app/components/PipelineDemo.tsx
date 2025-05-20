'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './PipelineDemo.module.css';
import CrystalTowerBranding from './CrystalTowerBranding';
import { FaCheckCircle, FaTimesCircle, FaClock, FaSpinner, FaRedo, FaPlay, FaEye } from 'react-icons/fa';

type JobStatus = 'success' | 'running' | 'failed' | 'pending' | 'manual';

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
  id?: string;
}

interface StageProps {
  title: string;
  children: React.ReactNode;
}

interface JobProps {
  id: string;
  name: string;
  type: string;
  status: JobStatus;
  dependenciesMet?: boolean;
  onManualStart?: () => void;
  onViewReport?: () => void;
}

// Status icon mapping
const StatusIcon = {
  success: FaCheckCircle,
  running: FaSpinner,
  failed: FaTimesCircle,
  pending: FaClock,
  manual: FaClock, // Use the same icon as pending
};

// Report modal content data
interface ReportModalContent {
  title: string;
  content: React.ReactNode;
}

const PipelineDemo: React.FC<PipelineDemoProps> = ({ className, id }) => {
  // Create a reference to track pipeline container visibility
  const pipelineRef = useRef<HTMLDivElement>(null);
  
  // Reference to store the animation interval
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // State to track if the pipeline has ever been started
  const [hasEverStarted, setHasEverStarted] = useState(false);
  
  // State for report modal
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportModalContent, setReportModalContent] = useState<ReportModalContent | null>(null);
  
  // Initial pipeline configuration
  const getInitialJobs = (): Job[] => [
    // Build stage jobs
    {
      id: 'build-1',
      name: 'Initialize Project',
      status: 'pending',
      type: 'build',
      executionTime: 750, // Was 1500 (1.5 seconds)
    },
    {
      id: 'build-2',
      name: 'Compile Source',
      status: 'pending',
      type: 'build',
      dependencies: ['build-1'],
      executionTime: 1500, // Was 3000 (3 seconds)
    },
    {
      id: 'build-3',
      name: 'Generate Assets',
      status: 'pending',
      type: 'build',
      dependencies: ['build-2'],
      executionTime: 1100, // Was 2200 (2.2 seconds)
    },
    
    // Test stage jobs
    {
      id: 'test-1',
      name: 'Unit Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['build-2'],
      executionTime: 1400, // Was 2800 (2.8 seconds)
    },
    {
      id: 'test-2',
      name: 'Integration Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['build-3'],
      executionTime: 2000, // Was 4000 (4 seconds)
    },
    {
      id: 'test-3',
      name: 'Performance Tests',
      status: 'pending',
      type: 'test',
      dependencies: ['build-3'],
      executionTime: 1750, // Was 3500 (3.5 seconds)
    },
    
    // Evaluate stage jobs
    {
      id: 'eval-1',
      name: 'Security Scans',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['build-2'],
      executionTime: 1250, // Was 2500 (2.5 seconds)
    },
    {
      id: 'eval-2',
      name: 'Code Quality',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['build-1'],
      executionTime: 900, // Was 1800 (1.8 seconds)
    },
    {
      id: 'eval-3',
      name: 'Compliance Check',
      status: 'pending',
      type: 'evaluate',
      dependencies: ['eval-1', 'eval-2', 'test-1', 'test-2', 'test-3', 'analysis-1', 'analysis-2', 'analysis-3', 'analysis-4'],
      executionTime: 1000, // Was 2000 (2 seconds)
    },
    
    // Analysis stage jobs (AI-powered)
    {
      id: 'analysis-1',
      name: 'Security Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-1'],
      executionTime: 1600, // Was 3200 (3.2 seconds)
    },
    {
      id: 'analysis-2',
      name: 'Code Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['test-3'],
      executionTime: 2250, // Was 4500 (4.5 seconds)
    },
    {
      id: 'analysis-3',
      name: 'Performance Analysis',
      status: 'pending',
      type: 'analysis',
      dependencies: ['test-3'],
      executionTime: 1900, // Was 3800 (3.8 seconds)
    },
    {
      id: 'analysis-4',
      name: 'Vulnerability Review',
      status: 'pending',
      type: 'analysis',
      dependencies: ['eval-1', 'analysis-1'],
      executionTime: 1350, // Was 2700 (2.7 seconds)
    },
    
    {
      id: 'deploy-1',
      name: 'Development Deployment',
      status: 'pending',
      type: 'deploy',
      dependencies: ['analysis-1', 'analysis-2', 'analysis-3', 'analysis-4', 'eval-3'],
      executionTime: 2500, // Was 5000 (5 seconds)
    },
    // Deploy stage jobs - set to manual by default
    {
      id: 'deploy-2',
      name: 'Staging Deployment',
      status: 'manual',
      type: 'deploy',
      dependencies: ['analysis-1', 'analysis-2', 'analysis-3', 'analysis-4', 'eval-3', 'deploy-1'],
      executionTime: 2500, // Was 5000 (5 seconds)
    },
    {
      id: 'deploy-3',
      name: 'Production Deployment',
      status: 'manual',
      type: 'deploy',
      dependencies: ['deploy-2', 'eval-3'],
      executionTime: 3000, // Was 6000 (6 seconds)
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
  
  // Manually start a job
  const startManualJob = (jobId: string) => {
    // If this is the production deployment job, scroll to deployment section
    if (jobId === 'deploy-3') {
      // Scroll to deployment section
      const deploymentSection = document.getElementById('deployment-section');
      if (deploymentSection) {
        deploymentSection.scrollIntoView({ behavior: 'smooth' });
        
        // Force a slight delay to ensure the section is visible before starting its animation
        setTimeout(() => {
          // Trigger a custom event to start the deployment animation
          const event = new CustomEvent('start-deployment-animation');
          window.dispatchEvent(event);
        }, 800);
      }
    }
    
    setJobs(currentJobs => {
      const updatedJobs = [...currentJobs];
      const jobIndex = updatedJobs.findIndex(job => job.id === jobId);
      
      if (jobIndex !== -1 && updatedJobs[jobIndex].status === 'manual') {
        // Check if dependencies are met
        if (areDependenciesMet(updatedJobs[jobIndex], updatedJobs)) {
          updatedJobs[jobIndex] = {
            ...updatedJobs[jobIndex],
            status: 'running',
            startTime: Date.now()
          };
          
          // If animation interval is not running, restart it
          if (!animationIntervalRef.current) {
            // Start a regular interval to update job states
            animationIntervalRef.current = setInterval(() => {
              setJobs(prevJobs => {
                let jobsChanged = false;
                const now = Date.now();
                const nextJobs = [...prevJobs];
                
                // Process each job
                nextJobs.forEach((job, idx) => {
                  // If job is running and has completed its execution time, mark as success
                  if (job.status === 'running' && job.startTime && now - job.startTime >= job.executionTime) {
                    nextJobs[idx] = { ...job, status: 'success' };
                    jobsChanged = true;
                  }
                });
                
                // Check for new jobs that can start running (have successful dependencies and are pending)
                nextJobs.forEach((job, idx) => {
                  if ((job.status === 'pending') && areDependenciesMet(job, nextJobs)) {
                    nextJobs[idx] = { ...job, status: 'running', startTime: now };
                    jobsChanged = true;
                  }
                });
                
                // Check if all jobs are either complete, failed, or manual (waiting for user)
                const allJobsComplete = nextJobs.every(job => 
                  job.status === 'success' || 
                  job.status === 'failed' || 
                  (job.status === 'manual' && !areDependenciesMet(job, nextJobs))
                );
                
                if (allJobsComplete) {
                  stopAnimation();
                }
                
                // Only update state if changes were made
                return jobsChanged ? nextJobs : prevJobs;
              });
            }, 100); // Check every 100ms for updates
          }
        }
      }
      return updatedJobs;
    });
  };
  
  // Add a debugging function to help identify issues
  const debugPipeline = () => {
    // Add temporary debug code here if needed
    // Force completion check
    let allComplete = true;
    
    jobs.forEach(job => {
      if (job.status !== 'success' && !(job.status === 'manual' && areDependenciesMet(job, jobs))) {
        allComplete = false;
        
        // For jobs with dependencies, check their status
        if (job.dependencies && job.dependencies.length > 0) {
          // Dependencies check
        }
      }
    });
  };
  
  // Start the pipeline animation
  const startPipelineAnimation = () => {
    // Stop any existing animation
    stopAnimation();
    
    // Reset all jobs to pending state (deploy jobs to manual)
    setJobs(getInitialJobs());
    
    // Mark that the pipeline has started at least once
    setHasEverStarted(true);
    
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
        
        // If all non-manual jobs are completed and all manual jobs have their dependencies met,
        // we can stop the animation interval
        const allJobsComplete = updatedJobs.every(job => 
          job.status === 'success' || 
          (job.status === 'manual' && areDependenciesMet(job, updatedJobs))
        );
        
        if (allJobsComplete) {
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
    // If it has already started once, don't set up the observer again
    if (hasEverStarted) {
      return;
    }
    
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        
        // Start the animation when the component is intersecting
        if (entry?.isIntersecting) {
          startPipelineAnimation();
          
          // Once started, disconnect the observer
          observer.disconnect();
        }
      },
      { threshold: 0.1 } // Trigger when 10% visible
    );
    
    if (pipelineRef.current) {
      observer.observe(pipelineRef.current);
    }
    
    // Clean up on unmount
    return () => {
      observer.disconnect();
      stopAnimation();
    };
  }, []); // Empty dependency array as we only want to run this once
  
  // Group jobs by type for rendering
  const buildJobs = jobs.filter(job => job.type === 'build');
  const testJobs = jobs.filter(job => job.type === 'test');
  const evaluateJobs = jobs.filter(job => job.type === 'evaluate');
  const analysisJobs = jobs.filter(job => job.type === 'analysis');
  const deployJobs = jobs.filter(job => job.type === 'deploy');

  // Function to handle viewing AI report details
  const handleViewReport = (jobId: string) => {
    let modalContent: ReportModalContent | null = null;
    
    // Different content for each AI analysis job
    switch(jobId) {
      case 'analysis-1':
        modalContent = {
          title: 'Security Review Results',
          content: (
            <div className={styles.reportContent}>
              <h4>Security Issues Detected</h4>
              <p>Our AI analysis detected 3 potential security vulnerabilities:</p>
              <ul>
                <li>Improper input validation in user authentication flow</li>
                <li>Insecure deserialization in API response handlers</li>
                <li>Potential for Cross-Site Scripting (XSS) in rendered HTML</li>
              </ul>
              <div className={styles.recommendationSection}>
                <h4>Recommendations</h4>
                <p>Implement proper input validation and sanitization throughout the application to prevent these security issues.</p>
              </div>
            </div>
          )
        };
        break;
        
      case 'analysis-2': // Code Review
        modalContent = {
          title: 'Code Review Analysis',
          content: (
            <div className={styles.reportContent}>
              <h4>SOLID Principles Violations</h4>
              <p>Our AI analysis detected violations of the Single Responsibility Principle:</p>
              
              <div className={styles.codeSnippet}>
                <pre>
                  <code>{`class UserManager {
  constructor(database) {
    this.database = database;
    this.logger = new Logger();
    this.emailService = new EmailService();
  }

  async createUser(userData) {
    // Validate user data
    if (!userData.email || !userData.password) {
      throw new Error('Invalid user data');
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    // Create user in database
    const user = await this.database.users.create({
      ...userData,
      password: hashedPassword
    });
    
    // Log user creation
    this.logger.info(\`User created: \${user.id}\`);
    
    // Send welcome email
    await this.emailService.sendWelcomeEmail(user.email);
    
    // Update analytics
    this.trackUserSignup(user);
    
    return user;
  }
  
  trackUserSignup(user) {
    // Analytics code...
  }
}`}</code>
                </pre>
              </div>
              
              <div className={styles.recommendationSection}>
                <h4>Recommendations</h4>
                <p>This class violates the Single Responsibility Principle by handling:</p>
                <ul>
                  <li>User validation</li>
                  <li>Password hashing</li>
                  <li>Database operations</li>
                  <li>Logging</li>
                  <li>Email notifications</li>
                  <li>Analytics tracking</li>
                </ul>
                
                <p>Breaking this down into separate classes would:</p>
                <ul>
                  <li><strong>UserValidator</strong> - For validation logic</li>
                  <li><strong>UserRepository</strong> - For database operations</li>
                  <li><strong>UserNotifier</strong> - For sending emails</li>
                  <li><strong>UserAnalytics</strong> - For tracking metrics</li>
                </ul>
              </div>
            </div>
          )
        };
        break;
        
      case 'analysis-3':
        modalContent = {
          title: 'Performance Analysis Results',
          content: (
            <div className={styles.reportContent}>
              <h4>Performance Bottlenecks</h4>
              <p>Our AI analysis identified these performance issues:</p>
              <ul>
                <li>Excessive DOM manipulation in the main thread</li>
                <li>Unoptimized React component re-renders (52 instances)</li>
                <li>Large bundle size slowing initial page load</li>
              </ul>
              <div className={styles.recommendationSection}>
                <h4>Recommendations</h4>
                <p>Implement React.memo for pure components and use useCallback/useMemo hooks to prevent unnecessary re-renders.</p>
              </div>
            </div>
          )
        };
        break;
        
      case 'analysis-4':
        modalContent = {
          title: 'Vulnerability Review',
          content: (
            <div className={styles.reportContent}>
              <h4>Dependency Vulnerabilities</h4>
              <p>Our AI analysis found 5 outdated dependencies with known security vulnerabilities:</p>
              <ul>
                <li>lodash (CVE-2021-23337)</li>
                <li>axios (CVE-2023-45857)</li>
                <li>moment (multiple vulnerabilities, unmaintained)</li>
              </ul>
              <div className={styles.recommendationSection}>
                <h4>Recommendations</h4>
                <p>Update dependencies to their latest versions and consider replacing moment.js with date-fns or Temporal API.</p>
              </div>
            </div>
          )
        };
        break;
        
      default:
        break;
    }
    
    if (modalContent) {
      setReportModalContent(modalContent);
      setShowReportModal(true);
    }
  };
  
  // Close report modal
  const closeReportModal = () => {
    setShowReportModal(false);
    setReportModalContent(null);
  };

  return (
    <div className={`${styles.pipelineDemo} ${className}`} ref={pipelineRef} id={id}>
      <div className={styles.container}>
        <div className={styles.brandingWrapper}>
          <CrystalTowerBranding
            customText="AI-Powered Pipelines"
            taglineText="Enhancing development workflows with AI-driven analysis and intelligent automation"
            className={styles.pipelineDemoBranding}
          />
        </div>
        
        <div className={styles.pipelineContainer}>
          <div className={styles.pipelineStages}>
            <Stage title="Build">
              {buildJobs.map(job => (
                <Job 
                  key={job.id} 
                  id={job.id}
                  name={job.name} 
                  type={job.type} 
                  status={job.status} 
                />
              ))}
            </Stage>
            
            <Stage title="Test">
              {testJobs.map(job => (
                <Job 
                  key={job.id} 
                  id={job.id}
                  name={job.name} 
                  type={job.type} 
                  status={job.status} 
                />
              ))}
            </Stage>
            
            <Stage title="Evaluate">
              {evaluateJobs.map(job => (
                <Job 
                  key={job.id} 
                  id={job.id}
                  name={job.name} 
                  type={job.type} 
                  status={job.status} 
                />
              ))}
            </Stage>
            
            <Stage title="AI-Powered Analysis">
              {analysisJobs.map(job => (
                <Job 
                  key={job.id} 
                  id={job.id}
                  name={job.name} 
                  type={job.type} 
                  status={job.status}
                  onViewReport={job.status === 'success' ? () => handleViewReport(job.id) : undefined}
                />
              ))}
            </Stage>
            
            <Stage title="Deploy">
              {deployJobs.map(job => (
                <Job 
                  key={job.id} 
                  id={job.id}
                  name={job.name} 
                  type={job.type} 
                  status={job.status}
                  dependenciesMet={areDependenciesMet(job, jobs)}
                  onManualStart={() => startManualJob(job.id)}
                />
              ))}
            </Stage>
          </div>
        </div>
        
        <div className={styles.buttonContainer}>
          <button 
            className={styles.resetButton}
            onClick={handleReset}
            aria-label="Reset Pipeline"
          >
            <FaRedo /> Rerun Pipeline
          </button>
        </div>
      </div>
      
      {/* AI Analysis Report Modal */}
      {showReportModal && reportModalContent && (
        <div className={styles.modalOverlay} onClick={closeReportModal}>
          <div className={styles.reportModal} onClick={e => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>{reportModalContent.title}</h3>
              <button 
                className={styles.closeButton}
                onClick={closeReportModal}
                aria-label="Close Modal"
              >
                &times;
              </button>
            </div>
            <div className={styles.modalBody}>
              {reportModalContent.content}
            </div>
            <div className={styles.modalFooter}>
              <button 
                className={styles.modalCloseButton}
                onClick={closeReportModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
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
function Job({ id, name, type, status, dependenciesMet = false, onManualStart, onViewReport }: JobProps) {
  const StatusIconComponent = StatusIcon[status];
  
  // Special class for AI Analysis jobs
  const isAnalysisJob = type === 'analysis';
  
  // Special class for Production Deployment job
  const isProductionDeployment = id === 'deploy-3';
  
  // For manual jobs, use the same styling as pending jobs
  const jobStatus = status === 'manual' ? 'pending' : status;
  const jobClassName = `${styles.job} ${styles[`job${jobStatus.charAt(0).toUpperCase()}${jobStatus.slice(1)}`]} ${isAnalysisJob ? styles.analysisJob : ''}`;
  
  // Only show manual start button if it's a manual job AND dependencies are met
  const showManualButton = status === 'manual' && onManualStart && dependenciesMet;
  
  // Show view report button for successful analysis jobs
  const showViewButton = status === 'success' && isAnalysisJob && onViewReport;
  
  // Special button class for production deployment
  const buttonClassName = `${styles.manualStartButton} ${isProductionDeployment ? styles.productionDeployButton : ''}`;
  
  return (
    <div className={styles.jobWrapper}>
      <div className={jobClassName}>
        {showViewButton ? (
          <button 
            onClick={onViewReport}
            className={styles.viewIconButton}
            aria-label={`View ${name} Report`}
          >
            <FaEye />
          </button>
        ) : (
          <div className={styles[`status${jobStatus.charAt(0).toUpperCase()}${jobStatus.slice(1)}`]}>
            <StatusIconComponent className={status === 'running' ? styles.spinningIcon : ''} />
          </div>
        )}
        <div className={styles.jobInfo}>
          <div className={styles.jobName}>{name}</div>
          {status === 'manual' && !dependenciesMet && (
            <div className={styles.jobStatus}>Waiting for dependencies</div>
          )}
        </div>
        {showManualButton && (
          <button 
            className={buttonClassName}
            onClick={onManualStart}
            aria-label={`Start ${name}`}
          >
            Run
          </button>
        )}
      </div>
    </div>
  );
}

export default PipelineDemo; 