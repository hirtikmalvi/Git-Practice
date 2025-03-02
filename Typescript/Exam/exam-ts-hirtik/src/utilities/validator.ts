import {
  nameInputBox,
  idInputBox,
  departmentDropdown,
  salaryInputBox,
  tableBody,
  nameErrorSpan,
  idErrorSpan,
  departmentErrorSpan,
  salaryErrorSpan,
} from "./Input";
import {
  doesEmployeeExists,
  isDropdownNotSelected,
  isInputEmpty,
  isSalaryInRange,
} from "./utils";
export function validateInput(): boolean {
  nameErrorSpan.innerHTML = "";
  idErrorSpan.innerHTML = "";
  departmentErrorSpan.innerHTML = "";
  salaryErrorSpan.innerHTML = "";
  nameErrorSpan.innerHTML = "";

  if (isInputEmpty(nameInputBox)) {
    nameErrorSpan.innerHTML = "Name is required.";
    return false;
  }
  nameErrorSpan.innerHTML = "";
  if (isInputEmpty(idInputBox)) {
    idErrorSpan.innerHTML = "Employee ID is required.";
    return false;
  }
  if (doesEmployeeExists(idInputBox.value)) {
    idErrorSpan.innerHTML = "Employee ID must be unique.";
    return false;
  }
  idErrorSpan.innerHTML = "";
  if (isDropdownNotSelected(departmentDropdown)) {
    departmentErrorSpan.innerHTML = "Department is required.";
    return false;
  }
  departmentErrorSpan.innerHTML = "";
  if (isInputEmpty(salaryInputBox)) {
    salaryErrorSpan.innerHTML = "Salary is required.";
    return false;
  }
  if (
    !isSalaryInRange(Number(salaryInputBox.value), departmentDropdown.value)
  ) {
    salaryErrorSpan.innerHTML = "Invalid salary for the selected department.";
    return false;
  }
  salaryErrorSpan.innerHTML = "";
  return true;
}
