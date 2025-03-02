import { User, UserRole, Applicant, Vacancy, InterviewResult } from "./types";
// auth.ts
class AuthService {
  private currentUser: User | null = null;

  login(username: string, role: UserRole): void {
    this.currentUser = {
      id: crypto.randomUUID(),
      username,
      role,
    };
    this.updateUIForRole();
  }

  logout(): void {
    this.currentUser = null;
    this.updateUIForRole();
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  private updateUIForRole(): void {
    const hrElements = document.querySelectorAll(".hr-only");
    const applicantElements = document.querySelectorAll(".applicant-only");
    const interviewerElements = document.querySelectorAll(".interviewer-only");
    const loginSection = document.getElementById("loginSection");
    const mainContent = document.getElementById("mainContent");

    if (!this.currentUser) {
      if (loginSection) loginSection.style.display = "block";
      if (mainContent) mainContent.style.display = "none";
      return;
    }

    if (loginSection) loginSection.style.display = "none";
    if (mainContent) mainContent.style.display = "block";

    hrElements.forEach((el) => {
      (el as HTMLElement).style.display =
        this.currentUser?.role === UserRole.HR ? "block" : "none";
    });

    applicantElements.forEach((el) => {
      (el as HTMLElement).style.display =
        this.currentUser?.role === UserRole.APPLICANT ? "block" : "none";
    });

    interviewerElements.forEach((el) => {
      (el as HTMLElement).style.display =
        this.currentUser?.role === UserRole.INTERVIEWER ? "block" : "none";
    });
  }
}
