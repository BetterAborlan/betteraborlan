'use client';

import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import type { Feature, FeatureCollection, Geometry } from 'geojson';
import barangayBoundaries from '@data/aborlan-barangay-boundaries.json';

interface BarangayProperties {
  name: string;
  pcode: string;
}

const boundaries = barangayBoundaries as FeatureCollection<Geometry, BarangayProperties>;

const DEFAULT_STYLE: L.PathOptions = {
  color: '#0052d6',
  weight: 1.5,
  fillColor: '#4d8cf0',
  fillOpacity: 0.15,
};

const HOVER_STYLE: L.PathOptions = {
  ...DEFAULT_STYLE,
  weight: 2.5,
  fillOpacity: 0.35,
};

// Center on the barangay boundaries' bounding-box center so the whole
// municipality (mainland + outlying islands) stays roughly in view at zoom 11.
const boundsCenter = L.geoJSON(boundaries as GeoJSON.GeoJsonObject).getBounds().getCenter();

export default function AborlanMap() {
  return (
    <MapContainer
      center={boundsCenter}
      zoom={11}
      scrollWheelZoom={false}
      className="realtime-map-container"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />
      <GeoJSON
        data={boundaries as GeoJSON.GeoJsonObject}
        style={DEFAULT_STYLE}
        onEachFeature={(feature: Feature<Geometry, BarangayProperties>, layer) => {
          layer.bindTooltip(feature.properties.name, { sticky: true });
          layer.on({
            mouseover: (e) => e.target.setStyle(HOVER_STYLE),
            mouseout: (e) => e.target.setStyle(DEFAULT_STYLE),
          });
        }}
      />
    </MapContainer>
  );
}
