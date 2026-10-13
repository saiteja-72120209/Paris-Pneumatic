import React from 'react';
import { Hospital, Factory, Landmark, Rocket, Cpu, ArrowUpRight, ShieldCheck } from 'lucide-react';

const modernApplications = [
  {
    icon: Hospital,
    sector: '01 / HEALTHCARE & SURGERY',
    title: 'Hospital Clinical Tube Networks',
    desc: 'Modern healthcare facilities utilize computerized pneumatic tube networks (such as Swisslog and Sumetzberger) to transport patient blood vials, surgical biopsies, and emergency pharmaceuticals between operating suites and pathology labs in under two minutes.',
    tag: 'LIFE-SAVING RAPID LOGISTICS'
  },
  {
    icon: Factory,
    sector: '02 / ADVANCED INDUSTRY',
    title: 'Cleanroom & Hazardous Dispatch',
    desc: 'Semiconductor fabrication plants and nuclear medicine research labs use sealed pneumatic conveyors to shuttle radioactive isotopes and silicon wafers across isolated sterile rooms without human contamination risks.',
    tag: 'HERMETIC AUTOMATION'
  },
  {
    icon: Landmark,
    sector: '03 / SECURE COMMERCE',
    title: 'Bank Vaults & High-Security Retail',
    desc: 'Drive-through banking teller lanes and hypermarkets employ reinforced pneumatic conduits to instantly transfer currency cash bundles directly into hardened underground drop vaults, eliminating armed robbery vulnerabilities.',
    tag: 'ARMORED PHYSICAL CONDUITS'
  },
  {
    icon: Rocket,
    sector: '04 / EVACUATED TRANSIT',
    title: 'Hyperloop & Vactrain Physics',
    desc: 'Contemporary high-speed evacuated tube transport (vactrain) concepts trace their direct lineage to the pressure differentials pioneered in Paris: eliminating aerodynamic drag in enclosed tubes to move high-speed passenger pods.',
    tag: 'FUTURE ATMOSPHERIC MOBILITY'
  }
];

export default function LegacySection() {
  return (
    <section className="archive-section theme-forest" id="legacy">
      <div className="section-header">
        <span className="archive-seal kicker-forest">
          <Cpu size={12} />
          MODERN RELEVANCE · EVOLUTION OF ENCLOSED CONDUITS
        </span>
        <h2>
          Old Principle. <em>Contemporary Engineering.</em>
        </h2>
        <p className="section-lede">
          While the Paris telegraph network closed in 1984, pneumatic capsule transit never truly died. Today, computerized variants of the exact same pressure differential physics operate silently in hospitals, factories, and cutting-edge transit laboratories worldwide.
        </p>
      </div>

      <div className="legacy-evolution-grid">
        {modernApplications.map((app, idx) => {
          const Icon = app.icon;
          return (
            <article className="legacy-card-shell" key={idx}>
              <div className="legacy-card-icon">
                <Icon size={24} />
              </div>
              <span className="archive-label kicker-forest" style={{ fontSize: '9px', marginBottom: '8px' }}>
                {app.sector}
              </span>
              <h3>{app.title}</h3>
              <p>{app.desc}</p>
              <span className="legacy-card-tag">
                {app.tag}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}
