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
import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { IonGrid, IonRow, IonCol, IonContent } from "@ionic/react";
import { add, pencil, trash } from "ionicons/icons";
import { saveCustomer, searchCustomer } from "./customerApi";

const CustomerList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [clientes, setClientes] = useState<any>([]);

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    let result = searchCustomer();
    setClientes(result);
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
                href="home"
                className="btnAddCliente"
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
              {clientes.map((cliente: any) => (
                <IonRow>
                  <IonCol>{cliente.firstName + " " + cliente.lastName}</IonCol>
                  <IonCol>{cliente.email}</IonCol>
                  <IonCol>{cliente.phone}</IonCol>
                  <IonCol>{cliente.address}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear">
                      <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton color="danger" fill="clear">
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
