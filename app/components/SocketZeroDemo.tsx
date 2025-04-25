'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './SocketZeroDemo.module.css';
import { 
  FaLock, FaIdCard, FaCheckCircle, FaGithub, FaJira, FaDocker, 
  FaJenkins, FaAws, FaSlack, FaConfluence, FaGoogle, FaMicrosoft, 
  FaShieldAlt, FaCodeBranch, FaDatabase, FaCloud, FaTerminal, FaRocket,
  FaBug, FaLaptopCode, FaServer, FaNetworkWired, FaTimes
} from 'react-icons/fa';
import {
  SiGitlab, SiGradle, SiCircleci, SiTerraform, SiAnsible, SiPrometheus,
  SiGrafana, SiKubernetes, SiElasticsearch, SiHelm, SiVault, SiSonarqube,
  SiSplunk, SiNewrelic, SiPostman, SiNginx, SiRedhat, SiArgo
} from 'react-icons/si';

type Props = {
  id?: string;
};

// Screen states for the demo
enum ScreenState {
  LOGIN = 'login',
  APP_TILES = 'app_tiles',
}

const SocketZeroDemo: React.FC<Props> = ({ id }) => {
  // Track the current screen state
  const [currentScreen, setCurrentScreen] = useState<ScreenState>(ScreenState.LOGIN);
  
  // Track if CAC card is "inserted"
  const [isCacConnected, setIsCacConnected] = useState(false);
  
  // Simulate CAC card connection
  const handleConnectCac = useCallback(() => {
    console.log("CAC connect button clicked");
    setIsCacConnected(true);
    
    // After a brief delay, show the app tiles screen
    setTimeout(() => {
      setCurrentScreen(ScreenState.APP_TILES);
      console.log("Transitioning to app tiles screen");
    }, 1500);
  }, []);
  
  // Handle disconnect
  const handleDisconnect = useCallback(() => {
    setCurrentScreen(ScreenState.LOGIN);
    setIsCacConnected(false);
  }, []);
  
  return (
    <section id={id} className={styles.socketZeroDemo}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>Zero Trust Access</h2>
        <p className={styles.sectionSubtitle}>
          Secure access to critical applications with SocketZero, our military-grade Zero Trust solution
        </p>
        
        <div className={styles.laptopContainer}>
          {/* Laptop Frame */}
          <div className={styles.laptop}>
            <div className={styles.laptopScreen}>
              {/* Screen Content based on current state */}
              <div className={styles.screenContent}>
                {currentScreen === ScreenState.LOGIN ? (
                  <LoginScreen 
                    isCacConnected={isCacConnected} 
                    onConnectCac={handleConnectCac} 
                  />
                ) : (
                  <AppTilesScreen onDisconnect={handleDisconnect} />
                )}
              </div>
            </div>
            <div className={styles.laptopBase}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Login Screen Component
interface LoginScreenProps {
  isCacConnected: boolean;
  onConnectCac: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ isCacConnected, onConnectCac }) => {
  return (
    <div className={styles.loginScreen}>
      <div className={styles.loginHeader}>
        <h3>SocketZero</h3>
        <p>Secure Access Portal</p>
      </div>
      
      <div className={styles.loginForm}>
        <div className={styles.cacCardSection}>
          <div 
            className={`${styles.cacCard} ${isCacConnected ? styles.cacCardConnected : ''}`}
            onClick={!isCacConnected ? onConnectCac : undefined}
            style={{ cursor: !isCacConnected ? 'pointer' : 'default' }}
          >
            <FaIdCard size={40} />
            <span>{isCacConnected ? 'CAC Connected' : 'Click to Connect CAC'}</span>
          </div>
          
          <div className={styles.cacStatus}>
            {isCacConnected ? (
              <div className={styles.cacConnected}>
                <FaCheckCircle size={24} />
                <span>Authentication successful</span>
              </div>
            ) : (
              <div 
                onClick={onConnectCac}
                className={styles.connectButton}
              >
                Connect CAC
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.securityInfo}>
          <div className={styles.securityBadge}>
            <FaLock size={16} />
            <span>Zero Trust Secured</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Define interface for app tile
interface AppTile {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
  description: string;
  action: 'launch' | 'install';
}

// Application Tiles Screen Component
interface AppTilesScreenProps {
  onDisconnect: () => void;
}

const AppTilesScreen: React.FC<AppTilesScreenProps> = ({ onDisconnect }) => {
  // State for modal
  const [showModal, setShowModal] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppTile | null>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  
  // Create a dedicated modal container when component mounts
  useEffect(() => {
    if (typeof document !== 'undefined') {
      // Check if the modal root already exists
      let modalRootElement = document.getElementById('socket-zero-modal-root');
      
      if (!modalRootElement) {
        // Create modal root if it doesn't exist
        modalRootElement = document.createElement('div');
        modalRootElement.id = 'socket-zero-modal-root';
        modalRootElement.style.position = 'relative';
        modalRootElement.style.zIndex = '10000';
        document.body.appendChild(modalRootElement);
      }
      
      setModalRoot(modalRootElement);
      
      // Clean up when component unmounts
      return () => {
        if (modalRootElement && modalRootElement.parentNode) {
          try {
            document.body.removeChild(modalRootElement);
          } catch (e) {
            console.error('Error removing modal root:', e);
          }
        }
      };
    }
  }, []);
  
  // Handle app actions
  const handleAppAction = useCallback((app: AppTile) => {
    if (app.action === 'launch') {
      console.log(`Launching app: ${app.id}`);
      // Scroll to pipeline section by ID instead of using ref
      const pipelineSection = document.getElementById('pipeline-section');
      if (pipelineSection) {
        pipelineSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Show install modal
      setSelectedApp(app);
      setShowModal(true);
    }
  }, []);
  
  // Close modal
  const closeModal = useCallback(() => {
    console.log('Close modal button clicked');
    setShowModal(false);
    setSelectedApp(null);
  }, []);

  // Function to render modal in a portal
  const renderModal = () => {
    if (!showModal || !selectedApp || typeof document === 'undefined' || !modalRoot) return null;
    
    // Custom modal styles that don't rely on potentially conflicting CSS classes
    const modalStyles = {
      overlay: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10000
      },
      modal: {
        backgroundColor: '#1e1e1e',
        borderRadius: '8px',
        width: '90%',
        maxWidth: '500px',
        boxShadow: '0 5px 20px rgba(0, 0, 0, 0.5)',
        overflow: 'hidden',
        position: 'relative' as 'relative',
        zIndex: 10001
      },
      header: {
        backgroundColor: '#2a2a2a',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      },
      title: {
        margin: 0,
        color: 'white',
        fontSize: '1.2rem'
      },
      closeBtn: {
        background: 'none',
        border: 'none',
        color: 'rgba(255, 255, 255, 0.6)',
        fontSize: '1.2rem',
        cursor: 'pointer',
        padding: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10002
      },
      content: {
        padding: '1.5rem',
        color: 'rgba(255, 255, 255, 0.8)'
      },
      paragraph: {
        margin: '0.5rem 0',
        lineHeight: 1.5
      },
      strong: {
        color: 'white'
      },
      footer: {
        padding: '1rem',
        display: 'flex',
        justifyContent: 'flex-end',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 10002
      },
      button: {
        backgroundColor: '#d13c2e',
        color: 'white',
        border: 'none',
        padding: '0.5rem 1.5rem',
        borderRadius: '4px',
        fontSize: '0.9rem',
        cursor: 'pointer',
        zIndex: 10003
      }
    };
    
    // Use createPortal to render the modal outside the laptop constraints
    return createPortal(
      <div style={modalStyles.overlay}>
        <div style={modalStyles.modal}>
          <div style={modalStyles.header}>
            <h3 style={modalStyles.title}>Installation Request</h3>
            <button 
              style={modalStyles.closeBtn}
              type="button"
              onClick={() => {
                console.log('Header X button clicked');
                closeModal();
              }}
            >
              <FaTimes />
            </button>
          </div>
          <div style={modalStyles.content}>
            <p style={modalStyles.paragraph}>
              Please ask an administrator to install <strong style={modalStyles.strong}>{selectedApp.name}</strong> on your cluster.
            </p>
            <p style={modalStyles.paragraph}>
              Contact your system administrator or security team for more information.
            </p>
          </div>
          <div style={modalStyles.footer}>
            <button 
              style={modalStyles.button}
              type="button"
              onClick={() => {
                console.log('Footer Close button clicked');
                closeModal();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>,
      modalRoot
    );
  };

  // Comprehensive list of DevSecOps tools suitable for secure, on-prem environments
  const apps: AppTile[] = [
    // Crystal Tower Platform (moved to the top)
    { id: 'crystal-tower', name: 'Crystal Tower', icon: <FaRocket size={40} />, category: 'Platform', color: '#D13C2E', description: 'Secure deployment platform for classified environments.', action: 'launch' },
    
    // Source Control & CI/CD
    { id: 'gitlab', name: 'GitLab', icon: <SiGitlab size={40} />, category: 'DevOps', color: '#FC6D26', description: 'Self-hosted DevOps platform for secure code management.', action: 'launch' },
    { id: 'jenkins', name: 'Jenkins', icon: <FaJenkins size={40} />, category: 'CI/CD', color: '#D33833', description: 'Self-hosted automation server for secure pipelines.', action: 'install' },
    { id: 'argocd', name: 'ArgoCD', icon: <SiArgo size={40} />, category: 'GitOps', color: '#EF7B4D', description: 'On-prem GitOps tool for Kubernetes deployments.', action: 'install' },
    
    // Container & Orchestration
    { id: 'kubernetes', name: 'Kubernetes', icon: <SiKubernetes size={40} />, category: 'Orchestration', color: '#326CE5', description: 'Self-managed container orchestration platform.', action: 'install' },
    { id: 'docker', name: 'Docker', icon: <FaDocker size={40} />, category: 'Containers', color: '#2496ED', description: 'Container runtime for air-gapped environments.', action: 'install' },
    
    // Project Management (self-hosted)
    { id: 'jira', name: 'Jira Server', icon: <FaJira size={40} />, category: 'Project', color: '#0052CC', description: 'On-premises issue tracking for secure projects.', action: 'install' },
    { id: 'confluence', name: 'Confluence DC', icon: <FaConfluence size={40} />, category: 'Documentation', color: '#172B4D', description: 'Self-hosted knowledge base for secure teams.', action: 'install' },
    
    // Infrastructure as Code
    { id: 'terraform', name: 'Terraform', icon: <SiTerraform size={40} />, category: 'IaC', color: '#7B42BC', description: 'Infrastructure as code for secure provisioning.', action: 'install' },
    { id: 'ansible', name: 'Ansible', icon: <SiAnsible size={40} />, category: 'Automation', color: '#EE0000', description: 'Agentless IT automation for secure environments.', action: 'install' },
    
    // Monitoring & Observability
    { id: 'prometheus', name: 'Prometheus', icon: <SiPrometheus size={40} />, category: 'Monitoring', color: '#E6522C', description: 'Self-hosted monitoring for secure clusters.', action: 'install' },
    { id: 'grafana', name: 'Grafana', icon: <SiGrafana size={40} />, category: 'Monitoring', color: '#F46800', description: 'On-premises metrics visualization.', action: 'install' },
    { id: 'elastic', name: 'Elastic Stack', icon: <SiElasticsearch size={40} />, category: 'Logging', color: '#005571', description: 'Self-hosted logging and analytics.', action: 'install' },
    { id: 'splunk', name: 'Splunk Enterprise', icon: <SiSplunk size={40} />, category: 'Logging', color: '#00B9E4', description: 'On-premises data monitoring and security.', action: 'install' },
    
    // Security
    { id: 'vault', name: 'HashiCorp Vault', icon: <SiVault size={40} />, category: 'Security', color: '#000000', description: 'Self-hosted secrets management.', action: 'install' },
    { id: 'sonarqube', name: 'SonarQube', icon: <SiSonarqube size={40} />, category: 'Security', color: '#4E9BCD', description: 'On-premises code security scanning.', action: 'install' },
    { id: 'snyk', name: 'Snyk', icon: <FaShieldAlt size={40} />, category: 'Security', color: '#4C4A73', description: 'Air-gapped vulnerability scanning.', action: 'install' },
    
    // Testing
    { id: 'postman', name: 'Postman', icon: <SiPostman size={40} />, category: 'Testing', color: '#FF6C37', description: 'On-premises API testing platform.', action: 'install' },
    { id: 'selenium', name: 'Selenium Grid', icon: <FaBug size={40} />, category: 'Testing', color: '#43B02A', description: 'Self-hosted browser automation.', action: 'install' },
    
    // Database
    { id: 'database', name: 'Database Tools', icon: <FaDatabase size={40} />, category: 'Data', color: '#336791', description: 'Secure database management tools.', action: 'install' },
    
    // Additional Tools
    { id: 'terminal', name: 'Terminal Access', icon: <FaTerminal size={40} />, category: 'DevOps', color: '#241F31', description: 'Secure terminal access to systems.', action: 'install' },
    { id: 'nginx', name: 'NGINX', icon: <SiNginx size={40} />, category: 'Web', color: '#009639', description: 'On-premises web server and proxy.', action: 'install' },
    { id: 'redhat', name: 'Red Hat Enterprise', icon: <SiRedhat size={40} />, category: 'OS', color: '#EE0000', description: 'FedRAMP-certified enterprise Linux.', action: 'install' },
  ];
  
  return (
    <div className={styles.appTilesScreen} style={{ pointerEvents: showModal ? 'none' : 'auto' }}>
      <div className={styles.socketZeroHeader}>
        <div className={styles.headerTitle}>
          <h3>Radius Method</h3>
          <p>socketzero.crystaltower.prod.rm.radiusmethod.us</p>
        </div>
        <button className={styles.disconnectButton} onClick={onDisconnect}>
          Disconnect
        </button>
      </div>
      
      <div className={styles.tilesContainer}>
        {apps.map(app => (
          <div key={app.id} className={styles.appTile}>
            <div 
              className={styles.tileIcon} 
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </div>
            <div className={styles.tileContent}>
              <div className={styles.tileHeader}>
                <span className={styles.statusDot}></span>
                <span className={styles.appName}>{app.name}</span>
              </div>
              <p className={styles.appDescription}>{app.description}</p>
              <button 
                className={styles.launchButton}
                onClick={() => handleAppAction(app)}
                aria-label={app.action === 'launch' ? `Launch ${app.name}` : `Install ${app.name}`}
              >
                {app.action === 'launch' ? 'Launch' : 'Install'}
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {renderModal()}
    </div>
  );
};

export default SocketZeroDemo; 