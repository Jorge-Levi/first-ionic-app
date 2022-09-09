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
import { removeCustomer, saveCustomer, searchCustomer, searchCustomerById } from "./customerApi";
import Customer from "./Customer";

const CustomerEdit: React.FC = () => {
  const { name, id } = useParams<{ name: string; id: string }>();
  const [customer, setCustomer] = useState<Customer>({});
  const history = useHistory();

  useEffect(() => {
    search();
  }, []);

  const search = () => {
    if(id !== "new"){
      let result = searchCustomerById(id);
      setCustomer(result);
    }
  };

  const save = () =>{
    saveCustomer(customer);
    history.push("/page/customers" );
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
            <IonTitle className="titulo">{(id === "new") ? "Agregar nuevo " : "Editar "} Cliente</IonTitle>
            <IonGrid>
              <IonRow>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Nombre</IonLabel>
                    <IonInput onIonChange={e=> customer.firstName = String(e.detail.value)} value = {customer.firstName} />
                  </IonItem>
                </IonCol>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Apellido</IonLabel>
                    <IonInput onIonChange={e=> customer.lastName = String(e.detail.value)} value = {customer.lastName}/>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Email</IonLabel>
                    <IonInput onIonChange={e=> customer.email = String(e.detail.value)} value = {customer.email} type="email" />
                  </IonItem>
                </IonCol>
                <IonCol size-lg="6" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Direccion</IonLabel>
                    <IonInput onIonChange={e=> customer.address = String(e.detail.value)} value = {customer.address} />
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size-lg="12" size-xs="12">
                  <IonItem>
                    <IonLabel position="floating">Telefono</IonLabel>
                    <IonInput onIonChange={e=> customer.phone = String(e.detail.value)} value = {customer.phone} type="tel" />
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

export default CustomerEdit;
