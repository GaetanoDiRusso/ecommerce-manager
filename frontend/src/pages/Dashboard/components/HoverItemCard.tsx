import { Avatar, AvatarFallback, AvatarImage } from "src/components/ui/avatar";
import { Button } from "src/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "src/components/ui/hover-card";
import { Item } from "src/domain/entities/Item";

type Props = {
  item: Item;
  children: React.ReactNode
};

export function HoverItemCard({ item, children }: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{children}</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center justify-between space-x-4">
          <Avatar>
            <AvatarImage src={item.imageUrl} />
            <AvatarFallback>IMAGE</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{item.description}</h4>

            <p className="text-sm">Unit price: {item.price}</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
