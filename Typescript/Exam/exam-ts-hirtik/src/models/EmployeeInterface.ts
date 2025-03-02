import { Department } from "../Enums/DepartmentEnum";

export interface Employee {
  id: string;
  name: string;
  department: Department;
  salary: number;
}

export class EmployeeClass implements Employee {
  constructor(
    public id: string,
    public name: string,
    public department: Department,
    public salary: number
  ) {}
}
