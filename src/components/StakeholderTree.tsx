import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { useClickSound } from '../hooks/useClickSound';

interface StakeholderNode {
  id: string;
  name: string;
  color: string;
  hoverColor: string;
  textColor: string;
  description: string;
  longDescription?: string; // Longer description for tooltip
  icon?: string;
  benefits?: string[]; // Array of benefits for each stakeholder
}

interface StakeholderTreeProps {
  playClickSound?: () => void;
}

const StakeholderTree: React.FC<StakeholderTreeProps> = ({ playClickSound }) => {  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedNodeRef = useRef<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });const { playClick } = useClickSound();
      // Handle click with sound - simplified and optimized
  const handleClick = useCallback(() => {
    // Always try to play click sound immediately
    try {
      playClick();
      
      // Fallback direct audio play for immediate feedback
      const audio = new Audio('/click.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {
        // Silently fail if audio can't play
      });
    } catch (error) {
      console.warn('Click sound failed:', error);
    }
  }, [playClick]);

  // Define the data structure for our stakeholder tree
  const data: StakeholderNode[] = [
    {
      id: 'glohsen',
      name: 'GLOHSEN',
      color: '#8B0000', // Deep red
      hoverColor: '#B22222', // Lighter red
      textColor: '#FFD700', // Gold
      description: 'The central hub connecting all healthcare stakeholders',
      longDescription: 'GLOHSEN sets the new standard in healthcare by integrating services for all stakeholders in one platform.',
      benefits: [
        'Unified platform',
        'Quality standards',
        'Enhanced connectivity',
        'Data-driven insights'
      ]
    },
    {
      id: 'clients',
      name: 'Clients',
      color: '#FFD700', // Gold
      hoverColor: '#FFC107', // Amber gold
      textColor: '#000000', // Black
      description: 'Individuals receiving healthcare services',
      longDescription: 'Clients can provide valuable feedback on healthcare services and find quality providers.',
      benefits: [
        'Service reviews',
        'Provider ratings',
        'Quality assurance',
        'Healthcare insights'
      ]
    },
    {
      id: 'employers',
      name: 'Employers',
      color: '#1C1C1C', // Very dark gray/black
      hoverColor: '#2D2D2D', // Slightly lighter black
      textColor: '#FFD700', // Gold
      description: 'Healthcare facilities seeking qualified professionals',
      longDescription: 'Healthcare facilities can find pre-vetted professionals with verified skills and credentials.',
      benefits: [
        'Talent acquisition',
        'Quality verification',
        'Reduced hiring time',
        'Skilled workforce'
      ]
    },
    {
      id: 'students',
      name: 'Students',
      color: '#B22222', // Medium red
      hoverColor: '#DC3545', // Brighter red
      textColor: '#FFFFFF', // White
      description: 'Future healthcare professionals in training',
      longDescription: 'Students can access interactive learning resources and connect with mentors in their field.',
      benefits: [
        'Interactive learning',
        'Mentorship connections',
        'Progress tracking',
        'Career guidance'
      ]
    },
    {
      id: 'professionals',
      name: 'Professionals',
      color: '#000000', // Black
      hoverColor: '#333333', // Dark gray
      textColor: '#FFD700', // Gold
      description: 'Practicing healthcare providers enhancing their careers',
      longDescription: 'Healthcare professionals can track their GLOHSEN score and access opportunities for advancement.',
      benefits: [
        'Career progression',
        'Skill verification',
        'Professional networking',
        'Continuous education'
      ]
    },
    {
      id: 'tutors',
      name: 'Tutors',
      color: '#F5F5F5', // Off-white
      hoverColor: '#E9ECEF', // Slightly darker off-white
      textColor: '#8B0000', // Deep red
      description: 'Experts who share knowledge and mentor others',
      longDescription: 'Tutors can create courses and mentor healthcare students and professionals using AI-enhanced tools.',
      benefits: [
        'Teaching platform',
        'AI-assisted content',
        'Student engagement',
        'Revenue generation'
      ]
    }
  ];

  // Set up connections between nodes
  const links = [
    { source: 'glohsen', target: 'clients' },
    { source: 'glohsen', target: 'employers' },
    { source: 'glohsen', target: 'students' },
    { source: 'glohsen', target: 'professionals' },
    { source: 'glohsen', target: 'tutors' }
  ];
  // Additional link data with descriptions
  const linkDescriptions = [
    { 
      source: 'glohsen', 
      target: 'clients',
      description: 'Service & Feedback'
    },
    { 
      source: 'glohsen', 
      target: 'employers',
      description: 'Talent Solutions'
    },
    { 
      source: 'glohsen', 
      target: 'students',
      description: 'Education & Training'
    },
    { 
      source: 'glohsen', 
      target: 'professionals',
      description: 'Career Growth'
    },
    { 
      source: 'glohsen', 
      target: 'tutors',
      description: 'Knowledge Sharing'
    }
  ];  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width || 500;
        const height = Math.max(rect.height, 450) || 500;
        
        console.log('StakeholderTree container dimensions:', { width, height, rect });
        
        if (width > 0 && height > 0) {
          setDimensions({ width, height });
        } else {
          console.warn('Invalid dimensions detected, using fallback values');
          setDimensions({ width: 500, height: 500 });
        }
      }
    };

    // Initial size setup
    handleResize();
    
    // Force multiple checks to ensure dimensions are captured correctly
    const initialCheckTimers = [100, 300, 500, 1000].map(delay => 
      setTimeout(handleResize, delay)
    );
    
    // Set up resize listener
    window.addEventListener('resize', handleResize);
    
    // Check on active section change (via parent's isActive prop)
    const mutationObserver = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        setTimeout(handleResize, 100);
      });
    });
    
    if (containerRef.current) {
      mutationObserver.observe(containerRef.current.parentElement || document.body, {
        attributes: true,
        childList: false,
        subtree: false
      });
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      initialCheckTimers.forEach(timer => clearTimeout(timer));
      mutationObserver.disconnect();
    };
  }, []);

  // Handle mouse movement for 3D rotation effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current && !isAnimating) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center (normalized to -1 to 1)
        const x = ((e.clientX - centerX) / (rect.width / 2)) * 5; // Max 5 degrees of rotation
        const y = ((e.clientY - centerY) / (rect.height / 2)) * 5;
        
        setRotation({ x: -y, y: x }); // Invert y for natural movement
      }
    };

    // Add smooth pulsing animation effect
    const pulseAnimation = () => {
      setIsAnimating(true);
      
      // Animate a gentle rotation
      const startTime = Date.now();
      const duration = 5000; // 5 seconds for one full cycle
      
      const animate = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = (elapsedTime % duration) / duration;
        const angle = progress * Math.PI * 2; // Full circle
        
        setRotation({
          x: Math.sin(angle) * 3, // 3 degrees max tilt
          y: Math.cos(angle) * 3
        });
        
        if (isAnimating) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Start pulse animation when no mouse movement
    const inactivityTimer = setTimeout(pulseAnimation, 3000);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      setIsAnimating(false);
      clearTimeout(inactivityTimer);
    };
  }, [isAnimating]);

  // Handle touch events for mobile devices
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Stop auto-rotation when user interacts
      setIsAnimating(false);

      // Store the initial touch position for calculating drag
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        const initialX = touch.clientX;
        const initialY = touch.clientY;
        
        const handleTouchMove = (moveEvent: TouchEvent) => {
          if (moveEvent.touches.length === 1 && containerRef.current) {
            const moveTouch = moveEvent.touches[0];
            const deltaX = moveTouch.clientX - initialX;
            const deltaY = moveTouch.clientY - initialY;
            
            // Convert touch movement to rotation (scale down the movement)
            const rotationX = -deltaY * 0.5;
            const rotationY = deltaX * 0.5;
            
            setRotation({ x: rotationX, y: rotationY });
          }
        };
        
        const handleTouchEnd = () => {
          document.removeEventListener('touchmove', handleTouchMove);
          document.removeEventListener('touchend', handleTouchEnd);
          
          // Reset rotation after a delay
          setTimeout(() => {
            setRotation({ x: 0, y: 0 });
          }, 500);
        };
        
        document.addEventListener('touchmove', handleTouchMove, { passive: true });
        document.addEventListener('touchend', handleTouchEnd);
      }
    };

    const currentContainer = containerRef.current;
    if (currentContainer) {
      currentContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
    }
    
    return () => {
      if (currentContainer) {
        currentContainer.removeEventListener('touchstart', handleTouchStart);
      }
    };
  }, []);

  // Reset tooltip and selected node when dimensions change (e.g. on resize)
  useEffect(() => {
    setSelectedNode(null);
  }, [dimensions.width]);
  // Add debugging for dimensions changes
  useEffect(() => {
    console.log('StakeholderTree dimensions updated:', dimensions);
    
    // Force a minimum size if dimensions are too small or zero
    if (dimensions.width === 0 || dimensions.height === 0) {
      console.warn('StakeholderTree: Invalid dimensions, setting fallback dimensions');
      setDimensions({
        width: 500,
        height: 500
      });
      return;
    }
    
    // Continue with D3 rendering...
    if (!svgRef.current) {
      console.warn('StakeholderTree: SVG ref not available');
      return;
    }
    
    try {
      // Clear any existing visualization
      d3.select(svgRef.current).selectAll('*').remove();
      console.log('StakeholderTree: Initializing D3 visualization with dimensions', dimensions);
      
      // Continue with D3 rendering...
    } catch (error) {
      console.error('Error initializing StakeholderTree D3:', error);
    }
  }, [dimensions]);
  // Create and update the D3 visualization - optimized
  useEffect(() => {
    if (!svgRef.current || dimensions.width === 0 || dimensions.height === 0) {
      console.warn('StakeholderTree: Invalid dimensions or SVG ref for D3 rendering');
      
      // Set fallback dimensions if needed
      if (dimensions.width === 0 || dimensions.height === 0) {
        const fallbackWidth = 500;
        const fallbackHeight = 500;
        console.log('Setting fallback dimensions:', { width: fallbackWidth, height: fallbackHeight });
        setDimensions({ width: fallbackWidth, height: fallbackHeight });
        
        // Force redraw after setting dimensions
        setTimeout(() => {
          if (svgRef.current) {
            console.log('Forcing SVG update with fallback dimensions');
            const svgElement = svgRef.current;
            svgElement.setAttribute('width', `${fallbackWidth}px`);
            svgElement.setAttribute('height', `${fallbackHeight}px`);
            svgElement.setAttribute('viewBox', `0 0 ${fallbackWidth} ${fallbackHeight}`);
            
            // Force browser to acknowledge change
            void svgElement.getBoundingClientRect();
          }
        }, 100);
      }
      return;
    }

    // Clear the SVG
    d3.select(svgRef.current).selectAll('*').remove();
    
    console.log('D3 visualization rendering with dimensions:', dimensions);

    const svg = d3.select(svgRef.current);
    
    // Define the center point and radius for our radial layout
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const radius = Math.min(centerX, centerY) * 0.65;

    // Create a map for easy node lookup
    const nodeMap = data.reduce((map, node) => {
      map[node.id] = node;
      return map;
    }, {} as Record<string, StakeholderNode>);

    // Set the positions of the nodes in a radial layout
    const positions: Record<string, {x: number, y: number}> = {};
    
    // Position GLOHSEN at the center
    positions['glohsen'] = { x: centerX, y: centerY };
    
    // Position stakeholders in a circle around GLOHSEN
    const stakeholders = data.filter(node => node.id !== 'glohsen');
    const angleStep = (2 * Math.PI) / stakeholders.length;
    
    stakeholders.forEach((node, i) => {
      const angle = i * angleStep;
      positions[node.id] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });

    // Create the links (connections)
    svg.selectAll('line.connection-base')
      .data(links)
      .enter()
      .append('line')
      .attr('class', 'connection-base')
      .attr('x1', d => positions[d.source].x)
      .attr('y1', d => positions[d.source].y)
      .attr('x2', d => positions[d.target].x)
      .attr('y2', d => positions[d.target].y)
      .attr('stroke', d => {
        const node = nodeMap[d.target];
        return node.color;
      })
      .attr('stroke-width', 3)
      .attr('stroke-opacity', 0.7)
      .attr('stroke-dasharray', '5,5')
      .attr('class', 'animate-pulse'); // Add pulse animation
      
    // Add fancy gradient effect to links
    links.forEach((link, i) => {
      const gradientId = `link-gradient-${i}`;
      const sourceNode = nodeMap[link.source];
      const targetNode = nodeMap[link.target];
      
      // Create gradient
      const gradient = svg.append('defs')
        .append('linearGradient')
        .attr('id', gradientId)
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', positions[link.source].x)
        .attr('y1', positions[link.source].y)
        .attr('x2', positions[link.target].x)
        .attr('y2', positions[link.target].y);
        
      gradient.append('stop')
        .attr('offset', '0%')
        .attr('stop-color', sourceNode.color);
        
      gradient.append('stop')
        .attr('offset', '100%')
        .attr('stop-color', targetNode.color);
        // Apply gradient to line with particle animation
      const gradientLine = svg.append('line')
        .attr('class', 'connection-gradient')
        .attr('x1', positions[link.source].x)
        .attr('y1', positions[link.source].y)
        .attr('x2', positions[link.target].x)
        .attr('y2', positions[link.target].y)
        .attr('stroke', `url(#${gradientId})`)
        .attr('stroke-width', 4)
        .attr('stroke-opacity', 0.8);
    });
    
    // Add animated particles along the connection
    links.forEach((link, i) => {
      const linkDescription = linkDescriptions.find(
        ld => ld.source === link.source && ld.target === link.target
      );
      
      if (linkDescription) {
        // Calculate position for the text (midpoint of the line)
        const midX = (positions[link.source].x + positions[link.target].x) / 2;
        const midY = (positions[link.source].y + positions[link.target].y) / 2;
        
        // Calculate angle for text rotation
        const angle = Math.atan2(
          positions[link.target].y - positions[link.source].y,
          positions[link.target].x - positions[link.source].x
        ) * 180 / Math.PI;
        
        // Create text background for better readability
        svg.append('rect')
          .attr('x', midX - 40)
          .attr('y', midY - 10)
          .attr('width', 80)
          .attr('height', 20)
          .attr('fill', 'rgba(0,0,0,0.6)')
          .attr('rx', 10)
          .attr('ry', 10)
          .attr('opacity', 0.7)
          .attr('transform', `rotate(${angle}, ${midX}, ${midY})`);
        
        // Add connection description text
        svg.append('text')
          .attr('x', midX)
          .attr('y', midY)
          .attr('text-anchor', 'middle')
          .attr('dominant-baseline', 'middle')
          .attr('fill', '#f0f0f0')
          .attr('font-size', '9px')
          .attr('font-weight', 'bold')
          .attr('opacity', 0.9)
          .attr('transform', `rotate(${angle}, ${midX}, ${midY})`)
          .attr('class', 'connection-label pointer-events-none')
          .text(linkDescription.description);
      }
      
      const particleGroup = svg.append('g')
        .attr('class', 'particles');
      
      // Add 3 particles with different timings
      for (let j = 0; j < 3; j++) {
        const particle = particleGroup.append('circle')
          .attr('r', 3)
          .attr('fill', nodeMap[link.target].color)
          .attr('opacity', 0.8)
          .attr('filter', 'url(#glow-effect)');
          
        // Animation function
        function animateParticle() {
          particle
            .attr('cx', positions[link.source].x)
            .attr('cy', positions[link.source].y)
            .transition()
            .duration(2000 + j * 600) // Stagger the particles
            .ease(d3.easeLinear)
            .attr('cx', positions[link.target].x)
            .attr('cy', positions[link.target].y)
            .transition()
            .duration(300)
            .attr('opacity', 0)
            .on('end', animateParticle);
        }
          // Start animation with delay
        setTimeout(animateParticle, j * 600);
      }
    });

    // Create glow filter
    const glowFilter = svg.append('defs')
      .append('filter')
      .attr('id', 'glow-effect')
      .attr('x', '-50%')
      .attr('y', '-50%')
      .attr('width', '200%')
      .attr('height', '200%');
      
    glowFilter.append('feGaussianBlur')
      .attr('stdDeviation', '2')
      .attr('result', 'coloredBlur');
      
    const glowMerge = glowFilter.append('feMerge');
    glowMerge.append('feMergeNode')
      .attr('in', 'coloredBlur');
    glowMerge.append('feMergeNode')
      .attr('in', 'SourceGraphic');    // Create optimized click handler
    const createClickHandler = (nodeData: StakeholderNode) => {
      return (event: any) => {
        event.stopPropagation();
        
        // Immediate visual feedback
        const target = event.currentTarget || event.target;
        if (target) {
          target.style.transform = 'scale(0.95)';
          setTimeout(() => {
            target.style.transform = 'scale(1)';
          }, 100);
        }
        
        // Play sound immediately - don't wait for state updates
        handleClick();
          // Update state efficiently
        const isCurrentlySelected = selectedNode === nodeData.id;
        const newSelectedNode = isCurrentlySelected ? null : nodeData.id;
        
        // Update ref immediately for faster rendering
        selectedNodeRef.current = newSelectedNode;
        
        setSelectedNode(newSelectedNode);
        setTooltipPosition({
          x: positions[nodeData.id].x,
          y: positions[nodeData.id].y
        });
        setIsAnimating(false);
      };
    };

    // Create node groups
    const nodeGroups = svg.selectAll('g.node')
      .data(data)
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', d => `translate(${positions[d.id].x}, ${positions[d.id].y})`)
      .style('cursor', 'pointer')
      .on('click', (event, d) => createClickHandler(d)(event))
      .on('mouseenter', (event, d) => {
        setHoveredNode(d.id);
        // Update position for tooltip
        setTooltipPosition({
          x: positions[d.id].x,
          y: positions[d.id].y
        });
      })
      .on('mouseleave', () => {
        setHoveredNode(null);
        // Hide tooltip when not hovering (unless a node is selected)
        if (!selectedNode) {
          // setTooltipPosition({ x: 0, y: 0 }); // Keep tooltip if selected
        }
      });

    // Add shadow filter for 3D effect
    const defs = svg.append('defs');
    
    // Create a filter for the shadow
    const filter = defs.append('filter')
      .attr('id', 'node-shadow')
      .attr('height', '150%')
      .attr('width', '150%');
      
    filter.append('feDropShadow')
      .attr('dx', 2)
      .attr('dy', 2)
      .attr('stdDeviation', 3)
      .attr('flood-color', 'rgba(0,0,0,0.5)');
    
    // Add rings behind the nodes for a layered effect
    nodeGroups.append('circle')
      .attr('r', d => d.id === 'glohsen' ? 60 : 45)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.3)
      .attr('class', 'animate-ping')
      .attr('style', 'animation-duration: 3s');
      // Add outer glow for hover state - optimized for immediate updates
    const outerGlowCircles = nodeGroups.append('circle')
      .attr('r', d => d.id === 'glohsen' ? 55 : 40)
      .attr('fill', 'none')
      .attr('stroke', d => d.color)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0)
      .attr('filter', 'url(#glow-effect)')
      .attr('class', 'transition-all duration-300');

    // Update glow circles based on current state
    outerGlowCircles.attr('stroke-opacity', d => {
      return (hoveredNode === d.id || selectedNode === d.id) ? 0.8 : 0;
    });      // Add node circles with 3D effect - optimized for immediate updates
    const mainCircles = nodeGroups.append('circle')
      .attr('r', d => d.id === 'glohsen' ? 50 : 35)
      .attr('fill', d => d.color)
      .attr('filter', 'url(#node-shadow)')
      .attr('class', 'transition-all duration-300')
      .on('click', (event, d) => createClickHandler(d)(event))
      .on('mouseover', function(_, d) {
        setHoveredNode(d.id);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.id === 'glohsen' ? 55 : 40)
          .attr('fill', d.hoverColor);
        
        // Stop auto-rotation when user interacts
        setIsAnimating(false);
      })
      .on('mouseout', function(_, d) {
        setHoveredNode(null);
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.id === 'glohsen' ? 50 : 35)
          .attr('fill', d.color);
      });

    // Update circle colors based on current state
    mainCircles.attr('fill', d => {
      return (hoveredNode === d.id || selectedNode === d.id) ? d.hoverColor : d.color;
    });

    // Add text labels to nodes
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', '0.3em')
      .attr('fill', d => d.textColor)
      .attr('font-weight', 'bold')
      .attr('font-size', d => d.id === 'glohsen' ? '16px' : '14px')
      .text(d => d.name)
      .attr('class', 'pointer-events-none');
      
    // Add description text that appears on hover
    nodeGroups.append('text')
      .attr('text-anchor', 'middle')
      .attr('dy', d => d.id === 'glohsen' ? '70px' : '55px')
      .attr('fill', '#f0f0f0')
      .attr('font-size', '12px')
      .attr('opacity', d => hoveredNode === d.id ? 1 : 0)
      .attr('class', 'transition-opacity duration-300 font-medium')
      .attr('text-shadow', '0px 1px 3px rgba(0,0,0,0.8)')
      .text(d => d.description);
        // Add a subtle animation to the GLOHSEN central node
    svg.select(`g.node[transform="translate(${positions['glohsen'].x}, ${positions['glohsen'].y})"] circle`)
      .attr('class', 'animate-pulse');

  }, [dimensions]); // Only re-render when dimensions change, not on state changes
  
  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[400px] bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-lg shadow-xl p-4 relative overflow-visible"
      onMouseEnter={() => setIsAnimating(false)}
      style={{
        perspective: '1000px',
        backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(50, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
      }}
    >
      {/* Add subtle background decoration */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute w-full h-full">
          {/* Decorative circles */}
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full opacity-30"
              style={{
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                backgroundColor: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#ea384c' : '#f5f5f5',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `floatUp ${Math.random() * 5 + 10}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 3D Container with rotation effect */}
      <div 
        className="w-full h-full transition-transform duration-300 ease-out"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        }}
      >
        <svg 
          ref={svgRef} 
          width="100%" 
          height="100%" 
          className="overflow-visible"
          viewBox={`0 0 ${dimensions.width || 500} ${dimensions.height || 500}`}
          preserveAspectRatio="xMidYMid meet"
        />
      </div>      {/* Detailed Tooltip */}
      {selectedNode && (
        <div
          className="absolute bg-gradient-to-br from-gray-800 to-black p-4 rounded-lg shadow-lg border border-gray-700 z-50 max-w-xs animate-slide-up"          style={{
            // Center horizontally over node and clamp within container
            left: (() => {
              const tooltipWidth = 220;
              const margin = 20;
              const centered = tooltipPosition.x - tooltipWidth / 2;
              const min = margin;
              const max = dimensions.width - tooltipWidth - margin;
              return Math.min(Math.max(centered, min), max);
            })(),
            // Position above node by default, fallback below if too close to top
            top: (() => {
              const tooltipHeight = 200;
              const margin = 20;
              let above = tooltipPosition.y - tooltipHeight - margin;
              if (above < margin) {
                above = tooltipPosition.y + margin;
              }
              const max = dimensions.height - tooltipHeight - margin;
              return Math.min(above, max);
            })(),
          }}
        >
          {(() => {
            const node = data.find(d => d.id === selectedNode);
            if (!node) return <div className="text-center text-gray-400">Loading...</div>;
            
            return (
              <>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-bold" style={{ color: node.textColor }}>
                    {node.name}
                  </h4>
                  <button 
                    className="text-gray-400 hover:text-white text-xl leading-none transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClick();
                      setSelectedNode(null);
                      selectedNodeRef.current = null;
                    }}
                  >
                    ×
                  </button>
                </div>
                
                <p className="text-gray-300 text-sm mb-3">
                  {node.longDescription || node.description}
                </p>
                
                <h5 className="text-amber-400 font-semibold text-sm mb-2 flex items-center">
                  <span className="mr-2">🎯</span>
                  Key Benefits
                </h5>
                
                <ul className="text-left text-xs text-gray-300 mb-2">
                  {node.benefits?.map((benefit, index) => (
                    <li key={index} className="flex items-start mb-1">
                      <span className="text-amber-400 mr-2">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-center mt-4">
                  <button 
                    className="text-xs bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-semibold py-1.5 px-3 rounded-full transition-all duration-200 shadow-md hover:shadow-lg"
                    onClick={() => {
                      handleClick();
                      setSelectedNode(null);
                      selectedNodeRef.current = null;
                    }}
                  >
                    Close
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Mobile instructions */}
      <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-400 md:hidden animate-fadeIn">
        <p>Tap on any node for details</p>
        <p className="mt-1">Drag to rotate the view</p>
      </div>

      {/* Information panel */}
      <div className="absolute top-2 right-2 z-30">        <button 
          className="w-6 h-6 rounded-full bg-amber-500 text-black flex items-center justify-center text-xs font-bold shadow-md hover:bg-amber-400 transition-colors duration-200"
          onClick={() => {
            handleClick();
            setIsAnimating(false);
            const infoPanel = document.getElementById('stakeholder-info-panel');
            if (infoPanel) {
              infoPanel.classList.toggle('hidden');
            }
          }}
          aria-label="Show information"
        >
          i
        </button>
        
        <div id="stakeholder-info-panel" className="hidden absolute top-8 right-0 w-64 bg-gray-900/90 rounded-lg shadow-xl border border-amber-500/30 p-3 text-xs text-gray-300 animate-fadeInScale">
          <h5 className="text-amber-400 text-sm font-bold mb-2">How to interact:</h5>
          <ul className="space-y-1.5">
            <li className="flex items-start">
              <span className="text-amber-400 mr-1">•</span>
              <span><span className="text-white">Click/tap</span> on nodes to see details</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-1">•</span>
              <span><span className="text-white">Hover</span> over nodes for quick info</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-1">•</span>
              <span><span className="text-white">Move mouse/drag</span> to rotate the view</span>
            </li>
            <li className="flex items-start">
              <span className="text-amber-400 mr-1">•</span>
              <span>Colored lines show stakeholder relationships</span>
            </li>
          </ul>          <button 
            className="mt-2 text-amber-400 hover:text-amber-300 text-xs"            onClick={() => {
              handleClick();
              const infoPanel = document.getElementById('stakeholder-info-panel');
              if (infoPanel) {
                infoPanel.classList.add('hidden');
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default StakeholderTree;
