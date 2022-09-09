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
import { removeCustomer, saveCustomer, searchCustomer } from "./customerApi";
import Customer from "./Customer";

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clientes, setClientes] = useState<Customer[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchCustomer();
    setClientes(result);
  };

  const eliminar = (id:any) =>{
    removeCustomer(id);
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

    saveCustomer(ejemplo);
  }

  const addCustomer = () => {
    history.push("/page/customer/new");
  }

  const editCustomer = (id:string) => {
    history.push("/page/customer/:id");
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
            <IonTitle className="titulo">Gesiton de Clientes</IonTitle>
            <IonItem>
              <IonButton
                color="primary"
                fill="solid"
                slot="end"
                size="default"
                className="btnAddCliente"
                onClick={addCustomer}
              >
                <IonIcon icon={add}></IonIcon>
                Agregar Cliente
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
              {clientes.map((cliente: Customer) => (
                <IonRow>
                  <IonCol>{cliente.firstName + " " + cliente.lastName}</IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={() => editCustomer(String(cliente.id))}>
                      <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton color="danger" fill="clear" onClick={() => eliminar(String(cliente.id))}>
                      <IonIcon icon={trash} slot="icon-only"></IonIcon>
                    </IonButton>
                  </IonCol>
                </IonRow>
              ))}
            </IonGrid>
          </IonCard>
          <IonButton onClick={pruebaLocalStorage} color="primary" fill="clear">
            <IonIcon icon={pencil}></IonIcon>Prube Local Storage
          </IonButton>
        </IonContent>
      </IonContent>
    </IonPage>
  );
};

export default CustomerList;
