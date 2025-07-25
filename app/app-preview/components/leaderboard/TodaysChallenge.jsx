import React, { useState, useEffect } from "react"

const TodaysChallenge = ({ userData, dailyData, onDailyComplete }) => {
  const handleStartCoding = () => {
    if (dailyData.todaysProblem) {
      const leetcodeUrl = `https://leetcode.com/problems/${dailyData.todaysProblem.titleSlug}/`
      window.open(leetcodeUrl, "_blank")
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty?.toLowerCase()) {
      case "easy":
        return "bg-green-500"
      case "medium":
        return "bg-yellow-500"
      case "hard":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const stripHtmlTags = (html) => {
    if (!html) return ""
    return html
      .replace(/<[^>]*>/g, "")
      .replace(/&[^;]+;/g, " ")
      .trim()
  }

  // Remove all useEffect or handler code that calls window.electronAPI or fetch. Use only static dummy daily challenge data for dailyData. All handlers should only update local state or do nothing. The preview is fully non-functional and uses only hardcoded data.

  if (dailyData.loading) {
    return (
      <div className="panel-3d bg-yellow-100 border-4 border-black rounded-xl overflow-hidden">
        <div className="bg-blue-500 px-3 sm:px-6 py-3 sm:py-4 border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-white text-base sm:text-lg">🎯</span>
            <h3 className="font-bold text-white text-base sm:text-lg">
              TODAY'S CHALLENGE
            </h3>
          </div>
        </div>
        <div className="p-3 sm:p-6">
          <div className="text-center text-gray-600 text-sm sm:text-base">
            Loading daily challenge...
          </div>
        </div>
      </div>
    )
  }

  if (dailyData.error || !dailyData.todaysProblem) {
    return (
      <div className="panel-3d bg-yellow-100 border-4 border-black rounded-xl overflow-hidden">
        <div className="bg-blue-500 px-3 sm:px-6 py-3 sm:py-4 border-b-4 border-black">
          <div className="flex items-center gap-2">
            <span className="text-white text-base sm:text-lg">🎯</span>
            <h3 className="font-bold text-white text-base sm:text-lg">
              TODAY'S CHALLENGE
            </h3>
          </div>
        </div>
        <div className="p-3 sm:p-6">
          <div className="text-center text-gray-600 text-sm sm:text-base">
            {dailyData.error
              ? `Error: ${dailyData.error}`
              : "No daily challenge available today"}
          </div>
        </div>
      </div>
    )
  }

  const problem = dailyData.todaysProblem
  const problemDescription =
    stripHtmlTags(problem.content).substring(0, 200) + "..."

  return (
    <div className="panel-3d bg-yellow-100 border-4 border-black rounded-xl overflow-hidden">
      <div className="bg-blue-500 px-3 sm:px-6 py-3 sm:py-4 border-b-4 border-black">
        <div className="flex items-center gap-2">
          <span className="text-white text-base sm:text-lg">🎯</span>
          <h3 className="font-bold text-white text-base sm:text-lg">
            TODAY'S CHALLENGE
          </h3>
        </div>
      </div>
      <div className="p-3 sm:p-6 h-full overflow-y-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0 mb-3 sm:mb-4">
          <h3 className="text-base sm:text-lg font-bold">{problem.title}</h3>
          <div className="flex items-center gap-2">
            <span
              className={`${getDifficultyColor(problem.difficulty)} text-white px-2 sm:px-3 py-0.5 sm:py-1 rounded text-xs sm:text-sm font-bold border-2 border-black uppercase`}
            >
              {problem.difficulty || "Unknown"}
            </span>
            <span className="bg-orange-500 text-black px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs font-bold">
              +200 XP
            </span>
          </div>
        </div>

        <p className="text-gray-700 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed">
          {problemDescription}
        </p>

        {problem.topicTags && problem.topicTags.length > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex flex-wrap gap-1">
              {problem.topicTags.slice(0, 5).map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded text-[10px] sm:text-xs border border-blue-300"
                >
                  {tag.name || tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-2">
          {/* Action button (top on mobile, left on desktop) */}
          <div className="flex-shrink-0 order-1 sm:order-1">
            {dailyData.dailyComplete ? (
              <button
                className="btn-3d bg-gray-500 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg border-2 border-black font-bold flex items-center gap-2 cursor-not-allowed opacity-75 text-xs sm:text-base w-full sm:w-auto justify-center"
                disabled
              >
                <span>✅</span>
                COMPLETED
              </button>
            ) : (
              <button
                onClick={handleStartCoding}
                className="bg-green-500 hover:bg-green-600 text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg border-2 border-black font-bold flex items-center gap-2 btn-3d text-xs sm:text-base w-full sm:w-auto justify-center"
              >
                <span>💻</span>
                START CODING
              </button>
            )}
          </div>

          {/* Streak info (bottom on mobile, right on desktop) */}
          <div className="flex-shrink-0 flex items-center gap-2 text-gray-600 order-3 sm:order-2 justify-center sm:justify-start">
            <span className="text-orange-500 text-base sm:text-lg">🔥</span>
            <div>
              <div className="font-bold text-orange-500 text-sm sm:text-base">
                {dailyData.streak} day streak
              </div>
              <div className="text-[10px] sm:text-xs">
                {dailyData.dailyComplete
                  ? "Great job today!"
                  : "Keep it going!"}
              </div>
            </div>
          </div>

          {/* Completed message (middle on mobile, center on desktop) */}
          <div className="flex-1 flex justify-center order-2 sm:order-3">
            {dailyData.dailyComplete && (
              <div className="px-2 py-1 bg-green-100 border border-green-300 rounded text-green-800 font-bold flex items-center gap-1 justify-center text-xs sm:text-sm">
                <span>🎉</span>
                <span className="text-[11px] sm:text-sm">
                  Daily challenge completed! You earned 200 XP.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TodaysChallenge
