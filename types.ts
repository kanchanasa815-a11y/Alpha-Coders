
export interface ConsultationRequest {
  symptoms: string;
  duration: string;
  age: string;
  gender: string;
  conditions: string;
  medications: string;
  allergies: string;
  language?: string;
}

export interface ConsultationResponse {
  summary: string;
  possibleConditions: {
    condition: string;
    likelihood: 'low' | 'medium' | 'high';
    explanation: string;
  }[];
  suggestedMedications: {
    name: string;
    dosage: string;
    sideEffects: string;
    precautions: string;
  }[];
  redFlags: string[];
  lifestyleTips: string[];
  whenToSeeDoctor: string;
}

export interface HealthMetric {
  parameter: string;
  value: string;
  unit: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'caution';
}

export interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  avatar?: string;
}

export interface ReportAnalysis {
  id: string;
  date: string;
  patientName: string;
  reportType: string;
  language: string;
  metrics: HealthMetric[];
  simplifiedSummary: string;
  potentialConcerns: { 
    condition: string; 
    severity: 'low' | 'medium' | 'high'; 
    solution: string;
    suggestedMedications?: string[];
  }[];
  recommendations: string[];
  medicalTermsExplained: { term: string; explanation: string }[];
  originalText?: string;
  healthScore?: number; // 0-100 score calculated based on metrics
}

export interface ReportFile {
  id: string;
  name: string;
  type: 'image' | 'pdf';
  dataUrl: string;
  uploadDate: string;
  analysis?: ReportAnalysis;
  memberId?: string;
}

export interface VoiceConfig {
  language: string;
  voiceName: 'Kore' | 'Puck' | 'Charon' | 'Fenrir' | 'Zephyr';
}
