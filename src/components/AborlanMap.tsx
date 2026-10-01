'use client';

import { useEffect, useRef } from 'react';
import 'maplibre-gl/dist/maplibre-gl.css';
import {
  Map as MapLibreMap,
  NavigationControl,
  Popup,
  type LayerSpecification,
  type LngLatBoundsLike,
  type MapLayerMouseEvent,
  type StyleSpecification,
} from 'maplibre-gl';
import type { FeatureCollection, Geometry, Position } from 'geojson';
import barangayBoundaries from '@data/aborlan-barangay-boundaries.json';
import { ABORLAN_MAP_STYLE } from '@/lib/mapStyle';

interface BarangayProperties {
  name: string;
  pcode: string;
}

const boundaries = barangayBoundaries as FeatureCollection<Geometry, BarangayProperties>;

const BRAND = '#0052d6'; // kapwa brand-700
const BRAND_FILL = '#35b0ff'; // kapwa brand-400

// Bounding box of every barangay (mainland + outlying islands), used to
// frame the whole municipality on load at any screen size.
function computeBounds(fc: FeatureCollection<Geometry>): LngLatBoundsLike {
  let minLng = Infinity;
  let minLat = Infinity;
  let maxLng = -Infinity;
  let maxLat = -Infinity;
  const visit = (coords: unknown): void => {
    if (typeof (coords as Position)[0] === 'number') {
      const [lng, lat] = coords as Position;
      minLng = Math.min(minLng, lng);
      minLat = Math.min(minLat, lat);
      maxLng = Math.max(maxLng, lng);
      maxLat = Math.max(maxLat, lat);
      return;
    }
    (coords as unknown[]).forEach(visit);
  };
  fc.features.forEach((f) => {
    if ('coordinates' in f.geometry) visit(f.geometry.coordinates);
  });
  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

const BOUNDS = computeBounds(boundaries);

// Barangay overlay is baked into the style (not added on `load`) so it is
// part of the very first render. It sits under the label layers so place
// names stay readable on top of the shading.
const FIRST_LABEL_LAYER = ABORLAN_MAP_STYLE.layers.findIndex((l) => l.type === 'symbol');
const BARANGAY_LAYERS: LayerSpecification[] = [
  {
    id: 'barangay-fill',
    type: 'fill',
    source: 'barangays',
    paint: {
      'fill-color': BRAND_FILL,
      'fill-opacity': ['case', ['boolean', ['feature-state', 'hover'], false], 0.35, 0.12],
    },
  },
  {
    id: 'barangay-line',
    type: 'line',
    source: 'barangays',
    paint: {
      'line-color': BRAND,
      'line-width': ['case', ['boolean', ['feature-state', 'hover'], false], 2.5, 1.25],
    },
  },
];
const MAP_STYLE: StyleSpecification = {
  ...ABORLAN_MAP_STYLE,
  sources: {
    ...ABORLAN_MAP_STYLE.sources,
    barangays: { type: 'geojson', data: boundaries, promoteId: 'pcode' },
  },
  layers: [
    ...ABORLAN_MAP_STYLE.layers.slice(0, FIRST_LABEL_LAYER),
    ...BARANGAY_LAYERS,
    ...ABORLAN_MAP_STYLE.layers.slice(FIRST_LABEL_LAYER),
  ],
};

export default function AborlanMap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new MapLibreMap({
      container: containerRef.current,
      style: MAP_STYLE,
      bounds: BOUNDS,
      fitBoundsOptions: { padding: 16 },
      scrollZoom: false,
      dragRotate: false,
      pitchWithRotate: false,
      attributionControl: { compact: true },
    });
    map.touchZoomRotate.disableRotation();
    map.addControl(new NavigationControl({ showCompass: false }), 'top-left');

    const tooltip = new Popup({
      closeButton: false,
      closeOnClick: false,
      className: 'aborlan-map-tooltip',
      offset: 12,
    });
    let hoveredId: string | number | undefined;

    const clearHover = () => {
      if (hoveredId !== undefined) {
        map.setFeatureState({ source: 'barangays', id: hoveredId }, { hover: false });
        hoveredId = undefined;
      }
      map.getCanvas().style.cursor = '';
      tooltip.remove();
    };

    // mousemove covers desktop hover; click covers taps on touch screens.
    const showBarangay = (e: MapLayerMouseEvent) => {
      const feature = e.features?.[0];
      if (!feature) return;
      if (feature.id !== hoveredId) {
        clearHover();
        hoveredId = feature.id;
        if (hoveredId !== undefined) {
          map.setFeatureState({ source: 'barangays', id: hoveredId }, { hover: true });
        }
      }
      map.getCanvas().style.cursor = 'pointer';
      tooltip.setLngLat(e.lngLat).setText(String(feature.properties.name)).addTo(map);
    };
    map.on('mousemove', 'barangay-fill', showBarangay);
    map.on('click', 'barangay-fill', showBarangay);
    map.on('mouseleave', 'barangay-fill', clearHover);

    return () => {
      tooltip.remove();
      map.remove();
    };
  }, []);

  return <div ref={containerRef} className="realtime-map-container" />;
}
