// ── Decorative mountain silhouette divider ────────────────────────────────────
// Use between sections or as subtle background accent

interface MountainDividerProps {
  className?: string
  flip?: boolean   // flip horizontally
  opacity?: number
}

export function MountainDivider({ className = '', flip = false, opacity = 1 }: MountainDividerProps) {
  return (
    <div
      className={`w-full pointer-events-none select-none ${className}`}
      style={{ transform: flip ? 'scaleX(-1)' : undefined, opacity }}
    >
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full" preserveAspectRatio="xMidYMax meet">
        {/* Far peaks */}
        <path d="M0 120 L0 85 L60 85 L120 55 L165 72 L230 35 L280 60 L340 28 L395 52 L455 18 L510 45 L570 22 L625 48 L685 15 L740 42 L800 25 L858 50 L918 18 L975 44 L1035 20 L1092 46 L1152 22 L1210 50 L1270 28 L1330 55 L1385 38 L1440 55 L1440 120Z" fill="#C4B49A" opacity="0.20"/>
        {/* Mid peaks */}
        <path d="M0 120 L0 92 L55 92 L110 68 L155 80 L215 52 L265 70 L325 42 L378 62 L438 35 L492 58 L552 38 L608 62 L668 30 L722 55 L782 38 L840 62 L900 35 L958 58 L1018 38 L1075 62 L1135 40 L1192 65 L1252 45 L1312 68 L1368 52 L1440 65 L1440 120Z" fill="#8B7355" opacity="0.18"/>
        {/* Foreground ridge */}
        <path d="M0 120 L0 100 L50 100 L108 82 L152 92 L212 72 L262 85 L322 65 L375 78 L435 58 L488 74 L548 56 L604 72 L664 52 L718 68 L778 52 L836 68 L896 50 L954 66 L1014 50 L1070 66 L1130 50 L1188 68 L1248 54 L1308 70 L1364 56 L1440 68 L1440 120Z" fill="#6B8F71" opacity="0.22"/>
      </svg>
    </div>
  )
}

// ── Small flower accent — corner/edge decoration ──────────────────────────────

interface FlowerAccentProps {
  className?: string
  color?: string
}

export function FlowerAccent({ className = '', color = '#C4963A' }: FlowerAccentProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Stem */}
      <path d="M30 55 Q29 45 30 35" stroke="#6B8F71" strokeWidth="1.2" strokeLinecap="round" opacity="0.5"/>
      {/* Leaf */}
      <ellipse cx="25" cy="44" rx="4" ry="7" fill="#6B8F71" opacity="0.3" transform="rotate(-30 25 44)"/>
      {/* Petals */}
      <ellipse cx="30" cy="24" rx="3" ry="7" fill={color} opacity="0.55"/>
      <ellipse cx="30" cy="24" rx="3" ry="7" fill={color} opacity="0.55" transform="rotate(60 30 32)"/>
      <ellipse cx="30" cy="24" rx="3" ry="7" fill={color} opacity="0.55" transform="rotate(120 30 32)"/>
      <ellipse cx="30" cy="24" rx="3" ry="7" fill={color} opacity="0.55" transform="rotate(180 30 32)"/>
      <ellipse cx="30" cy="24" rx="3" ry="7" fill={color} opacity="0.55" transform="rotate(240 30 32)"/>
      <ellipse cx="30" cy="24" rx="3" ry="7" fill={color} opacity="0.55" transform="rotate(300 30 32)"/>
      {/* Center */}
      <circle cx="30" cy="32" r="4" fill={color} opacity="0.7"/>
    </svg>
  )
}

// ── Inline mountain background — subtle SVG for section backgrounds ────────────

export function MountainBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ opacity: 0.06 }}>
      <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
        <path d="M0 400 L0 240 L80 200 L140 230 L200 160 L260 195 L320 130 L380 170 L440 100 L500 145 L560 80 L620 125 L680 90 L740 130 L800 100 L800 400Z" fill="#3D453E"/>
        <path d="M560 80 L580 60 L600 44 L618 58 L628 75 L608 90 L578 88Z" fill="#E8EAE8" opacity="0.6"/>
        <path d="M440 100 L455 82 L470 68 L484 80 L492 96 L472 108 L448 106Z" fill="#E8EAE8" opacity="0.5"/>
        <path d="M0 400 L0 300 L100 265 L180 285 L260 240 L340 260 L420 220 L500 248 L580 210 L660 240 L740 200 L800 225 L800 400Z" fill="#3D453E" opacity="0.6"/>
      </svg>
    </div>
  )
}

// ── Scattered small flowers row ───────────────────────────────────────────────

export function FlowerRow({ className = '' }: { className?: string }) {
  const flowers = [
    { x: 80,  y: 38, r: 90,  color: '#E8C97A', size: 1.0 },
    { x: 200, y: 32, r: 45,  color: '#D4908A', size: 0.85 },
    { x: 340, y: 40, r: 150, color: '#A99BB8', size: 0.9 },
    { x: 480, y: 30, r: 0,   color: '#E8C97A', size: 1.1 },
    { x: 620, y: 38, r: 60,  color: '#E8A8A0', size: 0.85 },
    { x: 760, y: 32, r: 120, color: '#A99BB8', size: 0.95 },
    { x: 900, y: 40, r: 30,  color: '#E8C97A', size: 0.9 },
  ]

  return (
    <div className={`w-full pointer-events-none select-none ${className}`} style={{ height: '60px' }}>
      <svg viewBox="0 0 1000 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {flowers.map((f, i) => {
          const s = f.size
          const cx = f.x, cy = f.y
          return (
            <g key={i} transform={`translate(${cx}, ${cy}) rotate(${f.r})`}>
              <path d={`M0 ${-6*s} Q${3*s} ${-10*s} 0 ${-14*s} Q${-3*s} ${-10*s} 0 ${-6*s}`} fill={f.color} opacity="0.5"/>
              <path d={`M0 ${-6*s} Q${3*s} ${-10*s} 0 ${-14*s} Q${-3*s} ${-10*s} 0 ${-6*s}`} fill={f.color} opacity="0.5" transform={`rotate(60 0 ${-6*s})`}/>
              <path d={`M0 ${-6*s} Q${3*s} ${-10*s} 0 ${-14*s} Q${-3*s} ${-10*s} 0 ${-6*s}`} fill={f.color} opacity="0.5" transform={`rotate(120 0 ${-6*s})`}/>
              <path d={`M0 ${-6*s} Q${3*s} ${-10*s} 0 ${-14*s} Q${-3*s} ${-10*s} 0 ${-6*s}`} fill={f.color} opacity="0.5" transform={`rotate(180 0 ${-6*s})`}/>
              <path d={`M0 ${-6*s} Q${3*s} ${-10*s} 0 ${-14*s} Q${-3*s} ${-10*s} 0 ${-6*s}`} fill={f.color} opacity="0.5" transform={`rotate(240 0 ${-6*s})`}/>
              <path d={`M0 ${-6*s} Q${3*s} ${-10*s} 0 ${-14*s} Q${-3*s} ${-10*s} 0 ${-6*s}`} fill={f.color} opacity="0.5" transform={`rotate(300 0 ${-6*s})`}/>
              <circle r={`${3.5*s}`} fill={f.color} opacity="0.65"/>
              <line x1="0" y1={`${-3*s}`} x2="0" y2={`${12*s}`} stroke="#6B8F71" strokeWidth="1" opacity="0.35" strokeLinecap="round"/>
            </g>
          )
        })}
      </svg>
    </div>
  )
}
