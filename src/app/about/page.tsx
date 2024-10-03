import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Badge } from "~/components/ui/badge"
import Link from "next/link"
import jkarlsteen from './jkarlsteen.jpg'


export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">About Top Trailblazers</h1>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Previous Owner</CardTitle>
            <CardDescription>The visionary who started it all</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/users/jkarlsteen.jpg" alt="Previous owner" />
                <AvatarFallback>JK</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium"><Link href='https://www.linkedin.com/in/jkarlsteen/'>Johan Karlsteen</Link></p>
                <p className="text-sm text-muted-foreground">Site Creator</p>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              Johan created this site back in 2017 to showcase what to put on resumes. He stepped away in 2024 to focus on raising his family.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Project Goal</CardTitle>
            <CardDescription>Our mission and vision</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">
              Our primary goal is to create a platform where trailblazers can see where they rank in the landscape.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge>Salesforce</Badge>
              <Badge>Trailhead</Badge>
              <Badge>Leaderboard</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Maintainer</CardTitle>
            <CardDescription>Leading us into the future</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src="/users/justinwills.jpg" alt="Justin Wills" />
                <AvatarFallback>JW</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium"><Link href='https://www.linkedin.com/in/justinwillsxyz/'>Justin Wills</Link></p>
                <p className="text-sm text-muted-foreground"><Link href='https://1sync.co'>1Sync</Link></p>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground">
              Justin took over the project in 2024 and rebuilt the entire site from scratch in 7 days.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}