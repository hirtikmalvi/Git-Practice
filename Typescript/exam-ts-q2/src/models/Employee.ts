import { Department } from "../utilities/DepartmentEnum";

export interface Employee {
  id: string;
  name: string;
  department: Department;
  salary: number;
}
