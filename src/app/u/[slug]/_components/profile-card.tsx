import { Card, CardContent, CardHeader } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import { SelectTrailblazer } from "~/server/db/schema"

interface ProfileCardProps {
  trailblazer: SelectTrailblazer
}

export default function CardComponent(props: ProfileCardProps) {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Avatar className="w-20 h-20">
          <AvatarImage src={props.trailblazer.avatarUrl} alt={props.trailblazer.name} />
          <AvatarFallback>{props.trailblazer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">{props.trailblazer.name}</h2>
          <p className="text-sm text-muted-foreground">{props.trailblazer.title}</p>
          <p className="text-sm text-muted-foreground">{props.trailblazer.companyName}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{props.trailblazer.points.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">Points</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{props.trailblazer.badges}</span>
            <span className="text-sm text-muted-foreground">Badges</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">{props.trailblazer.superBadges}</span>
            <span className="text-sm text-muted-foreground">Super Badges</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}