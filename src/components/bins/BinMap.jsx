import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

function BinMap({ bins, onBinClick }) {
  const [center, setCenter] = useState([20.5937, 78.9629]); // Default coordinates until we get user location
  const [map, setMap] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newCenter = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setCenter(newCenter);
          // If map is already initialized, pan to new center
          if (map) {
            map.setView(newCenter, 13);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  }, [map]);

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        ref={setMap}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {bins.map((bin) => (
          <Marker
            key={bin.id}
            position={[bin.latitude, bin.longitude]}
            eventHandlers={{
              click: () => onBinClick(bin),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{bin.location}</h3>
                <p className="text-sm text-gray-600">
                  Fill Level: {bin.fillLevel}%
                </p>
                <p className="text-sm text-gray-600">Status: {bin.status}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default BinMap;
