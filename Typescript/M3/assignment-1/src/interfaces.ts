export interface Vacancy {
  id: number;
  title: string;
  description: string;
  skillsRequired: string;
  status: "open" | "closed";
}

export type applicantStatus =
  | "registered"
  | "applied"
  | "interviewed"
  | "hired"
  | "rejected";
export interface Applicant {
  id: number;
  name: string;
  email: string;
  phone: string;
  resume: string;
  status: applicantStatus;
}

export interface Interview {
  id: number;
  vacancyId: number;
  applicantId: number;
  date: string;
}
