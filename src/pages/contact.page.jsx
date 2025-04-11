
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible.",
      })
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
      setIsSubmitting(false)
    }, 1500)
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
          Contact Us
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Have questions or feedback? We'd love to hear from you. Our team is here to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="How can we help you?"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Please provide as much detail as possible..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Our Location</h3>
                  <p className="text-gray-600">123 Commerce Street</p>
                  <p className="text-gray-600">Shopping City, SC 12345</p>
                  <p className="text-gray-600">United States</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Phone</h3>
                  <p className="text-gray-600">Customer Service: (123) 456-7890</p>
                  <p className="text-gray-600">Sales Inquiries: (123) 456-7891</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email</h3>
                  <p className="text-gray-600">Customer Support: support@mebius.com</p>
                  <p className="text-gray-600">Sales: sales@mebius.com</p>
                  <p className="text-gray-600">Press: press@mebius.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Business Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-lg">What are your shipping options?</h3>
                <p className="text-gray-600">
                  We offer standard (3-5 business days), express (1-2 business days), and international shipping
                  options.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">How can I track my order?</h3>
                <p className="text-gray-600">
                  Once your order ships, you'll receive a tracking number via email that you can use to monitor your
                  delivery.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-lg">What is your return policy?</h3>
                <p className="text-gray-600">
                  We offer a 30-day return policy for most items. Please visit our Returns page for more details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
        <div className="h-96 bg-gray-200 rounded-lg overflow-hidden">
          {/* Replace with actual map implementation */}
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <p className="text-gray-500">Interactive Map Would Be Displayed Here</p>
          </div>
        </div>
      </div>
    </main>
  )
}

export default ContactPage
