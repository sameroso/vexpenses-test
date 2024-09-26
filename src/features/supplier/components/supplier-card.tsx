import { Button, Card, CardContent, CardTitle } from "@/components/ui";
import { Supplier } from "@/services/suppliers";
import { useState } from "react";
import { SupplierForm } from "./supplier-form";
import { useEditSupplier } from "../api/edit-supplier";

export const SupplierCard = (props: Supplier) => {
  const [isEditing, setIsEditing] = useState(false);
  const editSupplierMutation = useEditSupplier();
  return (
    <Card>
      <CardTitle>{props.name}</CardTitle>
      <Button
        onClick={() => {
          setIsEditing(true);
        }}
      >
        Editar
      </Button>
      <Button
        onClick={() => {
          setIsEditing(false);
        }}
      >
        cancelar
      </Button>
      <CardContent>
        {!isEditing ? (
          <>
            <div>{props.id}</div>
            <div>Address</div>
            <div>{props.address.city}</div>
            <div>{props.address.code}</div>
            <div>{props.address.number}</div>
            <div>{props.address.reference}</div>
            <div>{props.address.state}</div>
            <div>{props.address.street}</div>
            <div>contact</div>
            <div>
              {props.contact.map((contact) => (
                <div>
                  <div>{contact.name}</div>
                  <div>{contact.phone}</div>
                </div>
              ))}
            </div>
            <div>description</div>
            <div>{props.description}</div>
          </>
        ) : (
          <SupplierForm
            {...props}
            onSubmit={(data) => {
              editSupplierMutation.mutate({
                id: props.id,
                supplier: { ...data, id: props.id },
              });
            }}
          />
        )}
      </CardContent>
    </Card>
  );
};
