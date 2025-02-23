// CustomMarkers.js
import React from 'react';

const CustomMarkers = () => (
  <svg width="1" height="1" style={{ position: 'absolute', overflow: 'hidden' }}>
    <defs>
      {/* Empty Arrow Marker */}
      <marker
        id="emptyArrow"
        markerWidth="10"
        markerHeight="10"
        refX="0"    // Position at the start
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"  // Ensures size scales with edge thickness
        fill="none"
      >
        <path d="M9,0 L0,3 L9,6 Z" fill="none" stroke="black" strokeWidth="1" />
      </marker>

      {/* Diamond Marker */}
      <marker
        id="diamond"
        markerWidth="12"
        markerHeight="12"
        refX="0"    // Position at the start
        refY="6"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M6 0 L12 6 L6 12 L0 6 Z" fill="black" />
      </marker>
      
      {/* Filled Arrow Marker (for fallback) */}
      <marker
        id="filledArrow"
        markerWidth="10"
        markerHeight="10"
        refX="0"    // Position at the start
        refY="3"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M9,0 L0,3 L9,6 Z" fill="black" />
      </marker>
    </defs>
  </svg>
);

export default CustomMarkers;
