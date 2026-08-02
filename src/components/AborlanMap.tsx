'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import aborlanBoundary from '@data/aborlan-boundary.json';

// A brand-blue pin (matches Kapwa's --color-kapwa-brand-700, #0052d6) with a
// municipal-hall glyph (Bootstrap Icons' bi-bank2, already used elsewhere on
// the site for government/civic buildings) instead of Leaflet's default red
// marker — inline SVG + icon font via divIcon, no CDN image dependency.
const markerIcon = L.divIcon({
  className: 'aborlan-map-marker',
  html: `<svg width="30" height="42" viewBox="0 0 30 42" xmlns="http://www.w3.org/2000/svg">
    <path d="M15 0C6.7 0 0 6.7 0 15c0 11.25 15 27 15 27s15-15.75 15-27C30 6.7 23.3 0 15 0z" fill="#0052d6"/>
  </svg>
  <i class="bi bi-bank2"></i>`,
  iconSize: [30, 42],
  iconAnchor: [15, 42],
  popupAnchor: [0, -38],
});

// Municipal Hall of Aborlan, Puerto Princesa South Road, Poblacion, Barangay
// Ramon Magsaysay — verified via OpenStreetMap/Nominatim (osm way 744259943).
const MUNICIPAL_HALL: [number, number] = [9.4149832, 118.5368248];

// Municipality boundary (mainland + outlying islands) from geoBoundaries.org's
// PHL ADM3 dataset — sourced from NAMRIA/PSA/OCHA Philippines, CC BY 3.0 IGO.
const mainlandGeometry = {
  type: 'Polygon' as const,
  coordinates: (aborlanBoundary as GeoJSON.MultiPolygon).coordinates[2],
};
// Center on the mainland's bounding-box center rather than the Municipal
// Hall — at zoom 11 that keeps the whole mainland roughly in view instead
// of skewing toward Poblacion. The Hall still gets its own marker below.
const mainlandCenter = L.geoJSON(mainlandGeometry).getBounds().getCenter();

export default function AborlanMap() {
  return (
    <MapContainer
      center={mainlandCenter}
      zoom={11}
      scrollWheelZoom={false}
      className="realtime-map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON
        data={aborlanBoundary as GeoJSON.GeoJsonObject}
        style={{ color: '#0052d6', weight: 2.5, fill: false }}
      />
      <Marker position={MUNICIPAL_HALL} icon={markerIcon}>
        <Popup>Municipal Hall of Aborlan</Popup>
      </Marker>
    </MapContainer>
  );
}
