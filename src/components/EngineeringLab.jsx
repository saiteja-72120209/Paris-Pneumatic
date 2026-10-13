import React, { useState, useEffect } from 'react';
import { Gauge, Calculator, Wrench, AlertTriangle, ArrowRight, Activity, Zap, CheckCircle2 } from 'lucide-react';

export default function EngineeringLab() {
  const [pressure, setPressure] = useState(2500); // Pascals (Pa)
  const [diameterMm, setDiameterMm] = useState(65); // Millimeters (mm) - Paris standard
  const [massKg, setMassKg] = useState(0.25); // Kilograms (kg)
  const [apiResult, setApiResult] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);

  // Cross-sectional Area: A = π * (d/2)^2 in m²
  const radiusMeters = (diameterMm / 1000) / 2;
  const areaM2 = Math.PI * Math.pow(radiusMeters, 2);

  // Theoretical ideal force: F = ΔP * A
  const forceNewtons = pressure * areaM2;

  // Theoretical initial acceleration: a = F / m
  const acceleration = forceNewtons / massKg;

  // Preset Scenarios
  const applyPreset = (presetPressure, presetDiameter, presetMass) => {
    setPressure(presetPressure);
    setDiameterMm(presetDiameter);
    setMassKg(presetMass);
  };

  // Sync with Express backend endpoint /api/simulation
  useEffect(() => {
    let ignore = false;
    const fetchApiSimulation = async () => {
      setApiLoading(true);
      try {
        const res = await fetch('/api/simulation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pressure, area: areaM2 })
        });
        if (res.ok) {
          const data = await res.json();
          if (!ignore) setApiResult(data);
        } else {
          if (!ignore) setApiResult(null);
        }
      } catch (e) {
        if (!ignore) setApiResult(null);
      } finally {
        if (!ignore) setApiLoading(false);
      }
    };

    const timer = setTimeout(fetchApiSimulation, 250);
    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [pressure, areaM2]);

  return (
    <section className="archive-section theme-forest-dark" id="lab">
      <div className="section-header">
        <span className="archive-seal kicker-forest">
          <Activity size={12} />
          PHYSICS WORKSTATION · PROPULSION LAB
        </span>
        <h2>
          Put Pressure to Work: <em>The Physics of Fluid Propulsion.</em>
        </h2>
        <p className="section-lede">
          A pneumatic conduit converts potential pneumatic energy into kinetic forward momentum. Adjust the parameters below to calculate idealized propulsive force using fundamental Newtonian fluid dynamics.
        </p>
      </div>

      <div className="lab-workstation-grid">
        {/* Left: Input Control Station */}
        <div className="lab-control-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <span className="archive-label kicker-forest">CONTROLS & PARAMETERS</span>
            <span className="technical-stamp">SIMULATION ENGINE ACTIVE</span>
          </div>

          {/* Quick Scenario Preset Chips */}
          <div className="lab-preset-strip">
            <button
              className="preset-chip-btn"
              onClick={() => applyPreset(1200, 65, 0.25)}
            >
              1866 Gentle Trial (1,200 Pa)
            </button>
            <button
              className="preset-chip-btn"
              onClick={() => applyPreset(3200, 65, 0.25)}
            >
              1899 Paris Express (3,200 Pa)
            </button>
            <button
              className="preset-chip-btn"
              onClick={() => applyPreset(12000, 80, 0.35)}
            >
              High-Vacuum Surge (12 kPa)
            </button>
          </div>

          {/* Slider 1: Pressure Difference ΔP */}
          <div className="slider-group">
            <div className="slider-header-row">
              <span className="slider-title">Pressure Differential (ΔP)</span>
              <span className="slider-output-val">{pressure.toLocaleString()} Pa ({(pressure / 1000).toFixed(2)} kPa)</span>
            </div>
            <input
              type="range"
              className="archive-slider"
              min="200"
              max="25000"
              step="100"
              value={pressure}
              onChange={(e) => setPressure(Number(e.target.value))}
            />
            <div className="slider-scale-ends">
              <span>200 Pa (Gentle)</span>
              <span>25,000 Pa (High Boost)</span>
            </div>
          </div>

          {/* Slider 2: Tube Internal Bore Diameter */}
          <div className="slider-group">
            <div className="slider-header-row">
              <span className="slider-title">Tube Bore Diameter (d)</span>
              <span className="slider-output-val">{diameterMm} mm (Paris std: 65 / 80 mm)</span>
            </div>
            <input
              type="range"
              className="archive-slider"
              min="50"
              max="100"
              step="1"
              value={diameterMm}
              onChange={(e) => setDiameterMm(Number(e.target.value))}
            />
            <div className="slider-scale-ends">
              <span>50 mm</span>
              <span>100 mm</span>
            </div>
          </div>

          {/* Slider 3: Capsule Mass */}
          <div className="slider-group">
            <div className="slider-header-row">
              <span className="slider-title">Loaded Capsule Mass (m)</span>
              <span className="slider-output-val">{(massKg * 1000).toFixed(0)} grams</span>
            </div>
            <input
              type="range"
              className="archive-slider"
              min="0.10"
              max="0.60"
              step="0.01"
              value={massKg}
              onChange={(e) => setMassKg(Number(e.target.value))}
            />
            <div className="slider-scale-ends">
              <span>100 g</span>
              <span>600 g</span>
            </div>
          </div>

          {/* Educational Note on Fluid Dynamics */}
          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(183,154,96,0.2)', paddingTop: '16px' }}>
            <span className="archive-label kicker-forest" style={{ fontSize: '9px' }}>CORE EQUATION</span>
            <p style={{ fontSize: '12px', color: '#A9B8A6', lineHeight: '1.65', marginTop: '6px' }}>
              The propulsive force is directly proportional to both the pressure differential between carrier ends and the cross-sectional surface area facing the air column.
            </p>
          </div>
        </div>

        {/* Right: Physics Results Display */}
        <div className="lab-results-display">
          <div className="formula-display-banner">
            F = ΔP × A
          </div>

          <div className="calculated-force-hero">
            <span className="technical-stamp" style={{ color: '#D4B982' }}>
              THEORETICAL PROPULSIVE FORCE
            </span>
            <div className="force-number-big">
              {forceNewtons.toFixed(2)}
            </div>
            <div className="force-unit-label">
              NEWTONS (N)
            </div>
          </div>

          <div className="physics-breakdown-grid">
            <div className="breakdown-item">
              <span className="breakdown-label">EFFECTIVE AREA (A)</span>
              <div className="breakdown-val">{(areaM2 * 10000).toFixed(2)} cm²</div>
              <span style={{ fontSize: '9px', color: '#A9B8A6' }}>{areaM2.toFixed(5)} m²</span>
            </div>

            <div className="breakdown-item">
              <span className="breakdown-label">INIT. ACCELERATION (a)</span>
              <div className="breakdown-val">{acceleration.toFixed(1)} m/s²</div>
              <span style={{ fontSize: '9px', color: '#A9B8A6' }}>{(acceleration / 9.81).toFixed(2)} g-force</span>
            </div>
          </div>

          {apiResult && (
            <div style={{ background: 'rgba(183, 154, 96, 0.08)', padding: '10px 14px', borderRadius: '3px', marginBottom: '16px', border: '1px solid rgba(183,154,96,0.3)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CheckCircle2 size={14} color="#8cba9b" />
              <span style={{ fontSize: '11px', color: '#D4B982', fontFamily: 'DM Mono' }}>
                Verified via Express Node.js Engine (/api/simulation)
              </span>
            </div>
          )}

          {/* Crucial Engineering Reality Callout */}
          <div className="engineering-reality-disclaimer">
            <div className="disclaimer-title">ENGINEERING REALITY NOTE</div>
            <p className="disclaimer-body">
              This idealized model does not account for continuous Darcy-Weisbach pipe wall friction, annular air leakage around the leather sealing flange, air compressibility, or moisture condensation inside sewer lines. Real-world capsule terminal velocity typically stabilized between 10 and 12 m/s.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
