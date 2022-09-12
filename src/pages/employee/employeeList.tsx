import {
  IonButtons,
  IonCard,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
import { add, pencil, remove, trash } from "ionicons/icons";
import { removeEmployee, saveEmployee, searchEmployee } from "./employeeApi";
import Employee from "./Employee";

const EmployeeList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [empleados, setEmpleados] = useState<Employee[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchEmployee();
    setEmpleados(result);
  };

  const eliminar = (id:any) =>{
    removeEmployee(id);
    search();
  };

  const pruebaLocalStorage = () => {
    const ejemplo = {
        id:"1",
        firstName:"Jorge Levi",
        lastName:"Tapia Lugardo",
        email:"tapialugardo29@gmail.com",
        phone:"7442310743",
        address:"Acapulco"
    }

    saveEmployee(ejemplo);
  }

  const addEmployee = () => {
    history.push("/page/employees/new");
  }

  const editEmployee = (id:string) => {
    history.push("/page/employees/:id");
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{name}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonCard>
            <IonTitle className="titulo">Gesiton de Empleados</IonTitle>
            <IonItem>
              <IonButton
                color="primary"
                fill="solid"
                slot="end"
                size="default"
                className="btnAddCliente"
                onClick={addEmployee}
              >
                <IonIcon icon={add}></IonIcon>
                Agregar Empleado
              </IonButton>
            </IonItem>
            <IonGrid className="table">
              <IonRow>
                <IonCol>Nombre</IonCol>
                <IonCol>Correo</IonCol>
                <IonCol>Telefono</IonCol>
                <IonCol>Direccion</IonCol>
                <IonCol>Acciones</IonCol>
              </IonRow>
              {empleados.map((employee: Employee) => (
                <IonRow>
                  <IonCol>{employee.firstName + " " + employee.lastName}</IonCol>
                  <IonCol>{employee.email}</IonCol>
                  <IonCol>{employee.phone}</IonCol>
                  <IonCol>{employee.address}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={() => editEmployee(String(employee.id))}>
                      <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton color="danger" fill="clear" onClick={() => eliminar(String(employee.id))}>
                      <IonIcon icon={trash} slot="icon-only"></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeList;
