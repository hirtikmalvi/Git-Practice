import { RecruitmentSystem } from "./recruitment.service";
import { AuthService } from "./auth.service";
import { UserRole } from "./types";

export function initializeUI(
  recruitmentSystem: RecruitmentSystem,
  auth: AuthService
) {
  // Initialize event handlers
  document.getElementById("loginForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = (document.getElementById("username") as HTMLInputElement)
      .value;
    const role = (document.getElementById("role") as HTMLSelectElement)
      .value as UserRole;
    auth.login(username, role);
  });

  document.getElementById("logoutButton")?.addEventListener("click", () => {
    auth.logout();
  });

  // Add other event handlers...
}
