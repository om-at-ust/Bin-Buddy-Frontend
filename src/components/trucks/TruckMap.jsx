import React from "react";
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

function TruckMap({ trucks, onTruckClick }) {
  const center =
    trucks.length > 0
      ? [trucks[0].startLatitude, trucks[0].startLongitude]
      : [0, 0];

  return (
    <div className="h-[600px] bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {trucks.map((truck) => (
          <Marker
            key={truck.id}
            position={[truck.startLatitude, truck.startLongitude]}
            eventHandlers={{
              click: () => onTruckClick(truck),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{truck.truckNumber}</h3>
                <p className="text-sm text-gray-600">Status: {truck.status}</p>
                <p className="text-sm text-gray-600">
                  Location: {truck.currentLocation}
                </p>
                <p className="text-sm text-gray-600">
                  Capacity: {truck.pickupCapacity} tons
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default TruckMap;
