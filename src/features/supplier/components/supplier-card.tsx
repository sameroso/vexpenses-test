import { Button, Card, CardContent, CardTitle } from "@/components/ui";
import { Supplier } from "@/services/suppliers";
import { useState } from "react";
import { SupplierForm } from "./supplier-form";
import { useEditSupplier } from "../api/edit-supplier";
import {
  FieldGroupTitle,
  FormFieldsContainer,
} from "./supplier-form-components";
import { states } from "@/utils/brazilian-states";

export const SupplierCard = (props: Supplier) => {
  const [isEditing, setIsEditing] = useState(false);
  const editSupplierMutation = useEditSupplier();
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardTitle>{props.name}</CardTitle>
        {isEditing ? (
          <Button
            onClick={() => {
              setIsEditing(false);
            }}
          >
            cancelar
          </Button>
        ) : (
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Editar
          </Button>
        )}
      </div>
      <CardContent style={{ overflowY: "auto" }}>
        {!isEditing ? (
          <>
            <FieldGroupTitle>Informações Pessoais</FieldGroupTitle>
            <FormFieldsContainer>
              <div>
                <div>Nome</div>
                <div>{props.name}</div>
              </div>
              <div>
                <div>Descrição</div>
                <div>{props.description}</div>
              </div>
            </FormFieldsContainer>
            <FieldGroupTitle>Endereço</FieldGroupTitle>
            <FormFieldsContainer>
              <div>
                <div>CEP</div>
                <div>{props.address.code}</div>
              </div>
              <div>
                <div>Cidade</div>
                <div>{props.address.city}</div>
              </div>
              <div>
                <div>Número</div>
                <div>{props.address.number}</div>
              </div>
              <div>
                <div>Logradouro</div>
                <div>{props.address.street}</div>
              </div>
              <div>
                <div>Estado</div>
                <div>
                  {
                    states.find((val) => val.uf === props.address.state || "")
                      ?.name
                  }
                </div>
              </div>
              <div>
                <div>Referência</div>
                <div>{props.address.reference}</div>
              </div>
            </FormFieldsContainer>
            <FieldGroupTitle>Contatos</FieldGroupTitle>

            <div
              style={{
                display: "flex",
                alignItems: "start",
                gap: "16px",
                flexWrap: "wrap",
              }}
            >
              {props.contact.map((contact) => (
                <div>
                  <div>
                    <div>{contact.name}</div>
                  </div>
                  <div>
                    <div>{contact.phone}</div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <SupplierForm supplier={props}>
            {({ handleSubmit }) => (
              <Button
                type="button"
                onClick={handleSubmit(async (data) => {
                  console.log(data);
                  try {
                    await editSupplierMutation.mutateAsync({
                      id: props.id,
                      supplier: { ...data, id: props.id },
                    });
                    setIsEditing(false);
                  } catch {
                    setIsEditing(false);
                  }
                })}
              >
                {editSupplierMutation.status === "pending"
                  ? "Carregando"
                  : "Salvar"}
              </Button>
            )}
          </SupplierForm>
        )}
      </CardContent>
    </Card>
  );
};
