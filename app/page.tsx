// @ts-nocheck
"use client"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Trophy,
  Sword,
  CalendarDays,
  Star,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import dynamic from "next/dynamic"

const LeaderboardCard = dynamic(
  () => import("./app-preview/components/leaderboard/FriendsLeaderboard"),
  { ssr: false }
)
const DuelsCard = dynamic(
  () => import("./app-preview/components/leaderboard/DuelsSection"),
  { ssr: false }
)
const DailyCard = dynamic(
  () => import("./app-preview/components/leaderboard/TodaysChallenge"),
  { ssr: false }
)
const BountiesCard = dynamic(
  () => import("./app-preview/components/leaderboard/ActiveBounties"),
  { ssr: false }
)

const userData = { name: "Alex", leetUsername: "sample_user" }
const leaderboard = [
  {
    name: "Alex",
    leetUsername: "sample_user",
    easy: 143,
    medium: 42,
    hard: 7,
    total: 192,
    xp: 31900,
    rank: 1,
  },
  {
    name: "Sam",
    leetUsername: "samwise",
    easy: 118,
    medium: 49,
    hard: 5,
    total: 172,
    xp: 29600,
    rank: 2,
  },
  {
    name: "Taylor",
    leetUsername: "taylor123",
    easy: 112,
    medium: 55,
    hard: 19,
    total: 186,
    xp: 27200,
    rank: 3,
  },
]
const dailyData = {
  dailyComplete: false,
  streak: 3,
  todaysProblem: {
    title: "Two Sum",
    titleSlug: "two-sum",
    difficulty: "Easy",
    content:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    topicTags: [{ name: "Array" }, { name: "Hash Table" }],
  },
  error: null,
  loading: false,
}

const features = [
  {
    title: "Leaderboards",
    icon: <Trophy className="w-8 h-8 md:w-10 md:h-10" />,
    description: "Climb the ranks with friends and see your progress live.",
    component: (
      <LeaderboardCard
        leaderboard={leaderboard}
        userData={userData}
        notifications={[]}
      />
    ),
  },
  {
    title: "1-on-1 Duels",
    icon: <Sword className="w-8 h-8 md:w-10 md:h-10" />,
    description:
      "Challenge friends and let YeetCode detect the winner automatically.",
    component: <DuelsCard leaderboard={leaderboard} userData={userData} />,
  },
  {
    title: "Daily Challenges",
    icon: <CalendarDays className="w-8 h-8 md:w-10 md:h-10" />,
    description:
      "Curated problems and streak tracking that actually keeps you coding.",
    component: (
      <DailyCard
        userData={userData}
        dailyData={dailyData}
        onDailyComplete={() => {}}
      />
    ),
  },
  {
    title: "Active Bounties",
    icon: <Star className="w-8 h-8 md:w-10 md:h-10" />,
    description:
      "Earn XP with time-limited rewards focused on specific topics.",
    component: <BountiesCard userData={userData} />,
  },
]

export default function Home() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef()

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused) {
      timeoutRef.current = setTimeout(() => {
        setDirection(1)
        setCurrent((prev) => (prev + 1) % features.length)
      }, 10000)
    }
    return () => clearTimeout(timeoutRef.current)
  }, [current, isPaused])

  const goTo = (idx) => {
    clearTimeout(timeoutRef.current)
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => {
    clearTimeout(timeoutRef.current)
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + features.length) % features.length)
  }
  const next = () => {
    clearTimeout(timeoutRef.current)
    setDirection(1)
    setCurrent((prev) => (prev + 1) % features.length)
  }

  return (
    <div className="min-h-screen bg-white text-foreground flex flex-col">
      <header className="border-b-4 border-black py-4 md:py-6 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-8">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            YEETCODE
          </h1>
          <div className="flex items-center gap-4">
            <Button className="btn-3d border-3 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-bold px-4 md:px-6 py-2 md:py-3">
              <Download className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              <span className="hidden sm:inline">DOWNLOAD FREE</span>
              <span className="sm:hidden">GET</span>
            </Button>
            <span className="text-sm text-black/70 hidden md:inline">
              Join the waitlist
            </span>
          </div>
        </div>
      </header>

      <section className="hero-section bg-gradient-to-br from-yellow-300 to-yellow-400 border-b-4 border-black py-12 md:py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-black text-center leading-tight"
            style={{ textShadow: "3px 3px 0 #FCD34D" }}
          >
            Finally, a reason to
            <br className="hidden sm:block" /> actually solve problems daily.
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-center mb-6 text-black/90 font-medium">
            Be among the first to turn LeetCode into a{" "}
            <span className="font-bold">multiplayer game</span>.
            <span className="block mt-2">
              Transform solo grinding into friendly competition with your dev
              friends.
            </span>
          </p>

          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex justify-center gap-4">
              <div className="flex flex-wrap justify-center gap-3">
                <Button
                  size="lg"
                  className="btn-3d inline-flex items-center border-3 border-black bg-white hover:bg-yellow-50 text-black font-bold text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 16.97 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                  </svg>
                  Download for Mac
                </Button>
                <Button
                  size="lg"
                  className="btn-3d inline-flex items-center border-3 border-black bg-white hover:bg-yellow-50 text-black font-bold text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
                  </svg>
                  Download for Windows
                </Button>
                <Button
                  size="lg"
                  className="btn-3d inline-flex items-center border-3 border-black bg-white hover:bg-yellow-50 text-black font-bold text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 rounded-xl"
                >
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M13.18,14.5C12.53,15.26 11.47,15.26 10.82,14.5L7.44,10.5C7.16,11.28 7,12.12 7,13C7,14.67 7.57,16.18 8.5,17.27L10,15.87L10.05,15.92C10.67,16.44 11.57,16.44 12.19,15.92L13.8,14.43C13.8,14.43 15.46,16.31 15.84,16.78C16.5,15.85 16.91,14.7 16.97,13.47L13.18,14.5M20,13A8,8 0 0,1 12,21A8,8 0 0,1 4,13C4,9.5 6.08,6.5 9,5.26V5.5C9,6.05 9.45,6.5 10,6.5H14C14.55,6.5 15,6.05 15,5.5V5.26C17.92,6.5 20,9.5 20,13M10,4H11V3H13V4H14A1,1 0 0,1 15,5V7.74C14.41,7.4 13.73,7.18 13,7.08V7H11V7.08C10.27,7.18 9.59,7.4 9,7.74V5A1,1 0 0,1 10,4Z" />
                  </svg>
                  Download for Linux
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-black/70">
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Available on all platforms
              </span>
              <span className="flex items-center gap-1">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                100% Free Beta
              </span>
            </div>
          </div>

          <div className="bg-yellow-50 border-3 border-black rounded-xl p-4 max-w-2xl mx-auto">
            <p className="text-sm font-bold text-black text-center">
              🚀 EARLY ACCESS: First 1000 users get lifetime premium features
              (when we build them)
            </p>
          </div>
        </div>
      </section>

      {/* Feature Carousel */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-col items-center px-4">
          <div
            className="relative w-full flex flex-col items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Arrow Buttons */}
            <button
              className="btn-3d absolute top-1/2 -translate-y-1/2 left-0 md:-left-16 z-10 bg-yellow-300 hover:bg-yellow-400 border-3 border-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
              onClick={prev}
              aria-label="Previous feature"
            >
              <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            <button
              className="btn-3d absolute top-1/2 -translate-y-1/2 right-0 md:-right-16 z-10 bg-yellow-300 hover:bg-yellow-400 border-3 border-black rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center"
              onClick={next}
              aria-label="Next feature"
            >
              <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
            </button>
            {/* Animated Card */}
            <div
              className={`carousel-slide ${direction === 1 ? "slide-in-right" : direction === -1 ? "slide-in-left" : ""}`}
              key={current}
            >
              <div
                className="panel-3d bg-white border-4 border-black rounded-2xl p-6 md:p-8 w-full max-w-5xl mx-auto"
                style={{ minHeight: "600px" }}
              >
                <div className="pb-4">
                  <h3 className="flex items-center justify-center gap-3 text-2xl md:text-3xl font-extrabold">
                    <span className="text-yellow-400">
                      {features[current].icon}
                    </span>
                    {features[current].title}
                  </h3>
                </div>
                <div className="w-full">
                  <div
                    className="w-full rounded-xl bg-gradient-to-br from-yellow-50 to-yellow-100 overflow-hidden mb-6 p-4"
                    style={{ height: "450px" }}
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {features[current].component}
                    </div>
                  </div>
                  <p className="text-center text-black font-semibold text-base md:text-lg">
                    {features[current].description}
                  </p>
                </div>
              </div>
            </div>
            {/* Dots navigation */}
            <div className="flex gap-3 mt-8">
              {features.map((_, idx) => (
                <button
                  key={idx}
                  className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-3 border-black transition-all ${
                    current === idx
                      ? "bg-yellow-400 scale-125 shadow-[3px_3px_0px_0px_#000] transform -translate-x-[1px] -translate-y-[1px]"
                      : "bg-white hover:bg-yellow-100 shadow-[2px_2px_0px_0px_#000]"
                  }`}
                  onClick={() => goTo(idx)}
                  aria-label={`Show feature ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why YeetCode Section */}
      <section className="py-12 md:py-20 bg-white border-b-4 border-black">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-black">
            Why We're Building YeetCode
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">😴</div>
              <h3 className="font-bold text-xl mb-2">
                LeetCode is Boring Alone
              </h3>
              <p className="text-gray-700">
                We all know we should practice, but opening LeetCode feels like
                homework. There's no motivation when you're grinding solo.
              </p>
            </div>

            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🎮</div>
              <h3 className="font-bold text-xl mb-2">
                Competition Makes It Fun
              </h3>
              <p className="text-gray-700">
                Everything's better with friends. Imagine Duolingo meets
                LeetCode - daily streaks, friendly battles, and bragging rights.
              </p>
            </div>

            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6 text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="font-bold text-xl mb-2">
                Built By Devs, For Devs
              </h3>
              <p className="text-gray-700">
                We're software engineers who struggled with consistency.
                YeetCode is the app we wished existed during our interview prep.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-lg text-gray-700 mb-6">
              Want to help shape YeetCode? Join our Discord and tell us what
              features you want!
            </p>
            <button className="btn-3d inline-flex items-center border-3 border-black bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-3 rounded-xl">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.994a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              Join Beta Testing Discord
            </button>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-black">
            How YeetCode Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-3 border-black">
                1
              </div>
              <h3 className="font-bold text-xl mb-2">Connect Your LeetCode</h3>
              <p className="text-gray-700">
                Securely link your account. We only read public data, never
                store passwords.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-3 border-black">
                2
              </div>
              <h3 className="font-bold text-xl mb-2">Add Your Friends</h3>
              <p className="text-gray-700">
                Import from Discord, GitHub, or share your YeetCode username.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-3 border-black">
                3
              </div>
              <h3 className="font-bold text-xl mb-2">Start Competing</h3>
              <p className="text-gray-700">
                Challenge friends to duels, climb leaderboards, and earn XP
                daily!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-20 bg-white border-b-4 border-black">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-black">
            Questions? We've Got Answers
          </h2>
          <div className="space-y-6">
            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">
                Will YeetCode always be free?
              </h3>
              <p className="text-gray-700">
                The core features will always be free! We might add optional
                premium features later (like AI coaching), but competing with
                friends, duels, and leaderboards will stay free forever.
              </p>
            </div>
            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">
                Is my LeetCode data safe?
              </h3>
              <p className="text-gray-700">
                Absolutely. We use official LeetCode APIs and only access public
                profile data. We never ask for or store your password. Your
                account stays secure.
              </p>
            </div>
            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">
                When will YeetCode launch?
              </h3>
              <p className="text-gray-700">
                We're launching in early 2025! Join the early access list to be
                the first to know. Beta testers get lifetime premium features
                (when we add them).
              </p>
            </div>
            <div className="panel-3d bg-yellow-50 border-3 border-black rounded-xl p-6">
              <h3 className="font-bold text-xl mb-2">
                What platforms are supported?
              </h3>
              <p className="text-gray-700">
                Available for macOS (Intel & Apple Silicon), Windows (10/11),
                and Linux (Ubuntu, Fedora, Arch). All platforms get the same
                great features!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-24 border-t-4 border-black bg-gradient-to-t from-yellow-400 to-yellow-300">
        <div className="max-w-3xl mx-auto text-center px-4">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 text-black"
            style={{ textShadow: "3px 3px 0 #FCD34D" }}
          >
            Stop grinding alone.
          </h2>
          <p className="text-lg md:text-xl mb-10 text-black font-medium">
            Be one of the first to make LeetCode actually fun.
          </p>
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="btn-3d inline-flex items-center border-3 border-black bg-white hover:bg-yellow-50 text-black font-bold px-6 py-3 rounded-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 16.97 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
                Mac
              </Button>
              <Button
                size="lg"
                className="btn-3d inline-flex items-center border-3 border-black bg-white hover:bg-yellow-50 text-black font-bold px-6 py-3 rounded-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3,12V6.75L9,5.43V11.91L3,12M20,3V11.75L10,11.9V5.21L20,3M3,13L9,13.09V19.9L3,18.75V13M20,13.25V22L10,20.09V13.1L20,13.25Z" />
                </svg>
                Windows
              </Button>
              <Button
                size="lg"
                className="btn-3d inline-flex items-center border-3 border-black bg-white hover:bg-yellow-50 text-black font-bold px-6 py-3 rounded-xl"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M13.18,14.5C12.53,15.26 11.47,15.26 10.82,14.5L7.44,10.5C7.16,11.28 7,12.12 7,13C7,14.67 7.57,16.18 8.5,17.27L10,15.87L10.05,15.92C10.67,16.44 11.57,16.44 12.19,15.92L13.8,14.43C13.8,14.43 15.46,16.31 15.84,16.78C16.5,15.85 16.91,14.7 16.97,13.47L13.18,14.5M20,13A8,8 0 0,1 12,21A8,8 0 0,1 4,13C4,9.5 6.08,6.5 9,5.26V5.5C9,6.05 9.45,6.5 10,6.5H14C14.55,6.5 15,6.05 15,5.5V5.26C17.92,6.5 20,9.5 20,13M10,4H11V3H13V4H14A1,1 0 0,1 15,5V7.74C14.41,7.4 13.73,7.18 13,7.08V7H11V7.08C10.27,7.18 9.59,7.4 9,7.74V5A1,1 0 0,1 10,4Z" />
                </svg>
                Linux
              </Button>
            </div>
            <p className="text-sm text-black/70">
              Limited spots available • First 1000 users get lifetime perks
            </p>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t-4 border-black py-6 md:py-8 text-center text-sm md:text-base bg-white font-medium">
        © 2025 YeetCode. Built for competitive coders.
      </footer>
    </div>
  )
}
