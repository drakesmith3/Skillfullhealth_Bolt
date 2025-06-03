<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ethereal Butterfly - Optimized Premium Experience</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 25%, #16213e 50%, #0f4c75 100%);
            overflow: hidden;
            height: 100vh;
            color: white;
            position: relative;
        }

        .main-container {
            position: relative;
            width: 100vw;
            height: 100vh;
            overflow: hidden;
        }

        .particle-canvas {
            position: absolute;
            top: 0;
            left: 0;
            z-index: 1;
            will-change: transform;
        }

        .ui-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100;
            pointer-events: none;
        }

        .nav-bar {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 2rem 4rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.05);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            pointer-events: all;
        }

        .logo {
            font-size: 1.5rem;
            font-weight: 700;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            list-style: none;
        }

        .nav-links li {
            position: relative;
        }

        .nav-links a {
            color: rgba(255, 255, 255, 0.8);
            text-decoration: none;
            font-weight: 400;
            transition: all 0.3s ease;
            position: relative;
            padding: 0.5rem 1rem;
        }

        .nav-links a:hover {
            color: #ffd700;
        }

        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            width: 0;
            height: 2px;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            transition: all 0.3s ease;
            transform: translateX(-50%);
        }

        .nav-links a:hover::after {
            width: 80%;
        }

        .hero-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            z-index: 50;
            max-width: 800px;
            padding: 2rem;
        }

        .hero-title {
            font-size: clamp(3rem, 8vw, 6rem);
            font-weight: 700;
            margin-bottom: 1.5rem;
            background: linear-gradient(45deg, #ffd700, #ffed4e, #ffd700);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            background-size: 200% 200%;
            animation: gradientShift 3s ease-in-out infinite;
            line-height: 1.1;
        }

        .hero-subtitle {
            font-size: 1.25rem;
            font-weight: 300;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 2rem;
            line-height: 1.6;
        }

        .cta-button {
            display: inline-block;
            padding: 1rem 2.5rem;
            background: linear-gradient(45deg, #ffd700, #ffed4e);
            color: #000;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
            pointer-events: all;
            position: relative;
            overflow: hidden;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transition: left 0.5s ease;
        }

        .cta-button:hover::before {
            left: 100%;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 40px rgba(255, 215, 0, 0.4);
        }

        .floating-elements {
            position: absolute;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 10;
        }

        .floating-element {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 215, 0, 0.6);
            border-radius: 50%;
            pointer-events: none;
            will-change: transform;
        }

        .progress-indicator {
            position: absolute;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            align-items: center;
            gap: 1rem;
            color: rgba(255, 255, 255, 0.6);
            font-size: 0.9rem;
            font-weight: 300;
        }

        .progress-bar {
            width: 200px;
            height: 2px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 1px;
            overflow: hidden;
        }

        .progress-fill {
            height: 100%;
            background: linear-gradient(90deg, #ffd700, #ffed4e);
            width: 0%;
            transition: width 0.1s ease;
        }

        .stats-panel {
            position: absolute;
            top: 50%;
            right: 2rem;
            transform: translateY(-50%);
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(20px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            padding: 2rem;
            min-width: 200px;
        }

        .stat-item {
            margin-bottom: 1.5rem;
            text-align: center;
        }

        .stat-number {
            display: block;
            font-size: 2rem;
            font-weight: 700;
            color: #ffd700;
            margin-bottom: 0.5rem;
        }

        .stat-label {
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
            font-weight: 300;
        }

        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: #0a0a0a;
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }

        .loading-text {
            font-size: 1.2rem;
            color: #ffd700;
            margin-top: 2rem;
            font-weight: 300;
        }

        .spinner {
            width: 60px;
            height: 60px;
            border: 3px solid rgba(255, 215, 0, 0.2);
            border-top: 3px solid #ffd700;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
            .nav-bar {
                padding: 1rem 2rem;
            }
            
            .nav-links {
                display: none;
            }
            
            .hero-content {
                padding: 1rem;
            }
            
            .stats-panel {
                display: none;
            }
        }
    </style>
</head>
<body>
    <div class="loading-overlay" id="loadingOverlay">
        <div class="spinner"></div>
        <div class="loading-text">Crafting your experience...</div>
    </div>

    <div class="main-container">
        <svg class="particle-canvas" id="particleCanvas"></svg>
        
        <div class="floating-elements" id="floatingElements"></div>

        <div class="ui-overlay">
            <nav class="nav-bar">
                <div class="logo">ETHEREAL</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#experience">Experience</a></li>
                    <li><a href="#gallery">Gallery</a></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
            </nav>

            <div class="hero-content">
                <h1 class="hero-title">Ethereal Beauty</h1>
                <p class="hero-subtitle">
                    Witness the metamorphosis of a thousand golden particles 
                    converging into pure digital artistry
                </p>
                <a href="#explore" class="cta-button">Experience the Magic</a>
            </div>

            <div class="stats-panel">
                <div class="stat-item">
                    <span class="stat-number" id="particleCount">0</span>
                    <span class="stat-label">Active Particles</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="formationProgress">0%</span>
                    <span class="stat-label">Formation</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="animationSpeed">60</span>
                    <span class="stat-label">FPS</span>
                </div>
            </div>

            <div class="progress-indicator">
                <span>Formation Progress</span>
                <div class="progress-bar">
                    <div class="progress-fill" id="progressFill"></div>
                </div>
            </div>
        </div>
    </div>

    <script>
        class OptimizedParticleSystem {
            constructor() {
                this.svg = document.getElementById('particleCanvas');
                this.particles = [];
                this.butterflyPoints = [];
                this.isFormed = false;
                this.formationProgress = 0;
                this.frameCount = 0;
                this.lastTime = 0;
                this.fps = 60;
                this.animationFrame = null;
                this.mouseX = 0;
                this.mouseY = 0;
                this.isMouseMoving = false;
                
                this.init();
            }

            init() {
                this.setupCanvas();
                this.generateButterflyShape();
                this.createParticleSystem();
                this.createFloatingElements();
                this.startAnimation();
                this.setupEventListeners();
                
                // Hide loading overlay with smooth transition
                setTimeout(() => {
                    gsap.to('#loadingOverlay', {
                        opacity: 0,
                        scale: 0.95,
                        duration: 1.5,
                        ease: "power3.out",
                        onComplete: () => {
                            document.getElementById('loadingOverlay').style.display = 'none';
                        }
                    });
                }, 1000);
            }

            setupCanvas() {
                this.svg.setAttribute('width', window.innerWidth);
                this.svg.setAttribute('height', window.innerHeight);
                this.svg.setAttribute('viewBox', `0 0 ${window.innerWidth} ${window.innerHeight}`);
            }

            generateButterflyShape() {
                const centerX = window.innerWidth / 2;
                const centerY = window.innerHeight / 2 - 50;
                const scale = Math.min(window.innerWidth, window.innerHeight) / 800;

                // Generate butterfly body with optimized points
                for (let i = 0; i < 20; i++) {
                    const progress = i / 19;
                    const y = centerY + (progress - 0.5) * 100 * scale;
                    const thickness = Math.sin(progress * Math.PI) * 2.5;
                    
                    for (let j = 0; j < 2; j++) {
                        this.butterflyPoints.push({
                            x: centerX + (j - 0.5) * thickness,
                            y: y,
                            type: 'body',
                            color: '#8B4513'
                        });
                    }
                }

                // Generate wings with optimized density
                this.generateWing(centerX, centerY, scale, true);  // Left wing
                this.generateWing(centerX, centerY, scale, false); // Right wing

                // Generate antennae
                for (let side = -1; side <= 1; side += 2) {
                    for (let i = 0; i < 10; i++) {
                        const progress = i / 9;
                        const curve = Math.sin(progress * Math.PI * 0.5);
                        this.butterflyPoints.push({
                            x: centerX + side * (12 + progress * 20) * scale,
                            y: centerY - 60 * scale - progress * 18 * scale + curve * 8 * scale,
                            type: 'antenna',
                            color: '#4A4A4A'
                        });
                    }
                }
            }

            generateWing(centerX, centerY, scale, isLeft) {
                const side = isLeft ? -1 : 1;
                const wingPoints = [];

                // Optimized upper wing with fewer points
                for (let angle = 0; angle < Math.PI; angle += 0.08) {
                    for (let radius = 20; radius <= 70; radius += 8) {
                        const wingRadius = radius + 15 * Math.sin(angle * 3);
                        const x = centerX + side * wingRadius * Math.cos(angle) * scale;
                        const y = centerY - 40 * scale + wingRadius * Math.sin(angle) * 0.7 * scale;
                        
                        wingPoints.push({
                            x: x,
                            y: y,
                            type: 'upperWing',
                            color: this.getWingColor(x, y, centerX, centerY)
                        });
                    }
                }

                // Optimized lower wing with fewer points
                for (let angle = 0; angle < Math.PI * 0.7; angle += 0.1) {
                    for (let radius = 15; radius <= 45; radius += 8) {
                        const wingRadius = radius + 8 * Math.sin(angle * 2);
                        const x = centerX + side * wingRadius * Math.cos(angle) * scale;
                        const y = centerY + 15 * scale + wingRadius * Math.sin(angle) * 0.9 * scale;
                        
                        wingPoints.push({
                            x: x,
                            y: y,
                            type: 'lowerWing',
                            color: this.getWingColor(x, y, centerX, centerY)
                        });
                    }
                }

                this.butterflyPoints.push(...wingPoints);
            }

            getWingColor(x, y, centerX, centerY) {
                // Create polka dot pattern
                const dotSize = 25;
                const gridX = Math.floor((x - centerX + 200) / dotSize);
                const gridY = Math.floor((y - centerY + 200) / dotSize);
                const dotCenterX = centerX - 200 + gridX * dotSize + dotSize / 2;
                const dotCenterY = centerY - 200 + gridY * dotSize + dotSize / 2;
                const distToDot = Math.sqrt((x - dotCenterX) ** 2 + (y - dotCenterY) ** 2);
                
                if (distToDot < 7) {
                    return (gridX + gridY) % 3 === 0 ? '#DC143C' : '#000000';
                }
                
                return '#FFD700';
            }

            createParticleSystem() {
                // Pre-calculate all positions for better performance
                const positions = this.butterflyPoints.map(() => this.getEdgePosition());
                
                this.butterflyPoints.forEach((point, index) => {
                    // Create optimized SVG circle element
                    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                    const radius = Math.random() * 1.5 + 1.2;
                    
                    circle.setAttribute('r', radius);
                    circle.setAttribute('fill', point.color);
                    circle.setAttribute('opacity', 0.4);
                    circle.setAttribute('vector-effect', 'non-scaling-stroke');
                    this.svg.appendChild(circle);

                    const particle = {
                        element: circle,
                        startX: positions[index].x,
                        startY: positions[index].y,
                        targetX: point.x,
                        targetY: point.y,
                        progress: 0,
                        speed: 0.015 + Math.random() * 0.02,
                        type: point.type,
                        formed: false,
                        radius: radius,
                        originalColor: point.color,
                        floatPhase: Math.random() * Math.PI * 2,
                        floatSpeed: 0.5 + Math.random() * 0.5,
                        floatAmplitude: point.type === 'body' ? 1.5 : 3,
                        mouseOffsetX: 0,
                        mouseOffsetY: 0
                    };

                    // Set initial position
                    gsap.set(circle, {
                        attr: { cx: particle.startX, cy: particle.startY },
                        scale: 0.5,
                        opacity: 0.2
                    });

                    this.particles.push(particle);
                });

                // Start formation animation
                this.animateFormation();
            }

            getEdgePosition() {
                const side = Math.floor(Math.random() * 4);
                const padding = 100;
                
                switch(side) {
                    case 0: // Top
                        return { x: Math.random() * window.innerWidth, y: -padding };
                    case 1: // Right
                        return { x: window.innerWidth + padding, y: Math.random() * window.innerHeight };
                    case 2: // Bottom
                        return { x: Math.random() * window.innerWidth, y: window.innerHeight + padding };
                    case 3: // Left
                        return { x: -padding, y: Math.random() * window.innerHeight };
                }
            }

            animateFormation() {
                // Use GSAP's batch animation for better performance
                gsap.set(this.particles, { progress: 0 });
                
                // Create staggered formation with smooth easing
                const tl = gsap.timeline({ 
                    onComplete: () => {
                        this.isFormed = true;
                    }
                });

                // Animate particles in batches for smoother performance
                const batchSize = 60;
                for (let i = 0; i < this.particles.length; i += batchSize) {
                    const batch = this.particles.slice(i, i + batchSize);
                    
                    tl.to(batch, {
                        progress: 1,
                        duration: 2.5,
                        ease: "power3.out",
                        stagger: {
                            amount: 1.2,
                            from: "random",
                            ease: "power2.out"
                        },
                        onUpdate: () => {
                            batch.forEach(particle => {
                                if (particle.progress > 0) {
                                    this.updateParticlePosition(particle);
                                }
                            });
                        }
                    }, i === 0 ? 0 : "-=2.0");
                }

                // Smooth formation progress update
                tl.to(this, {
                    formationProgress: 1,
                    duration: 3.5,
                    ease: "power2.out",
                    onUpdate: () => {
                        this.updateStats();
                    }
                }, 0);
            }

            updateParticlePosition(particle) {
                // Use advanced easing with momentum
                const easeProgress = this.easeOutExpo(particle.progress);
                
                const currentX = particle.startX + (particle.targetX - particle.startX) * easeProgress;
                const currentY = particle.startY + (particle.targetY - particle.startY) * easeProgress;
                
                // Apply subtle curve to the path
                const pathCurve = Math.sin(particle.progress * Math.PI) * 15;
                const curveX = currentX + pathCurve * Math.cos(particle.progress * Math.PI * 2);
                const curveY = currentY + pathCurve * 0.5 * Math.sin(particle.progress * Math.PI * 3);
                
                // Use transform for better performance
                gsap.set(particle.element, {
                    attr: { cx: curveX, cy: curveY },
                    scale: 0.8 + (particle.progress * 0.4),
                    opacity: 0.4 + (particle.progress * 0.5)
                });
                
                // Mark as formed when close to target
                if (particle.progress > 0.95 && !particle.formed) {
                    particle.formed = true;
                }
            }

            easeOutExpo(t) {
                return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
            }

            updateFloating() {
                const time = Date.now() / 1000;
                
                this.particles.forEach(particle => {
                    if (!particle.formed) return;
                    
                    // Apply floating effect
                    const offsetX = Math.sin(time * particle.floatSpeed + particle.floatPhase) * particle.floatAmplitude;
                    const offsetY = Math.cos(time * particle.floatSpeed + particle.floatPhase) * particle.floatAmplitude * 0.6;
                    
                    // Apply mouse interaction offset
                    const totalX = particle.targetX + offsetX + particle.mouseOffsetX;
                    const totalY = particle.targetY + offsetY + particle.mouseOffsetY;
                    
                    particle.element.setAttribute('cx', totalX);
                    particle.element.setAttribute('cy', totalY);
                    
                    // Apply decay to mouse offset
                    particle.mouseOffsetX *= 0.9;
                    particle.mouseOffsetY *= 0.9;
                });
            }

            createFloatingElements() {
                const container = document.getElementById('floatingElements');
                
                for (let i = 0; i < 40; i++) {
                    const element = document.createElement('div');
                    element.className = 'floating-element';
                    element.style.left = Math.random() * window.innerWidth + 'px';
                    element.style.top = Math.random() * window.innerHeight + 'px';
                    container.appendChild(element);

                    // Animate floating elements
                    gsap.to(element, {
                        x: (Math.random() - 0.5) * 150,
                        y: (Math.random() - 0.5) * 150,
                        duration: 12 + Math.random() * 8,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut"
                    });

                    gsap.to(element, {
                        opacity: Math.random() * 0.5 + 0.3,
                        duration: 3 + Math.random() * 4,
                        repeat: -1,
                        yoyo: true
                    });
                }
            }

            updateStats() {
                const formedParticles = this.particles.filter(p => p.formed).length;
                const progress = Math.round(this.formationProgress * 100);
                
                document.getElementById('particleCount').textContent = formedParticles;
                document.getElementById('formationProgress').textContent = progress + '%';
                document.getElementById('progressFill').style.width = progress + '%';
            }

            calculateFPS() {
                const now = performance.now();
                if (this.lastTime) {
                    this.fps = Math.round(1000 / (now - this.lastTime));
                    document.getElementById('animationSpeed').textContent = this.fps;
                }
                this.lastTime = now;
            }

            startAnimation() {
                const animate = () => {
                    this.frameCount++;
                    if (this.frameCount % 10 === 0) {
                        this.calculateFPS();
                    }
                    
                    if (this.isFormed) {
                        this.updateFloating();
                    }
                    
                    this.animationFrame = requestAnimationFrame(animate);
                };
                animate();
            }

            setupEventListeners() {
                // Throttled resize handler
                let resizeTimeout;
                window.addEventListener('resize', () => {
                    clearTimeout(resizeTimeout);
                    resizeTimeout = setTimeout(() => {
                        this.setupCanvas();
                    }, 100);
                });

                // Mouse move interaction
                this.svg.addEventListener('mousemove', (e) => {
                    const rect = this.svg.getBoundingClientRect();
                    this.mouseX = e.clientX - rect.left;
                    this.mouseY = e.clientY - rect.top;
                    this.isMouseMoving = true;
                    
                    if (this.isFormed) {
                        this.handleMouseInteraction();
                    }
                });

                // Click interaction
                this.svg.addEventListener('click', (e) => {
                    if (!this.isFormed) return;
                    
                    const rect = this.svg.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const clickY = e.clientY - rect.top;
                    
                    // Create ripple effect
                    this.createRippleEffect(clickX, clickY);
                });
            }

            handleMouseInteraction() {
                this.particles.forEach(particle => {
                    if (!particle.formed) return;
                    
                    const dx = this.mouseX - particle.targetX;
                    const dy = this.mouseY - particle.targetY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 120) {
                        const force = Math.max(0, (120 - distance) / 120);
                        particle.mouseOffsetX = -dx * force * 15;
                        particle.mouseOffsetY = -dy * force * 15;
                        
                        // Enhanced glow effect on interaction
                        gsap.to(particle.element, {
                            attr: { opacity: 1 },
                            duration: 0.3,
                            ease: "power2.out",
                            yoyo: true,
                            repeat: 1
                        });
                    }
                });
            }

            createRippleEffect(x, y) {
                // Create SVG ripple circle
                const ripple = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
                ripple.setAttribute('cx', x);
                ripple.setAttribute('cy', y);
                ripple.setAttribute('r', 0);
                ripple.setAttribute('fill', 'none');
                ripple.setAttribute('stroke', '#FFD700');
                ripple.setAttribute('stroke-width', 2);
                ripple.setAttribute('opacity', 0.8);
                ripple.setAttribute('vector-effect', 'non-scaling-stroke');
                
                this.svg.appendChild(ripple);
                
                // Animate ripple
                gsap.to(ripple, {
                    attr: { r: 100 },
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    onComplete: () => {
                        this.svg.removeChild(ripple);
                    }
                });
                
                // Affect nearby particles
                this.particles.forEach(particle => {
                    if (particle.formed) {
                        const dx = x - particle.targetX;
                        const dy = y - particle.targetY;
                        const distance = Math.sqrt(dx * dx + dy * dy);
                        
                        if (distance < 100) {
                            const force = (100 - distance) / 100;
                            particle.mouseOffsetX = -dx * force * 20;
                            particle.mouseOffsetY = -dy * force * 20;
                            
                            gsap.to(particle.element, {
                                attr: { opacity: 1 },
                                scale: 1 + force * 0.5,
                                duration: 0.8,
                                ease: "elastic.out(1, 0.5)",
                                yoyo: true,
                                repeat: 1
                            });
                        }
                    }
                });
            }
        }

        // Initialize the system when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            const particleSystem = new OptimizedParticleSystem();
            
            // Clean up on unmount
            window.addEventListener('beforeunload', () => {
                if (particleSystem.animationFrame) {
                    cancelAnimationFrame(particleSystem.animationFrame);
                }
            });
        });

        // Add smooth scrolling and navigation interactions
        gsap.registerPlugin();

        // Enhanced UI animations with staggered reveals
        gsap.timeline({ delay: 1.5 })
            .from('.nav-bar', { 
                y: -100, 
                opacity: 0, 
                duration: 1.2, 
                ease: "power3.out"
            })
            .from('.hero-title', { 
                y: 80, 
                opacity: 0, 
                scale: 0.8,
                duration: 1.5, 
                ease: "power3.out"
            }, "-=0.8")
            .from('.hero-subtitle', { 
                y: 50, 
                opacity: 0, 
                duration: 1.2, 
                ease: "power2.out" 
            }, "-=1")
            .from('.cta-button', { 
                y: 40, 
                opacity: 0, 
                scale: 0.9,
                duration: 1, 
                ease: "back.out(1.7)" 
            }, "-=0.8")
            .from('.stats-panel', { 
                x: 120, 
                opacity: 0, 
                duration: 1.2, 
                ease: "power3.out" 
            }, "-=1")
            .from('.progress-indicator', { 
                y: 60, 
                opacity: 0, 
                duration: 1, 
                ease: "power2.out" 
            }, "-=0.8");

        // Add continuous subtle animations
        gsap.to('.hero-title', {
            backgroundPosition: '200% center',
            duration: 4,
            ease: "none",
            repeat: -1
        });

        // Enhanced button hover effects
        document.querySelector('.cta-button').addEventListener('mouseenter', function() {
            gsap.to(this, {
                scale: 1.05,
                y: -3,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        document.querySelector('.cta-button').addEventListener('mouseleave', function() {
            gsap.to(this, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        // Smooth navigation link interactions
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('mouseenter', function() {
                gsap.to(this, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });

            link.addEventListener('mouseleave', function() {
                gsap.to(this, {
                    scale: 1,
                    duration: 0.2,
                    ease: "power2.out"
                });
            });
        });
    </script>
</body>
</html>


import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface ButterflyProps {
  sectionIndex: number;
  totalSections: number;
  isActive: boolean;
}

// Enhanced 3D Hyperrealistic Butterfly SVG with vertical wing orientation and multicolored design
const ButterflySVG = ({ className = "", style = {} }) => (
  <svg
    width="50"
    height="80"
    viewBox="0 0 100 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    style={style}
  ><defs>
      {/* Gold & Black gradients with red sashes */}
      <radialGradient id="upperWingGradient" cx="0.3" cy="0.2" r="0.8">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="30%" stopColor="#F4C430"/>
        <stop offset="60%" stopColor="#FFA500"/>
        <stop offset="85%" stopColor="#000000"/>
        <stop offset="100%" stopColor="#1C1C1C"/>
      </radialGradient>
      
      <radialGradient id="lowerWingGradient" cx="0.4" cy="0.3" r="0.7">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="25%" stopColor="#DAA520"/>
        <stop offset="50%" stopColor="#B8860B"/>
        <stop offset="75%" stopColor="#000000"/>
        <stop offset="100%" stopColor="#2F2F2F"/>
      </radialGradient>
      
      <linearGradient id="redSashGradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FF0000"/>
        <stop offset="50%" stopColor="#DC143C"/>
        <stop offset="100%" stopColor="#8B0000"/>
      </linearGradient>
      
      <linearGradient id="bodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#FFD700"/>
        <stop offset="50%" stopColor="#000000"/>
        <stop offset="100%" stopColor="#1C1C1C"/>
      </linearGradient>
      
      {/* Wing shadows and 3D effects */}
      <filter id="wingShadow" x="-50%" y="-50%" width="200%" height="200%">
        <feMorphology operator="dilate" radius="1"/>
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="highlight" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
        <feComponentTransfer>
          <feFuncA type="discrete" tableValues="0 0.3 0.6 1"/>
        </feComponentTransfer>
      </filter>
    </defs>

    {/* Left Wings Group */}
    <g className="left-wings">      {/* Upper Left Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q -25,-40 -35,-70 Q -30,-75 -20,-72 Q -15,-68 -10,-60 Q -5,-45 0,0 Z"
          fill="url(#upperWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.95"
        />
        {/* Red sash at outer edge */}
        <path
          d="M -30,-65 Q -25,-68 -20,-65 Q -25,-60 -30,-65"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M -32,-55 Q -27,-58 -22,-55 Q -27,-50 -32,-55"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q -15,-25 -25,-50" stroke="#FFD700" strokeWidth="0.8" opacity="0.8"/>
        <path d="M 0,0 Q -10,-20 -20,-45" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q -5,-15 -15,-35" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black accent spots */}
        <circle cx="-15" cy="-30" r="2" fill="#000000" opacity="0.7"/>
        <circle cx="-20" cy="-50" r="1.5" fill="#1C1C1C" opacity="0.6"/>
      </g>      {/* Lower Left Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q -20,25 -30,55 Q -25,60 -15,57 Q -10,53 -5,45 Q -2,25 0,0 Z"
          fill="url(#lowerWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Red sash at outer edge */}
        <path
          d="M -25,50 Q -20,53 -15,50 Q -20,45 -25,50"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M -27,40 Q -22,43 -17,40 Q -22,35 -27,40"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q -12,15 -22,35" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q -8,12 -18,30" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black eye spot with gold center */}
        <circle cx="-18" cy="35" r="4" fill="#000000" opacity="0.8"/>
        <circle cx="-18" cy="35" r="2.5" fill="#FFD700" opacity="0.9"/>
        <circle cx="-17" cy="34" r="1" fill="#000000" opacity="0.8"/>
      </g>    </g>

    {/* Right Wings Group */}
    <g className="right-wings">
      {/* Upper Right Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q 25,-40 35,-70 Q 30,-75 20,-72 Q 15,-68 10,-60 Q 5,-45 0,0 Z"
          fill="url(#upperWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.95"
        />
        {/* Red sash at outer edge */}
        <path
          d="M 30,-65 Q 25,-68 20,-65 Q 25,-60 30,-65"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M 32,-55 Q 27,-58 22,-55 Q 27,-50 32,-55"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q 15,-25 25,-50" stroke="#FFD700" strokeWidth="0.8" opacity="0.8"/>
        <path d="M 0,0 Q 10,-20 20,-45" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q 5,-15 15,-35" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black accent spots */}
        <circle cx="15" cy="-30" r="2" fill="#000000" opacity="0.7"/>
        <circle cx="20" cy="-50" r="1.5" fill="#1C1C1C" opacity="0.6"/>
      </g>      {/* Lower Right Wing - Gold & black with red sash */}
      <g filter="url(#wingShadow)" transform="translate(50,80)">
        <path
          d="M 0,0 Q 20,25 30,55 Q 25,60 15,57 Q 10,53 5,45 Q 2,25 0,0 Z"
          fill="url(#lowerWingGradient)"
          stroke="#000000"
          strokeWidth="2"
          opacity="0.9"
        />
        {/* Red sash at outer edge */}
        <path
          d="M 25,50 Q 20,53 15,50 Q 20,45 25,50"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.9"
        />
        <path
          d="M 27,40 Q 22,43 17,40 Q 22,35 27,40"
          fill="url(#redSashGradient)"
          stroke="#8B0000"
          strokeWidth="1"
          opacity="0.8"
        />
        {/* Gold wing veins */}
        <path d="M 0,0 Q 12,15 22,35" stroke="#FFD700" strokeWidth="0.6" opacity="0.7"/>
        <path d="M 0,0 Q 8,12 18,30" stroke="#B8860B" strokeWidth="0.4" opacity="0.6"/>
        {/* Black eye spot with gold center */}
        <circle cx="18" cy="35" r="4" fill="#000000" opacity="0.8"/>
        <circle cx="18" cy="35" r="2.5" fill="#FFD700" opacity="0.9"/>        <circle cx="17" cy="34" r="1" fill="#000000" opacity="0.8"/>
      </g>
    </g>

    {/* Body - Enhanced 3D effect with gold & black styling */}
    <g transform="translate(50,20)">
      <ellipse cx="0" cy="30" rx="3" ry="45" fill="url(#bodyGradient)" stroke="#000000" strokeWidth="1"/>
      <ellipse cx="0" cy="25" rx="2" ry="8" fill="#FFD700" opacity="0.8"/> {/* Thorax */}
      <circle cx="0" cy="15" r="3" fill="#000000" stroke="#FFD700" strokeWidth="0.5"/> {/* Head */}
      
      {/* Antennae */}
      <path d="M -1,12 Q -3,8 -2,5" stroke="#000000" strokeWidth="0.8" strokeLinecap="round"/>
      <path d="M 1,12 Q 3,8 2,5" stroke="#000000" strokeWidth="0.8" strokeLinecap="round"/>
      <circle cx="-2" cy="5" r="0.5" fill="#FFD700"/>
      <circle cx="2" cy="5" r="0.5" fill="#FFD700"/>
      
      {/* Body segments */}
      <path d="M 0,20 L 0,65" stroke="#FFD700" strokeWidth="0.3" opacity="0.8"/>
      <circle cx="0" cy="25" r="0.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="0" cy="35" r="0.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="0" cy="45" r="0.5" fill="#FFD700" opacity="0.9"/>
      <circle cx="0" cy="55" r="0.5" fill="#FFD700" opacity="0.9"/>
    </g>
  </svg>
);

const Butterfly: React.FC<ButterflyProps> = ({ sectionIndex, totalSections, isActive }) => {
  const butterflyRef = useRef<HTMLDivElement>(null);
  const leftWingRef = useRef<SVGGElement>(null);
  const rightWingRef = useRef<SVGGElement>(null);
  
  useEffect(() => {
    if (!butterflyRef.current) return;
    
    // Enhanced wing flutter animation
    const animateWings = () => {
      if (leftWingRef.current && rightWingRef.current) {
        gsap.to([leftWingRef.current, rightWingRef.current], {
          rotationY: 15,
          duration: 0.2,
          ease: "power2.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.05
        });
      }
    };
    
    // Start wing animation
    animateWings();
    
    // Define horizontal storytelling motion path for the butterfly
    let path;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    if (sectionIndex === 0) {
      // Start position - top center of first section
      path = [{ x: windowWidth / 2 - 60, y: 80 }];
    } else if (sectionIndex === totalSections - 1) {
      // Final position - gracefully settle in the bottom right
      path = [
        { x: windowWidth / 2 - 60, y: 80 },
        { x: windowWidth * 0.6, y: windowHeight * 0.3 },
        { x: windowWidth * 0.75, y: windowHeight * 0.5 },
        { x: windowWidth - 140, y: windowHeight - 120 }
      ];
    } else {
      // Horizontal storytelling path - butterfly moves across the story
      const progress = sectionIndex / (totalSections - 1);
      
      // Create a flowing horizontal path that follows the story progression
      path = [
        { x: windowWidth / 2 - 60, y: 80 },
        { x: windowWidth * (0.2 + 0.6 * progress), y: 120 + 40 * Math.sin(sectionIndex * 1.5) },
        { x: windowWidth * (0.3 + 0.5 * progress), y: 160 + 60 * Math.cos(sectionIndex * 1.2) },
        { x: windowWidth * (0.4 + 0.4 * progress), y: 100 + 30 * Math.sin(sectionIndex * 2) }
      ];
    }

    // Animate butterfly with storytelling awareness
    gsap.to(butterflyRef.current, {
      motionPath: {
        path,
        autoRotate: true,
        curviness: 2
      },
      opacity: isActive ? 1 : 0.8,
      scale: isActive ? 1.1 : 0.9,
      duration: 1.8,
      ease: 'power2.inOut',
      // Add a slight bounce when transitioning between story sections
      yoyo: sectionIndex > 0 && sectionIndex < totalSections - 1,
      repeat: sectionIndex > 0 && sectionIndex < totalSections - 1 ? 1 : 0,
    });
  }, [sectionIndex, totalSections, isActive]);
  return (
    <div
      ref={butterflyRef}
      style={{ position: 'fixed', top: 0, left: 0, zIndex: 120, pointerEvents: 'none' }}
      aria-label="GLOHSEN Mascot Butterfly"
    >
      <ButterflySVG />
    </div>
  );
};

export default Butterfly;
