import React from "react";
import { OrderStatusEnum } from "src/domain/entities/enum/OrderStatusEnum";

import { Button } from "src/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";

type Props = {
  status: OrderStatusEnum | null;
  onChange: (newStatus: OrderStatusEnum | null) => void;
};

const StatusFilter = ({ status, onChange }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-24" variant="outline">{status?.toUpperCase() ?? "SELECT"}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Order status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={status ?? ""}
          onValueChange={(value) =>
            onChange(
              OrderStatusEnum[
                value.toUpperCase() as keyof typeof OrderStatusEnum
              ]
            )
          }
        >
        <DropdownMenuRadioItem value="">TODOS</DropdownMenuRadioItem>
          {Object.keys(OrderStatusEnum).map((s, i) => (
            <DropdownMenuRadioItem value={s.toLowerCase()}>{s}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusFilter;
