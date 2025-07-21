"use client"
import React from "react"
import dynamic from "next/dynamic"

// Dynamically import the extracted App component (disable SSR for browser-only code)
const App = dynamic(() => import("./components/App.jsx"), { ssr: false })

export default function AppPreview() {
  return (
    <div className="min-h-screen bg-yellow-100 flex items-center justify-center">
      <div className="w-full flex flex-col items-center justify-center">
        {/* Real interactive preview of the YeetCode UI */}
        <App />
      </div>
    </div>
  )
}
