import { RecruitmentService } from "./classes/RecruitmentService";
import { Applicant, Vacancy, Interview, applicantStatus } from "./interfaces";

// Input fields for vacancies
const vacancyIdInput = document.getElementById("vacancyid") as HTMLInputElement;
const vacancyTitleInput = document.getElementById(
  "vacancytitle"
) as HTMLInputElement;
const vacancyDescriptionInput = document.getElementById(
  "vacancydescription"
) as HTMLInputElement;
const vacancySkillsRequiredInput = document.getElementById(
  "vacancyskillrequired"
) as HTMLInputElement;

// Button for adding vacancies
const addVacancyButton = document.getElementById(
  "addVacancy"
) as HTMLButtonElement;

// Table body for vacancies
const vacanciesTableBody = document.querySelector(
  "#vacanciesTable tbody"
) as HTMLTableElement;

// Input fields for applicants
const applicantIdInput = document.getElementById(
  "applicantid"
) as HTMLInputElement;
const applicantNameInput = document.getElementById(
  "applicantname"
) as HTMLInputElement;
const applicantEmailInput = document.getElementById(
  "applicantemail"
) as HTMLInputElement;
const applicantPhoneInput = document.getElementById(
  "applicantphone"
) as HTMLInputElement;
const applicantResumeInput = document.getElementById(
  "applicantresume"
) as HTMLInputElement;

// Button for adding applicants
const addApplicantButton = document.getElementById(
  "addApplicant"
) as HTMLButtonElement;

// Table body for applicants
const applicantsTableBody = document.querySelector(
  "#applicantsTable tbody"
) as HTMLTableElement;

// Input fields for applying to vacancy
const vacancyApplyInput = document.getElementById(
  "vacancyApply"
) as HTMLInputElement;
const applicantApplyInput = document.getElementById(
  "applicantApply"
) as HTMLInputElement;
const interviewDateInput = document.getElementById(
  "interviewDate"
) as HTMLInputElement;

// Button for applying to vacancy
const applyForVacancyButton = document.getElementById(
  "applyForVacancyBtn"
) as HTMLButtonElement;

const interviewsTableBody = document.querySelector(
  "#interviewsTable tbody"
) as HTMLTableElement;

// RecruitmentService Object
let recruitmentServiceObj = new RecruitmentService();

//Display Vacancies
function displayVacancies(): void {
  let tableRows: string = "";
  recruitmentServiceObj.allVacancies.forEach((vacancy: Vacancy) => {
    let row = `
        <tr>
          <td>${vacancy.id}</td>
          <td>${vacancy.title}</td>
          <td>${vacancy.description}</td>
          <td>${vacancy.skillsRequired}</td>
          <td>${vacancy.status}</td>
          <td>
              <button id="updateVacancyId${vacancy.id}">${
      vacancy.status == "closed" ? "Open" : "Close"
    }</button>
          </td>
          <td>
              <button id="deleteVacancy${vacancy.id}">
                Delete
              </button>
          </td>
        </tr>
    `;
    tableRows += row;
  });
  vacanciesTableBody.innerHTML = tableRows;

  recruitmentServiceObj.allVacancies.forEach((vacancy: Vacancy) => {
    document
      .getElementById(`deleteVacancy${vacancy.id}`)
      ?.addEventListener("click", () => {
        recruitmentServiceObj.deleteVacancy(vacancy.id);
        displayVacancies();
      });

    document
      .getElementById(`updateVacancyId${vacancy.id}`)
      ?.addEventListener("click", () => {
        recruitmentServiceObj.updateVacancyStatus(vacancy.id);
        displayVacancies();
      });
  });
}
displayVacancies();

//Display Applicants
function displayApplicants(): void {
  let tableRows: string = "";
  recruitmentServiceObj.allApplicants.forEach((applicant: Applicant) => {
    let row = `
        <tr>
          <td>${applicant.id}</td>
          <td>${applicant.name}</td>
          <td>${applicant.email}</td>
          <td>${applicant.phone}</td>
          <td>${applicant.resume}</td>
          <td>${applicant.status}</td>
          <td>
              <button id="deleteApplicantId${applicant.id}">
                Delete
              </button>
          </td>
        </tr>
    `;
    tableRows += row;
  });
  applicantsTableBody.innerHTML = tableRows;

  recruitmentServiceObj.allApplicants.forEach((applicant: Applicant) => {
    document
      .getElementById(`deleteApplicantId${applicant.id}`)
      ?.addEventListener("click", () => {
        recruitmentServiceObj.deleteApplicant(applicant.id);
        displayApplicants();
      });
  });
}
displayApplicants();

function displayInterviews(): void {
  let tableRows: string = "";
  recruitmentServiceObj.allInterviews.forEach((interview: Interview) => {
    let row = `
        <tr>
          <td>${interview.id}</td>
          <td>${interview.applicantId}</td>
          <td>${interview.vacancyId}</td>
          <td>${interview.date}</td>
          <td>
            <button id="deleteInterview${interview.id}">Delete</button>
          </td>
          <td>
            <select id="changeInterviewStatus${interview.id}">
              <option value="applied">Applied</option>
              <option value="interviewed">Interviewed</option>
              <option value="hired">Hired</option>
              <option value="rejected">Rejected</option>
            </select>
          </td>
        </tr>
    `;
    tableRows += row;
  });
  interviewsTableBody.innerHTML = tableRows;

  recruitmentServiceObj.allInterviews.forEach((interview) => {
    //delete
    document
      .getElementById(`deleteInterview${interview.id}`)
      ?.addEventListener("click", () => {
        recruitmentServiceObj.deleteInterview(interview.id);
        displayInterviews();
      });

    // change status dropdown
    let dropdownStatus = document.getElementById(
      `changeInterviewStatus${interview.id}`
    ) as HTMLSelectElement;

    let dropdownValue = dropdownStatus.value as applicantStatus;

    dropdownStatus?.addEventListener("click", () => {
      recruitmentServiceObj.updateApplicantStatus(
        interview.applicantId,
        dropdownValue
      );
      displayApplicants();
    });
  });
}
displayInterviews();

addVacancyButton.addEventListener("click", () => {
  let vacancyObj: Vacancy = {
    id: Number(vacancyIdInput.value),
    title: vacancyTitleInput.value,
    description: vacancyDescriptionInput.value,
    skillsRequired: vacancySkillsRequiredInput.value,
    status: "open",
  };

  //add
  recruitmentServiceObj.addVacancy(vacancyObj);
  displayVacancies();

  vacancyIdInput.value = "";
  vacancyTitleInput.value = "";
  vacancyDescriptionInput.value = "";
  vacancySkillsRequiredInput.value = "";
});

addApplicantButton.addEventListener("click", () => {
  let applicantObj: Applicant = {
    id: Number(applicantIdInput.value),
    name: applicantNameInput.value,
    email: applicantEmailInput.value,
    phone: applicantPhoneInput.value,
    resume: applicantResumeInput.value,
    status: "registered",
  };

  //add
  recruitmentServiceObj.addApplicant(applicantObj);
  displayApplicants();

  applicantIdInput.value = "";
  applicantNameInput.value = "";
  applicantEmailInput.value = "";
  applicantPhoneInput.value = "";
  applicantResumeInput.value = "";
});

applyForVacancyButton.addEventListener("click", () => {
  let interviewObj: Interview = {
    id: Date.now(),
    vacancyId: Number(vacancyApplyInput.value),
    applicantId: Number(applicantApplyInput.value),
    date: interviewDateInput.value,
  };

  //add
  recruitmentServiceObj.addInterview(interviewObj);
  displayInterviews();

  vacancyApplyInput.value = "";
  applicantApplyInput.value = "";
  interviewDateInput.value = "";
});
