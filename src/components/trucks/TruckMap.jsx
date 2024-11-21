import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Truck, MapPin, Weight } from 'lucide-react';

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

function TruckMap({ trucks }) {
  const center =
    trucks.length > 0
      ? [trucks[0].startLatitude, trucks[0].startLongitude]
      : [0, 0];

  return (
    <div className="p-4 md:p-6">
      <div className="h-[300px] w-full max-w-3xl mx-auto bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-lg">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-3 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Truck className="h-5 w-5 text-green-600" />
            Fleet Location Overview
          </h3>
        </div>
        <MapContainer
          center={center}
          zoom={13}
          style={{ height: "calc(100% - 48px)", width: "100%" }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {trucks.map((truck) => (
            <Marker
              key={truck.id}
              position={[truck.startLatitude, truck.startLongitude]}
            >
              <Popup className="custom-popup">
                <div className="p-3 min-w-[200px]">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 border-b pb-2">
                    {truck.truckNumber}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium
                        ${truck.status === 'AVAILABLE' ? 'bg-green-100 text-green-800' :
                          truck.status === 'ON_ROUTE' ? 'bg-blue-100 text-blue-800' :
                          truck.status === 'MAINTENANCE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'}`}>
                        {truck.status}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {truck.currentLocation}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center gap-2">
                      <Weight className="h-4 w-4 text-gray-400" />
                      {truck.pickupCapacity} tons
                    </p>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default TruckMap;
