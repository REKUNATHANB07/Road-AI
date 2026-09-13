import { DamageReportItem, MapMarker, FieldObservationItem } from "../types";

// Helper SVG road generation data URIs to ensure 100% offline reliability without broken image URLs
export const SAMPLE_ROAD_IMAGES = [
  {
    id: "sample-pothole",
    name: "Severe Pothole Cavity",
    caption: "Observed road surface damage",
    hint: "pothole",
    description: "Deep cavity in right wheel path of asphalt wearing course",
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <radialGradient id="asphalt" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="%233a3d44"/>
          <stop offset="100%" stop-color="%2322252a"/>
        </radialGradient>
        <radialGradient id="potholeDepth" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stop-color="%230f1115"/>
          <stop offset="70%" stop-color="%231a1d24"/>
          <stop offset="100%" stop-color="%23353942"/>
        </radialGradient>
        <pattern id="grain" width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="%234a4e57" opacity="0.4"/>
          <circle cx="7" cy="8" r="1.5" fill="%2315171b" opacity="0.6"/>
          <circle cx="8" cy="3" r="0.8" fill="%235c6370" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="800" height="500" fill="url(%23asphalt)"/>
      <rect width="800" height="500" fill="url(%23grain)"/>
      <!-- Road Markings -->
      <line x1="100" y1="20" x2="100" y2="480" stroke="%23ffffff" stroke-width="8" stroke-opacity="0.75"/>
      <line x1="700" y1="20" x2="700" y2="480" stroke="%23facc15" stroke-width="8" stroke-dasharray="35 30" stroke-opacity="0.8"/>
      <!-- Pothole cavity -->
      <ellipse cx="440" cy="280" rx="140" ry="85" fill="url(%23potholeDepth)"/>
      <!-- Irregular inner jagged cavity rim -->
      <path d="M 330 250 Q 360 210 420 220 T 520 240 Q 580 270 560 320 T 460 355 Q 380 360 340 330 Z" fill="%230a0c0f" opacity="0.9"/>
      <path d="M 345 255 Q 400 235 480 250 Q 540 280 520 315 Q 470 345 400 340 Z" fill="%2314171d"/>
      <circle cx="420" cy="290" r="12" fill="%232b2e38"/>
      <circle cx="460" cy="310" r="18" fill="%231f2229"/>
      <path d="M 520 250 L 590 230 M 550 320 L 610 340 M 340 330 L 290 360" stroke="%23111317" stroke-width="3" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "sample-crack",
    name: "Transverse & Fatigue Cracking",
    caption: "Observed road surface damage",
    hint: "crack",
    description: "Interconnected longitudinal and block fissures across driving lane",
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <radialGradient id="asphalt2" cx="50%" cy="50%" r="80%">
          <stop offset="0%" stop-color="%233e4249"/>
          <stop offset="100%" stop-color="%2326292f"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(%23asphalt2)"/>
      <!-- Road Markings -->
      <line x1="80" y1="250" x2="720" y2="250" stroke="%23ffffff" stroke-width="6" stroke-dasharray="40 35" stroke-opacity="0.7"/>
      <!-- Fissure crack network -->
      <path d="M 180 120 L 240 180 L 290 170 L 350 240 L 410 230 L 470 310 L 530 300 L 600 390 L 650 420" stroke="%230f1114" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      <path d="M 290 170 L 310 120 L 360 90" stroke="%2314171d" stroke-width="4" stroke-linecap="round" fill="none"/>
      <path d="M 350 240 L 330 300 L 270 330 L 240 400" stroke="%23111419" stroke-width="5" stroke-linecap="round" fill="none"/>
      <path d="M 470 310 L 490 380 L 450 430" stroke="%2315181e" stroke-width="4.5" stroke-linecap="round" fill="none"/>
      <path d="M 410 230 L 460 170 L 510 160 L 550 110" stroke="%23181c24" stroke-width="5" stroke-linecap="round" fill="none"/>
      <!-- Micro fissures -->
      <path d="M 380 235 L 395 260 M 335 285 L 360 295 M 500 305 L 530 340" stroke="%23222730" stroke-width="2.5" stroke-linecap="round" fill="none"/>
    </svg>`,
  },
  {
    id: "sample-uneven",
    name: "Uneven Surface & Ponding",
    caption: "Road damage and water accumulation",
    hint: "uneven",
    description: "Depressed road surface with noticeable water accumulation",
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <radialGradient id="asphalt3" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="%23383c44"/>
          <stop offset="100%" stop-color="%231e2126"/>
        </radialGradient>
        <radialGradient id="waterPuddle" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stop-color="%23476075" stop-opacity="0.85"/>
          <stop offset="60%" stop-color="%23233240" stop-opacity="0.95"/>
          <stop offset="100%" stop-color="%23161f26"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(%23asphalt3)"/>
      <!-- Curb edge -->
      <rect x="0" y="440" width="800" height="60" fill="%2364748b"/>
      <line x1="0" y1="440" x2="800" y2="440" stroke="%2394a3b8" stroke-width="4"/>
      <!-- Depression ponding puddle -->
      <path d="M 220 280 C 300 230, 480 220, 580 270 C 650 310, 620 380, 520 400 C 400 420, 260 410, 200 370 C 160 340, 180 300, 220 280 Z" fill="url(%23waterPuddle)"/>
      <!-- Puddle reflections and uneven ripples -->
      <ellipse cx="410" cy="310" rx="90" ry="25" fill="%23678da8" opacity="0.35"/>
      <path d="M 280 330 Q 360 315 440 335" stroke="%2393c5fd" stroke-width="2" fill="none" opacity="0.4"/>
      <path d="M 330 360 Q 420 345 500 365" stroke="%2393c5fd" stroke-width="1.8" fill="none" opacity="0.3"/>
      <!-- Broken asphalt around puddle -->
      <path d="M 180 290 L 150 270 M 580 270 L 630 250 M 520 400 L 560 430" stroke="%2313161c" stroke-width="4" stroke-linecap="round"/>
    </svg>`,
  },
  {
    id: "sample-edge",
    name: "Shoulder Edge Failure",
    caption: "Uneven/damaged road area",
    hint: "edge",
    description: "Lateral pavement edge break-off and shoulder erosion",
    svgUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
      <defs>
        <radialGradient id="asphalt4" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="%23383c44"/>
          <stop offset="100%" stop-color="%2322252a"/>
        </radialGradient>
      </defs>
      <rect width="800" height="500" fill="url(%23asphalt4)"/>
      <!-- Dirt / Gravel shoulder -->
      <path d="M 0 0 L 180 0 L 220 140 L 160 250 L 210 380 L 150 500 L 0 500 Z" fill="%23453b2f"/>
      <path d="M 0 0 L 160 0 L 195 140 L 140 250 L 185 380 L 130 500 L 0 500 Z" fill="%23362e24"/>
      <!-- White line cracked at edge -->
      <path d="M 230 0 L 230 110 M 215 150 L 215 230 M 240 270 L 240 370 M 225 390 L 225 500" stroke="%23ffffff" stroke-width="6" stroke-opacity="0.8"/>
      <!-- Jagged fracture boundary -->
      <path d="M 180 0 L 220 140 L 160 250 L 210 380 L 150 500" stroke="%23111317" stroke-width="8" fill="none"/>
    </svg>`,
  },
];

// Demo Field Observations (page 2)
export const INITIAL_FIELD_OBSERVATIONS: FieldObservationItem[] = [
  {
    id: "obs-001",
    caption: "Observed road surface damage",
    description: "Localized bituminous asphalt dislodgement with loose gravel. Noted in outer transit corridor during field inspection.",
    observedDate: "2026-09-10",
    locationTag: "Sector 4 - North Transit Arterial",
    imageUrl: SAMPLE_ROAD_IMAGES[0].svgUrl,
    surfaceType: "Flexible Bituminous Pavement",
    weatherCondition: "Dry / Post-Monsoon",
  },
  {
    id: "obs-002",
    caption: "Uneven/damaged road area",
    description: "Depression and shoulder edge drop-off observed along the outer lane boundary creating uneven vehicle wheel engagement.",
    observedDate: "2026-09-11",
    locationTag: "Crossway Avenue - Outer Ring Segment",
    imageUrl: SAMPLE_ROAD_IMAGES[3].svgUrl,
    surfaceType: "Semi-Dense Bituminous Concrete",
    weatherCondition: "Clear Daylight",
  },
  {
    id: "obs-003",
    caption: "Road damage and water accumulation",
    description: "Pavement subsidence allowing surface stormwater ponding. Impedes drainage cross-fall and poses hydroplaning risk.",
    observedDate: "2026-09-12",
    locationTag: "Sub-Arterial Road 12B - Lowpoint",
    imageUrl: SAMPLE_ROAD_IMAGES[2].svgUrl,
    surfaceType: "Mastic Asphalt Overlay",
    weatherCondition: "Damp / Intermittent Showers",
  },
];

// Demo Dashboard Data (page 6)
export const INITIAL_DASHBOARD_REPORTS: DamageReportItem[] = [
  {
    id: "REP-2026-041",
    damageType: "Pothole",
    severity: "Critical",
    priorityScore: 94,
    location: "Metro Arterial Expressway - KM 14.2",
    status: "Verified & Approved",
    date: "2026-09-12",
    verifiedBy: "Inspector R. Verma (Field Unit 2)",
    notes: "High vehicle speed corridor. Patching work order approved.",
  },
  {
    id: "REP-2026-039",
    damageType: "Pothole",
    severity: "High",
    priorityScore: 82,
    location: "Civil Lines Commercial Junction",
    status: "Pending Human Verification",
    date: "2026-09-12",
    notes: "Deep cavity in center driving lane. Awaiting engineering sign-off.",
  },
  {
    id: "REP-2026-038",
    damageType: "Crack",
    severity: "Medium",
    priorityScore: 58,
    location: "Sector 9 Secondary Access Road",
    status: "Pending Human Verification",
    date: "2026-09-11",
    notes: "Longitudinal fatigue crack along wheel track.",
  },
  {
    id: "REP-2026-035",
    damageType: "Uneven Surface",
    severity: "High",
    priorityScore: 76,
    location: "Industrial Corridor Ring Rd",
    status: "Verified & Adjusted",
    date: "2026-09-10",
    verifiedBy: "Sr. Eng. D. Patel",
    notes: "Subgrade settlement; upgraded priority due to heavy freight trucks.",
  },
  {
    id: "REP-2026-031",
    damageType: "Crack",
    severity: "Low",
    priorityScore: 32,
    location: "Greenwood Residential Loop",
    status: "Verified & Approved",
    date: "2026-09-09",
    verifiedBy: "Zone Surveyor A. Rao",
    notes: "Fine hairline cracks. Flagged for annual crack-fill cycle.",
  },
  {
    id: "REP-2026-028",
    damageType: "Edge Damage",
    severity: "Medium",
    priorityScore: 61,
    location: "Bypass Link Boulevard",
    status: "Pending Human Verification",
    date: "2026-09-08",
    notes: "Unsealed shoulder crumbling into drainage ditch.",
  },
  {
    id: "REP-2026-024",
    damageType: "Pothole",
    severity: "Critical",
    priorityScore: 91,
    location: "Central Bus Terminal Exit Way",
    status: "Verified & Approved",
    date: "2026-09-07",
    verifiedBy: "Inspector R. Verma (Field Unit 2)",
    notes: "Severe impact hazard for public transit buses.",
  },
  {
    id: "REP-2026-020",
    damageType: "Uneven Surface",
    severity: "Low",
    priorityScore: 28,
    location: "Parkview Sector 3 Cul-de-sac",
    status: "Verified & Approved",
    date: "2026-09-05",
    verifiedBy: "Zone Surveyor A. Rao",
    notes: "Minor surface roughness. Normal vehicular passage safe.",
  },
];

// Demo Map Markers (page 7)
export const DEMO_MAP_MARKERS: MapMarker[] = [
  {
    id: "MAP-01",
    title: "Cavity Breach near Flyover Ramp",
    damageType: "Pothole",
    severity: "Critical",
    priorityScore: 94,
    location: "Metro Expressway (North Section)",
    roadName: "National Highway Link 4",
    status: "Verified & Approved",
    xPercent: 32,
    yPercent: 28,
    reportedDate: "2026-09-12",
  },
  {
    id: "MAP-02",
    title: "Surface Depression with Storm Ponding",
    damageType: "Uneven Surface",
    severity: "High",
    priorityScore: 78,
    location: "Sub-Arterial Sector 12",
    roadName: "Ring Road Eastbound",
    status: "Pending Human Verification",
    xPercent: 68,
    yPercent: 36,
    reportedDate: "2026-09-12",
  },
  {
    id: "MAP-03",
    title: "Fatigue Block Cracking Network",
    damageType: "Crack",
    severity: "Medium",
    priorityScore: 56,
    location: "Civil Lines Market Circle",
    roadName: "Avenue Central",
    status: "Pending Human Verification",
    xPercent: 48,
    yPercent: 54,
    reportedDate: "2026-09-11",
  },
  {
    id: "MAP-04",
    title: "Shoulder Raveling & Edge Drop",
    damageType: "Edge Damage",
    severity: "Medium",
    priorityScore: 61,
    location: "Industrial By-lane 3",
    roadName: "Freight Spur Corridor",
    status: "Pending Human Verification",
    xPercent: 78,
    yPercent: 70,
    reportedDate: "2026-09-10",
  },
  {
    id: "MAP-05",
    title: "Transverse Hairline Cracking",
    damageType: "Crack",
    severity: "Low",
    priorityScore: 31,
    location: "Greenwood Residential Zone",
    roadName: "Pinecrest Way",
    status: "Verified & Approved",
    xPercent: 22,
    yPercent: 66,
    reportedDate: "2026-09-09",
  },
  {
    id: "MAP-06",
    title: "Multiple Cavities in Transit Lane",
    damageType: "Pothole",
    severity: "Critical",
    priorityScore: 92,
    location: "Central Depot Concourse",
    roadName: "Civic Transit Spine",
    status: "Verified & Approved",
    xPercent: 52,
    yPercent: 78,
    reportedDate: "2026-09-08",
  },
];
