import React from 'react';
import { Check, X, Shield, Clock, DollarSign, AlertOctagon, HelpCircle } from 'lucide-react';

const advantages = [
  {
    title: 'Near-Instantaneous Urban Transit',
    desc: 'Bypassed surface-level horse carriage congestion, delivering dispatches across Paris in 15 to 30 minutes versus 3 to 4 hours by conventional post.'
  },
  {
    title: 'Weather & Street Immunity',
    desc: 'Deep within the underground sewer galleries, capsules travelled undisturbed by winter blizzards, torrential rains, or civil unrest on the streets above.'
  },
  {
    title: 'Original Ink & Legal Authenticity',
    desc: 'Unlike Morse telegraphy which required operator transcription onto new paper, the pneumatic carrier delivered original handwriting, signatures, and legal contracts.'
  },
  {
    title: 'Total Confidentiality & Privacy',
    desc: 'Telegrams were read by telegraph operators; the pneumatic "petit bleu" remained sealed in its gummed blue paper, ensuring privacy for financial and personal correspondence.'
  }
];

const limitations = [
  {
    title: 'Staggering Capital & Coal Costs',
    desc: 'Fabricating hundreds of kilometers of airtight lead-lined iron pipe and operating coal-fired steam compressors 24 hours a day required massive state subsidies.'
  },
  {
    title: 'Catastrophic Blockage Risks (Bourrages)',
    desc: 'A stuck capsule or accumulated condensation puddle blocked the entire branch line, requiring acoustic sounding with tuning forks or explosive vacuum reversals to clear.'
  },
  {
    title: 'Strict Payload & Dimension Limits',
    desc: 'Carriers could only accommodate rolled paper sheets up to 60 mm in diameter. Parcels, packages, and bulky correspondence could never enter the network.'
  },
  {
    title: 'Electronic & Digital Obsolescence',
    desc: 'The invention of the telephone, telex networks, and electronic teleprinters eventually provided instant two-way communication without physical piping.'
  }
];

export default function ComparisonSection() {
  return (
    <section className="archive-section theme-parchment" id="comparison">
      <div className="section-header">
        <span className="archive-seal kicker-parchment">
          <HelpCircle size={12} />
          HISTORICAL APPRAISAL · ADVANTAGES & LIMITATIONS
        </span>
        <h2>
          Ingenious in Its Prime, <em>Bound by Its Physical Limits.</em>
        </h2>
        <p className="section-lede">
          The Paris pneumatic network was a triumph of 19th-century mechanical civil engineering. Yet its reliance on rigid underground piping and mechanical compression presented distinct engineering trade-offs.
        </p>
      </div>

      <div className="comparison-split-deck">
        {/* Left Column: Triumphs & Advantages */}
        <div className="comparison-column-card">
          <div className="column-header triumphs">
            <div className="point-icon-box plus" style={{ background: '#F2E8D5', color: '#102D26' }}>
              ✓
            </div>
            <div>
              <h3>The Engineering Triumphs</h3>
              <span className="technical-stamp" style={{ color: '#D4B982' }}>OPERATIONAL ADVANTAGES</span>
            </div>
          </div>

          <div className="comparison-item-list">
            {advantages.map((item, idx) => (
              <div className="comparison-point" key={idx}>
                <div className="point-icon-box plus">
                  <Check size={14} />
                </div>
                <div className="point-text-box">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Physical & Economic Limits */}
        <div className="comparison-column-card">
          <div className="column-header limitations">
            <div className="point-icon-box minus" style={{ background: '#F2E8D5', color: '#88351B' }}>
              ✕
            </div>
            <div>
              <h3>The Systemic Vulnerabilities</h3>
              <span className="technical-stamp" style={{ color: '#F2E8D5' }}>LIMITATIONS & FAILURE MODES</span>
            </div>
          </div>

          <div className="comparison-item-list">
            {limitations.map((item, idx) => (
              <div className="comparison-point" key={idx}>
                <div className="point-icon-box minus">
                  <X size={14} />
                </div>
                <div className="point-text-box">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
