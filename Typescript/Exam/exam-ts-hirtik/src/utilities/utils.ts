import { Department } from "../Enums/DepartmentEnum";
import { employeeServiceObj } from "../main";

export function isInputEmpty(input: HTMLInputElement): boolean {
  return input.value === "";
}

export function isDropdownNotSelected(dropdown: HTMLSelectElement): boolean {
  return dropdown.value === "Select a department";
}

export function doesEmployeeExists(employeeId: string): boolean {
  let doesExists = employeeServiceObj.viewEmployees.some(
    (employee) => employee.id === employeeId
  );
  return doesExists;
}

export function isSalaryInRange(salary: number, department: string): boolean {
  if (
    department === Department.Engineering &&
    salary >= 50000 &&
    salary <= 200000
  ) {
    return true;
  } else if (
    department === Department.HR &&
    salary >= 30000 &&
    salary <= 100000
  ) {
    return true;
  } else if (
    department === Department.Sales &&
    salary >= 40000 &&
    salary <= 150000
  ) {
    return true;
  }
  return false;
}
