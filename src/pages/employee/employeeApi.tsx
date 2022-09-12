import Employee from "./Employee";

export function searchEmployee() {
  if (!localStorage["employees"]) {
    localStorage["employees"] = "[]";
  }

  let employees = localStorage["employees"];
  employees = JSON.parse(employees);

  return employees;
}

export function removeEmployee(id: string) {
  let employees = searchEmployee();
  let indexEmployee = employees.findIndex((employee: Employee) => employee.id == id);
  employees.splice(indexEmployee, 1);
  localStorage["employees"] = JSON.stringify(employees);
}

export function saveEmployee(employee: Employee) {
  let employees = searchEmployee();
  if (employee.id) {
    let indexEmployee = employees.findIndex((c: Employee) => c.id == employee.id);
    employees[indexEmployee] = employee;
} else {
    employee.id = String(Math.round(Math.random() * 100000));
    employees.push(employee);
  }
  localStorage["employees"] = JSON.stringify(employees);
}

export function searchEmployeeById(id: any) {
  let employees = searchEmployee();
  return employees.find((employee: Employee) => employee.id == id);
}
