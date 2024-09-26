import { useFieldArray, useForm, UseFormReturn } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Supplier } from "@/services/suppliers";
import {  ReactNode } from "react";
import { Button } from "@/components/ui";
import { useGetAddressByCep } from "@/features/common/adress/api/get-adress-by-cep";
import { Input } from "@/components/ui/inputs/input";
import {
  FieldGroupTitle,
  FormFieldsContainer,
} from "./supplier-form-components";
import { Select } from "@/components/ui/inputs/select";
import { states } from "@/utils/brazilian-states";

const schema = yup
  .object({
    name: yup.string().required("Este campo é obrigatório"),
    description: yup.string(),
    contact: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("Este campo é obrigatório"),
          phone: yup.string().required("Este campo é obrigatório"),
        })
      )
      .required(),
    address: yup
      .object({
        code: yup.string().required("Este campo é obrigatório"),
        state: yup.string().required("Este campo é obrigatório").min(2).max(2),
        city: yup
          .string()
          .required("Este campo é obrigatório")
          .matches(/^[a-zA-Z\s]+$/, "Este campo deve conter apenas letras"),
        street: yup
          .string()
          .required("Este campo é obrigatório")
          .matches(/[A-Za-z0-9]/),
        number: yup
          .string()
          .required("Este campo é obrigatório")
          .matches(/[0-9]/),
        reference: yup.string(),
      })
      .required(),
  })
  .required();

interface SupplierFormProps {
  supplier?: Partial<Supplier>;
  children?: (props: UseFormReturn<Omit<Supplier, "id">>) => ReactNode;
}

export function SupplierForm(props: SupplierFormProps) {
  const formArgs = useForm<Omit<Supplier, "id">>({
    defaultValues: !props.supplier?.contact?.length
      ? { ...props.supplier, ...{ contact: [{ name: "", phone: "" }] } }
      : props.supplier,
    resolver: yupResolver(schema),
  });

  const {
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = formArgs;

  const cep = watch("address.code") || "";

  useGetAddressByCep({
    cep,
    queryConfig: { enabled: cep.length === 8 },

    onSuccess: (res) => {
      setValue("address.city", res.data.localidade);
      setValue("address.state", res.data.uf);
      setValue("address.street", res.data.logradouro);
    },
  });

  const { fields, append } = useFieldArray({
    control: control,
    name: "contact",
    rules: { minLength: 1 },
  });

  return (
    <form>
      <FieldGroupTitle>Informações Pessoais</FieldGroupTitle>
      <FormFieldsContainer>
        <Input
          {...register("name")}
          label="Nome"
          errorMessage={errors.name?.message}
          autoComplete="off"
        />

        <Input
          {...register("description")}
          label="Descrição"
          errorMessage={errors.description?.message}
          autoComplete="off"
        />
      </FormFieldsContainer>

      <FieldGroupTitle>Endereço</FieldGroupTitle>
      <FormFieldsContainer>
        <Input
          {...register("address.code")}
          label="CEP"
          errorMessage={errors.address?.code?.message}
          autoComplete="off"
        />

        <Input
          {...register("address.city")}
          label="Cidade"
          disabled
          errorMessage={errors.address?.city?.message}
          autoComplete="off"
        />

        <Input
          {...register("address.number")}
          label="Número"
          errorMessage={errors.address?.number?.message}
          autoComplete="off"
        />

        <Input
          {...register("address.street")}
          label="Logradouro"
          disabled
          errorMessage={errors.address?.street?.message}
          autoComplete="off"
        />

        <Select
          {...register("address.state")}
          disabled
          options={states.map((state) => ({
            label: state.name,
            value: state.uf,
          }))}
          label="Estado"
          errorMessage={errors.address?.state?.message}
          autoComplete="off"
        />

        <Input
          {...register("address.reference")}
          label="Referência"
          autoComplete="off"
          errorMessage={errors.address?.reference?.message}
        />
      </FormFieldsContainer>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <FieldGroupTitle>Contatos</FieldGroupTitle>
        <Button
          type="button"
          onClick={() => {
            append({ name: "", phone: "" });
          }}
        >
          Adicionar contato
        </Button>
      </div>
      <FormFieldsContainer>
        {fields.map((contact, index) => {
          return (
            <div key={contact.phone + index}>
              <Input
                label="Nome"
                autoComplete="off"
                {...register(`contact.${index}.name` as const)}
                errorMessage={errors?.contact?.[index]?.name?.message}
              />
              <Input
                label="Telefone"
                autoComplete="off"
                {...register(`contact.${index}.phone` as const)}
                errorMessage={errors?.contact?.[index]?.phone?.message}
              />
            </div>
          );
        })}
      </FormFieldsContainer>
      {props.children?.(formArgs)}
    </form>
  );
}
