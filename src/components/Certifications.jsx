import { useMemo } from 'react';

export default function Certifications({ certifications }) {
  if (!certifications || !certifications.length) return null;

  const count = certifications.length;

  // Generate a snake-like SVG path with points at each certification (2 per row)
  const { pathD, points, totalHeight } = useMemo(() => {
    const width = 900;
    const rowHeight = 160;
    const padding = 60;
    const xMargin = 120;
    const itemsPerRow = 2;
    const numRows = Math.ceil(count / itemsPerRow);
    const calculatedHeight = numRows * rowHeight + padding * 2;

    let d = '';
    const pts = [];

    // Start at top left
    d += `M ${xMargin - 40} ${padding} `;

    for (let row = 0; row < numRows; row++) {
      const isLeftToRight = row % 2 === 0;
      const y = padding + row * rowHeight;

      // The two X positions for dots in this row
      const leftX = width * 0.35;
      const rightX = width * 0.65;

      const dotXs = isLeftToRight ? [leftX, rightX] : [rightX, leftX];

      for (let col = 0; col < itemsPerRow; col++) {
        const index = row * itemsPerRow + col;
        if (index >= count) break;

        const x = dotXs[col];
        pts.push({ x, y, index, isLeftToRight });

        d += `L ${x} ${y} `;
      }

      // If not the last row, draw vertical drop down to next row
      if (row < numRows - 1) {
        const endX = isLeftToRight ? width - xMargin + 40 : xMargin - 40;
        const nextY = y + rowHeight;

        // Horizontal line to the edge
        d += `L ${endX} ${y} `;
        // Drop down to next row
        d += `L ${endX} ${nextY} `;
      } else {
        // Last row, extend slightly
        const endX = isLeftToRight ? width - xMargin + 40 : xMargin - 40;
        d += `L ${endX} ${y} `;
      }
    }

    return { pathD: d, points: pts, totalHeight: calculatedHeight };
  }, [count]);

  return (
    <section className="certifications-section" id="certifications">
      <div className="cert-header">
        <span className="cert-title">Certifications</span>
        <div className="cert-line" />
      </div>

      <div className="cert-snake-container">
        {/* SVG snake path */}
        <svg
          className="cert-snake-svg"
          viewBox={`0 0 900 ${totalHeight}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Glowing path line */}
          <path
            d={pathD}
            fill="none"
            stroke="url(#snakeGradient)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="cert-snake-path"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="snakeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(74, 222, 128, 0.6)" />
              <stop offset="50%" stopColor="rgba(96, 165, 250, 0.4)" />
              <stop offset="100%" stopColor="rgba(74, 222, 128, 0.2)" />
            </linearGradient>
          </defs>

          {/* Dots at each point */}
          {points.map((pt, i) => (
            <g key={i}>
              {/* Glow ring */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="12"
                fill="none"
                stroke="rgba(74, 222, 128, 0.15)"
                strokeWidth="1"
                className="cert-snake-glow"
              />
              {/* Dot */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="5"
                fill="#4ade80"
                className="cert-snake-dot"
              />
            </g>
          ))}
        </svg>

        {/* Certification labels positioned next to dots */}
        <div className="cert-snake-labels">
          {certifications.map((cert, i) => {
            const pt = points[i];
            if (!pt) return null;
            // Alternate label position above or below the line to avoid overlap
            const isLabelBelow = i % 2 !== 0;

            return (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="cert-snake-label"
                key={i}
                style={{
                  top: `${(pt.y / totalHeight) * 100}%`,
                  left: `${(pt.x / 900) * 100}%`,
                  transform: `translate(-50%, ${isLabelBelow ? '20px' : 'calc(-100% - 20px)'})`
                }}
              >
                <span className="cert-snake-label-name">{cert.name}</span>
                {cert.date && <span className="cert-snake-label-date">{cert.date}</span>}
                <span className="cert-snake-label-arrow">↗</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
