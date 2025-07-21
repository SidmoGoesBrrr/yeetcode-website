"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Sword, CalendarDays, Star, Download } from "lucide-react"
import dynamic from "next/dynamic"

const AppPreview = dynamic(() => import("./app-preview/components/App.jsx"), {
  ssr: false,
})

export default function Home() {
  return (
    <div className="min-h-screen bg-yellow-100 text-foreground flex flex-col">
      <header className="border-b-4 border-black py-4 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
          <h1 className="text-2xl font-bold">YEETCODE</h1>
          <Button className="border-2 border-black shadow-shadow bg-yellow-300 hover:bg-yellow-400 text-black font-bold">
            <Download className="w-4 h-4 mr-2" />
            DOWNLOAD
          </Button>
        </div>
      </header>

      <section className="hero-section bg-yellow-100 border-b-4 border-black">
        <h2 className="hero-title">
          Transform Your LeetCode Journey into an Epic Competition
        </h2>
        <p className="hero-subtitle max-w-2xl mx-auto">
          Challenge friends, climb leaderboards and earn XP – all while keeping
          your existing progress.
        </p>
        <Button size="lg" className="cta-button inline-flex items-center">
          <Download className="w-5 h-5 mr-2" /> Download YeetCode
        </Button>
      </section>

      <section className="py-16">
        <div className="max-w-6xl mx-auto grid gap-6 px-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="feature-card bg-white border-4 border-black">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Trophy className="feature-icon" />
                Leaderboards
              </CardTitle>
            </CardHeader>
            <CardContent>
              Live XP tracking every 60 seconds keeps everyone on their toes.
            </CardContent>
          </Card>

          <Card className="feature-card bg-white border-4 border-black">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Sword className="feature-icon" />
                1-on-1 Duels
              </CardTitle>
            </CardHeader>
            <CardContent>
              Challenge any friend and let YeetCode detect the winner
              automatically.
            </CardContent>
          </Card>

          <Card className="feature-card bg-white border-4 border-black">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <CalendarDays className="feature-icon" />
                Daily Challenges
              </CardTitle>
            </CardHeader>
            <CardContent>
              Curated problems and streak tracking that actually keeps you
              coding.
            </CardContent>
          </Card>

          <Card className="feature-card bg-white border-4 border-black">
            <CardHeader>
              <CardTitle className="flex items-center justify-center gap-2">
                <Star className="feature-icon" />
                Active Bounties
              </CardTitle>
            </CardHeader>
            <CardContent>
              Earn XP with time-limited rewards focused on specific topics.
            </CardContent>
          </Card>
        </div>
      </section>

      {/* UI Preview Section */}
      <section className="py-16 border-t-4 border-black bg-yellow-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-black">
            Live Demo
          </h2>
          <div className="flex justify-center">
            <div className="w-full">
              <AppPreview />
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t-4 border-black py-8 text-center text-sm bg-white">
        © 2025 YeetCode. Built for competitive coders.
      </footer>
    </div>
  )
}
