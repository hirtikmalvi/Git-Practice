interface Vacancy {
    id: number;
    title: string;
    description: string;
    isOpen: boolean;
}

interface Application {
    id: number;
    vacancyId: number;
    applicantName: string;
    applicantEmail: string;
    resume: string;
    status: ApplicationStatus;
    interviewDate?: Date;
    interviewResult?: InterviewResult;
}

enum ApplicationStatus {
    APPLIED = "Applied",
    SCREENING = "Screening",
    INTERVIEW_SCHEDULED = "Interview Scheduled",
    INTERVIEWED = "Interviewed",
    HIRED = "Hired",
    REJECTED = "Rejected"
}

enum InterviewResult {
    PASS = "Pass",
    FAIL = "Fail",
    PENDING = "Pending"
}

class RecruitmentSystem {
    private vacancies: Vacancy[] = [];
    private applications: Application[] = [];
    private currentRole: 'hr' | 'applicant' | null = null;

    constructor() {
        this.initializeEventListeners();
    }

    private initializeEventListeners(): void {
        // Initialize any event listeners here
    }

    // HR Methods
    public createVacancy(title: string, description: string): void {
        if (this.currentRole !== 'hr') return;

        const vacancy: Vacancy = {
            id: this.vacancies.length + 1,
            title,
            description,
            isOpen: true
        };
        this.vacancies.push(vacancy);
        this.updateVacanciesList();
    }

    public scheduleInterview(applicationId: number, date: Date): void {
        if (this.currentRole !== 'hr') return;

        const application = this.applications.find(app => app.id === applicationId);
        if (application) {
            application.status = ApplicationStatus.INTERVIEW_SCHEDULED;
            application.interviewDate = date;
            this.updateApplicationsList();
        }
    }

    public updateInterviewResult(applicationId: number, result: InterviewResult): void {
        if (this.currentRole !== 'hr') return;

        const application = this.applications.find(app => app.id === applicationId);
        if (application) {
            application.interviewResult = result;
            application.status = result === InterviewResult.PASS ? 
                ApplicationStatus.HIRED : ApplicationStatus.REJECTED;
            this.updateApplicationsList();
        }
    }

    public generateReport(): string {
        if (this.currentRole !== 'hr') return '';

        let report = 'Recruitment System Report\n\n';
        report += `Total Vacancies: ${this.vacancies.length}\n`;
        report += `Total Applications: ${this.applications.length}\n`;
        report += `Hired Candidates: ${this.applications.filter(app => app.status === ApplicationStatus.HIRED).length}\n`;
        
        return report;
    }

    // Applicant Methods
    public submitApplication(vacancyId: number, name: string, email: string, resume: string): void {
        if (this.currentRole !== 'applicant') return;

        const application: Application = {
            id: this.applications.length + 1,
            vacancyId,
            applicantName: name,
            applicantEmail: email,
            resume,
            status: ApplicationStatus.APPLIED
        };
        this.applications.push(application);
        this.updateApplicationsList();
    }

    public getApplicantApplications(email: string): Application[] {
        return this.applications.filter(app => app.applicantEmail === email);
    }

    // UI Update Methods
    private updateVacanciesList(): void {
        const vacanciesDiv = document.getElementById('vacanciesList');
        if (!vacanciesDiv) return;

        vacanciesDiv.innerHTML = this.vacancies
            .map(vacancy => `
                <div class="vacancy">
                    <h4>${vacancy.title}</h4>
                    <p>${vacancy.description}</p>
                    <p>Status: ${vacancy.isOpen ? 'Open' : 'Closed'}</p>
                </div>
            `).join('');
    }

    private updateApplicationsList(): void {
        const applicationsDiv = document.getElementById('applicationsList');
        if (!applicationsDiv) return;

        applicationsDiv.innerHTML = this.applications
            .map(app => `
                <div class="application">
                    <h4>Applicant: ${app.applicantName}</h4>
                    <p>Status: ${app.status}</p>
                    ${app.interviewDate ? `<p>Interview Date: ${app.interviewDate.toLocaleDateString()}</p>` : ''}
                    ${app.interviewResult ? `<p>Result: ${app.interviewResult}</p>` : ''}
                </div>
            `).join('');
    }

    // Login Method
    public login(role: 'hr' | 'applicant'): void {
        this.currentRole = role;
        document.getElementById('loginSection')?.classList.add('hidden');
        if (role === 'hr') {
            document.getElementById('hrSection')?.classList.remove('hidden');
            document.getElementById('applicantSection')?.classList.add('hidden');
        } else {
            document.getElementById('hrSection')?.classList.add('hidden');
            document.getElementById('applicantSection')?.classList.remove('hidden');
        }
        this.updateVacanciesList();
        this.updateApplicationsList();
    }
}

// Initialize the system
const recruitmentSystem = new RecruitmentSystem();

// Global functions for HTML interaction
function login(): void {
    const roleSelect = document.getElementById('roleSelect') as HTMLSelectElement;
    recruitmentSystem.login(roleSelect.value as 'hr' | 'applicant');
}

function createVacancy(): void {
    const titleInput = document.getElementById('jobTitle') as HTMLInputElement;
    const descriptionInput = document.getElementById('jobDescription') as HTMLInputElement;
    recruitmentSystem.createVacancy(titleInput.value, descriptionInput.value);
    titleInput.value = '';
    descriptionInput.value = '';
}

function submitApplication(): void {
    const nameInput = document.getElementById('applicantName') as HTMLInputElement;
    const emailInput = document.getElementById('applicantEmail') as HTMLInputElement;
    const resumeInput = document.getElementById('applicantResume') as HTMLTextAreaElement;
    
    // Assuming applying to the first vacancy for simplicity
    recruitmentSystem.submitApplication(1, nameInput.value, emailInput.value, resumeInput.value);
    
    nameInput.value = '';
    emailInput.value = '';
    resumeInput.value = '';
}

function generateReport(): void {
    const reportsSection = document.getElementById('reportsSection');
    if (reportsSection) {
        reportsSection.innerHTML = `<pre>${recruitmentSystem.generateReport()}</pre>`;
    }
}