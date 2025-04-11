import { Users, Award, Heart, CheckCircle } from "lucide-react"
import team from "@/assets/team.jpg"
function AboutPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
          About Mebius
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're on a mission to provide high-quality products that enhance your everyday life while maintaining
          sustainable and ethical practices.
        </p>
      </div>

      {/* Our Story */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
        <div>
          <h2 className="text-3xl font-bold mb-6">Our Story</h2>
          <p className="text-gray-600 mb-4">
            Founded in 2018, Mebius began with a simple idea: create products that combine functionality, aesthetics,
            and sustainability. Our founder, Jane Smith, noticed a gap in the market for high-quality,
            ethically-produced goods that didn't compromise on style or performance.
          </p>
          <p className="text-gray-600 mb-4">
            What started as a small online store with just five products has grown into a thriving business offering
            hundreds of carefully curated items. Despite our growth, we've remained true to our core values of quality,
            sustainability, and exceptional customer service.
          </p>
          <p className="text-gray-600">
            Today, we're proud to serve customers worldwide, bringing our vision of mindful consumption and beautiful
            design to homes across the globe.
          </p>
        </div>
        <div className="bg-gray-100 rounded-lg overflow-hidden h-96">
          <img
            src={team}
            alt="Mebius team working"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Our Values */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            These core principles guide everything we do, from product development to customer service.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quality First</h3>
            <p className="text-gray-600">
              We never compromise on quality. Every product in our collection undergoes rigorous testing and meets our
              high standards for durability, functionality, and design.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
            <p className="text-gray-600">
              We're committed to reducing our environmental footprint. From eco-friendly materials to responsible
              packaging, sustainability is at the heart of our business model.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">
              We believe in building meaningful relationships with our customers, suppliers, and the wider community.
              Your feedback shapes our journey and helps us grow.
            </p>
          </div>
        </div>
      </div>


      {/* Why Choose Us */}
      <div className="mb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose Mebius</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We strive to provide an exceptional shopping experience from start to finish.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Every product is carefully selected and tested to ensure it meets our high standards for quality and
                durability.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ethical Sourcing</h3>
              <p className="text-gray-600">
                We work with suppliers who share our commitment to fair labor practices and sustainable production
                methods.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Exceptional Service</h3>
              <p className="text-gray-600">
                Our dedicated customer service team is always ready to assist you with any questions or concerns.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">
                We understand the excitement of receiving your purchase, which is why we process orders quickly and
                offer reliable shipping options.
              </p>
            </div>
          </div>
        </div>
      </div>

  
    </main>
  )
}

export default AboutPage
