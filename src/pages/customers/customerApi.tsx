export function searchCustomer(){
    if(!localStorage["customers"]){
        localStorage["customers"] = "[]";
    }

    let customers = localStorage["customers"];
    customers = JSON.parse(customers);

    return customers;
}

export function removeCustomer(){

}

export function saveCustomer(customer:any){
    let customers = searchCustomer();
    customers.push(customer);
    localStorage["customers"] = JSON.stringify(customers);
    
}