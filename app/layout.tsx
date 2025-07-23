import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Yeetcode - Competitive LeetCode Companion",
  description:
    "Make coding practice engaging and social with real-time leaderboards, daily challenges, and friendly competition.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/yeetcode_icon.png" type="image/png" />
      </head>
      <body className={`${inter.variable} ${jetbrains.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
