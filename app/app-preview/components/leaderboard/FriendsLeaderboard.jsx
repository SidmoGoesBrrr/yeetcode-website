import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const RANKS = [
  { name: "Script Kiddie", min: 0, max: 499 },
  { name: "Debugger", min: 500, max: 1499 },
  { name: "Stack Overflower", min: 1500, max: 3499 },
  { name: "Algorithm Apprentice", min: 3500, max: 6499 },
  { name: "Loop Guru", min: 6500, max: 11999 },
  { name: "Recursion Wizard", min: 12000, max: 19999 },
  { name: "Regex Sorcerer", min: 20000, max: 34999 },
  { name: "Master Yeeter", min: 35000, max: 49999 },
  { name: "0xDEADBEEF", min: 50000, max: Infinity },
]

function getRankAndSubdivision(xp) {
  for (let i = 0; i < RANKS.length; i++) {
    const { name, min, max } = RANKS[i]
    if (xp >= min && xp <= max) {
      const range = max - min + 1
      const subSize = Math.floor(range / 3)
      let sub = "I"
      if (xp >= min + 2 * subSize) sub = "III"
      else if (xp >= min + subSize) sub = "II"
      return { name, sub }
    }
  }
  return { name: "Unranked", sub: "" }
}

const FriendsLeaderboard = ({ leaderboard, userData, notifications = [] }) => {
  // Tab state
  const [activeTab, setActiveTab] = useState("friends")
  // Tooltip state
  const [hoveredUser, setHoveredUser] = useState(null)

  // XP calculation function
  const calculateXP = (user) => {
    const baseXP = user.easy * 100 + user.medium * 300 + user.hard * 500
    const bonusXP = user.xp || 0
    return baseXP + bonusXP
  }

  // Check if any notification is a 'left' type for this cycle
  const hasLeftNotification = notifications.some((n) => n.type === "left")
  // Filter out overtake notifications if someone left
  const filteredNotifications = hasLeftNotification
    ? notifications.filter((n) => n.type !== "overtake")
    : notifications

  // Dummy university leaderboard data - aggregated by university
  const universityLeaderboard = [
    {
      name: "MIT",
      students: 342,
      easy: 4821,
      medium: 2341,
      hard: 892,
      total: 8054,
      totalXP: 13175000,
      topPlayer: "algo_master_21",
      rank: 1,
    },
    {
      name: "Stanford",
      students: 289,
      easy: 4156,
      medium: 2102,
      hard: 743,
      total: 7001,
      totalXP: 10182800,
      topPlayer: "stanford_coder",
      rank: 2,
    },
    {
      name: "UC Berkeley",
      students: 312,
      easy: 4234,
      medium: 1987,
      hard: 651,
      total: 6872,
      totalXP: 10015200,
      topPlayer: "berkeley_algo",
      rank: 3,
    },
    {
      name: "Carnegie Mellon",
      students: 198,
      easy: 2876,
      medium: 1423,
      hard: 512,
      total: 4811,
      totalXP: 6237000,
      topPlayer: "cmu_ninja",
      rank: 4,
    },
    {
      name: "Stony Brook",
      students: 156,
      easy: 2341,
      medium: 1123,
      hard: 389,
      total: 3853,
      totalXP: 4648800,
      topPlayer: "alex09",
      rank: 5,
    },
    {
      name: "Georgia Tech",
      students: 234,
      easy: 3456,
      medium: 1678,
      hard: 423,
      total: 5557,
      totalXP: 6762600,
      topPlayer: "gt_coder",
      rank: 6,
    },
    {
      name: "UT Austin",
      students: 187,
      easy: 2765,
      medium: 1234,
      hard: 321,
      total: 4320,
      totalXP: 5161200,
      topPlayer: "longhorn_dev",
      rank: 7,
    },
    {
      name: "GraphWalker",
      leetUsername: "graphwalker",
      easy: 123,
      medium: 45,
      hard: 15,
      total: 183,
      xp: 28900,
      rank: 8,
      university: "Stony Brook",
    },
    {
      name: "Taylor",
      leetUsername: "taylor123",
      easy: 112,
      medium: 55,
      hard: 19,
      total: 186,
      xp: 27200,
      rank: 9,
      university: "Stony Brook",
    },
    {
      name: "TreeTraverser",
      leetUsername: "treetraverser",
      easy: 134,
      medium: 38,
      hard: 8,
      total: 180,
      xp: 26600,
      rank: 10,
      university: "Stony Brook",
    },
    {
      name: "Morgan",
      leetUsername: "morgan",
      easy: 8,
      medium: 7,
      hard: 0,
      total: 15,
      xp: 2900,
      rank: 11,
      university: "Stony Brook",
    },
  ]

  return (
    <div className="panel-3d bg-yellow-100 border-4 border-black rounded-xl overflow-hidden flex flex-col w-full h-full">
      <div className="bg-blue-500 px-6 py-4 border-b-4 border-black flex-shrink-0">
        {/* Header: Title + Tabs + Notifications */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="text-white text-lg">🏆</span>
            <h3 className="font-bold text-white text-lg">LEADERBOARD</h3>
            {/* Tabs (inline with title) */}
            <div className="flex gap-2 ml-4">
              <button
                className={`btn-3d px-3 py-1 rounded-lg font-bold border-2 border-black focus:outline-none transition-colors text-sm ${
                  activeTab === "friends"
                    ? "bg-yellow-300 text-black"
                    : "bg-white text-black hover:bg-yellow-100"
                }`}
                onClick={() => setActiveTab("friends")}
              >
                Friends
              </button>
              <button
                className={`btn-3d px-3 py-1 rounded-lg font-bold border-2 border-black focus:outline-none transition-colors text-sm ${
                  activeTab === "university"
                    ? "bg-yellow-300 text-black"
                    : "bg-white text-black hover:bg-yellow-100"
                }`}
                onClick={() => setActiveTab("university")}
              >
                University
              </button>
            </div>
          </div>
          {/* Notification Bar (inline) */}
          <div className="relative min-h-[24px] flex items-center">
            <AnimatePresence mode="popLayout">
              {filteredNotifications.map((notification, idx) => (
                <motion.div
                  key={notification.id || notification.message || idx}
                  initial={{ opacity: 0, y: -20, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg border-2 border-white text-white font-bold ml-2 shadow-lg text-sm ${
                    notification.type === "overtake"
                      ? "bg-orange-400"
                      : notification.type === "joined"
                        ? "bg-green-500"
                        : notification.type === "left"
                          ? "bg-red-500"
                          : "bg-blue-500"
                  }`}
                >
                  <span>
                    {notification.type === "overtake" && "🏃‍♂️"}
                    {notification.type === "joined" && "🎉"}
                    {notification.type === "left" && "👋"}
                  </span>
                  <span>{notification.message}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden">
        {activeTab === "university" ? (
          <div className="flex-1">
            <div className="overflow-x-auto w-full max-w-full h-full max-h-[260px]">
              <table className="w-full max-w-full table-fixed">
                <thead className="bg-yellow-100 sticky top-0 z-10">
                  <tr className="border-b-2 border-black">
                    <th className="font-bold text-left px-4 py-2 w-16">RANK</th>
                    <th className="font-bold text-left px-4 py-2 w-40">
                      UNIVERSITY
                    </th>
                    <th className="font-bold text-center px-4 py-2 w-20">
                      STUDENTS
                    </th>
                    <th className="font-bold text-center px-4 py-2 w-16">
                      EASY
                    </th>
                    <th className="font-bold text-center px-4 py-2 w-16">
                      MED
                    </th>
                    <th className="font-bold text-center px-4 py-2 w-16">
                      HARD
                    </th>
                    <th className="font-bold text-center px-4 py-2 w-20">
                      TOTAL
                    </th>
                    <th className="font-bold text-center px-4 py-2 w-24">
                      TOTAL XP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <AnimatePresence mode="wait">
                    {universityLeaderboard
                      .sort((a, b) => b.totalXP - a.totalXP)
                      .slice(0, 7)
                      .map((university, index) => {
                        const isUserUniversity =
                          university.name === "Stony Brook" // Assuming user is from Stony Brook
                        const bgColor =
                          index === 0
                            ? "bg-red-100"
                            : index === 1
                              ? "bg-blue-100"
                              : index === 2
                                ? "bg-green-100"
                                : isUserUniversity
                                  ? "bg-blue-50 border-l-4 border-blue-400"
                                  : ""

                        return (
                          <motion.tr
                            key={`uni-${university.name}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className={`border-b border-gray-200 ${bgColor}`}
                          >
                            <td className={`px-4 py-3 w-16 font-bold`}>
                              #{index + 1}
                            </td>
                            <td className="px-4 py-3 w-40">
                              <div>
                                <div className="font-semibold">
                                  {university.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Top: {university.topPlayer}
                                </div>
                              </div>
                            </td>
                            <td className="text-center px-4 py-3 w-20">
                              {university.students}
                            </td>
                            <td className="text-center px-4 py-3 w-16">
                              {university.easy.toLocaleString()}
                            </td>
                            <td className="text-center px-4 py-3 w-16">
                              {university.medium.toLocaleString()}
                            </td>
                            <td className="text-center px-4 py-3 w-16">
                              {university.hard.toLocaleString()}
                            </td>
                            <td className="text-center px-4 py-3 w-20 font-bold text-blue-600">
                              {university.total.toLocaleString()}
                            </td>
                            <td className="text-center px-4 py-3 w-24 font-bold text-purple-600">
                              {(university.totalXP / 1000).toFixed(1)}K
                            </td>
                          </motion.tr>
                        )
                      })}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No competitors yet! Invite friends to join.
          </div>
        ) : (
          <div className="overflow-x-auto w-full max-w-full h-full max-h-[260px]">
            <table className="w-full max-w-full table-fixed">
              <thead className="bg-yellow-100 sticky top-0 z-10">
                <tr className="border-b-2 border-black">
                  <th className="font-bold text-left px-4 py-2 w-16">RANK</th>
                  <th className="font-bold text-left px-4 py-2 w-32">PLAYER</th>
                  <th className="font-bold text-center px-4 py-2 w-16">EASY</th>
                  <th className="font-bold text-center px-4 py-2 w-16">MED</th>
                  <th className="font-bold text-center px-4 py-2 w-16">HARD</th>
                  <th className="font-bold text-center px-4 py-2 w-20">
                    TOTAL
                  </th>
                  <th className="font-bold text-center px-4 py-2 w-24">XP</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence mode="wait">
                  {leaderboard
                    .sort((a, b) => calculateXP(b) - calculateXP(a))
                    .map((user, index) => {
                      const isCurrentUser =
                        user.username === userData.leetUsername?.toLowerCase()
                      const total = user.easy + user.medium + user.hard
                      const userXP = calculateXP(user)
                      const bgColor =
                        index === 0
                          ? "bg-red-100"
                          : index === 1
                            ? "bg-blue-100"
                            : index === 2
                              ? "bg-green-100"
                              : isCurrentUser
                                ? "bg-blue-50 border-l-4 border-blue-400"
                                : ""

                      const textStyle = isCurrentUser
                        ? "font-semibold text-blue-700"
                        : ""
                      const rankStyle = isCurrentUser
                        ? "font-bold text-blue-700"
                        : "font-bold"

                      return (
                        <motion.tr
                          key={`friends-${user.username || user.leetUsername || index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className={`border-b border-gray-200 ${bgColor}`}
                        >
                          <td className={`px-4 py-3 w-16 ${rankStyle}`}>
                            #{index + 1}
                          </td>
                          <td className="px-4 py-3 w-32">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border border-black ${isCurrentUser ? "bg-blue-200 text-blue-800" : "bg-gray-300"}`}
                              >
                                {user.name.substring(0, 2).toUpperCase()}
                              </div>
                              <span
                                className={
                                  isCurrentUser
                                    ? "font-semibold text-blue-700"
                                    : ""
                                }
                                onMouseEnter={() =>
                                  setHoveredUser(user.username)
                                }
                                onMouseLeave={() => setHoveredUser(null)}
                                style={{
                                  position: "relative",
                                  cursor: "pointer",
                                }}
                              >
                                {isCurrentUser ? "You" : user.name}
                                {/* Tooltip for rank */}
                                {hoveredUser === user.username && (
                                  <div className="absolute left-1/2 bottom-full z-50 mb-1 -translate-x-1/2 bg-black text-white text-xs rounded px-3 py-1 shadow-lg border-2 border-yellow-300 whitespace-nowrap pointer-events-none animate-fade-in-down">
                                    {(() => {
                                      const xp = calculateXP(user)
                                      const { name: rankName, sub: rankSub } =
                                        getRankAndSubdivision(xp)
                                      return `${rankName} ${rankSub}`
                                    })()}
                                  </div>
                                )}
                              </span>
                            </div>
                          </td>
                          <td
                            className={`text-center px-4 py-3 w-16 ${textStyle}`}
                          >
                            {user.easy}
                          </td>
                          <td
                            className={`text-center px-4 py-3 w-16 ${textStyle}`}
                          >
                            {user.medium}
                          </td>
                          <td
                            className={`text-center px-4 py-3 w-16 ${textStyle}`}
                          >
                            {user.hard}
                          </td>
                          <td
                            className={`text-center px-4 py-3 w-20 font-bold ${isCurrentUser ? "text-blue-700" : "text-blue-600"}`}
                          >
                            {total}
                          </td>
                          <td
                            className={`text-center px-4 py-3 w-24 font-bold ${isCurrentUser ? "text-purple-700" : "text-purple-600"}`}
                          >
                            {userXP.toLocaleString()}
                          </td>
                        </motion.tr>
                      )
                    })}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default FriendsLeaderboard
