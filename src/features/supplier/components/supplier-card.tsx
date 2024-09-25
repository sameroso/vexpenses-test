import { Card, CardContent, CardTitle } from "@/components/ui";
import { Supplier } from "@/services/suppliers";

export const SupplierCard = (props: Supplier) => {
  return (
    <Card>
      <CardTitle>{props.name}</CardTitle>
      <CardContent>
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
      </CardContent>
    </Card>
  );
};
