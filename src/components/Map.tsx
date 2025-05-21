
import React, { useEffect, useRef, useState } from 'react';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState('');

  useEffect(() => {
    // Check if mapbox script is already loaded
    const existingScript = document.getElementById('mapbox-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'mapbox-script';
      script.src = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.js';
      script.async = true;
      script.onload = () => setMapLoaded(true);
      document.body.appendChild(script);

      // Add CSS
      const link = document.createElement('link');
      link.href = 'https://api.mapbox.com/mapbox-gl-js/v2.14.1/mapbox-gl.css';
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    } else {
      setMapLoaded(true);
    }

    return () => {
      // Clean up is not needed for the script as it should remain for the app
    };
  }, []);

  useEffect(() => {
    if (!mapLoaded || !mapRef.current || !mapboxToken) return;
    
    // Initialize map using window.mapboxgl which is available after script loads
    const mapboxgl = (window as any).mapboxgl;
    mapboxgl.accessToken = mapboxToken;
    
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [3.379, 6.5244], // Lagos, Nigeria coordinates
      zoom: 13
    });

    // Add navigation control
    map.addControl(new mapboxgl.NavigationControl());
    
    // Add marker for office location
    const marker = new mapboxgl.Marker({ color: '#ea384c' })
      .setLngLat([3.379, 6.5244])
      .setPopup(
        new mapboxgl.Popup().setHTML('<h3>GLOHSEN Healthcare</h3><p>123 Medical Drive, Lagos, Nigeria</p>')
      )
      .addTo(map);
    
    return () => {
      map.remove();
    };
  }, [mapLoaded, mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const token = formData.get('mapboxToken') as string;
    setMapboxToken(token);
    localStorage.setItem('mapbox_token', token);
  };

  useEffect(() => {
    // Try to get token from localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
    }
  }, []);

  // If no token is provided, show a form to enter it
  if (!mapboxToken) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">Enter Mapbox Token</h3>
          <p className="text-gray-600 mb-4">
            To display the map, please enter your Mapbox public token. 
            You can get one by signing up at <a href="https://mapbox.com" target="_blank" rel="noreferrer" className="text-blue-500 hover:underline">mapbox.com</a>.
          </p>
          
          <form onSubmit={handleTokenSubmit}>
            <input 
              type="text" 
              name="mapboxToken"
              placeholder="Enter your Mapbox public token"
              className="w-full border rounded-md px-4 py-2 mb-4"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-[#D4AF37] text-white py-2 rounded-md hover:bg-[#D4AF37]/90 transition-colors"
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div ref={mapRef} className="w-full h-[500px] rounded-lg overflow-hidden" />
  );
};

export default Map;
