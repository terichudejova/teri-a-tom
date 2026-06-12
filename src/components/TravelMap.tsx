import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { FlowerRow } from './Decorations'

function SectionLabel({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 justify-center mb-6">
      <div className="w-8 h-px bg-gold/40" />
      <span className="text-xs uppercase tracking-[0.2em] text-gold/70 font-medium">{label}</span>
      <div className="w-8 h-px bg-gold/40" />
    </div>
  )
}

// ── Location data (coords x/y removed — now using real lat/lng) ──────────────

interface Location {
  id: string
  dates: string[]
  note?: 'home' | 'secondHome'
  emoji?: string
}

const LOCATIONS: Location[] = [
  { id: 'prague', dates: ['12/2019 – __present__'], note: 'home' },
  { id: 'stockholm', dates: ['01/2020'] },
  { id: 'vienna', dates: ['02/2020', '07/2021', '09/2023'] },
  { id: 'tatry', dates: ['03/2020 – __present__'], note: 'secondHome' },
  { id: 'bratislava', dates: ['06/2020'] },
  { id: 'kosice', dates: ['06/2020', '08/2025'] },
  { id: 'germany', dates: ['07/2020'] },
  { id: 'rome', dates: ['08/2020'] },
  { id: 'vatican', dates: ['08/2020'] },
  { id: 'turkey', dates: ['07/2021'] },
  { id: 'corfu', dates: ['07/2021', '06/2022', '06/2024'] },
  { id: 'vail', dates: ['01/2022', '01/2023', '01/2024', '02/2026'] },
  { id: 'denver', dates: ['01/2022', '01/2023', '01/2024', '02/2026'] },
  { id: 'playadelcarmen', dates: ['02/2022'] },
  { id: 'cozumel', dates: ['02/2022'] },
  { id: 'budapest', dates: ['04/2022'] },
  { id: 'bled', dates: ['07/2022'] },
  { id: 'mallorca', dates: ['08/2022'] },
  { id: 'newyork', dates: ['01/2023'] },
  { id: 'dresden', dates: ['02/2023'] },
  { id: 'krakow', dates: ['03/2023'] },
  { id: 'paris', dates: ['06/2023'] },
  { id: 'stgallenkirch', dates: ['07/2023'] },
  { id: 'lech', dates: ['07/2023'] },
  { id: 'zurich', dates: ['07/2023'] },
  { id: 'luzern', dates: ['07/2023'] },
  { id: 'bali', dates: ['09/2023'] },
  { id: 'perth', dates: ['09/2023'] },
  { id: 'rottnest', dates: ['09/2023'] },
  { id: 'cairns', dates: ['10/2025'], emoji: '🩷' },
  { id: 'sydney', dates: ['11/2025'] },
  { id: 'airlie', dates: ['11/2025'], emoji: '🩷' },
  { id: 'goldcoast', dates: ['11/2025'] },
  { id: 'byronbay', dates: ['11/2025'] },
  { id: 'chicago', dates: ['01/2024'] },
  { id: 'krkonose', dates: ['08/2024'] },
  { id: 'dubai', dates: ['05/2025'] },
  { id: 'doha', dates: ['05/2025'] },
  { id: 'finkenberg', dates: ['07/2025'], emoji: '💍' },
  { id: 'singapore', dates: ['10/2025', '11/2025'] },
  { id: 'galapagos', dates: ['01/2026'], emoji: '🩷' },
  { id: 'quito', dates: ['01/2026'] },
  { id: 'barcelona', dates: ['05/2026'] },
  { id: 'alicante', dates: ['05/2026'] },
  { id: 'madrid', dates: ['05/2026'] },
  { id: 'murcia', dates: ['05/2026'] },
  { id: 'helsinki', dates: ['05/2026'] },
  { id: 'tallinn', dates: ['05/2026'] },
]

// Real WGS84 coordinates for each location
const COORDS: Record<string, [number, number]> = {
  prague: [14.42, 50.08],
  stockholm: [18.07, 59.33],
  vienna: [16.37, 48.21],
  tatry: [20.08, 49.15],
  bratislava: [17.11, 48.15],
  kosice: [21.26, 48.72],
  germany: [9.18, 48.89],
  rome: [12.50, 41.90],
  vatican: [12.45, 41.90],
  turkey: [31.40, 36.50],
  corfu: [19.92, 39.62],
  vail: [-106.37, 39.64],
  denver: [-104.98, 39.74],
  playadelcarmen: [-87.08, 20.63],
  cozumel: [-86.95, 20.51],
  budapest: [19.04, 47.50],
  bled: [14.11, 46.37],
  mallorca: [2.65, 39.57],
  newyork: [-74.01, 40.71],
  dresden: [13.74, 51.05],
  krakow: [19.95, 50.06],
  paris: [2.35, 48.86],
  stgallenkirch: [9.97, 47.01],
  lech: [10.14, 47.21],
  zurich: [8.55, 47.38],
  luzern: [8.31, 47.05],
  bali: [115.09, -8.34],
  perth: [115.86, -31.95],
  rottnest: [115.52, -32.00],
  cairns: [145.78, -16.92],
  sydney: [151.21, -33.87],
  airlie: [148.72, -20.27],
  goldcoast: [153.43, -28.00],
  byronbay: [153.62, -28.64],
  chicago: [-87.63, 41.88],
  krkonose: [15.74, 50.73],
  dubai: [55.27, 25.20],
  doha: [51.53, 25.29],
  finkenberg: [11.87, 47.17],
  singapore: [103.82, 1.35],
  galapagos: [-89.61, -0.90],
  quito: [-78.52, -0.23],
  barcelona: [2.17, 41.38],
  alicante: [-0.48, 38.35],
  madrid: [-3.70, 40.42],
  murcia: [-1.13, 37.98],
  helsinki: [24.94, 60.17],
  tallinn: [24.75, 59.44],
}

// ── Photo placeholders ────────────────────────────────────────────────────────

// ── Photo counts per location — update when you add photos ───────────────────

const PHOTO_COUNTS: Record<string, number> = {
  prague: 115, stockholm: 9, vienna: 9, tatry: 36,
  bratislava: 6, kosice: 6, germany: 18, rome: 21,
  vatican: 3, turkey: 15, corfu: 36, vail: 21,
  denver: 15, playadelcarmen: 21, cozumel: 12, budapest: 24,
  bled: 18, mallorca: 12, newyork: 18, dresden: 12,
  krakow: 15, paris: 21, stgallenkirch: 24, lech: 18,
  zurich: 6, luzern: 9, bali: 18, perth: 21,
  rottnest: 21, cairns: 48, sydney: 33, airlie: 30,
  goldcoast: 24, byronbay: 33, chicago: 24, krkonose: 12,
  dubai: 48, doha: 18, finkenberg: 36, singapore: 30,
  galapagos: 52, quito: 12,
  barcelona: 30, alicante: 27, madrid: 24, murcia: 15,
  helsinki: 27, tallinn: 21,
}

function getPhotos(locationId: string): string[] {
  const count = PHOTO_COUNTS[locationId] ?? 0
  return Array.from({ length: count }, (_, i) =>
    `${import.meta.env.BASE_URL}assets/travel/${locationId}/photo-${i + 1}.jpeg`
  )
}

// ── Fade-in image with spinner ───────────────────────────────────────────────

function FadeImage({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [src])

  return (
    <div className="relative w-full h-full bg-sage/8 rounded-xl overflow-hidden">
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 rounded-full border-2 border-sage/20 border-t-sage/60 animate-spin" />
        </div>
      )}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl opacity-20">🏔</span>
        </div>
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease' }}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

// ── Location Modal ────────────────────────────────────────────────────────────

interface ModalProps {
  location: Location
  onClose: () => void
}

function LocationModal({ location, onClose }: ModalProps) {
  const { t } = useLanguage()
  const locData = t.travel.locations[location.id as keyof typeof t.travel.locations]
  const [carouselStart, setCarouselStart] = useState(0)
  const photos = getPhotos(location.id)
  const visible = photos.slice(carouselStart, carouselStart + 3)
  const canPrev = carouselStart > 0
  const canNext = carouselStart + 3 < photos.length

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-charcoal/70 backdrop-blur-sm" />
      <div
        className="relative bg-cream rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto z-10"
        onClick={e => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-charcoal/50 hover:text-charcoal transition-all text-sm"
          aria-label={t.travel.close}
        >✕</button>

        <div className="p-7 md:p-8">
          {/* Compact header */}
          <div className="flex items-start gap-3 mb-4 pr-8">
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3 className="font-serif text-2xl text-charcoal leading-tight">
                  {locData.name}
                </h3>
                <span className="text-gold/40">·</span>
                <span className="text-xs uppercase tracking-widest text-gold/55 font-medium shrink-0">
                  {locData.country}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {location.note && (
                  <span className="text-xs text-sage font-medium italic">
                    {location.note === 'home' ? t.travel.noteHome : t.travel.noteSecondHome} ·
                  </span>
                )}
                {location.dates.map((d, i) => (
                  <span key={i} className="text-xs bg-white border border-sage/15 text-charcoal/55 px-2.5 py-0.5 rounded-full font-light">
                    {d.replace('__present__', t.travel.present)}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {photos.length > 0 && (
            <>
              <div className="w-full h-px bg-sage/15 mb-4" />
              <div className="grid grid-cols-3 gap-3">
                {visible.map((src, i) => (
                  <div key={`${src}-${carouselStart + i}`} className="aspect-[3/4] rounded-xl overflow-hidden">
                    <FadeImage src={src} alt={`${locData.name} ${carouselStart + i + 1}`} />
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-3">
                <button
                  onClick={() => setCarouselStart(s => Math.max(0, s - 3))}
                  disabled={!canPrev}
                  className="w-8 h-8 rounded-full border border-sage/20 flex items-center justify-center text-charcoal/45 hover:text-charcoal hover:border-sage/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm"
                >←</button>
                <span className="text-xs text-charcoal/30 font-light">
                  {carouselStart + 1}–{Math.min(carouselStart + 3, photos.length)} / {photos.length}
                </span>
                <button
                  onClick={() => setCarouselStart(s => Math.min(photos.length - 3, s + 3))}
                  disabled={!canNext}
                  className="w-8 h-8 rounded-full border border-sage/20 flex items-center justify-center text-charcoal/45 hover:text-charcoal hover:border-sage/40 transition-all disabled:opacity-20 disabled:cursor-not-allowed text-sm"
                >→</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// ── D3 World Map ──────────────────────────────────────────────────────────────

interface WorldMapProps {
  locations: Location[]
  activeId: string | null
  onSelect: (loc: Location) => void
  t: ReturnType<typeof useLanguage>['t']
}

interface Cluster {
  ids: string[]
  cx: number
  cy: number
}

// Group pins that are within `threshold` SVG units of each other
// Uses complete-linkage: a pin joins a cluster only if it's within threshold of ALL members
function buildClusters(pins: Record<string, [number, number]>, threshold: number): Cluster[] {
  const ids = Object.keys(pins)
  // Start: each pin is its own cluster
  let clusters: string[][] = ids.map(id => [id])

  // Repeatedly merge clusters whose closest pair is within threshold
  let merged = true
  while (merged) {
    merged = false
    outer:
    for (let i = 0; i < clusters.length; i++) {
      for (let j = i + 1; j < clusters.length; j++) {
        // Check if ANY pin in cluster i is within threshold of ANY pin in cluster j
        for (const a of clusters[i]) {
          for (const b of clusters[j]) {
            const [ax, ay] = pins[a]
            const [bx, by] = pins[b]
            if (Math.sqrt((ax - bx) ** 2 + (ay - by) ** 2) < threshold) {
              // Merge j into i
              clusters[i] = [...clusters[i], ...clusters[j]]
              clusters.splice(j, 1)
              merged = true
              break outer
            }
          }
        }
      }
    }
  }

  return clusters.map(group => ({
    ids: group,
    cx: group.reduce((s, id) => s + pins[id][0], 0) / group.length,
    cy: group.reduce((s, id) => s + pins[id][1], 0) / group.length,
  }))
}

interface ViewBox { x: number; y: number; w: number; h: number }

function WorldMap({ locations, activeId, onSelect, t }: WorldMapProps) {
  const [ready, setReady] = useState(false)
  const [mapRegions, setMapRegions] = useState<Array<{ d: string, hasPin: boolean }>>([])
  const [pins, setPins] = useState<Record<string, [number, number]>>({})
  const [viewBox, setViewBox] = useState<ViewBox | null>(null)
  const [targetVB, setTargetVB] = useState<ViewBox | null>(null)
  const [zoomed, setZoomed] = useState(false)
  const [hoveredPinInfo, setHoveredPinInfo] = useState<{ id: string, cx: number, cy: number, name: string, country: string } | null>(null)
  const animRef = useRef<number | null>(null)

  const W = 1200
  const H = 600
  const DEFAULT_VB: ViewBox = { x: 0, y: 0, w: W, h: H }

  useEffect(() => {
    const loadScript = (src: string): Promise<void> =>
      new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) { resolve(); return }
        const s = document.createElement('script')
        s.src = src
        s.onload = () => resolve()
        s.onerror = reject
        document.head.appendChild(s)
      })

    Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js'),
      loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js'),
    ])
      .then(() => fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'))
      .then(r => r.json())
      .then((world: unknown) => {
        const d3 = (window as any).d3
        const topojson = (window as any).topojson

        const projection = d3.geoNaturalEarth1()
          .scale(220)
          .translate([W / 2, H / 2 + 20])

        const pathGen = d3.geoPath().projection(projection)
        const features = topojson.feature(world, (world as any).objects.countries).features
        const filtered = features.filter((f: any) => f.id !== '010')

        // ISO numeric codes of all visited countries (fallback for geoContains misses)
        const visitedISO = new Set([
          '203', // Czech Republic
          '752', // Sweden
          '040', // Austria
          '703', // Slovakia
          '276', // Germany
          '380', // Italy
          '336', // Vatican
          '792', // Turkey
          '300', // Greece
          '840', // USA
          '484', // Mexico
          '348', // Hungary
          '705', // Slovenia
          '724', // Spain
          '250', // France
          '756', // Switzerland
          '360', // Indonesia (Bali)
          '036', // Australia
          '616', // Poland
          '784', // UAE
          '634', // Qatar
          '702', // Singapore
          '218', // Ecuador
        ])

        const paths = filtered.map((f: any) => {
          const pathD: string = pathGen(f) ?? ''
          const isoMatch = visitedISO.has(String(f.id))
          let hasPin = isoMatch
          if (!hasPin) {
            try {
              hasPin = locations.some(loc => {
                const c = COORDS[loc.id]
                return c && f.geometry ? d3.geoContains(f, c) : false
              })
            } catch (e) {
              hasPin = false
            }
          }
          return { d: pathD, hasPin }
        })

        const computed: Record<string, [number, number]> = {}
        locations.forEach(loc => {
          const c = COORDS[loc.id]
          if (c) {
            const xy: [number, number] | null = projection(c)
            if (xy) computed[loc.id] = xy
          }
        })

        setMapRegions(paths)
        setPins(computed)
        setReady(true)
      })
      .catch(console.error)
  }, [])

  // Animate viewBox transition
  const animateTo = (target: ViewBox, from?: ViewBox) => {
    setTargetVB(target)  // set immediately so clusters recompute right away
    const start = from ?? viewBox ?? DEFAULT_VB
    const duration = 600
    const startTime = performance.now()

    const step = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p
      setViewBox({
        x: start.x + (target.x - start.x) * ease,
        y: start.y + (target.y - start.y) * ease,
        w: start.w + (target.w - start.w) * ease,
        h: start.h + (target.h - start.h) * ease,
      })
      if (p < 1) animRef.current = requestAnimationFrame(step)
    }
    if (animRef.current) cancelAnimationFrame(animRef.current)
    animRef.current = requestAnimationFrame(step)
  }

  const handleClusterClick = (cluster: Cluster) => {
    if (cluster.ids.length === 1) {
      const loc = locations.find(l => l.id === cluster.ids[0])
      if (loc) onSelect(loc)
      return
    }

    const xs = cluster.ids.map(id => pins[id][0])
    const ys = cluster.ids.map(id => pins[id][1])
    const cx = (Math.min(...xs) + Math.max(...xs)) / 2
    const cy = (Math.min(...ys) + Math.max(...ys)) / 2

    const currentW = (targetVB ?? viewBox ?? DEFAULT_VB).w
    const aspect = W / H

    // First zoom: divide by 5.0 to ensure states remain clearly visible but closer.
    // We don't need subsequent zooms because clustering will be disabled after the first zoom.
    const isFirstZoom = currentW >= W * 0.8
    const divisor = isFirstZoom ? 5.0 : 5.0

    const targetW = currentW / divisor
    const targetH = targetW / aspect

    animateTo({
      x: cx - targetW / 2,
      y: cy - targetH / 2,
      w: targetW,
      h: targetH,
    })
    setZoomed(true)
  }

  const handleZoomOut = () => {
    setTargetVB(DEFAULT_VB)
    animateTo(DEFAULT_VB)
    setZoomed(false)
  }

  const currentVB = viewBox ?? DEFAULT_VB
  const vbStr = `${currentVB.x} ${currentVB.y} ${currentVB.w} ${currentVB.h}`

  // Use targetVB for clustering so pins recompute immediately when zoom starts
  const effectiveVB = targetVB ?? viewBox ?? DEFAULT_VB
  const zoomScale = W / effectiveVB.w

  // Pin size scales inversely with zoom so pins stay readable
  const pinScale = 1 / zoomScale

  // After ~2nd zoom level (zoomScale > 6), always show individual pins
  // Below that, cluster so pins don't overlap
  const clusterThreshold = zoomScale > 6 ? 0 : (14 * pinScale) * 2.5
  const clusters = ready ? buildClusters(pins, clusterThreshold) : []

  return (
    <div className="relative w-full rounded-3xl overflow-hidden">
      <div className="relative w-full" style={{ paddingBottom: '50%' }}>
        {!ready && (
          <div className="absolute inset-0 flex items-center justify-center text-charcoal/30 text-sm font-light">
            Načítání mapy…
          </div>
        )}

        <svg
          viewBox={vbStr}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: ready ? 1 : 0, transition: 'opacity 0.6s ease' }}
        >
          <rect width={W} height={H} fill="transparent" />
          {mapRegions.map((cp, i) => (
            <path
              key={i}
              d={cp.d}
              fill={cp.hasPin ? '#CDBA9E' : '#F6F3EE'}
              fillOpacity="1"
              stroke="#FFFFFF"
              strokeWidth="0.8"
              className={cp.hasPin ? "transition-colors duration-1000" : ""}
            />
          ))}

          {clusters.map((cluster, ci) => {
            const { cx, cy, ids } = cluster
            const isCluster = ids.length > 1
            const isSingle = ids.length === 1
            const isActive = isSingle && activeId === ids[0]
            const ps = pinScale

            if (isCluster) {
              const r = 14 * ps
              const clusterEmojis = Array.from(new Set(ids.map(id => locations.find(l => l.id === id)?.emoji).filter(Boolean))) as string[]

              return (
                <g
                  key={`cluster-${ci}`}
                  transform={`translate(${cx}, ${cy})`}
                  onClick={() => handleClusterClick(cluster)}
                  style={{ cursor: 'pointer' }}
                >
                  {/* Outer ring */}
                  <circle r={r + 6 * ps} fill="#8B7355" fillOpacity="0.1" />
                  {/* Main circle */}
                  <circle r={r} fill="#8B7355" />
                  <circle r={r - 3 * ps} fill="white" fillOpacity="0.2" />
                  {/* Count */}
                  <text
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="white"
                    fontSize={`${11 * ps}px`}
                    fontWeight="600"
                    fontFamily="Inter, sans-serif"
                  >
                    {ids.length}
                  </text>

                  {/* Emoji Tags on Cluster */}
                  {clusterEmojis.map((em, i) => {
                    const bgR = 9 * ps
                    // Place tags around the top-right rim
                    const angle = -Math.PI / 4 + i * 0.45
                    const ex = (r + 1 * ps) * Math.cos(angle)
                    const ey = (r + 1 * ps) * Math.sin(angle)
                    return (
                      <g key={i} transform={`translate(${ex}, ${ey})`} style={{ filter: `drop-shadow(0 ${1 * ps}px ${2 * ps}px rgba(0,0,0,0.25))` }}>
                        <circle r={bgR} fill="white" />
                        <text y={`${1 * ps}px`} fontSize={`${11 * ps}px`} textAnchor="middle" dominantBaseline="middle">{em}</text>
                      </g>
                    )
                  })}
                </g>
              )
            }

            // Single pin
            const locId = ids[0]
            const locObj = locations.find(l => l.id === locId)
            const emoji = locObj?.emoji
            const locData = t.travel.locations[locId as keyof typeof t.travel.locations]

            const pw = 14 * ps
            const ph = 18 * ps
            return (
              <g
                key={`pin-${ids[0]}`}
                transform={`translate(${cx - pw / 2}, ${cy - ph})`}
                onClick={() => handleClusterClick(cluster)}
                onMouseEnter={() => setHoveredPinInfo({ id: locId, cx, cy: cy - ph, name: locData.name, country: locData.country })}
                onMouseLeave={() => setHoveredPinInfo(null)}
                style={{ cursor: 'pointer' }}
              >
                <path
                  d={`M${pw / 2} 0C${pw * 0.224} 0 0 ${ph * 0.224} 0 ${ph * 0.5}c0 ${ph * 0.375} ${pw / 2} ${ph * 0.8} ${pw / 2} ${ph * 0.8}S${pw} ${ph * 0.875} ${pw} ${ph * 0.5}C${pw} ${ph * 0.224} ${pw * 0.776} 0 ${pw / 2} 0z`}
                  fill={isActive ? '#103615' : '#8B7355'}
                  opacity={isActive ? 1 : 0.95}
                  style={{ filter: isActive ? `drop-shadow(0 ${2 * ps}px ${4 * ps}px rgba(16,54,21,0.6))` : `drop-shadow(0 ${2 * ps}px ${4 * ps}px rgba(139,115,85,0.3))` }}
                />
                <circle cx={pw / 2} cy={ph * 0.39} r={pw * 0.28} fill="white" fillOpacity="0.9" />

                {/* Emoji Tag on Single Pin */}
                {emoji && (
                  <g
                    transform={`translate(${pw}, ${-ph * 0.1})`}
                    style={{ filter: `drop-shadow(0 ${1 * ps}px ${2 * ps}px rgba(0,0,0,0.25))` }}
                  >
                    <circle r={9 * ps} fill="white" />
                    <text y={`${1 * ps}px`} fontSize={`${11 * ps}px`} textAnchor="middle" dominantBaseline="middle">
                      {emoji}
                    </text>
                  </g>
                )}
              </g>
            )
          })}
        </svg>

        {/* Hover Tooltip for Single Pins */}
        {hoveredPinInfo && (
          <div
            className="absolute pointer-events-none z-20 flex flex-col items-center animate-[fade-in_150ms_ease-out_both]"
            style={{
              left: `${((hoveredPinInfo.cx - currentVB.x) / currentVB.w) * 100}%`,
              top: `${((hoveredPinInfo.cy - currentVB.y) / currentVB.h) * 100}%`,
              transform: 'translate(-50%, -100%)',
              marginTop: '-4px'
            }}
          >
            <div className="bg-charcoal text-white px-3 py-1.5 rounded-md shadow-xl whitespace-nowrap flex items-baseline gap-1.5">
              <span className="font-serif text-[15px]">{hoveredPinInfo.name}</span>
              <span className="text-white/60 font-light text-[10px] uppercase tracking-wider">{hoveredPinInfo.country}</span>
            </div>
            <div className="w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-l-transparent border-r-transparent border-t-charcoal" />
          </div>
        )}

        {/* Zoom out button */}
        {zoomed && (
          <button
            onClick={handleZoomOut}
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 text-xs text-charcoal/70 font-medium border border-sage/15 hover:bg-white hover:text-charcoal transition-all flex items-center gap-2 shadow-sm"
          >
            ← {t.travel.zoomOut ?? 'Zpět'}
          </button>
        )}
      </div>
    </div>
  )
}

// ── Main Section ──────────────────────────────────────────────────────────────

// ── Hourglass flip ────────────────────────────────────────────────────────────

function HourglassFlip() {
  const [phase, setPhase] = useState(0)

  useEffect(() => {
    const durations = [1500, 1500, 1500, 1000]
    let current = 0
    let t: ReturnType<typeof setTimeout>
    const run = () => {
      t = setTimeout(() => {
        current = (current + 1) % 4
        setPhase(current)
        run()
      }, durations[current])
    }
    run()
    return () => clearTimeout(t)
  }, [])

  // phase 0: ⏳ at 180deg = sand on top
  // phase 1: ⏳ at 0deg   = sand flowing
  // phase 2: ⌛ at 0deg   = sand on bottom
  // phase 3: ⌛ at 180deg = rotating back up (animated)
  const configs: Record<number, { emoji: string; rotation: string; transition: string }> = {
    0: { emoji: '⏳', rotation: 'rotate(0deg)', transition: 'none' },
    1: { emoji: '⏳', rotation: 'rotate(180deg)', transition: 'none' },
    2: { emoji: '⌛', rotation: 'rotate(0deg)', transition: 'none' },
    3: { emoji: '⌛', rotation: 'rotate(180deg)', transition: 'transform 1s ease-in-out' },
  }

  const { emoji, rotation, transition } = configs[phase]

  return (
    <span
      className="text-2xl select-none inline-block"
      style={{ transform: rotation, transition }}
    >
      {emoji}
    </span>
  )
}

export default function TravelMap() {
  const { t } = useLanguage()
  const [activeLocation, setActiveLocation] = useState<Location | null>(null)

  return (
    <section id="travel" className="py-24 md:py-32 bg-white relative overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12 md:mb-16">
          <SectionLabel label={t.travel.sectionTitle} />
          <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-6">
            {t.travel.heading}
          </h2>
          <p
            className="max-w-2xl mx-auto text-charcoal/65 text-lg leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: t.travel.description }}
          />
          <p className="mt-4 text-charcoal/35 text-sm font-light italic">
            {t.travel.clickHint}
          </p>
          <p className="md:hidden mt-3 text-charcoal/70 text-sm font-medium leading-relaxed">
            {t.travel.desktopHint}
          </p>
        </div>

        <WorldMap
          locations={LOCATIONS}
          activeId={activeLocation?.id ?? null}
          onSelect={setActiveLocation}
          t={t}
        />

        {/* Stats badge */}
        <div className="flex justify-center mt-5 mb-2">
          <div className="bg-cream rounded-full px-5 py-2 text-xs font-light whitespace-nowrap shadow-sm border border-sage/10 text-charcoal/50">
            {t.travel.stats}
          </div>
        </div>

        <div className="mt-10 md:mt-12 mb-4 text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-gold/60 font-medium mb-3">
            {t.travel.quoteHeading}
          </p>
          <h3 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">
            {t.travel.quoteSubheading}
          </h3>

          <div className="flex justify-center mb-10">
            <HourglassFlip />
          </div>

          <div className="relative bg-cream rounded-3xl px-8 py-10 md:px-14 md:py-12 mb-6 shadow-sm border border-sage/10">
            <div className="text-6xl font-serif text-gold/10 absolute top-4 left-6 leading-none select-none">"</div>
            <blockquote className="font-serif italic text-2xl md:text-3xl text-gold/85 leading-relaxed">
              {t.travel.quote}
            </blockquote>
            <div className="text-6xl font-serif text-gold/10 absolute bottom-0 right-6 leading-none select-none rotate-180">"</div>
          </div>

          <p
            className="text-charcoal/50 text-base font-light leading-relaxed [&_strong]:font-medium [&_strong]:text-charcoal"
            dangerouslySetInnerHTML={{ __html: t.travel.quoteNote }}
          />

        </div>
      </div>
      <FlowerRow className="opacity-60 mt-2 -mb-20 md:mt-8 md:-mb-20 scale-[1.1] md:scale-100" />
      {activeLocation && (
        <LocationModal
          location={activeLocation}
          onClose={() => setActiveLocation(null)}
        />
      )}
    </section>
  )
}
