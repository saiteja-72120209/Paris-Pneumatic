import React from 'react';

export default function CopyrightAttribution({ compact = false }) {
  const currentYear = new Date().getFullYear();

  if (compact) {
    return (
      <p className="copyright-attribution copyright-attribution-compact">
        Created &amp; Developed by <span className="copyright-name">Gutti Saiteja</span>
      </p>
    );
  }

  return (
    <div className="copyright-attribution">
      <p>
        Created &amp; Developed by <span className="copyright-name">Gutti Saiteja</span>
      </p>
      <p className="copyright-legal">
        © {currentYear} Gutti Saiteja. All Rights Reserved.
      </p>
    </div>
  );
}
