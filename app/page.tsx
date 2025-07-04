import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Trophy, Zap, Target, Users, Calendar, Flame, Star, Code2, TrendingUp, Download, Play, Monitor, Smartphone, ArrowDown, CheckCircle } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b-4 border-border bg-background p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-main text-main-foreground p-2 border-2 border-border shadow-shadow">
              <Code2 className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading">YEETCODE</h1>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="neutral" className="border-2 border-border shadow-shadow">
              LOGIN
            </Button>
            <Button className="border-2 border-border shadow-shadow">
              <Download className="w-4 h-4 mr-2" />
              DOWNLOAD
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-main text-main-foreground py-20 border-b-4 border-border">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-6xl md:text-8xl font-heading mb-6">YEETCODE</h1>
          <h2 className="text-2xl md:text-4xl font-heading mb-6">COMPETITIVE LEETCODE COMPANION</h2>
          <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto font-medium">
            Make coding practice ENGAGING and SOCIAL with real-time leaderboards, daily challenges, and friendly competition!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="neutral" className="text-xl px-8 py-4 border-4 border-border shadow-shadow bg-background text-foreground">
              <Play className="w-6 h-6 mr-2" />
              TRY DEMO
            </Button>
            <Button size="lg" variant="noShadow" className="text-xl px-8 py-4 border-4 border-main-foreground bg-main-foreground text-main">
              <Download className="w-6 h-6 mr-2" />
              DOWNLOAD FREE
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 border-b-4 border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading text-center mb-16">WHY YEETCODE?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-4 border-border shadow-shadow bg-chart-1 text-main-foreground">
              <CardHeader>
                <Trophy className="w-12 h-12 mb-4" />
                <CardTitle className="text-2xl">COMPETE WITH FRIENDS</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Real-time leaderboards make every problem count. Climb the ranks and show off your coding skills!</p>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-border shadow-shadow bg-chart-2 text-white">
              <CardHeader>
                <Target className="w-12 h-12 mb-4" />
                <CardTitle className="text-2xl">DAILY CHALLENGES</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Fresh problems every day with streak rewards. Build consistency and never lose momentum!</p>
              </CardContent>
            </Card>
            
            <Card className="border-4 border-border shadow-shadow bg-chart-3 text-white">
              <CardHeader>
                <Star className="w-12 h-12 mb-4" />
                <CardTitle className="text-2xl">BOUNTY SYSTEM</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg">Earn XP rewards for completing challenges. The harder the problem, the bigger the bounty!</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-20 px-4 bg-secondary-background border-b-4 border-border">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading text-center mb-16">SEE IT IN ACTION</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Screenshot 1 - Dashboard */}
            <Card className="border-4 border-border shadow-shadow">
              <CardHeader className="bg-main text-main-foreground">
                <CardTitle className="text-2xl">DASHBOARD OVERVIEW</CardTitle>
                <CardDescription className="text-main-foreground/80">Track your progress and compete with friends</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="bg-background p-6 border-2 border-border">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-chart-2 text-white p-4 border-2 border-border shadow-shadow">
                      <div className="text-3xl font-heading">1,247</div>
                      <div className="text-sm">TOTAL XP</div>
                    </div>
                    <div className="bg-chart-1 text-main-foreground p-4 border-2 border-border shadow-shadow">
                      <div className="text-3xl font-heading">7</div>
                      <div className="text-sm">DAY STREAK</div>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-main/20 border-2 border-border">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-chart-1" />
                      <span className="font-heading">RANK: SILVER III</span>
                    </div>
                    <Progress value={75} className="mt-2 h-3" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screenshot 2 - Leaderboard */}
            <Card className="border-4 border-border shadow-shadow">
              <CardHeader className="bg-chart-1 text-main-foreground">
                <CardTitle className="text-2xl">LIVE LEADERBOARD</CardTitle>
                <CardDescription className="text-main-foreground/80">Real-time competition with your coding crew</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    <TableRow className="border-b-2 border-border bg-chart-1/20">
                      <TableCell className="font-heading text-lg">🥇</TableCell>
                      <TableCell className="font-heading">ALEX</TableCell>
                      <TableCell className="font-heading text-chart-1">2,341 XP</TableCell>
                    </TableRow>
                    <TableRow className="border-b-2 border-border bg-chart-2/20">
                      <TableCell className="font-heading text-lg">🥈</TableCell>
                      <TableCell className="font-heading">SARAH</TableCell>
                      <TableCell className="font-heading text-chart-2">1,892 XP</TableCell>
                    </TableRow>
                    <TableRow className="border-b-2 border-border bg-main/20">
                      <TableCell className="font-heading text-lg">🥉</TableCell>
                      <TableCell className="font-heading">YOU</TableCell>
                      <TableCell className="font-heading">1,247 XP</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Screenshot 3 - Daily Challenge */}
            <Card className="border-4 border-border shadow-shadow">
              <CardHeader className="bg-chart-4 text-main-foreground">
                <CardTitle className="text-2xl">DAILY CHALLENGE</CardTitle>
                <CardDescription className="text-main-foreground/80">Fresh problems to keep you sharp</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-heading">Two Sum</h3>
                    <Badge className="bg-chart-4 text-white border-2 border-border">EASY</Badge>
                  </div>
                  <div className="flex items-center gap-4">
                    <Button className="border-2 border-border shadow-shadow">
                      <Code2 className="w-4 h-4 mr-2" />
                      START CODING
                    </Button>
                    <div className="flex items-center gap-2">
                      <Flame className="w-4 h-4 text-chart-3" />
                      <span className="font-heading text-chart-3">7 DAY STREAK</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Screenshot 4 - Bounties */}
            <Card className="border-4 border-border shadow-shadow">
              <CardHeader className="bg-chart-5 text-white">
                <CardTitle className="text-2xl">ACTIVE BOUNTIES</CardTitle>
                <CardDescription className="text-white/80">Earn XP for completing challenges</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-secondary-background border-2 border-border shadow-shadow">
                    <div>
                      <div className="font-heading">Complete 3 Medium Problems</div>
                      <div className="text-sm text-foreground/70">Expires in 2 days</div>
                    </div>
                    <div className="text-2xl font-heading text-chart-1">500 XP</div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-secondary-background border-2 border-border shadow-shadow">
                    <div>
                      <div className="font-heading">Beat Friend's Time</div>
                      <div className="text-sm text-foreground/70">Beat Sarah's solution</div>
                    </div>
                    <div className="text-2xl font-heading text-chart-1">300 XP</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-20 px-4 bg-main text-main-foreground border-b-4 border-border">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-heading mb-8">DOWNLOAD YEETCODE</h2>
          <p className="text-xl md:text-2xl mb-12 font-medium">
            Available for desktop. Get the full experience with seamless stats tracking and challenge completion.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-4 border-main-foreground shadow-shadow bg-background text-foreground">
              <CardContent className="p-8 text-center">
                <Monitor className="w-16 h-16 mx-auto mb-4 text-main" />
                <h3 className="text-2xl font-heading mb-4">DESKTOP APP</h3>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Real-time sync with LeetCode
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Offline progress tracking
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Native notifications
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Windows, macOS, Linux
                  </li>
                </ul>
                <Button size="lg" className="w-full border-2 border-border shadow-shadow">
                  <Download className="w-5 h-5 mr-2" />
                  DOWNLOAD FOR FREE
                </Button>
              </CardContent>
            </Card>

            <Card className="border-4 border-main-foreground shadow-shadow bg-background text-foreground">
              <CardContent className="p-8 text-center">
                <Smartphone className="w-16 h-16 mx-auto mb-4 text-main" />
                <h3 className="text-2xl font-heading mb-4">MOBILE COMPANION</h3>
                <ul className="text-left space-y-2 mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Quick leaderboard checks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Daily challenge reminders
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    Friend activity updates
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-chart-4" />
                    iOS & Android
                  </li>
                </ul>
                <Button size="lg" variant="neutral" className="w-full border-2 border-border shadow-shadow bg-secondary-background">
                  COMING SOON
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <ArrowDown className="w-8 h-8 mx-auto mb-4 animate-bounce" />
            <p className="text-lg font-medium">FREE FOREVER • NO ADS • NO BS</p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-heading text-center mb-16">LIVE DASHBOARD PREVIEW</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content - Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Today's Challenge */}
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader className="bg-main text-main-foreground">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-6 h-6" />
                    TODAY'S CHALLENGE
                  </CardTitle>
                  <CardDescription className="text-main-foreground/80">
                    Complete to maintain your streak!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-heading">Two Sum</h3>
                    <Badge variant="secondary" className="border-2 border-border shadow-shadow">
                      EASY
                    </Badge>
                  </div>
                  <p className="text-foreground/70 mb-4">
                    Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.
                  </p>
                  <div className="flex items-center gap-4">
                    <Button size="lg" className="border-2 border-border shadow-shadow">
                      <Code2 className="w-4 h-4 mr-2" />
                      START CODING
                    </Button>
                    <div className="flex items-center gap-2 text-sm text-foreground/70">
                      <Flame className="w-4 h-4 text-chart-3" />
                      Current Streak: <span className="font-heading text-chart-3">7 days</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Active Bounties */}
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-chart-1" />
                    ACTIVE BOUNTIES
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-secondary-background border-2 border-border shadow-shadow">
                      <div>
                        <h4 className="font-heading">Complete 3 Medium Problems</h4>
                        <p className="text-sm text-foreground/70">Expires in 2 days</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-heading text-chart-1">500 XP</div>
                        <Progress value={66} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-secondary-background border-2 border-border shadow-shadow">
                      <div>
                        <h4 className="font-heading">Beat Friend's Time</h4>
                        <p className="text-sm text-foreground/70">Beat Sarah's 45ms solution</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-heading text-chart-1">300 XP</div>
                        <Badge variant="outline" className="border-chart-2 text-chart-2">NEW</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar - Right Column */}
            <div className="space-y-6">
              {/* User Stats */}
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader className="bg-chart-2 text-white">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    YOUR STATS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-heading text-chart-2">1,247</div>
                      <div className="text-sm text-foreground/70">Total XP</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-heading">23</div>
                        <div className="text-xs text-foreground/70">Problems Solved</div>
                      </div>
                      <div>
                        <div className="text-2xl font-heading">7</div>
                        <div className="text-xs text-foreground/70">Day Streak</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Rank Progress</span>
                        <span className="font-heading">Silver III</span>
                      </div>
                      <Progress value={75} className="h-2" />
                      <div className="text-xs text-foreground/70 text-center">247 XP to Gold I</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Leaderboard */}
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader className="bg-chart-1 text-main-foreground">
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    FRIENDS LEADERBOARD
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b-2 border-border">
                        <TableHead className="font-heading">RANK</TableHead>
                        <TableHead className="font-heading">PLAYER</TableHead>
                        <TableHead className="font-heading">XP</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow className="border-b border-border bg-chart-1/10">
                        <TableCell className="font-heading">1</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-border">
                              <AvatarFallback className="text-xs">AL</AvatarFallback>
                            </Avatar>
                            Alex
                          </div>
                        </TableCell>
                        <TableCell className="font-heading">2,341</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-border bg-chart-2/10">
                        <TableCell className="font-heading">2</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-border">
                              <AvatarFallback className="text-xs">SM</AvatarFallback>
                            </Avatar>
                            Sarah
                          </div>
                        </TableCell>
                        <TableCell className="font-heading">1,892</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-border bg-main/20">
                        <TableCell className="font-heading">3</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-border">
                              <AvatarFallback className="text-xs">YU</AvatarFallback>
                            </Avatar>
                            <span className="font-heading">You</span>
                          </div>
                        </TableCell>
                        <TableCell className="font-heading">1,247</TableCell>
                      </TableRow>
                      <TableRow className="border-b border-border">
                        <TableCell className="font-heading">4</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="w-6 h-6 border border-border">
                              <AvatarFallback className="text-xs">JD</AvatarFallback>
                            </Avatar>
                            John
                          </div>
                        </TableCell>
                        <TableCell className="font-heading">1,156</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="border-2 border-border shadow-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    QUICK ACTIONS
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="neutral" className="w-full border-2 border-border shadow-shadow">
                    <Users className="w-4 h-4 mr-2" />
                    CHALLENGE FRIEND
                  </Button>
                  <Button variant="neutral" className="w-full border-2 border-border shadow-shadow">
                    <Target className="w-4 h-4 mr-2" />
                    RANDOM PROBLEM
                  </Button>
                  <Button variant="neutral" className="w-full border-2 border-border shadow-shadow">
                    <Trophy className="w-4 h-4 mr-2" />
                    VIEW ALL RANKS
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-background border-t-4 border-border py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-main text-main-foreground p-2 border-2 border-border shadow-shadow">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-heading">YEETCODE</h3>
          </div>
          <p className="text-foreground/70 mb-4">
            Making LeetCode practice fun, social, and competitive since 2024
          </p>
          <p className="text-sm text-foreground/50">
            © 2024 Yeetcode. All rights reserved. • Built with ❤️ for competitive coders
          </p>
        </div>
      </footer>
    </div>
  );
}
