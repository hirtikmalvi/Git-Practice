import { EmployeeClass } from "../models/EmployeeInterface";

export class EmployeeService {
  private employees: EmployeeClass[] = [];

  addEmployee = (employee: EmployeeClass): void => {
    this.employees.push(employee);
  };

  get viewEmployees(): EmployeeClass[] {
    return this.employees;
  }

  updateEmployee = (employee: EmployeeClass): void => {
    let foundEmployee = this.employees.find((emp) => emp.id === employee.id);
    if (foundEmployee) {
      foundEmployee.name = employee.name;
      foundEmployee.department = employee.department;
      foundEmployee.salary = employee.salary;
    }
  };

  deleteEmployee = (employeeId: string): void => {
    this.employees = this.employees.filter(
      (employee) => employee.id != employeeId
    );
  };
}
