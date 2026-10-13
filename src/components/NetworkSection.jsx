import React, { useState } from 'react';
import { MapPin, Navigation, Info, Clock, CheckCircle2, AlertTriangle, Layers } from 'lucide-react';

const stationNodes = [
  { id: 'bourse', name: 'Place de la Bourse', x: 260, y: 150, role: 'Commercial / Stock Exchange Hub', transit: '1.2 min to Grand Hôtel' },
  { id: 'hotel', name: 'Grand Hôtel / Opéra', x: 190, y: 130, role: 'Luxury Commerce & Tourism Terminal', transit: '1.5 min to Bourse' },
  { id: 'postes', name: 'Hôtel des Postes (Central)', x: 340, y: 180, role: 'Grand Central Switching Hub', transit: 'Core polygon distribution' },
  { id: 'nord', name: 'Gare du Nord', x: 380, y: 80, role: 'Northern Rail Mail Interchange', transit: '3.4 min to Central' },
  { id: 'est', name: 'Gare de l\'Est', x: 440, y: 110, role: 'Eastern Rail Connection', transit: '3.1 min to Central' },
  { id: 'orsay', name: 'Quai d\'Orsay (Foreign Affairs)', x: 160, y: 240, role: 'Government Ministry Terminal', transit: '2.8 min to Bourse' },
  { id: 'cite', name: 'Palais de Justice / Île de la Cité', x: 320, y: 260, role: 'Judicial & Prefecture Hub', transit: 'Seine riverbed siphon crossing' }
];

export default function NetworkSection() {
  const [selectedStation, setSelectedStation] = useState(stationNodes[0]);
  const [showArchivalMap, setShowArchivalMap] = useState(false);

  return (
    <section className="archive-section theme-parchment" id="network">
      <div className="section-header">
        <span className="archive-seal kicker-parchment">
          <Navigation size={12} />
          TOPOLOGY & CIVIL INFRASTRUCTURE
        </span>
        <h2>
          The Subterranean Web <em>Beneath the Boulevards.</em>
        </h2>
        <p className="section-lede">
          Rather than isolated point-to-point lines, Paris constructed an interconnected polygon network. Suspended from the vaulted crowns of the city sewers, pneumatic conduits traversed the Seine and connected all twenty arrondissements.
        </p>
      </div>

      <div className="network-grid-split">
        {/* Left: Interactive Vector Network Canvas */}
        <div className="network-map-card">
          <div className="map-card-header">
            <div>
              <span className="archive-label kicker-parchment">
                SCHEMATIC MAP OF THE RADIAL POLYGON (CIRCA 1888)
              </span>
              <div className="technical-stamp">
                CLICK NODES TO INSPECT TRANSIT METRICS
              </div>
            </div>

            <button
              className="btn-outline-brass"
              style={{ padding: '6px 12px', fontSize: '10px' }}
              onClick={() => setShowArchivalMap(!showArchivalMap)}
            >
              <Layers size={12} />
              <span>{showArchivalMap ? 'Show Schematic' : 'View 1868 Map'}</span>
            </button>
          </div>

          <div className="interactive-network-svg-wrap">
            {showArchivalMap ? (
              <div style={{ position: 'relative', width: '100%', maxHeight: '380px', overflow: 'hidden' }}>
                <img
                  src="/images/network-1868.svg"
                  alt="Historical Map of Paris Pneumatic Network 1868 by Louis Figuier"
                  style={{ width: '100%', objectFit: 'contain' }}
                />
                <div style={{ position: 'absolute', bottom: '8px', left: '8px', background: 'rgba(0,0,0,0.7)', color: '#F2E8D5', padding: '4px 8px', fontSize: '10px', fontFamily: 'DM Mono' }}>
                  SOURCE: LOUIS FIGUIER, LES MERVEILLES DE LA SCIENCE (1868)
                </div>
              </div>
            ) : (
              <svg
                viewBox="0 0 600 360"
                style={{ width: '100%', height: 'auto', display: 'block' }}
                role="img"
                aria-label="Interactive Paris pneumatic network diagram"
              >
                {/* Background Sewer Grid Lines */}
                <pattern id="net-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                  <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#D3C2A3" strokeWidth="0.75" strokeOpacity="0.4" />
                </pattern>
                <rect width="600" height="360" fill="url(#net-grid)" />

                {/* Stylized Seine River Curve */}
                <path
                  d="M 50 280 C 180 270, 300 240, 420 220 C 500 205, 560 215, 600 210"
                  fill="none"
                  stroke="#5B8289"
                  strokeWidth="20"
                  strokeOpacity="0.45"
                />
                <text x="70" y="295" fill="#5B8289" fontSize="10" fontFamily="DM Mono" fontWeight="bold">LA SEINE (RIVERBED SIPHONS)</text>

                {/* Primary Pneumatic Conduits (Loops) */}
                <path
                  d="M 190 130 L 260 150 L 340 180 L 320 260 L 160 240 Z"
                  fill="none"
                  stroke="#102D26"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <path
                  d="M 340 180 L 380 80 L 440 110 L 340 180"
                  fill="none"
                  stroke="#102D26"
                  strokeWidth="3.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 260 150 L 380 80"
                  fill="none"
                  stroke="#C85D36"
                  strokeWidth="2.5"
                  strokeDasharray="6 4"
                />

                {/* Station Nodes */}
                {stationNodes.map((node) => {
                  const isSelected = selectedStation.id === node.id;
                  return (
                    <g
                      key={node.id}
                      onClick={() => setSelectedStation(node)}
                      style={{ cursor: 'pointer' }}
                    >
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={isSelected ? 14 : 10}
                        fill={isSelected ? '#C85D36' : '#102D26'}
                        stroke="#B79A60"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="3.5"
                        fill="#F2E8D5"
                      />
                      <text
                        x={node.x + 16}
                        y={node.y + 4}
                        fill="#171A18"
                        fontSize="11"
                        fontFamily="DM Mono"
                        fontWeight={isSelected ? 'bold' : 'normal'}
                      >
                        {node.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            )}
          </div>

          <div className="network-legend-bar">
            <div className="legend-item">
              <span className="legend-swatch hub" />
              <span>STATION TERMINAL</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch route" />
              <span>MAIN UNDERGROUND TUBE</span>
            </div>
            <div className="legend-item">
              <span className="legend-swatch seine" />
              <span>SEINE CROSSING SIPHON</span>
            </div>
          </div>
        </div>

        {/* Right: Station Inspector & Speed Matrix */}
        <div className="network-comparison-pane">
          {/* Selected Station Inspector Card */}
          <div className="transit-speed-card">
            <span className="archive-seal" style={{ marginBottom: '12px' }}>
              <MapPin size={12} />
              STATION INSPECTOR
            </span>
            <h3 style={{ marginTop: '8px' }}>{selectedStation.name}</h3>
            <p style={{ fontSize: '13px', color: '#58615A', marginBottom: '12px' }}>
              <strong>Operational Role:</strong> {selectedStation.role}
            </p>
            <div style={{ background: '#E2D3B8', padding: '10px 14px', borderRadius: '3px', fontSize: '12px', fontFamily: 'DM Mono', color: '#171A18' }}>
              <Clock size={12} style={{ display: 'inline', marginRight: '6px' }} />
              Typical Transit: {selectedStation.transit}
            </div>
          </div>

          {/* Transit Speed Comparison Matrix */}
          <div className="transit-speed-card">
            <h3>Transit Speed Comparison</h3>
            <div className="speed-comparison-row">
              <div className="comparison-bar-item">
                <div className="bar-meta">
                  <span>Pneumatic Post (Underground Air)</span>
                  <strong style={{ color: '#C85D36' }}>12–25 Minutes (Citywide)</strong>
                </div>
                <div className="bar-track">
                  <div className="bar-fill-pneumatic" />
                </div>
              </div>

              <div className="comparison-bar-item">
                <div className="bar-meta">
                  <span>Horse Carriage Postal Courier</span>
                  <strong style={{ color: '#58615A' }}>120–240 Minutes</strong>
                </div>
                <div className="bar-track">
                  <div className="bar-fill-courier" />
                </div>
              </div>
            </div>
          </div>

          {/* Infrastructure Civil Engineering Callout */}
          <div className="sewer-infrastructure-note">
            <h4>Mounted in Paris Sewers</h4>
            <p>
              Under Baron Haussmann and chief engineer Eugène Belgrand, Paris excavated 600 kilometers of monumental vaulted sewers. Pneumatic conduits were suspended directly from the arched sewer masonry brackets, completely avoiding expensive street-level road trenches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
