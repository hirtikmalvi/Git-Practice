import { Department } from "./Enums/DepartmentEnum";
import { EmployeeClass } from "./models/EmployeeInterface";
import { EmployeeService } from "./services/EmployeeService";
import {
  addEmployeeBtn,
  updateEmployeeBtn,
  tableBody,
  departmentDropdown,
  idInputBox,
  nameInputBox,
  salaryInputBox,
} from "./utilities/Input";
import { validateInput } from "./utilities/validator";

export let employeeServiceObj = new EmployeeService();

export let displayTable = (): void => {
  let tableRows = "";
  employeeServiceObj.viewEmployees.forEach((employee) => {
    let row = `
        <tr>
          <td>${employee.name}</td>
          <td>${employee.id}</td>
          <td>${employee.department}</td>
          <td>${employee.salary}</td>
          <td>
            <button id="edit${employee.id}">Edit</button>
          </td>
          <td>
            <button id="delete${employee.id}">Delete</button>
          </td>
        </tr>
    `;
    tableRows += row;
  });
  tableBody.innerHTML = tableRows;

  //Delete and Edit
  employeeServiceObj.viewEmployees.forEach((employee) => {
    document
      .getElementById(`delete${employee.id}`)
      ?.addEventListener("click", () => {
        if (confirm("Want to delete?")) {
          employeeServiceObj.deleteEmployee(employee.id);
          displayTable();
          alert("Deleted");
        }
      });

    document
      .getElementById(`edit${employee.id}`)
      ?.addEventListener("click", (e) => {
        e.stopImmediatePropagation();
        addEmployeeBtn.style.display = "none";
        updateEmployeeBtn.style.display = "block";

        nameInputBox.value = employee.name;
        idInputBox.value = employee.id;
        departmentDropdown.value = employee.department;
        salaryInputBox.value = employee.salary.toString();

        updateEmployeeBtn.addEventListener("click", (e) => {
          e.stopImmediatePropagation();
          if (validateInput()) {
            let employeeObj: EmployeeClass = {
              id: employee.id,
              name: nameInputBox.value,
              department:
                Department[departmentDropdown.value as keyof typeof Department],
              salary: Number(salaryInputBox.value),
            };
            employeeServiceObj.updateEmployee(employeeObj);
            nameInputBox.value = "";
            idInputBox.value = "";
            departmentDropdown.value = "Select a department";
            salaryInputBox.value = "";
            alert("Updated");
            displayTable();
            updateEmployeeBtn.style.display = "none";
            addEmployeeBtn.style.display = "block";
          }
        });
      });
  });
};
displayTable();

addEmployeeBtn.addEventListener("click", (e) => {
  e.stopImmediatePropagation();

  if (validateInput()) {
    let selectedDepartment = departmentDropdown.value;
    let employeeObj: EmployeeClass = {
      id: idInputBox.value,
      name: nameInputBox.value,
      department: Department[selectedDepartment as keyof typeof Department],
      salary: Number(salaryInputBox.value),
    };
    employeeServiceObj.addEmployee(employeeObj);
    console.log("Employee Added", employeeObj);
    displayTable();
    nameInputBox.value = "";
    idInputBox.value = "";
    departmentDropdown.value = "Select a department";
    salaryInputBox.value = "";
    displayTable();
  }
});
