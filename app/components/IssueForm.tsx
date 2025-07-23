"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Bug, Sparkles, HelpCircle, MessageSquare } from "lucide-react"

interface IssueFormProps {
  isOpen: boolean
  onClose: () => void
}

export default function IssueForm({ isOpen, onClose }: IssueFormProps) {
  const [formData, setFormData] = useState({
    subject: "",
    issueType: "bug",
    name: "",
    description: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email via API
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

      if (response.ok) {
        // Success - show a success message and close
        alert("Your issue has been reported successfully!")
        setFormData({
          subject: "",
          issueType: "bug",
          name: "",
          description: "",
        })
        onClose()
      } else {
        // Fallback to mailto if API fails
        const mailtoLink = `mailto:yeeeeetcode@gmail.com?subject=[${formData.issueType.toUpperCase()}] ${formData.subject}&body=From: ${formData.name}%0D%0A%0D%0AIssue Type: ${formData.issueType}%0D%0A%0D%0A${encodeURIComponent(formData.description)}`
        window.location.href = mailtoLink
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      // Fallback to mailto if there's an error
      const mailtoLink = `mailto:yeeeeetcode@gmail.com?subject=[${formData.issueType.toUpperCase()}] ${formData.subject}&body=From: ${formData.name}%0D%0A%0D%0AIssue Type: ${formData.issueType}%0D%0A%0D%0A${encodeURIComponent(formData.description)}`
      window.location.href = mailtoLink
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border-4 border-black rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="bg-blue-500 px-6 py-4 border-b-4 border-black flex items-center justify-between">
          <h2 className="font-bold text-white text-xl">Report an Issue</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-blue-600 p-1 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-bold mb-2">Your Name</label>
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
            <label className="block font-bold mb-2">Issue Type</label>
            <div className="relative">
              <select
                value={formData.issueType}
                onChange={(e) =>
                  setFormData({ ...formData, issueType: e.target.value })
                }
                className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400 appearance-none pr-10"
              >
                <option value="bug">Bug Report</option>
                <option value="feature">Feature Request</option>
                <option value="question">Question</option>
                <option value="feedback">General Feedback</option>
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                {formData.issueType === "bug" && (
                  <Bug className="w-5 h-5 text-yellow-500" />
                )}
                {formData.issueType === "feature" && (
                  <Sparkles className="w-5 h-5 text-yellow-500" />
                )}
                {formData.issueType === "question" && (
                  <HelpCircle className="w-5 h-5 text-yellow-500" />
                )}
                {formData.issueType === "feedback" && (
                  <MessageSquare className="w-5 h-5 text-yellow-500" />
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block font-bold mb-2">Subject</label>
            <input
              type="text"
              required
              value={formData.subject}
              onChange={(e) =>
                setFormData({ ...formData, subject: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400"
              placeholder="Brief description of the issue"
            />
          </div>

          <div>
            <label className="block font-bold mb-2">Description</label>
            <textarea
              required
              rows={5}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:border-yellow-400 resize-none"
              placeholder="Please describe the issue in detail..."
            />
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 btn-3d border-3 border-black bg-yellow-300 hover:bg-yellow-400 text-black font-bold"
            >
              {isSubmitting ? "Sending..." : "Send Report"}
            </Button>
            <Button
              type="button"
              onClick={onClose}
              className="flex-1 btn-3d border-3 border-black bg-gray-200 hover:bg-gray-300 text-black font-bold"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
