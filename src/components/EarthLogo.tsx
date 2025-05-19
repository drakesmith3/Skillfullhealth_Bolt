
import { useEffect } from 'react';

const EarthLogo = () => {
  useEffect(() => {
    // Enhanced medical icons data with descriptions and positions
    const medicalItems = [
      { name: 'stethoscope', icon: 'fa-solid fa-stethoscope', description: 'Medical Diagnostics', orbitRadius: 120, orbitSpeed: 120, startPos: 0, color: '#D4AF37' },
      { name: 'syringe', icon: 'fa-solid fa-syringe', description: 'Vaccinations', orbitRadius: 140, orbitSpeed: 180, startPos: 45, color: '#F5F5F5' },
      { name: 'microscope', icon: 'fa-solid fa-microscope', description: 'Laboratory Services', orbitRadius: 130, orbitSpeed: 150, startPos: 90, color: '#D4AF37' },
      { name: 'pills', icon: 'fa-solid fa-pills', description: 'Pharmaceuticals', orbitRadius: 115, orbitSpeed: 140, startPos: 135, color: '#B22222' },
      { name: 'heartbeat', icon: 'fa-solid fa-heartbeat', description: 'Cardiac Care', orbitRadius: 125, orbitSpeed: 160, startPos: 180, color: '#D4AF37' },
      { name: 'hospital', icon: 'fa-solid fa-hospital', description: 'Hospital Staffing', orbitRadius: 110, orbitSpeed: 170, startPos: 225, color: '#F5F5F5' },
      { name: 'user-doctor', icon: 'fa-solid fa-user-doctor', description: 'Physician Placement', orbitRadius: 135, orbitSpeed: 130, startPos: 270, color: '#D4AF37' },
      { name: 'kit-medical', icon: 'fa-solid fa-kit-medical', description: 'Emergency Services', orbitRadius: 145, orbitSpeed: 145, startPos: 315, color: '#B22222' },
      // Additional medical gadgets
      { name: 'brain', icon: 'fa-solid fa-brain', description: 'Neurology', orbitRadius: 150, orbitSpeed: 135, startPos: 20, color: '#D4AF37' },
      { name: 'lungs', icon: 'fa-solid fa-lungs', description: 'Pulmonology', orbitRadius: 110, orbitSpeed: 165, startPos: 65, color: '#F5F5F5' },
      { name: 'tooth', icon: 'fa-solid fa-tooth', description: 'Dental Services', orbitRadius: 125, orbitSpeed: 155, startPos: 110, color: '#D4AF37' },
      { name: 'eye', icon: 'fa-solid fa-eye', description: 'Ophthalmology', orbitRadius: 140, orbitSpeed: 145, startPos: 155, color: '#B22222' },
      { name: 'bone', icon: 'fa-solid fa-bone', description: 'Orthopedics', orbitRadius: 155, orbitSpeed: 175, startPos: 200, color: '#D4AF37' },
      { name: 'dna', icon: 'fa-solid fa-dna', description: 'Genetics', orbitRadius: 130, orbitSpeed: 125, startPos: 245, color: '#F5F5F5' },
      { name: 'virus', icon: 'fa-solid fa-virus', description: 'Virology', orbitRadius: 145, orbitSpeed: 138, startPos: 290, color: '#B22222' },
      { name: 'baby', icon: 'fa-solid fa-baby', description: 'Pediatrics', orbitRadius: 120, orbitSpeed: 148, startPos: 335, color: '#D4AF37' }
    ];
    
    const spaceUniverse = document.getElementById('space-universe');
    if (!spaceUniverse) return;
    
    // Clear any existing items
    const existingItems = spaceUniverse.querySelectorAll('.medical-item');
    existingItems.forEach(item => item.remove());
    
    // Create medical equipment elements
    medicalItems.forEach(item => {
      const medicalElement = document.createElement('div');
      medicalElement.className = 'medical-item';
      medicalElement.setAttribute('data-name', item.name);
      medicalElement.setAttribute('title', item.description);
      
      // Create icon
      const icon = document.createElement('i');
      icon.className = item.icon;
      icon.style.color = item.color; // Apply theme colors
      medicalElement.appendChild(icon);
      
      // Create background circle
      const bgCircle = document.createElement('div');
      bgCircle.className = 'item-bg';
      medicalElement.appendChild(bgCircle);
      
      // Add to space universe
      spaceUniverse.appendChild(medicalElement);
      
      // Animation for orbital motion
      animateMedicalItem(medicalElement, item);
    });
    
    // Add hover effects to medical items
    document.querySelectorAll('.medical-item').forEach(item => {
      item.addEventListener('mouseenter', function(this: HTMLElement) {
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1.2)';
          icon.style.color = '#F9E5A7';
        }
      });
      
      item.addEventListener('mouseleave', function(this: HTMLElement) {
        const icon = this.querySelector('i');
        if (icon) {
          icon.style.transform = 'scale(1)';
          const originalColor = medicalItems.find(mi => mi.name === this.getAttribute('data-name'))?.color || '#D4AF37';
          if (icon) icon.style.color = originalColor;
        }
      });
    });
    
    // Setup favicon
    setupDynamicFavicon();
    
  }, []);

  function animateMedicalItem(element: HTMLElement, itemData: any) {
    const centerX = 150;
    const centerY = 150;
    let angle = itemData.startPos * (Math.PI / 180); // Convert to radians
    
    function moveInOrbit() {
      // Calculate position on the orbit
      const x = centerX + itemData.orbitRadius * Math.cos(angle);
      const y = centerY + itemData.orbitRadius * Math.sin(angle);
      
      // Apply 3D perspective effect
      const scale = 0.7 + 0.3 * Math.sin(angle); // Items appear smaller when "behind" the orbit
      const zIndex = Math.floor(100 + 100 * Math.sin(angle));
      
      // Update position
      element.style.left = `${x - 18}px`; // Adjust for element size
      element.style.top = `${y - 18}px`;
      element.style.transform = `scale(${scale})`;
      element.style.opacity = `${0.4 + 0.6 * scale}`;
      element.style.zIndex = `${zIndex}`;
      
      // Increment angle for movement
      angle += (2 * Math.PI) / (itemData.orbitSpeed * 60); // Adjust speed
      if (angle > 2 * Math.PI) angle -= 2 * Math.PI;
      
      requestAnimationFrame(moveInOrbit);
    }
    
    moveInOrbit();
  }

  function setupDynamicFavicon() {
    // Get the SVG data
    const svgElement = document.getElementById('favicon-svg');
    if (!svgElement) return;
    
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const encodedData = encodeURIComponent(svgData);
    const faviconUrl = `data:image/svg+xml,${encodedData}`;
    
    // Set the favicon
    const links = document.querySelectorAll("link[rel*='icon']");
    links.forEach(link => link.remove());
    
    const faviconLink = document.createElement('link');
    faviconLink.rel = 'icon';
    faviconLink.type = 'image/svg+xml';
    faviconLink.href = faviconUrl;
    document.head.appendChild(faviconLink);
  }

  return (
    <div className="logo-container w-[220px] h-[220px] relative flex-shrink-0 sm:w-[180px] sm:h-[180px] xs:w-[160px] xs:h-[160px]">
      <div id="space-universe" className="space-universe">
        <div className="ring"></div>
        <div className="ring"></div>
        <div className="pulse-circle pulse-1"></div>
        <div className="pulse-circle pulse-2"></div>
        <div className="earth-container">
          <div className="earth"></div>
        </div>
      </div>
      
      {/* SVG for favicon */}
      <svg id="favicon-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="hidden">
        <defs>
          <linearGradient id="earth-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1A1A"/>
            <stop offset="50%" stopColor="#1A1A1A"/>
            <stop offset="100%" stopColor="#1A1A1A"/>
          </linearGradient>
          <linearGradient id="gold-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F9E5A7"/>
            <stop offset="50%" stopColor="#D4AF37"/>
            <stop offset="100%" stopColor="#9E7E2E"/>
          </linearGradient>
        </defs>
        <circle cx="32" cy="32" r="30" fill="url(#earth-gradient)"/>
        <ellipse cx="32" cy="32" rx="30" ry="10" fill="none" stroke="#D4AF37" strokeWidth="0.5" opacity="0.7"/>
        <path d="M15,20 Q32,10 49,20 Q32,35 15,20" fill="#D4AF37" opacity="0.5"/>
        <path d="M15,44 Q32,54 49,44 Q32,29 15,44" fill="#D4AF37" opacity="0.5"/>
        <circle cx="32" cy="32" r="12" fill="none" stroke="#D4AF37" strokeWidth="1" opacity="0.7"/>
        {/* Medical cross */}
        <path d="M24,26 h16 v4 h-6 v6 h-4 v-6 h-6 z" fill="#B22222" opacity="0.9"/>
      </svg>
    </div>
  );
};

export default EarthLogo;
