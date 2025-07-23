import React, { useState } from "react"
// Remove all API service imports - we're using hardcoded data only

const DuelsSection = ({ leaderboard = [], userData }) => {
  // State management
  const [duels, setDuels] = useState([
    {
      duelId: "duel_1",
      challenger: "alex09",
      challengee: "samwise",
      difficulty: "Medium",
      status: "PENDING",
      problemSlug: "longest-substring-without-repeating-characters",
      problemTitle: "Longest Substring Without Repeating Characters",
      createdAt: new Date().toISOString(),
      challengerTime: null,
      challengeeTime: null,
      winner: null,
      xpAwarded: null,
      completed: false,
    },
    {
      duelId: "duel_2",
      challenger: "taylor123",
      challengee: "alex09",
      difficulty: "Easy",
      status: "ACTIVE",
      problemSlug: "two-sum",
      problemTitle: "Two Sum",
      createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
      challengerTime: 180, // 3 minutes
      challengeeTime: null,
      winner: null,
      xpAwarded: null,
      completed: false,
    },
    {
      duelId: "duel_3",
      challenger: "alex09",
      challengee: "morgan",
      difficulty: "Hard",
      status: "COMPLETED",
      problemSlug: "median-of-two-sorted-arrays",
      problemTitle: "Median of Two Sorted Arrays",
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
      challengerTime: 1200, // 20 minutes
      challengeeTime: 1800, // 30 minutes
      winner: "alex09",
      xpAwarded: 500,
      completed: true,
    },
  ])
  const [recentDuels, setRecentDuels] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedFriend, setSelectedFriend] = useState("")
  const [selectedDifficulty, setSelectedDifficulty] = useState("")
  const [error, setError] = useState("")
  const [actionLoading, setActionLoading] = useState({})
  const [duelStarts, setDuelStarts] = useState({}) // Track when duels started for timing
  const [notifications, setNotifications] = useState([])
  const [showWinMessage, setShowWinMessage] = useState(false)
  const [lastWinData, setLastWinData] = useState(null)

  // No polling needed for static preview data

  // Filter out current user from friends list (case-insensitive)
  const availableFriends = leaderboard.filter(
    (user) => user.username !== userData?.leetUsername?.toLowerCase()
  )

  // Remove all useEffect hooks that call API functions - we're using static data only

  // Add notification
  const addNotification = (message, type = "info") => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, 5000)
  }

  // Handle creating a new duel
  const handleSendChallenge = async () => {
    setError("")

    if (!selectedFriend) {
      setError("Please select a friend to challenge!")
      return
    }

    if (!selectedDifficulty) {
      setError("Please select a problem difficulty!")
      return
    }

    try {
      setActionLoading({ createDuel: true })

      // In a real app, you would create a new duel object here
      // For static data, we'll just add it to the state
      const newDuel = {
        duelId: `duel_${duels.length + 1}`, // Generate a unique ID
        challenger: userData.leetUsername,
        challengee: selectedFriend,
        difficulty: selectedDifficulty,
        status: "PENDING", // New duels start as PENDING
        problemSlug: `problem_slug_${duels.length + 1}`, // Placeholder
        problemTitle: `Problem Title ${duels.length + 1}`, // Placeholder
        createdAt: new Date().toISOString(),
        challengerTime: null,
        challengeeTime: null,
        winner: null,
        xpAwarded: null,
        completed: false,
      }

      setDuels((prev) => [...prev, newDuel])
      setSelectedFriend("")
      setSelectedDifficulty("")

      addNotification(`Challenge sent to ${selectedFriend}!`, "success")
    } catch (err) {
      console.error("Error creating duel:", err)
      setError("Failed to send challenge")
    } finally {
      setActionLoading({ createDuel: false })
    }
  }

  // Handle accepting a duel
  const handleAcceptDuel = async (duelId) => {
    try {
      setActionLoading({ [`accept_${duelId}`]: true })

      // In a real app, you would update the duel status to ACTIVE
      // For static data, we'll just change the status
      setDuels((prev) =>
        prev.map((duel) =>
          duel.duelId === duelId
            ? { ...duel, status: "ACTIVE", startTime: new Date().toISOString() }
            : duel
        )
      )

      addNotification("Duel accepted! The battle begins!", "success")
    } catch (err) {
      console.error("Error accepting duel:", err)
      addNotification("Failed to accept duel", "error")
    } finally {
      // Clear the loading state after a short delay to prevent UI flicker
      setTimeout(() => {
        setActionLoading({})
      }, 100)
    }
  }

  // Handle rejecting a duel
  const handleRejectDuel = async (duelId) => {
    try {
      setActionLoading({ [`reject_${duelId}`]: true })

      // In a real app, you would delete the duel
      // For static data, we'll just filter it out
      setDuels((prev) => prev.filter((duel) => duel.duelId !== duelId))

      addNotification("Duel rejected", "info")
    } catch (err) {
      console.error("Error rejecting duel:", err)
      addNotification("Failed to reject duel", "error")
    } finally {
      // Clear the loading state after a short delay to prevent UI flicker
      setTimeout(() => {
        setActionLoading({})
      }, 100)
    }
  }

  // Handle starting a duel (just visual feedback for demo)
  const handleStartDuel = async (duelId) => {
    setActionLoading({ [`start_${duelId}`]: true })

    setTimeout(() => {
      setActionLoading({})
      setDuelStarts((prev) => ({ ...prev, [duelId]: true }))
      addNotification("Duel started! Good luck! 🚀", "success")

      // For demo, simulate completion after a delay
      simulateDuelCompletion(duelId)
    }, 1000)
  }

  // Simplified function to simulate duel completion (no actual polling)
  const simulateDuelCompletion = (duelId) => {
    // For demo purposes, simulate that the user completed the duel
    setTimeout(() => {
      const randomTime = Math.floor(Math.random() * 600 + 180) * 1000 // 3-10 minutes
      setDuels((prev) =>
        prev.map((duel) =>
          duel.duelId === duelId
            ? {
                ...duel,
                challengerTime: randomTime,
                status: "COMPLETED",
                winner: userData.leetUsername,
                xpAwarded: 100,
                completed: true,
              }
            : duel
        )
      )

      addNotification("Duel completed! You won! 🎉", "success")
      setLastWinData({
        duelId,
        problemTitle: "Demo Problem",
        xpAwarded: 100,
        time: randomTime,
      })
      setShowWinMessage(true)
      setTimeout(() => setShowWinMessage(false), 5000)
    }, 3000) // Simulate completion after 3 seconds
  }

  // Handle manual "Solve Now" click
  const handleSolveNow = (problemSlug) => {
    if (window.electronAPI?.openExternalUrl) {
      window.electronAPI.openExternalUrl(
        `https://leetcode.com/problems/${problemSlug}/`
      )
    } else {
      window.open(`https://leetcode.com/problems/${problemSlug}/`, "_blank")
    }
  }

  // Get time display
  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000)
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Render pending duel
  const renderPendingDuel = (duel) => {
    const isChallenger = duel.challenger === userData.leetUsername
    const otherUser = isChallenger ? duel.challengee : duel.challenger
    const otherUserDisplay =
      leaderboard.find((u) => u.username === otherUser)?.name || otherUser

    // Calculate time remaining for 3-hour timeout
    const createdAt = new Date(duel.createdAt).getTime()
    const threeHoursFromCreation = createdAt + 3 * 60 * 60 * 1000
    const timeRemaining = threeHoursFromCreation - Date.now()
    const hoursRemaining = Math.max(
      0,
      Math.floor(timeRemaining / (60 * 60 * 1000))
    )
    const minutesRemaining = Math.max(
      0,
      Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))
    )

    return (
      <div
        key={duel.duelId}
        className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-3 mb-4"
        style={{ height: isChallenger ? "80px" : "95px" }}
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h5 className="font-bold text-sm" style={{ fontSize: "12px" }}>
              {isChallenger
                ? `Challenge sent to ${otherUserDisplay}`
                : `Challenge from Taylor • ${duel.difficulty}`}
            </h5>
            <p className="text-gray-600" style={{ fontSize: "12px" }}>
              {isChallenger ? `${duel.difficulty} • All the best!` : ""}
            </p>
            {timeRemaining > 0 && (
              <p className="text-xs text-orange-600 font-bold">
                ⏰ Expires in {hoursRemaining}h {minutesRemaining}m
              </p>
            )}
          </div>
          <span className="text-xs bg-yellow-200 px-2 py-1 rounded font-bold">
            PENDING
          </span>
        </div>

        {!isChallenger && (
          <div className="flex gap-3 mt-2">
            <button
              onClick={() => handleAcceptDuel(duel.duelId)}
              disabled={
                actionLoading[`accept_${duel.duelId}`] ||
                actionLoading[`reject_${duel.duelId}`]
              }
              className="flex-1 btn-3d bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-lg text-xs font-bold disabled:opacity-50 border-2 border-black"
            >
              {actionLoading[`accept_${duel.duelId}`] ? "⏳" : "✅"} Accept
            </button>
            <button
              onClick={() => handleRejectDuel(duel.duelId)}
              disabled={
                actionLoading[`reject_${duel.duelId}`] ||
                actionLoading[`accept_${duel.duelId}`]
              }
              className="flex-1 btn-3d bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-lg text-xs font-bold disabled:opacity-50 border-2 border-black"
            >
              {actionLoading[`reject_${duel.duelId}`] ? "⏳" : "❌"} Reject
            </button>
          </div>
        )}
      </div>
    )
  }

  // Render active duel
  const renderActiveDuel = (duel) => {
    const isChallenger = duel.challenger === userData.leetUsername
    const otherUser = isChallenger ? duel.challengee : duel.challenger
    const otherUserDisplay =
      leaderboard.find((u) => u.username === otherUser)?.name || otherUser
    const userTime = isChallenger ? duel.challengerTime : duel.challengeeTime
    const opponentTime = isChallenger
      ? duel.challengeeTime
      : duel.challengerTime
    const duelStarted = duelStarts[duel.duelId]

    // Only show time if it's a valid number
    const validUserTime = typeof userTime === "number" && !isNaN(userTime)
    const validOpponentTime =
      typeof opponentTime === "number" && !isNaN(opponentTime)

    // Calculate time remaining for 2-hour timeout (for active duels)
    const startTime = duel.startTime ? new Date(duel.startTime).getTime() : null
    let timeRemaining = null
    let hoursRemaining = 0
    let minutesRemaining = 0

    if (startTime) {
      const twoHoursFromStart = startTime + 2 * 60 * 60 * 1000
      timeRemaining = twoHoursFromStart - Date.now()
      hoursRemaining = Math.max(0, Math.floor(timeRemaining / (60 * 60 * 1000)))
      minutesRemaining = Math.max(
        0,
        Math.floor((timeRemaining % (60 * 60 * 1000)) / (60 * 1000))
      )
    }

    return (
      <div
        key={duel.duelId}
        className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4 mb-3"
      >
        <div className="flex justify-between items-start mb-2">
          <div>
            <h5 className="font-bold text-sm">Dueling {otherUserDisplay}</h5>
            <p className="text-gray-600" style={{ fontSize: "12px" }}>
              {duel.difficulty} • Problem Hidden
            </p>
            {timeRemaining > 0 && (
              <p className="text-xs text-orange-600 font-bold">
                ⏰ Expires in {hoursRemaining}h {minutesRemaining}m
              </p>
            )}
          </div>
          <span className="text-xs bg-blue-200 px-2 py-1 rounded font-bold">
            ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
          <div className="text-center">
            <div className="font-bold">You</div>
            <div className={validUserTime ? "text-green-600" : "text-gray-400"}>
              {validUserTime ? formatTime(userTime) : "Not submitted"}
            </div>
          </div>
          <div className="text-center">
            <div className="font-bold">{otherUserDisplay}</div>
            <div
              className={validOpponentTime ? "text-green-600" : "text-gray-400"}
            >
              5:47
            </div>
          </div>
        </div>

        {/* Show Start Duel if user's time is null and duel hasn't started for them */}
        {userTime == null && !duelStarted && (
          <button
            onClick={() => handleStartDuel(duel.duelId)}
            disabled={actionLoading[`start_${duel.duelId}`]}
            className="w-full btn-3d bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-bold disabled:opacity-50 border-2 border-black"
          >
            {actionLoading[`start_${duel.duelId}`]
              ? "⏳ Starting..."
              : "🚀 Start Duel"}
          </button>
        )}

        {/* Show Solve Now only if duelStarted is true and userTime is null */}
        {duelStarted && userTime == null && (
          <div className="space-y-2">
            <button
              onClick={() => handleSolveNow(duel.problemSlug)}
              className="w-full btn-3d bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-bold border-2 border-black"
            >
              💻 Solve Now
            </button>
            <div className="text-center text-xs text-gray-600">
              Click to open problem on LeetCode
            </div>
          </div>
        )}

        {validUserTime && (
          <div className="text-center">
            <p className="text-sm text-green-600 font-bold">
              ✅ You submitted in {formatTime(userTime)}
            </p>
            <p className="text-xs text-gray-600">
              {validOpponentTime
                ? "Both submitted! Check results below."
                : "Waiting for opponent to finish..."}
            </p>
          </div>
        )}
      </div>
    )
  }

  // Render duel with completed check
  const renderDuel = (duel) => {
    const isChallenger = duel.challenger === userData.leetUsername
    const otherUser = isChallenger ? duel.challengee : duel.challenger
    const otherUserDisplay =
      leaderboard.find((u) => u.username === otherUser)?.name || otherUser
    const userTime = isChallenger ? duel.challengerTime : duel.challengeeTime
    const opponentTime = isChallenger
      ? duel.challengeeTime
      : duel.challengerTime

    // Branch on duel.completed for main display logic
    if (duel.completed) {
      const won = duel.winner === userData.leetUsername

      return (
        <div
          key={duel.duelId}
          className={`border-2 rounded-lg p-4 mb-3 ${won ? "bg-green-50 border-green-400" : "bg-red-50 border-red-400"}`}
        >
          <div className="flex justify-between items-start mb-2">
            <div>
              <h5 className="font-bold text-sm">vs {otherUserDisplay}</h5>
              <p className="text-xs text-gray-600">
                {duel.difficulty} • {duel.problemTitle}
              </p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded font-bold ${won ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
            >
              {won ? "WON" : "LOST"}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
            <div className="text-center">
              <div className="font-bold">You</div>
              <div
                className={won ? "text-green-600 font-bold" : "text-red-600"}
              >
                {formatTime(userTime)}
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold">{otherUserDisplay}</div>
              <div
                className={!won ? "text-green-600 font-bold" : "text-red-600"}
              >
                {formatTime(opponentTime)}
              </div>
            </div>
          </div>

          {/* Disabled COMPLETED button */}
          <button
            disabled={true}
            className="btn-3d w-full bg-gray-300 text-gray-600 px-4 py-2 rounded font-bold border-2 border-gray-400 cursor-not-allowed opacity-75"
          >
            ✅ COMPLETED
          </button>

          {/* Winner badge and XP banner only when duel.completed === true */}
          {duel.completed && won && (
            <div className="mt-2 text-center text-xs text-orange-600 font-bold">
              +{duel.xpAwarded} XP earned!
            </div>
          )}
        </div>
      )
    }

    // Handle PENDING duels
    if (duel.status === "PENDING") {
      return renderPendingDuel(duel)
    }

    // Handle ACTIVE duels
    if (duel.status === "ACTIVE") {
      return renderActiveDuel(duel)
    }

    return null
  }

  // When duels are reloaded, reset duelStarts for duels that are not started
  // This useEffect is no longer needed as we are not loading from API

  // Win message component
  const WinMessage = () => {
    if (!showWinMessage || !lastWinData) return null

    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 border-4 border-black rounded-xl p-8 shadow-2xl pointer-events-auto animate-bounce">
          <div className="text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-bold text-white mb-2">VICTORY!</h2>
            <p className="text-xl text-white mb-2">
              You won the duel against {lastWinData.problemTitle}!
            </p>
            <p className="text-lg text-white mb-4">
              Time: {formatTime(lastWinData.time)}
            </p>
            <div className="bg-white text-orange-600 px-4 py-2 rounded-lg font-bold text-xl">
              +{lastWinData.xpAwarded} XP EARNED! 🎉
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Helper: filter out expired duels
  const filterExpiredDuels = (duel) => {
    const now = Date.now()
    if (duel.status === "PENDING") {
      const createdAt = new Date(duel.createdAt).getTime()
      return now < createdAt + 3 * 60 * 60 * 1000 // 3 hours
    }
    if (duel.status === "ACTIVE") {
      if (!duel.startTime) return true // Defensive: if no startTime, don't filter
      const startTime = new Date(duel.startTime).getTime()
      return now < startTime + 2 * 60 * 60 * 1000 // 2 hours
    }
    return true // Always show completed duels
  }

  if (loading) {
    return (
      <div className="panel-3d bg-yellow-100 border-4 border-black rounded-xl overflow-hidden">
        <div className="bg-blue-500 px-6 py-4 border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-white text-lg">⚔️</span>
            <h3 className="font-bold text-white text-lg">DUELS</h3>
          </div>
        </div>
        <div className="p-6 text-center text-gray-600">Loading duels...</div>
      </div>
    )
  }

  const filteredDuels = duels.filter(filterExpiredDuels)
  const completedDuels = filteredDuels
    .filter((d) => d.status === "COMPLETED")
    .slice(0, 5) // Show last 5 completed

  return (
    <div
      className="panel-3d bg-yellow-100 border-4 border-black rounded-xl overflow-hidden relative"
      style={{ height: "380px" }}
    >
      {/* Win message overlay */}
      <WinMessage />

      {/* Notifications (fixed bar at the top) */}
      {notifications.length > 0 && (
        <div className="absolute left-0 right-0 top-0 z-20 flex flex-col items-center pointer-events-none">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`mt-2 px-3 py-1 rounded border-2 border-white shadow text-xs font-bold flex items-center gap-2 pointer-events-auto
                ${notification.type === "success" ? "bg-green-600 text-white" : ""}
                ${notification.type === "error" ? "bg-red-600 text-white" : ""}
                ${notification.type === "info" ? "bg-blue-600 text-white" : ""}
              `}
            >
              {notification.message}
            </div>
          ))}
        </div>
      )}
      <div className="bg-blue-500 px-6 py-4 border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="text-white text-lg">⚔️</span>
          <h3 className="font-bold text-white text-lg">DUELS</h3>
        </div>
      </div>
      <div className="p-6" style={{ height: "307px" }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Challenge Friends */}
          <div
            className="bg-white p-4 border-2 border-black rounded-lg shadow-md"
            style={{ height: "260px" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg">Challenge Friend</h4>
              <span className="text-lg">🎯</span>
            </div>
            <div className="space-y-3">
              <select
                className="w-full p-2 border-2 border-black rounded-lg font-medium"
                value={selectedFriend}
                onChange={(e) => setSelectedFriend(e.target.value)}
              >
                <option value="">Select a friend...</option>
                {availableFriends.length > 0 ? (
                  availableFriends.map((friend, idx) => (
                    <option
                      key={friend.username || idx}
                      value={friend.username}
                    >
                      {friend.name}
                    </option>
                  ))
                ) : (
                  <option disabled>No friends in group yet</option>
                )}
              </select>
              <select
                className="w-full p-2 border-2 border-black rounded-lg font-medium"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="">Problem difficulty...</option>
                <option value="Easy">
                  Easy (100 XP + 200 bonus if you win)
                </option>
                <option value="Medium">
                  Medium (300 XP + 200 bonus if you win)
                </option>
                <option value="Hard">
                  Hard (500 XP + 200 bonus if you win)
                </option>
                <option value="Random">
                  Random (? XP + 200 bonus if you win)
                </option>
              </select>
            </div>
            {error && (
              <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
                {error}
              </div>
            )}
            <button
              onClick={handleSendChallenge}
              disabled={actionLoading.createDuel}
              className="w-full mt-3 btn-3d bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg border-2 border-black font-bold disabled:opacity-50"
            >
              {actionLoading.createDuel ? "⏳ Sending..." : "Send Challenge"}
            </button>
          </div>

          {/* Active Duels & History */}
          <div
            className="bg-white p-4 border-2 border-black rounded-lg shadow-md"
            style={{ height: "260px" }}
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-lg">Your Duels</h4>
              <span className="text-lg">📊</span>
            </div>

            <div
              className="overflow-y-auto custom-scrollbar"
              style={{ height: "190px" }}
            >
              {/* Show active and pending duels first */}
              {filteredDuels
                .filter((d) => d.status === "PENDING" || d.status === "ACTIVE")
                .map((duel, idx) =>
                  renderDuel({ ...duel, key: duel.duelId || idx })
                )}

              {/* Show completed duels if any */}
              {completedDuels.length > 0 && (
                <>
                  <div className="text-xs font-bold text-gray-600 mt-3 mb-2 border-b border-gray-300 pb-1">
                    RECENT COMPLETED DUELS
                  </div>
                  {completedDuels.map((duel, idx) => {
                    const isWinner = duel.winner === userData.leetUsername
                    const otherUser =
                      duel.challenger === userData.leetUsername
                        ? duel.challengee
                        : duel.challenger
                    const otherUserDisplay =
                      leaderboard.find((u) => u.username === otherUser)?.name ||
                      otherUser

                    return (
                      <div
                        key={duel.duelId || idx}
                        className={`mb-2 p-2 rounded border-2 ${
                          isWinner
                            ? "bg-green-100 border-green-400"
                            : "bg-red-100 border-red-400"
                        }`}
                      >
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <div className="font-bold">
                              {isWinner ? "🏆 WIN" : "❌ LOSS"}
                            </div>
                            <div className="ml-2">vs {otherUserDisplay}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">{duel.problemTitle}</div>
                            <div className="text-gray-600">
                              {duel.difficulty}
                            </div>
                            {isWinner && duel.xpAwarded && (
                              <div className="text-green-600 font-bold">
                                +{duel.xpAwarded} XP
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </>
              )}

              {filteredDuels.length === 0 && (
                <div className="text-center text-gray-500 py-4">
                  <div className="text-2xl mb-2">⚔️</div>
                  <div className="text-sm">No duels yet!</div>
                  <div className="text-xs">
                    Challenge a friend to get started
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DuelsSection
