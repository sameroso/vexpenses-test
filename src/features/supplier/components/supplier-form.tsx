import { useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Supplier } from "@/services/suppliers";
import { Fragment, useState } from "react";
import { Button } from "@/components/ui";
import { useGetAddressByCep } from "@/features/common/adress/api/get-adress-by-cep";
import { Input } from "@/components/ui/inputs/input";

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string(),
    contact: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required(),
          phone: yup.string().required(),
        })
      )
      .required(),
    address: yup
      .object({
        code: yup.string().required(),
        state: yup.string().required().min(2).max(2),
        city: yup
          .string()
          .required()
          .matches(/[A-Za-z]/),
        street: yup
          .string()
          .required()
          .matches(/[A-Za-z0-9]/),
        number: yup.string().required().matches(/[0-9]/),
        reference: yup.string(),
      })
      .required(),
  })
  .required();

export function SupplierForm(
  props: Partial<Supplier> & { onSubmit: (data: Omit<Supplier, "id">) => void }
) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Omit<Supplier, "id">>({
    defaultValues: !props.contact?.length
      ? { ...props, ...{ contact: [{ name: "", phone: "" }] } }
      : props,
    resolver: yupResolver(schema),
  });

  const [cep, setCep] = useState("");

  useGetAddressByCep({
    cep,
    queryConfig: { enabled: !!cep },

    onSuccess: (res) => {
      console.log(res)
      setValue("address.city", res.data.localidade);
      setValue("address.state", res.data.estado);
      setValue("address.street", res.data.logradouro);
    },
  });

  const { fields, append } = useFieldArray({
    control: control,
    name: "contact",
    rules: { minLength: 1 },
  });

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <Input
        {...register("name")}
        label="Nome"
        errorMessage={errors.name?.message}
      />

      <Input
        {...register("description")}
        label="Descrição"
        errorMessage={errors.description?.message}
      />

      <Input
        {...register("address.code")}
        label="CEP"
        errorMessage={errors.address?.code?.message}
        onChange={(e) => {
          if (e.target.value.length === 8) {
            setCep(e.target.value);
          }
        }}
      />

      <Input
        {...register("address.city")}
        label="Cidade"
        errorMessage={errors.address?.city?.message}
      />

      <Input
        {...register("address.number")}
        label="Número"
        errorMessage={errors.address?.number?.message}
      />

      <Input
        {...register("address.street")}
        label="Logradouro"
        errorMessage={errors.address?.number?.message}
      />

      <Input
        {...register("address.state")}
        label="Estado"
        errorMessage={errors.address?.state?.message}
      />

      <Input
        {...register("address.reference")}
        label="Referência"
        errorMessage={errors.address?.reference?.message}
      />

      <Button
        type="button"
        onClick={() => {
          append({ name: "", phone: "" });
        }}
      >
        add contact
      </Button>

      {fields.map((contact, index) => {
        return (
          <Fragment key={contact.phone}>
            <Input
              label="Nome"
              {...register(`contact.${index}.name` as const)}
              errorMessage={errors?.contact?.[index]?.name?.message}
            />
            <Input
              label="Telefone"
              {...register(`contact.${index}.phone` as const)}
              errorMessage={errors?.contact?.[index]?.phone?.message}
            />
          </Fragment>
        );
      })}

      <input type="submit" />
    </form>
  );
}
