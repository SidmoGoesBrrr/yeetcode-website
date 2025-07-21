import React, { useState } from "react"
import "../index.css"
import LeaderboardHeader from "./leaderboard/LeaderboardHeader"
import FriendsLeaderboard from "./leaderboard/FriendsLeaderboard"
import UserStats from "./leaderboard/UserStats"
import TodaysChallenge from "./leaderboard/TodaysChallenge"
import ActiveBounties from "./leaderboard/ActiveBounties"
import DuelsSection from "./leaderboard/DuelsSection"
import QuickActions from "./leaderboard/QuickActions"

export default function App() {
  // Sample static data
  const [userData] = useState({
    email: "sample@email.com",
    verified: true,
    name: "Alex",
    leetUsername: "alex09",
  })
  const [groupData] = useState({ code: "12345", joined: true })
  const [leaderboard] = useState([
    {
      name: "Alex",
      leetUsername: "alex09",
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
    {
      name: "Morgan",
      leetUsername: "morgan",
      easy: 8,
      medium: 7,
      hard: 0,
      total: 15,
      xp: 2900,
      rank: 4,
    },
  ])
  const [notifications] = useState([])
  const [dailyData] = useState({
    dailyComplete: false,
    streak: 3,
    todaysProblem: {
      title: "Two Sum",
      titleSlug: "two-sum",
      difficulty: "Easy",
      content:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      topicTags: [{ name: "Array" }, { name: "Hash Table" }],
    },
    error: null,
    loading: false,
  })
  const [showCopySuccess, setShowCopySuccess] = useState(false)
  const [refreshIn] = useState(60)

  return (
    <div
      className="w-full max-w-7xl mx-auto p-6 rounded-2xl shadow-2xl bg-white border-4 border-black min-h-[700px] flex flex-col gap-8"
      style={{ fontFamily: "Space Grotesk, sans-serif" }}
    >
      {/* Header with group/user info */}
      <LeaderboardHeader
        userData={userData}
        groupData={groupData}
        refreshIn={refreshIn}
        showCopySuccess={showCopySuccess}
        setShowCopySuccess={setShowCopySuccess}
        handleLeaveGroup={() => {}}
      />

      {/* Main dashboard grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Main content (2 columns) */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <TodaysChallenge
            userData={userData}
            dailyData={dailyData}
            onDailyComplete={() => {}}
          />
          <FriendsLeaderboard
            leaderboard={leaderboard}
            userData={userData}
            notifications={notifications}
          />
          <DuelsSection leaderboard={leaderboard} userData={userData} />
        </div>
        {/* Right: Sidebar */}
        <div className="flex flex-col gap-8">
          <UserStats
            userData={userData}
            leaderboard={leaderboard}
            dailyData={dailyData}
          />
          <ActiveBounties userData={userData} />
          <QuickActions groupData={groupData} handleLogout={() => {}} />
        </div>
      </div>
    </div>
  )
}
