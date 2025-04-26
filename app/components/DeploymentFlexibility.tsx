'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import styles from './DeploymentFlexibility.module.css';
import { FaCloud, FaDatabase, FaLock, FaFighterJet } from 'react-icons/fa';

// Import our components and hooks
import DestinationMap from './deployment/components/DestinationMap';
import DeploymentCard from './deployment/components/DeploymentCard';
import CenterLogo from './deployment/components/CenterLogo';
import ControlButtons from './deployment/components/ControlButtons';
import useAnimationState from './deployment/hooks/useAnimationState';

// Import animation components
import ScifAnimation from './deployment/animations/ScifAnimation';
import CloudAnimation from './deployment/animations/CloudAnimation';
import AirGappedAnimation from './deployment/animations/AirGappedAnimation';
import KubernetesAnimation from './deployment/animations/KubernetesAnimation';
import { PathGenerator } from './deployment/utils/PathGenerator';

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
  
  // Calculate shield position for SCIF animation
  const scifDestination = useMemo(() => destinations.find(d => d.id === 2), [destinations]);
  const shieldPosition = useMemo(() => {
    if (!scifDestination) return { x: 0, y: 0 };
    return PathGenerator.calculatePadlockPosition(
      scifDestination.position,
      centerPosition.x,
      centerPosition.y
    );
  }, [centerPosition, scifDestination]);
  
  // Handle animation completion for any destination
  const handleAnimationComplete = () => {
    if (animationControls) {
      animationControls.completeAnimation();
    }
  };

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
          
          {/* Animation Components */}
          {/* Cloud Animation - Government Clouds (destination index 0, id 1) */}
          <CloudAnimation
            isAnimating={isAnimating}
            isActive={activeDestination === 0}
            centerPosition={centerPosition}
            destinationPosition={destinations[0].position}
            onAnimationComplete={handleAnimationComplete}
          />
          
          {/* SCIF Animation - Classified Networks (destination index 1, id 2) */}
          <ScifAnimation
            isAnimating={isAnimating}
            isActive={activeDestination === 1}
            centerPosition={centerPosition}
            shieldPosition={shieldPosition}
            destinationPosition={destinations[1].position}
            onAnimationComplete={handleAnimationComplete}
          />
          
          {/* K8s Animation - Bare Metal (destination index 3, id 3) */}
          <KubernetesAnimation
            isAnimating={isAnimating}
            isActive={activeDestination === 3}
            centerPosition={centerPosition}
            destinationPosition={destinations[3].position}
            onAnimationComplete={handleAnimationComplete}
          />
          
          {/* AirGapped Animation - Edge Device (destination index 2, id 4) */}
          <AirGappedAnimation
            isAnimating={isAnimating}
            isActive={activeDestination === 2}
            centerPosition={centerPosition}
            destinationPosition={destinations[2].position}
            onAnimationComplete={handleAnimationComplete}
          />
        </div>
      </div>
      
      {/* Control buttons */}
      <ControlButtons 
        onRedeployClick={handleRedeployClick}
      />
    </div>
  );
};

export default DeploymentFlexibility;