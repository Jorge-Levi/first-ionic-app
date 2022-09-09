import Customer from "./Customer";

export function searchCustomer() {
  if (!localStorage["customers"]) {
    localStorage["customers"] = "[]";
  }

  let customers = localStorage["customers"];
  customers = JSON.parse(customers);

  return customers;
}

export function removeCustomer(id: string) {
  let customers = searchCustomer();
  let indexCustomer = customers.findIndex((customer: Customer) => customer.id == id);
  customers.splice(indexCustomer, 1);
  localStorage["customers"] = JSON.stringify(customers);
}

export function saveCustomer(customer: Customer) {
  let customers = searchCustomer();
  if (customer.id) {
    let indexCustomer = customers.findIndex((c: Customer) => c.id == customer.id);
    customers[indexCustomer] = customer;
} else {
    customer.id = String(Math.round(Math.random() * 100000));
    customers.push(customer);
  }
  localStorage["customers"] = JSON.stringify(customers);
}

export function searchCustomerById(id: any) {
  let customers = searchCustomer();
  return customers.find((customer: Customer) => customer.id == id);
}
