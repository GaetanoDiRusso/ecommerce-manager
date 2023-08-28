import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "src/components/ui/avatar";

const getNameInitials = (name: string) => {
  const nameSplitted = name.split(" ");

  return nameSplitted[0] && nameSplitted[1]
    ? nameSplitted[0].split("")[0] + nameSplitted[1].split("")[0]
    : nameSplitted[0] ? nameSplitted[0].split("")[0] : "";
};

type MenuItem = {
  label: string;
  onClick: () => Promise<void>;
};

type Props = {
  username: string;
  menuItems?: MenuItem[];
};

const CircleImageMenu = ({ username, menuItems = [] }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-12 w-12 cursor-pointer">
          <AvatarFallback className="bg-green-400 hover:bg-green-500 text-white">
            {getNameInitials(username)}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {menuItems.map((menuItem, i) => (
          <DropdownMenuItem
            key={i}
            className="cursor-pointer"
            onClick={menuItem.onClick}
          >
            {menuItem.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CircleImageMenu;
