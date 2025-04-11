import "./Hero.css"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

function Hero() {
  return (
    <section className="px-8 py-12">
      <div className="hero-container">
        <div className="hero-content">
          <span className="discount-badge">SPECIAL OFFER</span>
          <h1 className="hero-title">Discover Premium Quality Products</h1>
          <p className="hero-description">
            Explore our curated collection of high-quality products designed to elevate your lifestyle. Enjoy exclusive
            deals and premium customer service.
          </p>
          <Button className="w-fit bg-emerald-600 hover:bg-emerald-700 group" asChild>
            <a href="/shop" className="flex items-center gap-2">
              Shop Now
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </Button>
        </div>
        <div className="hero-image-container">
          <div className="hero-image-overlay"></div>
          <img
            src="https://fee-storefront.vercel.app/assets/hero/hero.jpg"
            alt="Featured products showcase"
            className="hero-image"
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
