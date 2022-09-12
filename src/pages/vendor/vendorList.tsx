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
import { removeVendor, saveVendor, searchVendor } from "./vendorApi";
import Vendor from "./vendor";

const VendorList: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const history = useHistory();

  useEffect(() => {
    search();
  }, [history.location.pathname]);

  const search = () => {
    let result = searchVendor();
    setVendors(result);
  };

  const eliminar = (id:any) =>{
    removeVendor(id);
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

    saveVendor(ejemplo);
  }

  const addVendor = () => {
    history.push("/page/vendor/new");
  }

  const editVendor = (id:string) => {
    history.push("/page/vendors/:id");
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
            <IonTitle className="titulo">Gesiton de Proovedores</IonTitle>
            <IonItem>
              <IonButton
                color="primary"
                fill="solid"
                slot="end"
                size="default"
                className="btnAddEmpleado"
                onClick={addVendor}
              >
                <IonIcon icon={add}></IonIcon>
                Agregar Proveedor
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
              {vendors.map((vendor: Vendor) => (
                <IonRow>
                  <IonCol>{vendor.firstName + " " + vendor.lastName}</IonCol>
                  <IonCol>{vendor.email}</IonCol>
                  <IonCol>{vendor.phone}</IonCol>
                  <IonCol>{vendor.address}</IonCol>
                  <IonCol>
                    <IonButton color="primary" fill="clear" onClick={() => editVendor(String(vendor.id))}>
                      <IonIcon icon={pencil} slot="icon-only"></IonIcon>
                    </IonButton>
                    <IonButton color="danger" fill="clear" onClick={() => eliminar(String(vendor.id))}>
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

export default VendorList;
