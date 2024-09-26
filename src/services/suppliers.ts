import { api } from "@/lib/client-api";

interface Contact {
  name: string;
  phone: string;
}

interface Address {
  code: string;
  state: string;
  city: string;
  street: string;
  number: string;
  reference?: string;
}

export interface Supplier {
  id: string;
  name: string;
  description?: string;
  contact: Contact[];
  address: Address;
}

const getSuppliers = () => {
  return api.get<Supplier[]>("/suppliers");
};

const getSupplierById = (id: string) => {
  return api.get<Supplier>(`/suppliers/${id}`);
};

const removeSupplier = (id: string) => {
  return api.delete<Supplier>(`/suppliers/${id}`);
};

const editSupplier = (args: { id: string; supplier: Supplier }) => {
  return api.patch(`/suppliers/${args.id}`, args.supplier);
};

const createSupplier = (args: Omit<Supplier, "id">) => {
  return api.post<Supplier>("/suppliers", args);
};

export const supplierService = {
  getSuppliers,
  getSupplierById,
  removeSupplier,
  editSupplier,
  createSupplier,
};
