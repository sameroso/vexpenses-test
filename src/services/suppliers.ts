import { api } from "@/lib/client-api";

interface ContactDTO {
  name: string;
  phone: string;
}

interface SupplierAddressDTO {
  code: string;
  state: string;
  city: string;
  street: string;
  number: string;
  reference?: string;
}

export interface SupplierDTO {
  id: string;
  name: string;
  description?: string;
  contact: ContactDTO[];
  address: SupplierAddressDTO;
}

const getSuppliers = () => {
  return api.get<SupplierDTO[]>("/suppliers");
};

const getSupplierById = (id: string) => {
  return api.get<SupplierDTO>(`/suppliers/${id}`);
};

const removeSupplier = (id: string) => {
  return api.delete<SupplierDTO>(`/suppliers/${id}`);
};

const editSupplier = (args: { id: string; supplier: SupplierDTO }) => {
  return api.patch(`/suppliers/${args.id}`, args.supplier);
};

const createSupplier = (args: Omit<SupplierDTO, "id">) => {
  return api.post<SupplierDTO>("/suppliers", args);
};

export const supplierService = {
  getSuppliers,
  getSupplierById,
  removeSupplier,
  editSupplier,
  createSupplier,
};
