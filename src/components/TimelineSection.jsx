import React, { useState } from 'react';
import { ExternalLink, Calendar, BookOpen } from 'lucide-react';

const verifiedMilestones = [
  {
    year: '1853',
    era: 'early',
    title: 'European Origins: Latimer Clark',
    desc: 'Josiah Latimer Clark and the Electric & International Telegraph Company construct the first operational 1.5-inch pneumatic tube line in London, proving that atmospheric pressure could outpace horse messengers.',
    image: '/images/pneumatic-apparatus.png',
    citation: 'Louis Figuier, Les Merveilles de la science, vol. 5 (1891); Wikimedia Commons, Public Domain Mark',
    imageAlt: 'Engraved perspective and section of a pneumatic post apparatus, published by Louis Figuier in 1891.',
    imageCaption: 'Pneumatic post apparatus, 1891. A later French example of the technology behind early tube experiments; it is not a depiction of Clark’s London installation.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:T5-_d517_-_Fig._423._—_appareil_de_la_poste_pneumatique.png'
  },
  {
    year: '1866',
    era: 'early',
    title: 'First Paris Link: Bourse to Grand Hôtel',
    desc: 'Under engineer Paul Charpentier, Paris installs its first 65 mm tube between the Bourse telegraph bureau and the Grand Hôtel on Boulevard des Capucines (1,050 meters), achieving 1-minute transmissions.',
    image: '/images/bourse-station.png',
    citation: 'Louis Figuier, Les Merveilles de la science, vol. 5 (1891); Wikimedia Commons, Public Domain Mark',
    imageAlt: 'Engraving of staff and pneumatic dispatch equipment inside the Paris pneumatic post office at Place de la Bourse.',
    imageCaption: 'Bourse pneumatic post office, illustrated in 1891. The station at the origin of Paris’s first experimental link; the engraving documents the later service, not the 1866 trial itself.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:T5-_d516_-_Fig._422._—_Le_bureau_de_la_poste_pneumatique_de_la_place_de_la_Bourse.png'
  },
  {
    year: '1867',
    era: 'early',
    title: 'The Steam Central & Sewer Integration',
    desc: 'Lines are extended through Eugène Belgrand’s new vaulted sewers. Steam compressors at Rue de Grenelle generate positive pressure and vacuum suction to operate closed circular loops.',
    image: '/images/steam-powerplant.png',
    citation: 'Louis Figuier, Les Merveilles de la science, vol. 5 (1891); Wikimedia Commons, Public Domain Mark',
    imageAlt: 'Engraving of the steam plant at the Paris Hôtel des Postes, with machinery used to compress and rarefy air.',
    imageCaption: 'Steam plant at the Hôtel des Postes, 1891. The engraving records the machinery powering the Paris system in its early decades.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:T5-_d521_-_Fig._426._—_usine_à_vapeur_de_l’Hôtel_des_postes.png'
  },
  {
    year: '1879',
    era: 'golden',
    title: 'Public Service Opens: Birth of the "Pneu"',
    desc: 'The French administration opens the service to the general public. Citizens purchase official "cartes-télégrammes" (petits bleus) for 30–50 centimes, dropped into specialized blue letterboxes.',
    image: '/images/pneumatic-card-1899.jpg',
    citation: 'Paris pneumatic-post card, c. 1899; Wikimedia Commons, CC0 (Renhour48)',
    imageAlt: 'Scanned used Paris pneumatic-post card with a 50-centime telegraph stamp, handwriting, and dated postmarks.',
    imageCaption: 'A used Paris pneumatic-post card, c. 1899. This later surviving example shows the postal form used after the public service opened in 1879.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Carte_pneumatqique_de_1899.jpg'
  },
  {
    year: '1899',
    era: 'golden',
    title: 'Ten Million Dispatches Annually',
    desc: 'At the turn of the century, the system transports over 10 million letters per year. Parisian commerce, stockbrokers, and journalists rely on pneumatic delivery for guaranteed under-one-hour arrival.',
    image: '/images/pneumatic-letter-1903.jpg',
    citation: 'Paris pneumatic-post letter form, 1903; Wikimedia Commons, Public Domain Mark',
    imageAlt: 'Pneumatic-post letter form sent from the Grand Hôtel in Paris on 24 December 1903.',
    imageCaption: 'Pneumatic-post letter form, 1903. A dated dispatch artifact documenting the service’s use at the turn of the century.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Pneumatique_Grand_Hotel_24-12-1903.jpg'
  },
  {
    year: '1927',
    era: 'modern',
    title: 'Gradual Electrification Begins',
    desc: 'The transition from steam-powered workshops to electric motor-driven compressors began in 1927 and continued station by station over the following years.',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Groupes_surpresseurs-d%C3%A9presseurs_%C3%A0_Paris-Central_DSCN3056.jpg?width=1200',
    citation: 'Paris-Central pneumatic pressure and vacuum group, documented in use in 1984; Wikimedia Commons, CC BY-SA 4.0 (Jérome Ferri)',
    imageAlt: 'Motor-driven pressure and vacuum equipment used in the Paris-Central pneumatic-post network in 1984.',
    imageCaption: 'Electrically driven pressure and vacuum group at Paris-Central, documented in use in 1984. It shows the later equipment made possible by the gradual electrification begun in 1927.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Groupes_surpresseurs-d%C3%A9presseurs_à_Paris-Central_DSCN3056.jpg'
  },
  {
    year: '1933',
    era: 'modern',
    title: 'Network Reaches Its Greatest Extent',
    desc: 'By 1933, historical accounts describe 427 km of pneumatic tubes in Paris. The network connected post offices and government services across the city.',
    image: '/images/network-1868.svg',
    citation: 'Modern reconstruction of the 1868 Paris network; Wikimedia Commons, CC BY-SA 4.0 (Kimdime). Peak extent: Comité pour l’histoire de La Poste.',
    imageAlt: 'Modern map reconstruction of the Paris pneumatic-tube network in 1868, an early stage of the network later reported at 427 kilometres in 1933.',
    imageCaption: 'Reconstructed map of the 1868 network, not a 1933 plan. The 1933 peak of 427 km is documented separately by the Comité pour l’histoire de La Poste.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:PneumaticParis1868.svg'
  },
  {
    year: '1984',
    era: 'modern',
    title: 'Public Network Closes',
    desc: 'The Paris public pneumatic postal network closed on 30 March 1984. Pneumatic equipment remained in use on a separate ministerial network afterward.',
    image: '/images/fortin-hermann-station.jpg',
    citation: 'Fortin-Hermann terminal photographed at Paris-Central in 1987; Wikimedia Commons, CC BY-SA 4.0 (Jérome Ferri)',
    imageAlt: 'Fortin-Hermann pneumatic postal terminal photographed at Paris-Central in 1987, after the public Paris service had closed.',
    imageCaption: 'Fortin-Hermann terminal at Paris-Central, 1987. This surviving apparatus documents continued use on the ministerial network after the public network’s 1984 closure.',
    sourceUrl: 'https://commons.wikimedia.org/wiki/File:Appareil_pneumatique_postal_Fortin-Hermann_à_Paris-Central_en_1987.jpg'
  }
];

export default function TimelineSection({ timelineData, apiStatus }) {
  const [selectedEra, setSelectedEra] = useState('all');

  const filteredMilestones = selectedEra === 'all'
    ? verifiedMilestones
    : verifiedMilestones.filter(m => m.era === selectedEra);

  return (
    <section className="archive-section theme-parchment" id="timeline">
      <div className="section-header">
        <span className="archive-seal kicker-parchment">
          <Calendar size={12} />
          HISTORICAL CHRONOLOGY · 1853 — 1984
        </span>
        <h2>
          From European Experiments to <em>City-Scale Infrastructure.</em>
        </h2>
        <p className="section-lede">
          The development of the Paris pneumatic post followed an unprecedented trajectory: from early Victorian air-pipe trials to an indispensable urban nervous system that functioned continuously for over a century.
        </p>
      </div>

      {/* Era Filter Bar */}
      <div className="timeline-era-filter-bar">
        <button
          className={`era-filter-btn ${selectedEra === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedEra('all')}
        >
          All Milestones ({verifiedMilestones.length})
        </button>
        <button
          className={`era-filter-btn ${selectedEra === 'early' ? 'active' : ''}`}
          onClick={() => setSelectedEra('early')}
        >
          Pioneering Trials (1853–1867)
        </button>
        <button
          className={`era-filter-btn ${selectedEra === 'golden' ? 'active' : ''}`}
          onClick={() => setSelectedEra('golden')}
        >
          Golden Age of the "Pneu" (1879–1899)
        </button>
        <button
          className={`era-filter-btn ${selectedEra === 'modern' ? 'active' : ''}`}
          onClick={() => setSelectedEra('modern')}
        >
          Modernization & Closure (1927–1984)
        </button>
      </div>

      {/* Timeline Cards Grid */}
      <div className="timeline-cards-track">
        {filteredMilestones.map((milestone) => (
          <article className="timeline-milestone-card" key={milestone.year}>
            <div className="card-image-box">
              <img
                src={milestone.image}
                alt={milestone.imageAlt}
                loading="lazy"
                width="640"
                height="360"
                onError={(event) => {
                  event.currentTarget.hidden = true;
                  event.currentTarget.nextElementSibling.hidden = false;
                }}
              />
              <div className="timeline-image-fallback" hidden role="img" aria-label={`Image unavailable: ${milestone.imageAlt}`}>
                Archival image unavailable
              </div>
              <span className="card-year-stamp">{milestone.year}</span>
            </div>

            <p className="timeline-image-caption">{milestone.imageCaption}</p>

            <div className="card-content-box">
              <h3>{milestone.title}</h3>
              <p>{milestone.desc}</p>

              <div className="card-source-citation">
                <BookOpen size={12} />
                <span>{milestone.citation}</span>
                {milestone.sourceUrl && (
                  <a
                    href={milestone.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="timeline-source-link"
                    aria-label={`View source for ${milestone.title}`}
                    title="View original image source and license"
                  >
                    <span>View Source</span><ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
