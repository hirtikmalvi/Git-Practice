import { employeeServiceObject } from "../main";
import { Department } from "./DepartmentEnum";
export let isEmpIdUnique = (employeeId: string): boolean => {
  let isEmpExists = employeeServiceObject.viewEmployees.find(
    (employee) => employee.id === employeeId
  );
  if (isEmpExists === undefined) {
    return true;
  }
  if (isEmpExists) return false;
  else return true;
};

export let isInputEmpty = (input: HTMLInputElement): boolean => {
  return input.value === "";
};

export let isDepartmentNotSelected = (
  departmentDropdown: HTMLSelectElement
): boolean => {
  return departmentDropdown.value === "Select a department";
};

export let isSalaryInRange = (salary: number, department: string): boolean => {
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
  } else {
    return false;
  }
};
