//Inputs
export let nameInputBox = <HTMLInputElement>document.getElementById("employeeName");
export let idInputBox = <HTMLInputElement>document.getElementById("employeeId");
export let departmentDropdown = <HTMLSelectElement>(
  document.getElementById("employeeDepartment")
);
export let salaryInputBox = <HTMLInputElement>(
  document.getElementById("employeeSalary")
);

//Table Body
export let tableBody = <HTMLTableElement>(
  document.querySelector("#employeeTable tbody")
);

// Error
export let nameErrorSpan = <HTMLSpanElement>document.getElementById("nameError");
export let idErrorSpan = <HTMLSpanElement>document.getElementById("idError");
export let departmentErrorSpan = <HTMLSpanElement>(
  document.getElementById("departmentError")
);
export let salaryErrorSpan = <HTMLSpanElement>document.getElementById("salaryError");

// Button
export let addEmployeeBtn = (
  document.getElementById("addEmployeeButton") as HTMLButtonElement
);
export let updateEmployeeBtn = <HTMLButtonElement>(
  document.getElementById("updateEmployeeButton")
);

