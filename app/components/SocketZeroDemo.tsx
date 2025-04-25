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
          {/* Laptop Frame - Improved visual design without 3D transforms */}
          <div 
            className={styles.laptop} 
            style={{ 
              transform: 'none', 
              transformStyle: 'flat',
              pointerEvents: 'auto',
              maxWidth: '1000px',
              width: '100%',
              position: 'relative',
              padding: '20px 20px 30px',
              background: 'linear-gradient(to bottom, #666, #444)',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.1)',
              minHeight: '550px'
            }}
          >
            {/* Screen bezel */}
            <div 
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '20px',
                background: 'linear-gradient(to bottom, #555, #444)',
                borderTopLeftRadius: '15px',
                borderTopRightRadius: '15px',
                borderBottom: '1px solid #222'
              }}
            >
              {/* Camera dot */}
              <div 
                style={{
                  position: 'absolute',
                  width: '6px',
                  height: '6px',
                  background: '#222',
                  borderRadius: '50%',
                  top: '7px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  boxShadow: 'inset 0 0 2px rgba(0,0,0,0.8)'
                }}
              />
            </div>
            
            <div 
              className={styles.laptopScreen} 
              style={{ 
                pointerEvents: 'auto',
                border: '8px solid #222',
                borderTop: '12px solid #222',
                borderBottom: '14px solid #222',
                borderRadius: '5px',
                overflow: 'hidden',
                boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)',
                background: '#1a1a1a',
                margin: '20px 0 0',
                position: 'relative'
              }}
            >
              {/* Power button light */}
              <div
                style={{
                  position: 'absolute',
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: '#28a745',
                  right: '-10px',
                  top: '-8px',
                  boxShadow: '0 0 3px #28a745'
                }}
              />
              {/* Screen Content based on current state */}
              <div 
                className={styles.screenContent} 
                style={{ 
                  position: 'relative', 
                  zIndex: 2, 
                  pointerEvents: 'auto',
                  transform: 'translateZ(0.1px)', /* Slight 3D offset to prevent transform issues */
                  transformStyle: 'flat',
                  height: '100%',
                  width: '100%',
                  background: '#1a1a1a'
                }}
              >
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
            
            {/* Laptop keyboard/touchpad area */}
            <div
              style={{
                height: '30px',
                background: 'linear-gradient(to bottom, #333, #222)',
                borderBottomLeftRadius: '15px',
                borderBottomRightRadius: '15px',
                margin: '0 -8px',
                position: 'relative',
                boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {/* Laptop hinge dots */}
              <div style={{ display: 'flex', gap: '60px' }}>
                <div style={{ 
                  width: '4px', 
                  height: '4px', 
                  borderRadius: '50%', 
                  background: '#111', 
                  boxShadow: 'inset 0 0 1px #000' 
                }}></div>
                <div style={{ 
                  width: '4px', 
                  height: '4px', 
                  borderRadius: '50%', 
                  background: '#111', 
                  boxShadow: 'inset 0 0 1px #000' 
                }}></div>
              </div>
            </div>
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
            <FaLock size={14} />
            <span>Zero Trust Secured</span>
          </div>
          <div className={styles.securityBadge}>
            <FaShieldAlt size={14} />
            <span>Post-Quantum Encryption</span>
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
  remoteAvailable?: boolean;
  url?: string; // Optional URL for 'launch' action apps
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
  // Add state for active tab
  const [activeTab, setActiveTab] = useState<'installed' | 'available'>('installed');
  
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
    console.log(`App action clicked: ${app.name} (${app.action})`);
    
    if (app.action === 'launch') {
      console.log(`Launching app: ${app.id}`);
      // Scroll to pipeline section by ID instead of using ref
      const pipelineSection = document.getElementById('pipeline-section');
      if (pipelineSection) {
        pipelineSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Show install modal
      console.log(`Showing install modal for: ${app.name}`);
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
    
    // New server environments
    { id: 'personal-dev', name: 'Personal Dev', icon: <FaLaptopCode size={40} />, category: 'Server', color: '#8E44AD', description: 'Personal development environment for secure testing.', action: 'launch' },
    { id: 'dev-server', name: 'Development', icon: <FaServer size={40} />, category: 'Server', color: '#2ECC71', description: 'Shared development server for team integration.', action: 'launch' },
    { id: 'staging', name: 'Staging', icon: <FaNetworkWired size={40} />, category: 'Server', color: '#3498DB', description: 'Pre-production staging environment for final testing.', action: 'launch' },
    { id: 'crm', name: 'CRM System', icon: <FaDatabase size={40} />, category: 'Application', color: '#F39C12', description: 'Customer relationship management system for secure client data.', action: 'launch', remoteAvailable: false },
    
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
  
  // Filter apps based on tab selection
  const filteredApps = apps.filter(app => 
    activeTab === 'installed' ? app.action === 'launch' : app.action === 'install'
  );

  return (
    <div 
      className={styles.appTilesScreen} 
      style={{ 
        pointerEvents: showModal ? 'none' : 'auto',
        position: 'relative',
        zIndex: 3,
        height: '100%',
        maxHeight: '470px', /* Explicitly set maximum height to fit in laptop */
        display: 'flex',
        flexDirection: 'column',
        transform: 'translateZ(0)', /* Force hardware acceleration */
        backfaceVisibility: 'hidden',
        overflow: 'hidden'
      }}
    >
      <div className={styles.socketZeroHeader}>
        <div className={styles.headerTitle}>
          <h3>Socket Zero</h3>
        </div>
        <button className={styles.disconnectButton} onClick={onDisconnect}>
          Disconnect
        </button>
      </div>
      
      {/* Add Tab Navigation */}
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'installed' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('installed')}
        >
          Installed
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'available' ? styles.tabButtonActive : ''}`}
          onClick={() => setActiveTab('available')}
        >
          Available
        </button>
      </div>
      
      <div 
        className={styles.tilesContainer} 
        style={{ 
          position: 'relative', 
          zIndex: 5, 
          pointerEvents: 'auto',
          overflow: 'auto',
          flex: 1, /* Take up remaining space */
          maxHeight: 'calc(100% - 90px)', /* Leave room for header and tabs */
          transform: 'translateZ(0)', /* Force hardware acceleration */
          willChange: 'transform', /* Optimize for scrolling */
          touchAction: 'auto' /* Enable touch gestures */
        }}
      >
        {filteredApps.map(app => (
          <div 
            key={app.id} 
            className={styles.appTile} 
            style={{ 
              position: 'relative', 
              zIndex: 10,
              // Add extra height for 'install' action tiles (Available tab)
              minHeight: app.action === 'install' ? '240px' : '220px'
            }}
            onClick={(e) => {
              // Check if we clicked on the tile itself, not any child element
              if (e.currentTarget === e.target) {
                console.log(`Tile clicked for: ${app.name}`);
                handleAppAction(app);
              }
            }}
          >
            <div 
              className={styles.tileIcon} 
              style={{ backgroundColor: app.color }}
            >
              {app.icon}
            </div>
            <div 
              className={styles.tileContent} 
              style={{ 
                position: 'relative', 
                zIndex: 15,
                // Add extra height for 'install' action tile content (Available tab)
                minHeight: app.action === 'install' ? '170px' : '150px'
              }}
            >
              <div className={styles.tileHeader}>
                <span className={styles.statusDot}></span>
                <span className={styles.appName}>{app.name}</span>
              </div>
              <p className={styles.appDescription}>{app.description}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  console.log(`Button clicked for: ${app.name}`);
                  if (app.remoteAvailable === false) {
                    console.log('App not available remotely');
                    return; // Don't trigger any action
                  }
                  handleAppAction(app);
                }}
                aria-label={app.action === 'launch' ? `Launch ${app.name}` : `Install ${app.name}`}
                style={{
                  marginTop: 'auto',
                  backgroundColor: app.remoteAvailable === false ? 'rgba(120, 120, 120, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: app.remoteAvailable === false ? '#888888' : 'white',
                  padding: '0.4rem',
                  borderRadius: '4px',
                  fontSize: '0.85rem',
                  cursor: app.remoteAvailable === false ? 'not-allowed' : 'pointer',
                  width: '100%',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 100,
                  pointerEvents: 'auto'
                }}
                onMouseOver={(e) => {
                  if (app.remoteAvailable !== false) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
                  }
                }}
                onMouseOut={(e) => {
                  if (app.remoteAvailable !== false) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(120, 120, 120, 0.2)';
                  }
                }}
              >
                {app.remoteAvailable === false ? 'Not Available Remotely' : app.action === 'launch' ? 'Launch' : 'Install'}
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