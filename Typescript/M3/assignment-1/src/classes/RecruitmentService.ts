import { Applicant, Vacancy, Interview, applicantStatus } from "../interfaces";

export class RecruitmentService {
  private vacancies: Vacancy[] = [];
  private applicants: Applicant[] = [];
  private interviews: Interview[] = [];

  constructor() {
    this.getApplicantsFromLocalStorage();
    this.getVacanciesFromLocalStorage();
    this.getInterviewsFromLocalStorage();
  }

  // add vacancy
  addVacancy = (vacancy: Vacancy): void => {
    this.vacancies.push(vacancy);
    this.saveVacanciesToLocalStorage();
  };

  // get all vacancies
  get allVacancies(): Vacancy[] {
    return this.vacancies;
  }

  // update vacancy status
  updateVacancyStatus = (vacancyId: number): void => {
    let foundVacancy = this.vacancies.find(
      (vacancy) => vacancy.id === vacancyId
    );
    if (foundVacancy) {
      if (foundVacancy.status == "closed") {
        foundVacancy.status = "open";
        this.saveVacanciesToLocalStorage();
      } else {
        foundVacancy.status = "closed";
        this.saveVacanciesToLocalStorage();
      }
    }
  };

  // add applicant
  addApplicant = (applicant: Applicant): void => {
    this.applicants.push(applicant);
    this.saveApplicantsToLocalStorage();
  };

  //delete applicant
  deleteApplicant = (applicantId: number): void => {
    this.applicants = this.applicants.filter(
      (applicant) => applicant.id !== applicantId
    );
    this.saveApplicantsToLocalStorage();
  };

  // get all applicants
  get allApplicants(): Applicant[] {
    return this.applicants;
  }

  // delete interview
  deleteVacancy = (vacancyId: number): void => {
    this.vacancies = this.vacancies.filter(
      (vacancy) => vacancy.id !== vacancyId
    );
    this.saveVacanciesToLocalStorage();
  };

  // Update Applicant Status
  updateApplicantStatus = (
    applicantId: number,
    status: applicantStatus
  ): void => {
    let foundApplicant = this.applicants.find(
      (applicant) => applicant.id === applicantId
    );

    if (foundApplicant) {
      foundApplicant.status = status as applicantStatus;

      if (status === "hired") {
      }
      this.saveApplicantsToLocalStorage();
    }
  };

  // Schedule Interview
  addInterview = (interview: Interview): void => {
    this.interviews.push(interview);
    this.saveInterviewsToLocalStorage();
  };

  // get all interviews
  get allInterviews(): Interview[] {
    return this.interviews;
  }

  // delete interview
  deleteInterview = (interviewId: number): void => {
    this.interviews = this.interviews.filter(
      (interview) => interview.id !== interviewId
    );
    this.saveInterviewsToLocalStorage();
  };

  // get interview by applicant id
  getInterviewById = (interviewId: number): Interview | undefined => {
    let foundInterview = this.interviews.find(
      (interview) => interview.id === interviewId
    );
    return foundInterview;
  };

  // store applicant to local storage
  private saveApplicantsToLocalStorage = (): void => {
    localStorage.setItem("applicants", JSON.stringify(this.applicants));
  };

  // getting applicant data from local storage
  private getApplicantsFromLocalStorage = (): void => {
    const applicantsData = localStorage.getItem("applicants");
    if (applicantsData) this.applicants = JSON.parse(applicantsData);
  };

  // store vacancies to local storage
  private saveVacanciesToLocalStorage = (): void => {
    localStorage.setItem("vacancies", JSON.stringify(this.vacancies));
  };

  // getting vacancies data from local storage
  private getVacanciesFromLocalStorage = (): void => {
    const vacanciesData = localStorage.getItem("vacancies");
    if (vacanciesData) this.vacancies = JSON.parse(vacanciesData);
  };

  // store interviews to local storage
  private saveInterviewsToLocalStorage = (): void => {
    localStorage.setItem("interviews", JSON.stringify(this.interviews));
  };

  // getting interviews data from local storage
  private getInterviewsFromLocalStorage = (): void => {
    const interviewsData = localStorage.getItem("interviews");
    if (interviewsData) this.interviews = JSON.parse(interviewsData);
  };
}
