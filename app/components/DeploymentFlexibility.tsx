'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import styles from './DeploymentFlexibility.module.css';
import { FaBox, FaCloud, FaDatabase, FaLock, FaFighterJet, FaCompactDisc } from 'react-icons/fa';

// Import our new components and hooks
import DestinationMap from './deployment/components/DestinationMap';
import DeploymentCard from './deployment/components/DeploymentCard';
import CenterLogo from './deployment/components/CenterLogo';
import ControlButtons from './deployment/components/ControlButtons';
import useAnimationState from './deployment/hooks/useAnimationState';
import useScifAnimation from './deployment/hooks/useScifAnimation';

// Import animation components
import ScifAnimation from './deployment/animations/ScifAnimation';
import CloudAnimation from './deployment/animations/CloudAnimation';

type Props = {
  id?: string;
};

const DeploymentFlexibility: React.FC<Props> = ({ id }) => {
  // Refs
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);

  // Define destinations with useMemo for performance
  const destinations = useMemo(() => [
    {
      id: 1, // Top-left
      name: "Government Clouds",
      icon: <FaCloud size={24} />,
      description: "Deploy on AWS and Azure GovCloud",
      position: { x: 20, y: 20 },
    },
    {
      id: 2, // Top-right
      name: "Classified Networks",
      icon: <FaLock size={24} />,
      description: "Secure classified infrastructure and cloud",
      position: { x: 80, y: 20 },
    },
    {
      id: 4, // Bottom-right
      name: "Edge Device",
      icon: <FaFighterJet size={24} />,
      description: "Tactical military edge deployments",
      position: { x: 80, y: 80 },
    },
    {
      id: 3, // Bottom-left
      name: "Bare Metal",
      icon: <FaDatabase size={24} />,
      description: "High-performance dedicated hardware",
      position: { x: 20, y: 80 },
    },
  ], []);

  // Set up animation state using our custom hook
  const [animationState, animationControls] = useAnimationState({
    destinations,
    onAnimationComplete: () => {
      console.log('Animation complete');
    }
  });

  // Destructure animation state for easier access
  const { 
    activeDestination, 
    isAnimating, 
    isPaused,
    isPackageAnimating,
    isLogoHighlighted,
    hasAnimationStarted,
    isDeploymentCompleted
  } = animationState;

  // Center point for animations
  const centerPosition = useMemo(() => ({ x: 50, y: 50 }), []);

  // Use SCIF animation hook for the specialized SCIF animation
  const { packageRef, cdRef } = useScifAnimation({
    isAnimating,
    isActive: activeDestination === 1, // Index of SCIF destination
    activeDestination,
    centerPosition,
    destinationPosition: destinations[1].position, // SCIF destination position
    onAnimationComplete: () => {
      console.log('SCIF animation complete');
      animationControls.completeAnimation();
    }
  });

  // Set up event listener to start animation from an external trigger
  useEffect(() => {
    const handleStartAnimation = () => {
      console.log("Received external trigger to start animation");
      animationControls.startAnimation();
    };
    
    window.addEventListener('start-deployment-animation', handleStartAnimation);
    return () => {
      window.removeEventListener('start-deployment-animation', handleStartAnimation);
    };
  }, [animationControls]);

  // Set up intersection observer to trigger animation on scroll
  useEffect(() => {
    if (!sectionRef.current || hasAnimationStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimationStarted) {
          console.log("Section in view, starting animation");
          animationControls.startAnimation();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(sectionRef.current);
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      observer.disconnect();
    };
  }, [hasAnimationStarted, animationControls]);

  // Handle redeploy button click
  const handleRedeployClick = () => {
    animationControls.startAnimation();
  };

  // Test SCIF animation (for development only)
  const handleTestScifAnimation = () => {
    const scifDestIndex = destinations.findIndex(dest => dest.id === 2);
    if (scifDestIndex !== -1) {
      console.log('Testing SCIF animation');
      // Force animation state for SCIF
      animationControls.startAnimation();
    }
  };
  
  return (
    <div className={styles.deploymentFlexibility} ref={sectionRef} id={id}>
      <h2 className={styles.sectionTitle}>Deployment Flexibility</h2>
      <p className={styles.sectionSubtitle}>
        Maintain complete control over where your data resides, meeting security requirements, compliance needs, and performance goals.
      </p>
      
      <div className={styles.deploymentContainer} ref={containerRef}>
        <div className={styles.leftSection}>
          <DeploymentCard 
            isDeploymentCompleted={isDeploymentCompleted} 
            isPackageAnimating={isPackageAnimating} 
          />
        </div>
        
        <div className={styles.centerSection}>
          {/* Main visualization */}
          <DestinationMap 
            destinations={destinations}
            activeDestination={activeDestination}
            isAnimating={isAnimating}
            isPaused={isPaused}
            pathsRef={pathsRef}
          />
          
          {/* Center Logo */}
          <CenterLogo 
            isLogoHighlighted={isLogoHighlighted}
            logoRef={logoRef}
          />
          
          {/* Fixed animation elements */}
          <div 
            id="package-icon"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0,
              pointerEvents: 'none',
              zIndex: 9999,
              background: 'rgba(0,0,0,0.7)',
              borderRadius: '50%',
              padding: '10px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #FFB81C'
            }}
          >
            <FaBox size={40} color="#FFB81C" />
          </div>

          <div 
            id="cd-icon"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              opacity: 0, 
              pointerEvents: 'none',
              zIndex: 9999,
              background: 'rgba(0,0,0,0.7)',
              borderRadius: '50%',
              padding: '10px',
              width: '60px',
              height: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid #64B5F6'
            }}
          >
            <FaCompactDisc size={40} color="#64B5F6" />
          </div>
        </div>
      </div>
      
      {/* Control buttons */}
      <ControlButtons 
        onRedeployClick={handleRedeployClick}
        onTestClick={handleTestScifAnimation}
        showTestButton={process.env.NODE_ENV === 'development'}
      />
    </div>
  );
};

export default DeploymentFlexibility; 