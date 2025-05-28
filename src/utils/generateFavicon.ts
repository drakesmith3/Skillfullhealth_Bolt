// Utility to generate favicon from Logo3DHyperRealistic component
export const generateFaviconDataURL = (size: number = 32): string => {
  // Create a canvas element
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return '';
  
  canvas.width = size;
  canvas.height = size;
  
  // Set background to transparent
  ctx.clearRect(0, 0, size, size);
  
  // Draw sun at center
  const centerX = size / 2;
  const centerY = size / 2;
  const sunRadius = size * 0.15;
  
  // Sun gradient
  const sunGradient = ctx.createRadialGradient(
    centerX - sunRadius * 0.3, 
    centerY - sunRadius * 0.3, 
    0,
    centerX, 
    centerY, 
    sunRadius
  );
  sunGradient.addColorStop(0, '#ffffff');
  sunGradient.addColorStop(0.15, '#fff9e6');
  sunGradient.addColorStop(0.35, '#ffeb3b');
  sunGradient.addColorStop(0.6, '#ff9800');
  sunGradient.addColorStop(0.8, '#ff5722');
  sunGradient.addColorStop(1, '#d84315');
  
  // Draw sun
  ctx.fillStyle = sunGradient;
  ctx.beginPath();
  ctx.arc(centerX, centerY, sunRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw earth
  const earthRadius = size * 0.08;
  const earthDistance = size * 0.25;
  const earthX = centerX + earthDistance;
  const earthY = centerY;
  
  // Earth ocean gradient
  const earthGradient = ctx.createRadialGradient(
    earthX - earthRadius * 0.4,
    earthY - earthRadius * 0.3,
    0,
    earthX,
    earthY,
    earthRadius
  );
  earthGradient.addColorStop(0, '#87ceeb');
  earthGradient.addColorStop(0.3, '#4682b4');
  earthGradient.addColorStop(0.6, '#1e90ff');
  earthGradient.addColorStop(1, '#000080');
  
  // Draw earth base
  ctx.fillStyle = earthGradient;
  ctx.beginPath();
  ctx.arc(earthX, earthY, earthRadius, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw simple continent shapes
  ctx.fillStyle = '#228b22';
  ctx.beginPath();
  // Africa/Europe simplified
  ctx.ellipse(earthX - earthRadius * 0.2, earthY - earthRadius * 0.3, earthRadius * 0.3, earthRadius * 0.5, 0, 0, 2 * Math.PI);
  ctx.fill();
  
  // Draw small medical icons around the logo
  const iconPositions = [
    { x: centerX - size * 0.35, y: centerY - size * 0.1, color: '#DC2626' }, // RED
    { x: centerX + size * 0.1, y: centerY - size * 0.35, color: '#F59E0B' }, // GOLD
    { x: centerX + size * 0.35, y: centerY + size * 0.1, color: '#000000' }, // BLACK
    { x: centerX - size * 0.1, y: centerY + size * 0.35, color: '#FAFAFA' }  // OFF-WHITE
  ];
  
  iconPositions.forEach((pos, index) => {
    const iconSize = size * 0.06;
    ctx.fillStyle = pos.color;
    ctx.fillRect(pos.x - iconSize/2, pos.y - iconSize/2, iconSize, iconSize);
    
    // Add white cross/medical symbol
    ctx.fillStyle = pos.color === '#000000' ? '#FAFAFA' : '#FFFFFF';
    const crossSize = iconSize * 0.6;
    const crossThickness = crossSize * 0.2;
    
    // Horizontal bar
    ctx.fillRect(
      pos.x - crossSize/2, 
      pos.y - crossThickness/2, 
      crossSize, 
      crossThickness
    );
    
    // Vertical bar
    ctx.fillRect(
      pos.x - crossThickness/2, 
      pos.y - crossSize/2, 
      crossThickness, 
      crossSize
    );
  });
  
  return canvas.toDataURL('image/png');
};

export const updateFavicon = () => {
  const faviconDataURL = generateFaviconDataURL(32);
  
  // Remove existing favicon
  const existingFavicon = document.querySelector('link[rel="icon"]') || 
                         document.querySelector('link[rel="shortcut icon"]');
  if (existingFavicon) {
    existingFavicon.remove();
  }
  
  // Create new favicon
  const favicon = document.createElement('link');
  favicon.rel = 'icon';
  favicon.type = 'image/png';
  favicon.href = faviconDataURL;
  
  document.head.appendChild(favicon);
};
