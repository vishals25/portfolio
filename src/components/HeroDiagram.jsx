/*
 * Hero visual: the shape of the systems I work on — a request passing through
 * auth into an API layer, which talks to Postgres, background jobs and an LLM
 * service. Pure SVG, themed via CSS custom properties, no runtime cost.
 */

const NODES = [
  { id: 'client', x: 20, y: 20, w: 170, h: 56, title: 'Client', sub: 'web · mobile · API' },
  { id: 'auth', x: 250, y: 20, w: 170, h: 56, title: 'Auth', sub: 'MFA · SSO (Ping)' },
  { id: 'api', x: 90, y: 128, w: 260, h: 64, title: 'Application / API', sub: 'Rails · Django · FastAPI', primary: true },
  { id: 'db', x: 20, y: 246, w: 124, h: 56, title: 'PostgreSQL', sub: 'migrations' },
  { id: 'jobs', x: 158, y: 246, w: 124, h: 56, title: 'Jobs', sub: 'cron · workers' },
  { id: 'llm', x: 296, y: 246, w: 124, h: 56, title: 'LLM service', sub: 'LangChain' },
];

const EDGES = [
  { d: 'M105 76 V102 H160 V128', delay: 0 },
  { d: 'M280 128 V102 H335 V76', delay: 0.6 },
  { d: 'M140 192 V219 H82 V246', delay: 1.2 },
  { d: 'M220 192 V246', delay: 1.5 },
  { d: 'M300 192 V219 H358 V246', delay: 1.8 },
];

export default function HeroDiagram() {
  return (
    <svg
      className="diagram"
      viewBox="0 0 440 322"
      role="img"
      aria-labelledby="diagram-title diagram-desc"
    >
      <title id="diagram-title">Diagram of the kind of systems I build</title>
      <desc id="diagram-desc">
        A client request passes through an authentication layer (MFA and single sign-on) into an
        application API built with Rails, Django or FastAPI, which reads and writes PostgreSQL,
        schedules background jobs, and calls an LLM service.
      </desc>

      <defs>
        <pattern id="diagram-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" className="diagram__grid" />
        </pattern>
        <marker id="diagram-arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0.5 7.5 4 0 7.5" className="diagram__arrowhead" />
        </marker>
      </defs>

      <rect width="440" height="322" fill="url(#diagram-grid)" />

      <g className="diagram__edges">
        {EDGES.map(({ d }) => (
          <path key={d} d={d} markerEnd="url(#diagram-arrow)" />
        ))}
        <path d="M144 274 H158" className="diagram__edge--dashed" />
      </g>

      <g className="diagram__packets" aria-hidden="true">
        {EDGES.map(({ d, delay }) => (
          <path key={d} d={d} pathLength="100" style={{ animationDelay: `${delay}s` }} />
        ))}
      </g>

      {NODES.map(({ id, x, y, w, h, title, sub, primary }) => (
        <g key={id} className={`diagram__node${primary ? ' diagram__node--primary' : ''}`}>
          <rect x={x} y={y} width={w} height={h} rx="10" />
          <text x={x + 14} y={y + (primary ? 27 : 24)} className="diagram__title">{title}</text>
          <text x={x + 14} y={y + (primary ? 46 : 42)} className="diagram__sub">{sub}</text>
          {primary && <circle cx={x + w - 18} cy={y + 18} r="4" className="diagram__status" />}
        </g>
      ))}
    </svg>
  );
}
