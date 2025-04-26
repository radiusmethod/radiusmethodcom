'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import styles from './DeploymentFlexibility.module.css';
import { FaServer, FaCloud, FaDatabase, FaNetworkWired, FaLock, FaFighterJet, FaBox, FaSpinner, FaRedo, FaBolt, FaCompactDisc, FaShieldAlt } from 'react-icons/fa';
import { BsCheckCircleFill } from 'react-icons/bs';
import { withBasePath } from '../utils/basePath';

// Import destination components
import CloudDestination from './deployment/destinations/CloudDestination';
import ScifDestination from './deployment/destinations/ScifDestination';
import EdgeDeviceDestination from './deployment/destinations/EdgeDeviceDestination';
import BareMetalDestination from './deployment/destinations/BareMetalDestination';

// Import utilities
import { PathGenerator } from './deployment/utils/PathGenerator';
import { AnimationController } from './deployment/utils/AnimationController';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin);

type Destination = {
  id: number;
  name: string;
  icon: React.ReactNode;
  description: string;
  position: { x: number; y: number };
};

type Props = {
  id?: string;
};

const DeploymentFlexibility: React.FC<Props> = ({ id }) => {
  // Basic animation states
  const [activeDestination, setActiveDestination] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isPackageAnimating, setIsPackageAnimating] = useState(false);
  const [isLogoHighlighted, setIsLogoHighlighted] = useState(false);
  const [hasAnimationStarted, setHasAnimationStarted] = useState(false);
  const [isDeploymentCompleted, setIsDeploymentCompleted] = useState(false);
  
  // Animation states for elements
  const [showPackage, setShowPackage] = useState(false);
  const [showCD, setShowCD] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [showLightning, setShowLightning] = useState(false);
  const [lightningProgress, setLightningProgress] = useState(0);
  
  // Add a new state for the combined animation
  const [animatingPackage, setAnimatingPackage] = useState(false);
  const [transformedToCD, setTransformedToCD] = useState(false);
  const animationRef = useRef<HTMLDivElement>(null);
  
  // References
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const animationControllerRef = useRef<AnimationController | null>(null);
  const packageRef = useRef<HTMLDivElement>(null);
  const cdRef = useRef<HTMLDivElement>(null);
  const keyRef = useRef<HTMLDivElement>(null);
  const lightningRef = useRef<SVGPathElement>(null);
  const lightningBoltRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<SVGPathElement[]>([]);
  const logoRef = useRef<HTMLDivElement>(null);
  
  // GSAP timelines
  const mainTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scifTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const cloudTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const bareMetalTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const edgeTimelineRef = useRef<gsap.core.Timeline | null>(null);
  
  // Add these state variables with the other animation states
  const [showPackageToShield, setShowPackageToShield] = useState(false);
  const [showCDToScif, setShowCDToScif] = useState(false);
  const packageToShieldRef = useRef<HTMLDivElement>(null);
  const cdToScifRef = useRef<HTMLDivElement>(null);
  
  // Define destinations in their positions (clockwise from top-left)
  const destinations: Destination[] = [
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
  ];

  // Initialize animation controller
  useEffect(() => {
    animationControllerRef.current = new AnimationController((state) => {
      if (state.activeDestination !== undefined) setActiveDestination(state.activeDestination);
      if (state.isAnimating !== undefined) setIsAnimating(state.isAnimating);
      if (state.isPaused !== undefined) setIsPaused(state.isPaused);
      if (state.isPackageAnimating !== undefined) setIsPackageAnimating(state.isPackageAnimating);
      if (state.isLogoHighlighted !== undefined) setIsLogoHighlighted(state.isLogoHighlighted);
      if (state.hasAnimationStarted !== undefined) setHasAnimationStarted(state.hasAnimationStarted);
      if (state.isDeploymentCompleted !== undefined) setIsDeploymentCompleted(state.isDeploymentCompleted);
    });
    
    return () => {
      if (animationControllerRef.current) {
        animationControllerRef.current.clearTimeouts();
      }
      
      // Kill any active GSAP animations
      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }
      if (scifTimelineRef.current) {
        scifTimelineRef.current.kill();
      }
      if (cloudTimelineRef.current) {
        cloudTimelineRef.current.kill();
      }
      if (bareMetalTimelineRef.current) {
        bareMetalTimelineRef.current.kill();
      }
      if (edgeTimelineRef.current) {
        edgeTimelineRef.current.kill();
      }
    };
  }, []);

  // Effect for setting up GSAP animations
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Reset all timelines
    if (mainTimelineRef.current) mainTimelineRef.current.kill();
    if (scifTimelineRef.current) scifTimelineRef.current.kill();
    if (cloudTimelineRef.current) cloudTimelineRef.current.kill();
    if (bareMetalTimelineRef.current) bareMetalTimelineRef.current.kill();
    if (edgeTimelineRef.current) edgeTimelineRef.current.kill();
    
    // Create a new main timeline for deployment animations
    mainTimelineRef.current = gsap.timeline({ paused: true });
    
    // Create a timeline specifically for each destination
    scifTimelineRef.current = gsap.timeline({ paused: true });
    cloudTimelineRef.current = gsap.timeline({ paused: true });
    bareMetalTimelineRef.current = gsap.timeline({ paused: true });
    edgeTimelineRef.current = gsap.timeline({ paused: true });
    
  }, [containerRef.current]);
  
  // Effect for animating the Cloud destination with package
  useEffect(() => {
    if (!containerRef.current || !cloudTimelineRef.current) return;
    
    // Only handle Cloud destination (id: 1) animation
    if (activeDestination === 0 && isAnimating) {
      const dest = destinations[0]; // Cloud destination
      
      // Reset state
      setShowPackage(true);
      setShowLightning(false);
      
      // Clear existing timeline and create a new one
      cloudTimelineRef.current.clear();
      
      // Set up the animation sequence
      cloudTimelineRef.current
        // Show the package at center position
        .set(".cloudPackage", { 
          opacity: 1,
          xPercent: -50,
          yPercent: -50,
          left: "50%", 
          top: "50%",
          scale: 1
        })
        
        // Animate the package along the path to the cloud
        .to(".cloudPackage", {
          motionPath: {
            path: PathGenerator.generateCurvePath(dest.position),
            align: `#path-${dest.id}`,
            alignOrigin: [0.5, 0.5],
            autoRotate: false
          },
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => {
            setTimeout(() => {
              setShowPackage(false);
            }, 500);
          }
        });
      
      // Play the animation
      cloudTimelineRef.current.play();
    } else if (!isAnimating) {
      // Hide all elements when not animating
      setShowPackage(false);
      setShowLightning(false);
    }
  }, [activeDestination, isAnimating, destinations]);
  
  // Effect for animating the SCIF destination package
  useEffect(() => {
    // Skip if not targeting SCIF destination or not animating
    if (
      activeDestination !== 2 || // SCIF has ID 2
      !isAnimating ||
      isPaused
    ) {
      return;
    }

    console.log("SCIF animation starting"); // Debug log

    // Get SCIF destination details
    const scifDestination = destinations.find((dest) => dest.id === 2);
    if (!scifDestination || !isPackageAnimating) {
      return;
    }

    // Clear any existing animations first
    gsap.killTweensOf('#package-icon');
    gsap.killTweensOf('#cd-icon');

    // Calculate positions in pixels instead of percentages for more predictable positioning
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Get absolute positions for SVG elements
    const svgElement = document.querySelector('.connectionSvg');
    const svgRect = svgElement?.getBoundingClientRect();
    
    if (!svgRect) {
      console.error("Could not find SVG element");
      return;
    }
    
    // Calculate shield position (halfway point)
    const shieldPosition = {
      x: svgRect.left + (svgRect.width * scifDestination.position.x / 100),
      y: svgRect.top + (svgRect.height * scifDestination.position.y / 100)
    };
    
    // Calculate shield midpoint
    const shieldMidpoint = {
      x: centerX + (shieldPosition.x - centerX) * 0.6,
      y: centerY + (shieldPosition.y - centerY) * 0.6
    };
    
    console.log("Animation positions:", { centerX, centerY, shieldMidpoint, destination: shieldPosition });
    
    // Create a master timeline
    const masterTimeline = gsap.timeline();
    
    // 1. Initial setup - ensure elements exist and set initial state
    masterTimeline.set('#package-icon', { 
      autoAlpha: 0,  // Start hidden
      scale: 1,
      x: centerX, 
      y: centerY
    });
    
    masterTimeline.set('#cd-icon', { 
      autoAlpha: 0,  // Start hidden
      scale: 1,
      x: shieldMidpoint.x,
      y: shieldMidpoint.y
    });
    
    // 2. Show and animate package from center to shield
    masterTimeline.to('#package-icon', { 
      autoAlpha: 1,   // Fade in
      duration: 0.3   // Quick fade in
    });
    
    // Simple linear animation from center to shield midpoint
    masterTimeline.to('#package-icon', {
      duration: 1.5,
      x: shieldMidpoint.x,
      y: shieldMidpoint.y,
      ease: "power1.inOut",
      onComplete: () => {
        console.log('Package reached shield'); // Debug
      }
    });
    
    // 3. Hide package at shield
    masterTimeline.to('#package-icon', {
      autoAlpha: 0,
      duration: 0.3
    });
    
    // 4. Show CD at shield position
    masterTimeline.to('#cd-icon', {
      autoAlpha: 1,
      duration: 0.3
    });
    
    // 5. Animate CD from shield to destination
    masterTimeline.to('#cd-icon', {
      duration: 1.5,
      x: shieldPosition.x,
      y: shieldPosition.y,
      ease: "power1.inOut",
      onComplete: () => {
        console.log('CD reached destination'); // Debug
      }
    });
    
    // 6. Fade out CD at destination
    masterTimeline.to('#cd-icon', {
      autoAlpha: 0,
      duration: 0.3
    });
    
    // Play the animation
    masterTimeline.play();
    
    // Clean up function
    return () => {
      masterTimeline.kill();
      gsap.set('#package-icon', { autoAlpha: 0 });
      gsap.set('#cd-icon', { autoAlpha: 0 });
    };
  }, [
    destinations,
    activeDestination,
    isAnimating,
    isPaused,
    isPackageAnimating
  ]);
  
  // Effect for animating Bare Metal destination (id: 3)
  useEffect(() => {
    if (!bareMetalTimelineRef.current) return;
    
    if (activeDestination === 3 && isAnimating) {
      const dest = destinations[3]; // Bare Metal destination
      
      // Clear existing timeline
      bareMetalTimelineRef.current.clear();
      
      // Set up animation for path
      bareMetalTimelineRef.current
        .set(`#path-${dest.id}`, {
          stroke: "rgba(255, 255, 255, 0.3)",
          strokeWidth: 2
        })
        .to(`#path-${dest.id}`, {
          stroke: "#FFB81C",
          strokeWidth: 2.5,
          duration: 0.5,
          ease: "power1.inOut"
        });
      
      // Play the animation
      bareMetalTimelineRef.current.play();
    }
  }, [activeDestination, isAnimating, destinations]);
  
  // Effect for animating Edge Device destination (id: 4)
  useEffect(() => {
    if (!edgeTimelineRef.current) return;
    
    if (activeDestination === 2 && isAnimating) {
      const dest = destinations[2]; // Edge Device destination
      
      // Clear existing timeline
      edgeTimelineRef.current.clear();
      
      // Set up animation for path
      edgeTimelineRef.current
        .set(`#path-${dest.id}`, {
          stroke: "rgba(255, 255, 255, 0.3)",
          strokeWidth: 2
        })
        .to(`#path-${dest.id}`, {
          stroke: "#FFB81C",
          strokeWidth: 2.5,
          duration: 0.5,
          ease: "power1.inOut"
        });
      
      // Play the animation
      edgeTimelineRef.current.play();
    }
  }, [activeDestination, isAnimating, destinations]);
  
  // Function to start the animation
  const startAnimation = () => {
    if (animationControllerRef.current) {
      // Kill any existing animations
      if (mainTimelineRef.current) mainTimelineRef.current.kill();
      if (scifTimelineRef.current) scifTimelineRef.current.kill();
      if (cloudTimelineRef.current) cloudTimelineRef.current.kill();
      if (bareMetalTimelineRef.current) bareMetalTimelineRef.current.kill();
      if (edgeTimelineRef.current) edgeTimelineRef.current.kill();
      
      // Create fresh timelines
      mainTimelineRef.current = gsap.timeline();
      scifTimelineRef.current = gsap.timeline({ paused: true });
      cloudTimelineRef.current = gsap.timeline({ paused: true });
      bareMetalTimelineRef.current = gsap.timeline({ paused: true });
      edgeTimelineRef.current = gsap.timeline({ paused: true });
      
      // Set up the main animation timeline
      if (mainTimelineRef.current) {
        // Start with the package animation from the card
        mainTimelineRef.current
          .set(".packageContainer", { opacity: 1, x: 0 })
          .to(".packageContainer", {
            x: -300, 
            duration: 1.5,
            ease: "power1.inOut"
          })
          .to(".packageContainer", {
            opacity: 0,
            duration: 0.3
          }, "-=0.3")
          
          // Highlight the center logo
          .to(".crystalLogoContainer", {
            boxShadow: "0 0 25px rgba(255, 184, 28, 0.6), 0 0 40px rgba(0, 0, 0, 0.4)",
            borderColor: "rgba(255, 184, 28, 0.8)",
            duration: 0.5
          })
          .to(".logoGlow", {
            background: "radial-gradient(circle, rgba(255, 184, 28, 0.5) 0%, rgba(0, 0, 0, 0) 70%)",
            scale: 1.2,
            opacity: 0.8,
            duration: 0.4,
            yoyo: true,
            repeat: 1
          });
      }
      
      // Start the controller animation
      animationControllerRef.current.startAnimation();
    }
  };

  // Set up event listener to start animation from an external trigger
  useEffect(() => {
    const handleStartAnimation = () => {
      console.log("Received external trigger to start animation");
      startAnimation();
    };
    
    window.addEventListener('start-deployment-animation', handleStartAnimation);
    return () => {
      window.removeEventListener('start-deployment-animation', handleStartAnimation);
    };
  }, []);

  // Set up intersection observer to trigger animation on scroll
  useEffect(() => {
    if (!sectionRef.current || hasAnimationStarted) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimationStarted) {
          console.log("Section in view, starting animation");
          startAnimation();
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
  }, [hasAnimationStarted]);
  
  // Handle clicks on the redeploy button
  const redeployClick = () => {
    startAnimation();
  };

  // Handle scroll-based trigger
  useEffect(() => {
    const handleScroll = () => {
      if (
        containerRef.current &&
        window.innerHeight + window.scrollY >
          containerRef.current.offsetTop + 300 &&
        !isAnimating &&
        isDeploymentCompleted
      ) {
        startAnimation();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isAnimating, isDeploymentCompleted]);

  // Clean up timelines when component unmounts
  useEffect(() => {
    return () => {
      if (mainTimelineRef.current) {
        mainTimelineRef.current.kill();
      }
      if (scifTimelineRef.current) {
        scifTimelineRef.current.kill();
      }
      if (cloudTimelineRef.current) {
        cloudTimelineRef.current.kill();
      }
      if (bareMetalTimelineRef.current) {
        bareMetalTimelineRef.current.kill();
      }
      if (edgeTimelineRef.current) {
        edgeTimelineRef.current.kill();
      }
    };
  }, []);

  // Add a test function to manually trigger the animation
  const testScifAnimation = () => {
    alert("Starting SCIF animation test");
    console.log("Testing SCIF animation");
    
    // Kill any existing animations
    gsap.killTweensOf('#package-icon');
    gsap.killTweensOf('#cd-icon');
    
    // First check if elements exist
    const packageElement = document.getElementById('package-icon');
    const cdElement = document.getElementById('cd-icon');
    
    if (!packageElement || !cdElement) {
      alert("Animation elements not found");
      return;
    }
    
    // Use fixed positions for a reliable test
    // These are viewport coordinates
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Center of the screen
    const centerX = viewportWidth / 2;
    const centerY = viewportHeight / 2;
    
    // SCIF is typically in the top-right quadrant
    const destX = viewportWidth * 0.8;  // 80% from left
    const destY = viewportHeight * 0.2; // 20% from top
    
    // Shield position between center and destination
    const shieldX = centerX + (destX - centerX) * 0.5;
    const shieldY = centerY + (destY - centerY) * 0.5;
    
    console.log("Using animation points:", { 
      viewport: { width: viewportWidth, height: viewportHeight },
      center: { x: centerX, y: centerY },
      shield: { x: shieldX, y: shieldY },
      destination: { x: destX, y: destY }
    });
    
    // Make elements very visible for testing
    gsap.set(packageElement, {
      background: 'rgba(0,0,0,0.8)',
      border: '3px solid #FFB81C',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    });
    
    gsap.set(cdElement, {
      background: 'rgba(0,0,0,0.8)',
      border: '3px solid #64B5F6',
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10000
    });
    
    // Create animation timeline
    const tl = gsap.timeline();
    
    // STEP 1: Position and show package at center
    tl.set(packageElement, {
      x: centerX,
      y: centerY,
      xPercent: -50,
      yPercent: -50,
      opacity: 0,
      scale: 1
    });
    
    // STEP 2: Fade in package
    tl.to(packageElement, {
      opacity: 1,
      duration: 0.5,
      onStart: () => console.log("Package appear animation started")
    });
    
    // STEP 3: Animate package from center to shield
    tl.to(packageElement, {
      x: shieldX,
      y: shieldY,
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => console.log("Package reached shield")
    });
    
    // STEP 4: Fade out package
    tl.to(packageElement, {
      opacity: 0,
      duration: 0.5
    });
    
    // STEP 5: Position and fade in CD
    tl.set(cdElement, {
      x: shieldX,
      y: shieldY,
      xPercent: -50,
      yPercent: -50,
      opacity: 0
    })
    .to(cdElement, {
      opacity: 1,
      duration: 0.5,
      onStart: () => console.log("CD appear animation started")
    });
    
    // STEP 6: Animate CD from shield to destination
    tl.to(cdElement, {
      x: destX,
      y: destY,
      duration: 2,
      ease: "power1.inOut",
      onComplete: () => console.log("CD reached destination")
    });
    
    // STEP 7: Fade out CD
    tl.to(cdElement, {
      opacity: 0,
      duration: 0.5
    });
    
    // Play the timeline
    tl.play();
  };
  
  // Add click handler directly in JSX
  const handleTestButtonClick = () => {
    console.log("TEST ANIMATION BUTTON CLICKED");
    alert("Test button clicked");
    testScifAnimation();
  };

  return (
    <div className={styles.deploymentFlexibility} ref={sectionRef} id={id}>
      <h2 className={styles.sectionTitle}>Deployment Flexibility</h2>
      <p className={styles.sectionSubtitle}>
        Maintain complete control over where your data resides, meeting security requirements, compliance needs, and performance goals.
      </p>
      
      <div className={styles.deploymentContainer} ref={containerRef}>
        <div className={styles.leftSection}>
          <div className={`${styles.pipelineCard} ${isDeploymentCompleted ? styles.completedCard : ''}`}>
            <div className={styles.cardHeader}>
              <div className={styles.spinnerContainer}>
                <div className={`${styles.spinnerOuter} ${isDeploymentCompleted ? styles.completedSpinner : ''}`}>
                  {isDeploymentCompleted ? (
                    <BsCheckCircleFill className={styles.checkIcon} />
                  ) : (
                    <FaSpinner className={styles.spinnerIcon} />
                  )}
                </div>
              </div>
              <h4 className={styles.cardTitle}>Production Deployment</h4>
            </div>
            
            {/* Package animation inside the card */}
            {isPackageAnimating && (
              <div className={styles.packageContainer}>
                <FaBox className={styles.packageIcon} />
              </div>
            )}
          </div>
        </div>
        
        <div className={styles.centerSection}>
          <div className={styles.animationContainer}>
            {/* Connection Lines */}
            <svg 
              className={styles.connectionSvg} 
              viewBox="0 0 100 100" 
              preserveAspectRatio="none"
            >
              {/* Background inactive paths - always visible */}
              {destinations.map((dest) => {
                // For SCIF destination (id: 2), add the shield to the path
                if (dest.id === 2) {
                  const shieldPosition = PathGenerator.calculatePadlockPosition(dest.position, 50, 50);
                  
                  return (
                    <g key={`bg-${dest.id}`}>
                      {/* Gray base path */}
                      <path
                        id={`path-${dest.id}`}
                        d={PathGenerator.generateAirGappedPath(dest.position)}
                        className={styles.inactivePath}
                        fill="none"
                        stroke="rgba(255, 255, 255, 0.3)"
                        strokeLinecap="round"
                        strokeWidth={2}
                      />
                      
                      {/* Shield in the middle of the path - always visible */}
                      <g 
                        transform={`translate(${shieldPosition.x}, ${shieldPosition.y})`}
                        className={styles.staticShield}
                      >
                        <circle 
                          r={5} 
                          fill="#64B5F6" 
                          opacity={0.3} 
                        />
                        <FaShieldAlt 
                          color="#64B5F6" 
                          size={7}
                          style={{
                            transform: `translate(-3.5px, -3.5px)`,
                            filter: `drop-shadow(0 0 5px rgba(100, 181, 246, 0.8))`
                          }}
                        />
                      </g>
                    </g>
                  );
                }
                
                // For all other destinations, just draw the regular path
                return (
                  <path
                    id={`path-${dest.id}`}
                    key={`bg-${dest.id}`}
                    d={PathGenerator.generateCurvePath(dest.position)}
                    className={styles.inactivePath}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeLinecap="round"
                    strokeWidth={2}
                    ref={el => {
                      if (el && pathsRef.current) {
                        pathsRef.current[dest.id] = el;
                      }
                    }}
                  />
                );
              })}
            </svg>
            
            {/* Cloud package animation element - placed directly in animation container */}
            {showPackage && (
              <div 
                className="cloudPackage"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 1, // Low z-index to ensure it's behind destinations
                  pointerEvents: 'none'
                }}
              >
                <FaBox size={28} color="#FFB81C" />
              </div>
            )}
            
            {/* CD from shield to SCIF animation element - always in DOM but conditionally visible */}
            <div 
              ref={cdToScifRef}
              className="cdToScif"
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                opacity: showCDToScif ? 1 : 0,
                zIndex: 20,
                pointerEvents: 'none'
              }}
            >
              <FaCompactDisc size={28} color="#64B5F6" />
            </div>
            
            {/* Package to shield animation element */}
            {showPackageToShield && (
              <div 
                ref={packageToShieldRef}
                className="packageToShield"
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 20,
                  pointerEvents: 'none'
                }}
              >
                <FaBox size={28} color="#FFB81C" />
              </div>
            )}
            
            {/* Center Logo */}
            <div className={styles.centerContent}>
              <div 
                ref={logoRef}
                className={`${styles.crystalLogoContainer} ${isLogoHighlighted ? styles.logoHighlighted : ''}`}
              >
                <div className={styles.logoGlow}></div>
                <Image
                  src={withBasePath('/images/crystal-tower-logo.png')}
                  alt="Crystal Tower Logo"
                  width={80}
                  height={80}
                  className={styles.crystalLogoImage}
                />
              </div>
            </div>
            
            {/* Fixed visible package and CD icons */}
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
            
            {/* Destination Boxes */}
            {destinations.map((dest, index) => {
              const isActive = activeDestination === index && (isAnimating || isPaused);
              
              // Special case for Government Cloud (first destination)
              if (dest.id === 1) {
                return (
                  <div
                    key={dest.id}
                    className={`${styles.destinationBox} ${styles.cloudDestination} ${
                      isActive ? styles.activeDestination : ""
                    }`}
                    style={{
                      left: `${dest.position.x}%`,
                      top: `${dest.position.y}%`,
                      transform: `translate(-50%, -50%)`,
                      opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
                    }}
                  >
                    <CloudDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  </div>
                );
              }
              
              // Use specific components for each destination type
              return (
                <div
                  key={dest.id}
                  className={`${styles.destinationBox} ${
                    isActive ? styles.activeDestination : ""
                  } ${dest.id === 2 ? styles.scifDestinationBox : ""}`}
                  style={{
                    left: `${dest.position.x}%`,
                    top: `${dest.position.y}%`,
                    transform: `translate(-50%, -50%)`,
                    opacity: activeDestination === index || (!isAnimating && !isPaused) ? 1 : 0.8
                  }}
                >
                  {/* Render appropriate destination component based on ID */}
                  {dest.id === 2 ? (
                    <ScifDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  ) : dest.id === 4 ? (
                    <EdgeDeviceDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  ) : dest.id === 3 ? (
                    <BareMetalDestination x={dest.position.x} y={dest.position.y} active={isActive} />
                  ) : (
                    <div className={styles.destinationContent}>
                      <div className={styles.destinationIcon} style={{
                        color: isActive ? "#FFB81C" : "rgba(255, 255, 255, 0.85)"
                      }}>{dest.icon}</div>
                      <h4>{dest.name}</h4>
                      <p>{dest.description}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Test Animation Button */}
      <button 
        onClick={handleTestButtonClick}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          padding: '10px 15px',
          background: '#FF4081',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          zIndex: 9999,
          fontWeight: 'bold'
        }}
      >
        Test SCIF Animation
      </button>
      
      {/* Redeploy button */}
      <button 
        onClick={redeployClick}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px',
          background: '#FFB81C',
          color: '#000',
          border: 'none',
          borderRadius: '50%',
          cursor: 'pointer',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          zIndex: 100
        }}
        title="Redeploy"
      >
        <FaRedo size={18} />
      </button>
    </div>
  );
};

export default DeploymentFlexibility; 