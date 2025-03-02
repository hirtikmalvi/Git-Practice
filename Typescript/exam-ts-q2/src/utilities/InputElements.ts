// Input elements
export let employeeNameBox = <HTMLInputElement>(
  document.getElementById("employeeName")
);
export let employeeIdBox = <HTMLInputElement>(
  document.getElementById("employeeId")
);
export let employeeDepartmentDropdown = <HTMLSelectElement>(
  document.getElementById("employeeDepartment")
);
export let employeeSalaryBox = <HTMLInputElement>(
  document.getElementById("employeeSalary")
);
export let addEmployeeBtn = <HTMLInputElement>(
  document.getElementById("addEmployeeButton")
);

// Error
export let nameErrorSpan = <HTMLSpanElement>(
  document.getElementById("nameError")
);
export let idErrorSpan = <HTMLSpanElement>document.getElementById("idError");
export let departmentErrorSpan = <HTMLSpanElement>(
  document.getElementById("departmentError")
);
export let salaryErrorSpan = <HTMLSpanElement>(
  document.getElementById("salaryError")
);

// Table
export let tableBody = <HTMLTableElement>(
  document.querySelector("#employeeTable tbody")
);
