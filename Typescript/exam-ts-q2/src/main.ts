import { EmployeeClass } from "./classes/EmployeeClass";
import { EmployeeService } from "./services/EmployeeService";
import { Department } from "./utilities/DepartmentEnum";
import {
  employeeNameBox,
  employeeIdBox,
  employeeDepartmentDropdown,
  employeeSalaryBox,
  addEmployeeBtn,
  nameErrorSpan,
  idErrorSpan,
  departmentErrorSpan,
  salaryErrorSpan,
  tableBody,
} from "./utilities/InputElements";

import {
  isInputEmpty,
  isEmpIdUnique,
  isDepartmentNotSelected,
  isSalaryInRange,
} from "./utilities/utilities";
// Emp Service Obj
export let employeeServiceObject = new EmployeeService();

employeeServiceObject.viewEmployees.forEach((emp) => {
  document.getElementById(`delete${emp.id}`)?.addEventListener("click", () => {
    employeeServiceObject.deleteEmployee(emp.id);
    displayTable();
  });

  document.getElementById(`edit${emp.id}`)?.addEventListener("click", () => {
    employeeNameBox.value = emp.name;
    employeeIdBox.value = emp.id;
    employeeDepartmentDropdown.value = emp.department;
    employeeSalaryBox.value = emp.salary.toString();
  });
});

// Display Table
let displayTable = () => {
  let tableRows = "";
  employeeServiceObject.viewEmployees.forEach((employee) => {
    console.log(employee);
    let row = `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.id}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
          <td id="edit${employee.id}"><button id="edit${employee.id}">Update</button></td>
          <td><button id="delete${employee.id}">Delete</button></td>
        </tr>
    `;
    tableRows += row;
  });
  tableBody.innerHTML = tableRows;
};
displayTable();

// Add Employee
addEmployeeBtn.addEventListener("click", () => {
  if (isInputEmpty(employeeNameBox)) {
    nameErrorSpan.innerHTML = "Name is required.";
  } else if (isInputEmpty(employeeIdBox)) {
    idErrorSpan.innerHTML = "Employee ID is required.";
  } else if (!isEmpIdUnique(employeeIdBox.value)) {
    idErrorSpan.innerHTML = "Employee ID must be unique.";
  } else if (isDepartmentNotSelected(employeeDepartmentDropdown)) {
    departmentErrorSpan.innerHTML = "Department is required";
  } else if (isInputEmpty(employeeSalaryBox)) {
    salaryErrorSpan.innerHTML = "Salary is required";
  } else if (
    !isSalaryInRange(
      Number(employeeSalaryBox.value),
      employeeDepartmentDropdown.value
    )
  ) {
    salaryErrorSpan.innerHTML = "Invalid salary for the selected department.";
  } else {
    let departmentTemp = employeeDepartmentDropdown.value;
    const departmentEnum =
      Department[departmentTemp as keyof typeof Department];

    let employee: EmployeeClass = {
      id: employeeIdBox.value,
      name: employeeNameBox.value,
      department: departmentEnum,
      salary: Number(employeeSalaryBox.value),
    };
    nameErrorSpan.innerHTML = "";
    idErrorSpan.innerHTML = "";
    departmentErrorSpan.innerHTML = "";
    salaryErrorSpan.innerHTML = "";
    employeeServiceObject.addEmployee(employee);

    employeeNameBox.value = "";
    employeeIdBox.value = "";
    employeeDepartmentDropdown.value = "Select a department";
    employeeSalaryBox.value = "";
    alert("Employee Added");
    displayTable();
  }
});
