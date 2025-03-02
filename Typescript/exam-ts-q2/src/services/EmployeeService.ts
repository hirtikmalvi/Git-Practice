import { EmployeeClass } from "../classes/EmployeeClass";

export class EmployeeService {
  private employees: EmployeeClass[] = [];

  addEmployee = (employee: EmployeeClass): void => {
    let doesEmployeeExists = this.employees.find((e) => e.id === employee.id);
    if (!doesEmployeeExists) {
      this.employees.push(employee);
    }
  };

  get viewEmployees(): EmployeeClass[] {
    return this.employees;
  }

  updateEmployee = (employee: EmployeeClass): void => {};

  deleteEmployee = (employeeId: string): void => {
    this.employees = this.employees.filter((emp) => emp.id !== employeeId);
  };
}
