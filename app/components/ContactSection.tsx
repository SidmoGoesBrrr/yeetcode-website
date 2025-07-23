"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Send, CheckCircle } from "lucide-react"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    subject: "",
    issueType: "question",
    name: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Option 1: Use EmailJS (sign up at emailjs.com)
      // Uncomment and add your EmailJS credentials
      /*
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        {
          from_email: formData.email,
          subject: `[${formData.issueType.toUpperCase()}] ${formData.subject}`,
          message: formData.description,
        },
        'YOUR_PUBLIC_KEY'
      );
      */

      // Option 2: Use your own API endpoint
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          subject: `[${formData.issueType.toUpperCase()}] ${formData.subject}`,
          description: formData.description,
          issueType: formData.issueType,
        }),
      })

      if (!response.ok) throw new Error("Failed to send")

      // Show success message
      setIsSuccess(true)
      setFormData({
        subject: "",
        issueType: "question",
        name: "",
        description: "",
      })

      // Hide success message after 5 seconds
      setTimeout(() => setIsSuccess(false), 5000)
    } catch (error) {
      console.error("Error sending message:", error)
      alert(
        "Failed to send message. Please try again or email us directly at yeeeeetcode@gmail.com"
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-12 md:py-16 px-4 bg-gray-50 border-t-4 border-black">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-center">
          Need Help?
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Found a bug? Have a feature request? We'd love to hear from you!
        </p>

        <div className="panel-3d bg-white border-4 border-black rounded-xl p-6 md:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold mb-2 text-sm">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block font-bold mb-2 text-sm">
                  Issue Type
                </label>
                <select
                  value={formData.issueType}
                  onChange={(e) =>
                    setFormData({ ...formData, issueType: e.target.value })
                  }
                  className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400"
                >
                  <option value="bug">🐛 Bug Report</option>
                  <option value="feature">✨ Feature Request</option>
                  <option value="question">❓ Question</option>
                  <option value="feedback">💭 General Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400"
                placeholder="Brief description"
              />
            </div>

            <div>
              <label className="block font-bold mb-2 text-sm">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400 resize-none"
                placeholder="Tell us more..."
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full btn-3d border-3 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-bold"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>

          {isSuccess && (
            <div className="mt-4 p-4 bg-green-100 border-2 border-green-400 rounded-lg flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Message sent successfully! We'll get back to you soon.
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
