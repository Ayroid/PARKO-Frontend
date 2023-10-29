import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import 'leaflet/dist/leaflet.css'

const Map = () => {

  return (
    <div className="pt-5 pr-5 pl-5">
      {/* size of map */}
      <MapContainer center={[30.417570, 77.967754]} zoom={13} className='w-full h-25 sm:h-30 bg-gray-300'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'        
      />
      <Marker position={[30.416991, 77.966727]}>
        <Popup><h2>Mac</h2></Popup>
      </Marker>

      <Marker position={[30.416502, 77.968515]}>
        <Popup><h2>Gandhi Chowk</h2></Popup>
      </Marker>
    </MapContainer>
    </div>
  )
}

export default Map