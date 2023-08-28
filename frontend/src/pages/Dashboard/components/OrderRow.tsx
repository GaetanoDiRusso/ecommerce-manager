import React from "react";
import { TableBody, TableCell, TableRow } from "src/components/ui/table";
import { Order } from "src/domain/entities/Order";
import { HoverUserCard } from "./HoverUserCard";

type Props = {
  order: Order;
};

const OrderRow = ({ order }: Props) => {
  return (
    <TableBody>
      <TableRow>
        <TableCell className="font-bold">{order.id}</TableCell>
        <TableCell className="font-bold">{order.createDate.toDateString()}</TableCell>
        <TableCell className="font-bold">{order.status}</TableCell>
        <TableCell className="font-bold">
            <HoverUserCard user={order.client} />
        </TableCell>
        <TableCell className="font-bold">{order.shippingAddress}</TableCell>
        <TableCell className="font-bold">{order.shippingPromise.toDateString()}</TableCell>
        <TableCell className="font-bold">{order.items.length}</TableCell>
      </TableRow>
    </TableBody>
  );
};

export default OrderRow;
