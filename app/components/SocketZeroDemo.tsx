'use client';

import React, { useState, useCallback } from 'react';
import styles from './SocketZeroDemo.module.css';
import { 
  FaLock, FaIdCard, FaCheckCircle, FaGithub, FaJira, FaDocker, 
  FaJenkins, FaAws, FaSlack, FaConfluence, FaGoogle, FaMicrosoft, 
  FaShieldAlt, FaCodeBranch, FaDatabase, FaCloud, FaTerminal, FaRocket,
  FaBug, FaLaptopCode, FaServer, FaNetworkWired
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
}

// Application Tiles Screen Component
interface AppTilesScreenProps {
  onDisconnect: () => void;
}

const AppTilesScreen: React.FC<AppTilesScreenProps> = ({ onDisconnect }) => {
  // Handle app launch
  const handleLaunch = useCallback((appId: string) => {
    console.log(`Launching app: ${appId}`);
    // In a real application, this would redirect or launch the appropriate tool
  }, []);

  // Comprehensive list of DevSecOps tools
  const apps: AppTile[] = [
    // Source Control & CI/CD
    { id: 'gitlab', name: 'GitLab', icon: <SiGitlab size={40} />, category: 'DevOps', color: '#FC6D26', description: 'DevOps platform for software development and security.' },
    { id: 'github', name: 'GitHub', icon: <FaGithub size={40} />, category: 'DevOps', color: '#181717', description: 'Platform for storing and collaborating on code.' },
    { id: 'jenkins', name: 'Jenkins', icon: <FaJenkins size={40} />, category: 'CI/CD', color: '#D33833', description: 'Automation server for building and testing code.' },
    { id: 'circleci', name: 'CircleCI', icon: <SiCircleci size={40} />, category: 'CI/CD', color: '#343434', description: 'CI/CD platform for automating builds and tests.' },
    { id: 'argocd', name: 'ArgoCD', icon: <SiArgo size={40} />, category: 'GitOps', color: '#EF7B4D', description: 'GitOps tool for Kubernetes deployments.' },
    
    // Container & Orchestration
    { id: 'kubernetes', name: 'Kubernetes', icon: <SiKubernetes size={40} />, category: 'Orchestration', color: '#326CE5', description: 'Container orchestration for deployment and scaling.' },
    { id: 'docker', name: 'Docker', icon: <FaDocker size={40} />, category: 'Containers', color: '#2496ED', description: 'Platform for containers and application delivery.' },
    
    // Project Management
    { id: 'jira', name: 'Jira', icon: <FaJira size={40} />, category: 'Project', color: '#0052CC', description: 'Issue tracking for agile development teams.' },
    { id: 'confluence', name: 'Confluence', icon: <FaConfluence size={40} />, category: 'Documentation', color: '#172B4D', description: 'Team workspace for knowledge management.' },
    
    // Cloud Providers
    { id: 'aws', name: 'AWS Console', icon: <FaAws size={40} />, category: 'Cloud', color: '#232F3E', description: 'Management console for AWS cloud resources.' },
    { id: 'azure', name: 'Azure Portal', icon: <FaMicrosoft size={40} />, category: 'Cloud', color: '#0078D4', description: 'Management tool for Azure cloud services.' },
    { id: 'gcp', name: 'Google Cloud', icon: <FaGoogle size={40} />, category: 'Cloud', color: '#4285F4', description: 'Cloud services running on Google infrastructure.' },
    
    // Infrastructure as Code
    { id: 'terraform', name: 'Terraform', icon: <SiTerraform size={40} />, category: 'IaC', color: '#7B42BC', description: 'Infrastructure as code for provisioning.' },
    { id: 'ansible', name: 'Ansible', icon: <SiAnsible size={40} />, category: 'Automation', color: '#EE0000', description: 'IT automation for app deployment.' },
    
    // Monitoring & Observability
    { id: 'prometheus', name: 'Prometheus', icon: <SiPrometheus size={40} />, category: 'Monitoring', color: '#E6522C', description: 'Monitoring and alerting toolkit.' },
    { id: 'grafana', name: 'Grafana', icon: <SiGrafana size={40} />, category: 'Monitoring', color: '#F46800', description: 'Analytics and visualization platform.' },
    { id: 'elastic', name: 'Elastic Stack', icon: <SiElasticsearch size={40} />, category: 'Logging', color: '#005571', description: 'Log analysis and search platform.' },
    { id: 'splunk', name: 'Splunk', icon: <SiSplunk size={40} />, category: 'Logging', color: '#00B9E4', description: 'Data monitoring and analytics.' },
    { id: 'newrelic', name: 'New Relic', icon: <SiNewrelic size={40} />, category: 'Observability', color: '#1CE783', description: 'Platform for monitoring application performance.' },
    
    // Security
    { id: 'vault', name: 'HashiCorp Vault', icon: <SiVault size={40} />, category: 'Security', color: '#000000', description: 'Secrets management and encryption.' },
    { id: 'sonarqube', name: 'SonarQube', icon: <SiSonarqube size={40} />, category: 'Security', color: '#4E9BCD', description: 'Code quality and security testing.' },
    { id: 'snyk', name: 'Snyk', icon: <FaShieldAlt size={40} />, category: 'Security', color: '#4C4A73', description: 'Security scanning for vulnerabilities.' },
    
    // Communications
    { id: 'slack', name: 'Slack', icon: <FaSlack size={40} />, category: 'Communication', color: '#4A154B', description: 'Team collaboration and messaging.' },
    
    // Crystal Tower
    { id: 'crystal-tower', name: 'Crystal Tower', icon: <FaRocket size={40} />, category: 'Platform', color: '#D13C2E', description: 'Secure deployment platform.' },
    
    // Testing
    { id: 'postman', name: 'Postman', icon: <SiPostman size={40} />, category: 'Testing', color: '#FF6C37', description: 'API development and testing.' },
    { id: 'selenium', name: 'Selenium', icon: <FaBug size={40} />, category: 'Testing', color: '#43B02A', description: 'Browser automation for testing.' },
    
    // Database
    { id: 'database', name: 'Database Tools', icon: <FaDatabase size={40} />, category: 'Data', color: '#336791', description: 'Database management and admin tools.' },
    
    // Additional Tools
    { id: 'terminal', name: 'Terminal Access', icon: <FaTerminal size={40} />, category: 'DevOps', color: '#241F31', description: 'Secure command-line interface.' },
    { id: 'nginx', name: 'NGINX', icon: <SiNginx size={40} />, category: 'Web', color: '#009639', description: 'Web server and load balancer.' },
    { id: 'redhat', name: 'Red Hat', icon: <SiRedhat size={40} />, category: 'OS', color: '#EE0000', description: 'Enterprise Linux OS and services.' },
  ];
  
  return (
    <div className={styles.appTilesScreen}>
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
                onClick={() => handleLaunch(app.id)}
                aria-label={`Launch ${app.name}`}
              >
                Launch
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocketZeroDemo; 