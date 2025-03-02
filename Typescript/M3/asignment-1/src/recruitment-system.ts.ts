import { User, UserRole, Applicant, Vacancy, InterviewResult } from "./types";
// recruitment-system.ts
class RecruitmentSystem {
  private vacancies: Map<string, Vacancy> = new Map();
  private applicants: Map<string, Applicant> = new Map();
  private interviewResults: Map<string, InterviewResult> = new Map();
  private auth: AuthService;

  constructor(auth: AuthService) {
    this.auth = auth;
  }

  // Role-based access control
  private checkPermission(allowedRoles: UserRole[]): boolean {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      throw new Error("User not authenticated");
    }
    if (!allowedRoles.includes(currentUser.role)) {
      throw new Error("Unauthorized access");
    }
    return true;
  }

  // Vacancy Management - HR Only
  createVacancy(vacancy: Omit<Vacancy, "id">): string {
    this.checkPermission([UserRole.HR]);
    const id = crypto.randomUUID();
    this.vacancies.set(id, { ...vacancy, id });
    this.updateVacanciesList();
    return id;
  }

  updateVacancy(id: string, vacancy: Partial<Vacancy>): void {
    this.checkPermission([UserRole.HR]);
    const existing = this.vacancies.get(id);
    if (existing) {
      this.vacancies.set(id, { ...existing, ...vacancy });
      this.updateVacanciesList();
    }
  }

  // Applicant Management
  submitApplication(
    application: Omit<Applicant, "id" | "status" | "interviewResults">
  ): string {
    this.checkPermission([UserRole.APPLICANT]);
    const id = crypto.randomUUID();
    const newApplicant: Applicant = {
      ...application,
      id,
      status: "applied",
      interviewResults: [],
    };
    this.applicants.set(id, newApplicant);
    this.updateApplicantsList();
    return id;
  }

  updateApplicantStatus(id: string, status: Applicant["status"]): void {
    this.checkPermission([UserRole.HR]);
    const applicant = this.applicants.get(id);
    if (applicant) {
      this.applicants.set(id, { ...applicant, status });
      this.updateApplicantsList();
    }
  }

  // Interview Management
  scheduleInterview(
    applicantId: string,
    interviewerId: string,
    date: Date
  ): string {
    this.checkPermission([UserRole.HR]);
    const id = crypto.randomUUID();
    const interview: InterviewResult = {
      id,
      applicantId,
      interviewerId,
      scheduledDate: date,
      status: "scheduled",
    };
    this.interviewResults.set(id, interview);

    const applicant = this.applicants.get(applicantId);
    if (applicant) {
      applicant.interviewResults.push(interview);
      applicant.status = "interviewing";
      this.updateApplicantsList();
    }

    this.updateInterviewsList();
    return id;
  }

  submitInterviewResult(id: string, feedback: string, rating: number): void {
    this.checkPermission([UserRole.INTERVIEWER]);
    const interview = this.interviewResults.get(id);
    if (interview) {
      const updated = {
        ...interview,
        feedback,
        rating,
        status: "completed" as const,
      };
      this.interviewResults.set(id, updated);
      this.updateInterviewsList();
    }
  }

  // Reports - HR Only
  generateReport(): string {
    this.checkPermission([UserRole.HR]);
    const report = {
      totalVacancies: this.vacancies.size,
      openVacancies: Array.from(this.vacancies.values()).filter((v) => v.isOpen)
        .length,
      totalApplicants: this.applicants.size,
      applicantsByStatus: Array.from(this.applicants.values()).reduce(
        (acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        },
        {} as Record<Applicant["status"], number>
      ),
      interviews: {
        total: this.interviewResults.size,
        completed: Array.from(this.interviewResults.values()).filter(
          (i) => i.status === "completed"
        ).length,
        scheduled: Array.from(this.interviewResults.values()).filter(
          (i) => i.status === "scheduled"
        ).length,
        cancelled: Array.from(this.interviewResults.values()).filter(
          (i) => i.status === "cancelled"
        ).length,
      },
    };

    return JSON.stringify(report, null, 2);
  }

  // View Methods - Available to all authenticated users
  getVacancies(): Vacancy[] {
    return Array.from(this.vacancies.values());
  }

  getApplicationStatus(applicantId: string): string {
    const applicant = this.applicants.get(applicantId);
    return applicant ? applicant.status : "not found";
  }
}
