export enum RiskLevel {
  NONE, // Initial state
  SAFE, // Low risk
  MEDIUM_RISK, // Medium risk
  HIGH_RISK, // High risk
}

export interface AnswerOption {
  text: string;
  score: number;
}

export interface Question {
  id: string;
  section: string;
  text: string;
  options: AnswerOption[];
}

export interface StudentInfo {
  fullName: string;
  className: string;
  school: string;
  province: string;
}

export interface StudentData extends StudentInfo {
  id: string; // unique id for each submission
  score: number;
  riskLevel: RiskLevel;
  riskLevelName: string;
  timestamp: number;
}
