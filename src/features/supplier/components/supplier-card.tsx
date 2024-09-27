import { Card, CardContent, CardTitle } from "@/components/ui";
import { Supplier } from "@/services/suppliers";
import {
  FieldGroupTitle,
  FormFieldsContainer,
} from "./supplier-form-components";
import { states } from "@/utils/brazilian-states";
import { Delete } from "@/components/ui/icons/delete";
import { Edit } from "@/components/ui/icons/edit";

export const SupplierCard = (props: {
  supplier?: Supplier;
  onClickEdit: (supplier: Supplier) => void;
  onClickDelete: (supplier: Supplier) => void;
}) => {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <CardTitle>{props.supplier?.name}</CardTitle>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Edit
            onClick={() => {
              props.onClickEdit(props.supplier!);
            }}
            id="editSuplier"
            tooltipContent="Editar Fornecedor"
          />
          <Delete
            onClick={() => {
              props.onClickDelete(props.supplier!);
            }}
            id="deleteSupplier"
            tooltipContent="Deletar Fornecedor"
          />
        </div>
      </div>
      <CardContent style={{ overflowY: "auto" }}>
        <>
          <FieldGroupTitle>Informações Pessoais</FieldGroupTitle>
          <FormFieldsContainer>
            <div>
              <div>Nome</div>
              <div>{props.supplier?.name}</div>
            </div>
            <div>
              <div>Descrição</div>
              <div>{props.supplier?.description}</div>
            </div>
          </FormFieldsContainer>
          <FieldGroupTitle>Endereço</FieldGroupTitle>
          <FormFieldsContainer>
            <div>
              <div>CEP</div>
              <div>{props.supplier?.address.code}</div>
            </div>
            <div>
              <div>Cidade</div>
              <div>{props.supplier?.address.city}</div>
            </div>
            <div>
              <div>Número</div>
              <div>{props.supplier?.address.number}</div>
            </div>
            <div>
              <div>Logradouro</div>
              <div>{props.supplier?.address.street}</div>
            </div>
            <div>
              <div>Estado</div>
              <div>
                {
                  states.find(
                    (val) => val.uf === props.supplier?.address.state || ""
                  )?.name
                }
              </div>
            </div>
            <div>
              <div>Referência</div>
              <div>{props.supplier?.address.reference}</div>
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
            {props.supplier?.contact.map((contact) => (
              <div key={contact.phone}>
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
      </CardContent>
    </Card>
  );
};
