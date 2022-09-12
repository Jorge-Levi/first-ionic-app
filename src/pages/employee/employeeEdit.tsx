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
  IonLabel,
  IonInput,
} from "@ionic/react";
import { useHistory, useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
import { add, checkmark, pencil, remove, trash } from "ionicons/icons";
import { removeEmployee, saveEmployee, searchEmployee, searchEmployeeById } from "./employeeApi";
import Employee from "./Employee";

const EmployeeEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const [employee, setEmployee] = useState<Employee>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== "new"){
      let result = searchEmployeeById(id);
      setEmployee(result);
    }
  };

  const save = () =>{
    saveEmployee(employee);
    history.push("/page/employees" );
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
            <IonTitle className="titulo">{(id === "new") ? "Agregar nuevo " : "Editar "} Empleado</IonTitle>
            <IonGrid>
              <IonRow>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput onIonChange={e=> employee.firstName = String(e.detail.value)} value = {employee.firstName} />
                  </IonItem>
                </IonCol>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput onIonChange={e=> employee.lastName = String(e.detail.value)} value = {employee.lastName}/>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput onIonChange={e=> employee.email = String(e.detail.value)} value = {employee.email} type="email" />
                  </IonItem>
                </IonCol>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Direccion</IonLabel>
                    <IonInput onIonChange={e=> employee.address = String(e.detail.value)} value = {employee.address} />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-lg="12" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Telefono</IonLabel>
                    <IonInput onIonChange={e=> employee.phone = String(e.detail.value)} value = {employee.phone} type="tel" />
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
            <IonItem>
              <IonButton
                color="success"
                fill="solid"
                slot="end"
                size="default"
                className="btnAddCliente"
                onClick={save}
              >
                <IonIcon icon={checkmark}></IonIcon>
                Guardar
              </IonButton>
            </IonItem>
          </IonCard>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default EmployeeEdit;
