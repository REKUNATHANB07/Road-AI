export type DamageType = "Pothole" | "Crack" | "Uneven Surface" | "Edge Damage" | "No Obvious Damage";

export type SeverityLevel = "Low" | "Medium" | "High" | "Critical";

export type VerificationStatus = "Pending Human Verification" | "Verified & Approved" | "Verified & Adjusted" | "Rejected";

export interface BoundingBox {
  ymin: number; // 0 to 1000
  xmin: number;
  ymax: number;
  xmax: number;
}

export interface DamageIssue {
  name: string;
  description: string;
  approximateLocation: string;
  box2d?: [number, number, number, number];
}

export interface DecisionFactors {
  damageSeverityWeight: number; // 0-100
  roadConditionWeight: number; // 0-100
  trafficSafetyImpactWeight: number; // 0-100
}

export interface AnalysisResult {
  id: string;
  damageType: DamageType;
  severity: SeverityLevel;
  confidencePercent: number; // Prototype AI confidence
  priorityScore: number; // 0-100 prototype decision-support score
  potentialSafetyImpact: string;
  roadConditionRating: "Good" | "Fair" | "Poor" | "Severe";
  identifiedIssues: DamageIssue[];
  decisionFactors: DecisionFactors;
  aiAssessmentSummary: string;
  recommendedAction: string;
  location: string;
  timestamp: string;
  verificationStatus: VerificationStatus;
  verifiedBy?: string;
  verificationNotes?: string;
  imageUrl?: string;
  isSimulated?: boolean;
  note?: string;
}

export interface DamageReportItem {
  id: string;
  damageType: DamageType;
  severity: SeverityLevel;
  priorityScore: number;
  location: string;
  status: VerificationStatus;
  date: string;
  verifiedBy?: string;
  notes?: string;
  imageUrl?: string;
  coordinates?: { lat: number; lng: number };
}

export interface MapMarker {
  id: string;
  title: string;
  damageType: DamageType;
  severity: SeverityLevel;
  priorityScore: number;
  location: string;
  status: VerificationStatus;
  xPercent: number; // 0-100 for SVG GIS grid
  yPercent: number; // 0-100
  roadName: string;
  reportedDate: string;
}

export interface FieldObservationItem {
  id: string;
  caption: string;
  description: string;
  observedDate: string;
  locationTag: string;
  imageUrl: string;
  surfaceType: string;
  weatherCondition: string;
}
