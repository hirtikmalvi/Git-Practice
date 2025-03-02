// types.ts
export interface User {
  id: string;
  username: string;
  role: UserRole;
}

export enum UserRole {
  HR = "HR",
  APPLICANT = "APPLICANT",
  INTERVIEWER = "INTERVIEWER",
}

export interface Applicant {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume: string;
  appliedPosition: string;
  status: "applied" | "interviewing" | "rejected" | "hired";
  interviewResults: InterviewResult[];
}

export interface Vacancy {
  id: string;
  title: string;
  department: string;
  description: string;
  requirements: string;
  isOpen: boolean;
  createdAt: Date;
}

export interface InterviewResult {
  id: string;
  applicantId: string;
  interviewerId: string;
  scheduledDate: Date;
  status: "scheduled" | "completed" | "cancelled";
  feedback?: string;
  rating?: number;
}
