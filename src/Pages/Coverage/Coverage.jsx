import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

import warehouseData from '../../Data/Warehouse.json'; // Or paste the array directly if needed

const Coverage = () => {
  const [search, setSearch] = useState('');

  const filteredWarehouses = warehouseData.filter(wh =>
    wh.city.toLowerCase().includes(search.toLowerCase()) ||
    wh.district.toLowerCase().includes(search.toLowerCase()) ||
    wh.region.toLowerCase().includes(search.toLowerCase()) ||
    wh.covered_area.some(area => area.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Bangladesh Service Warehouses</h1>

      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search by city, district, or area..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <MapContainer center={[23.685, 90.3563]} zoom={7} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredWarehouses.map((wh, idx) => (
          <Marker key={idx} position={[wh.latitude, wh.longitude]}>
            <Popup>
              <div>
                <h2 className="font-bold">{wh.city} Warehouse</h2>
                <p><strong>District:</strong> {wh.district}</p>
                <p><strong>Region:</strong> {wh.region}</p>
                <p><strong>Areas:</strong> {wh.covered_area.join(', ')}</p>
                <a href={wh.flowchart} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Flowchart</a>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Coverage;
