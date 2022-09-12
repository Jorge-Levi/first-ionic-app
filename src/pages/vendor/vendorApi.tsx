import Vendor from "./vendor";

export function searchVendor() {
  if (!localStorage["vendors"]) {
    localStorage["vendors"] = "[]";
  }

  let vendors = localStorage["vendors"];
  vendors = JSON.parse(vendors);

  return vendors;
}

export function removeVendor(id: string) {
  let vendors = searchVendor();
  let indexVendor = vendors.findIndex((employee: Vendor) => employee.id == id);
  vendors.splice(indexVendor, 1);
  localStorage["vendors"] = JSON.stringify(vendors);
}

export function saveVendor(employee: Vendor) {
  let vendors = searchVendor();
  if (employee.id) {
    let indexVendor = vendors.findIndex((c: Vendor) => c.id == employee.id);
    vendors[indexVendor] = employee;
} else {
    employee.id = String(Math.round(Math.random() * 100000));
    vendors.push(employee);
  }
  localStorage["vendors"] = JSON.stringify(vendors);
}

export function searchVendorById(id: any) {
  let vendors = searchVendor();
  return vendors.find((employee: Vendor) => employee.id == id);
}
