import { viaCepApi } from "@/lib/via-cep-api";

interface AddressDTO {
  cep: string;
  logradouro: string;
  complemento?: string;
  unidade?: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  regiao: string;
  ibge: string;
  gia?: string;
  ddd: string;
  siafi: string;
}

const getAdressByCode = (cep: string) => {
  return viaCepApi.get<AddressDTO>(`/${cep}/json`);
};

export const AddressService = {
  getAdressByCode,
};
