import { CalendarDays } from "lucide-react"
 
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "src/components/ui/avatar"
import { Button } from "src/components/ui/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "src/components/ui/hover-card"
import { User } from "src/domain/entities/User"

type Props = {
    user: User
}
 
export function HoverUserCard({user}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">{user.firstName}</Button>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/149/149071.png" />
            <AvatarFallback>PHOTO</AvatarFallback>
          </Avatar>

          <div className="space-y-1">
            <h4 className="text-sm font-semibold">{`${user.firstName} ${user.lastName}`}</h4>

            <p className="text-sm">
              {user.email}
            </p>
          </div>

        </div>
      </HoverCardContent>
    </HoverCard>
  )
}