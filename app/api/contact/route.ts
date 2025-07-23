import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, subject, description, issueType } = body

    // Prepare Discord webhook payload
    const webhookUrl = process.env.DISCORD_WEBHOOK_URL
    if (!webhookUrl) {
      throw new Error("Discord webhook URL not configured")
    }
    const content = `**New Feedback Submission**\n**From:** ${name}\n**Type:** ${issueType || "General"}\n**Subject:** ${subject}\n**Description:**\n${description}`
    const discordPayload = {
      content,
    }
    const discordRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordPayload),
    })
    if (!discordRes.ok) {
      throw new Error("Failed to send to Discord webhook")
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
