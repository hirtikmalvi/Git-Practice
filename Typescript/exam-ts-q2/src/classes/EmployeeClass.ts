import { Employee } from "../models/Employee";
import { Department } from "../utilities/DepartmentEnum";
export class EmployeeClass implements Employee {
  constructor(
    public id: string,
    public name: string,
    public department: Department,
    public salary: number
  ) {}
}
