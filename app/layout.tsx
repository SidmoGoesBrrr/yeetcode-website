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
  openGraph: {
    title: "Yeetcode - Competitive LeetCode Companion",
    description:
      "Make coding practice engaging and social with real-time leaderboards, daily challenges, and friendly competition.",
    url: "https://yeetcode.xyz",
    type: "website",
    images: [
      {
        url: "/cover.png",
        width: 1200,
        height: 630,
        alt: "Yeetcode Leaderboard Preview",
      },
    ],
  },
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
