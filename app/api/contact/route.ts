import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, subject, description, issueType } = body

    // Initialize Resend with API key
    const resend = new Resend(process.env.RESEND_API_KEY)

    // Send email using Resend
    const data = await resend.emails.send({
      from: "auth@yeetcode.xyz",
      to: "yeeeeetcode@gmail.com",
      subject: subject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${name}</p>
        <p><strong>Issue Type:</strong> ${issueType || "General"}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${description.replace(/\n/g, "<br>")}</p>
      `,
      text: `From: ${name}\n\nIssue Type: ${issueType || "General"}\n\n${description}`,
    })

    console.log("Email sent successfully:", data)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    )
  }
}
