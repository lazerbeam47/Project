import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { BENGALURU_BOUNDS } from '../constants/map';

export default function Map() {
  return (
    <MapContainer
      center={BENGALURU_BOUNDS.center}
      zoom={12}
      className="h-[calc(103vh-2rem)] w-full"
      maxBounds={[
        [BENGALURU_BOUNDS.south, BENGALURU_BOUNDS.west],
        [BENGALURU_BOUNDS.north, BENGALURU_BOUNDS.east],
      ]}
      scrollWheelZoom={true}
      dragging={true}
      touchZoom={false}
      doubleClickZoom={false}
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}



  