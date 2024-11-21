import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function RouteMap({ route }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map if not already initialized
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView([0, 0], 13);

      // Add tile layer
      L.tileLayer(
        "https://maps.geoapify.com/v1/tile/osm-bright/{z}/{x}/{y}.png?apiKey=e40bf7725f014f46b46609ebb9112a9a",
        {
          attribution:
            'Powered by <a href="https://www.geoapify.com/" target="_blank">Geoapify</a>',
          maxZoom: 20,
          id: "osm-bright",
        }
      ).addTo(mapInstanceRef.current);
    }

    // Clear existing layers
    mapInstanceRef.current.eachLayer((layer) => {
      if (!(layer instanceof L.TileLayer)) {
        layer.remove();
      }
    });

    if (route && route.features) {
      // Add route path
      L.geoJSON(route, {
        style: {
          color: "rgba(34, 197, 94, 0.7)", // green-600 with opacity
          weight: 4,
        },
      }).addTo(mapInstanceRef.current);

      // Add markers for waypoints
      const waypoints = route.features[0]?.properties?.waypoints || [];
      waypoints.forEach((waypoint, index) => {
        const [lng, lat] = waypoint.location;
        const marker = L.marker([lat, lng]).addTo(mapInstanceRef.current);
        marker.bindPopup(`Stop ${index + 1}`);
      });

      // Fit map to route bounds
      const coordinates = route.features[0]?.geometry?.coordinates[0] || [];
      if (coordinates.length > 0) {
        const bounds = coordinates.map(([lng, lat]) => [lat, lng]);
        mapInstanceRef.current.fitBounds(bounds);
      }
    }
  }, [route]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div ref={mapRef} className="h-[400px] w-full" />
    </div>
  );
}

export default RouteMap;
