import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Star } from "lucide-react"; // Ensure Star is imported

export default function HeroSection() {
  return (
    <section
      id="home"
      className="bg-white py-24 md:py-32 flex items-center justify-center min-h-screen-75 pt-24 md:pt-32"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Text Content */}
        <div className="text-center lg:text-left">
          <p className="text-[var(--color-secondary)] font-semibold text-lg mb-4 flex items-center justify-center lg:justify-start">
            <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 mr-2">
              <Star className="h-3 w-3 mr-1" /> Trusted by 500+ Nigerians
            </span>
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-[var(--color-dark-text)]">
            Your Digital{" "}
            <span className="text-[var(--color-primary)]">Services</span> Made
            Easy
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-3xl lg:max-w-none mx-auto lg:mx-0 text-[var(--color-gray-text)]">
            Buy airtime, data, pay bills, and manage all your digital services
            in one secure platform. Fast, reliable, and trusted by thousands of
            Nigerians.
          </p>
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              asChild
              className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-full px-8 py-4 text-lg font-semibold h-auto"
            >
              <Link
                href="#services"
                className="flex items-center justify-center"
              >
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-2 border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white rounded-full px-8 py-4 text-lg font-semibold h-auto"
            >
              <PlayCircle className="mr-2 h-5 w-5" /> Watch Demo
            </Button>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="flex justify-center lg:justify-end">
          {/* Placeholder image mimicking the original site's hero image */}
          <img
            src="https://placehold.co/600x450/E0F2F7/00A86B?text=Digital+Services"
            alt="Person using phone for digital services"
            className="rounded-xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-full h-auto object-cover"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              const target = e.target as HTMLImageElement; // Cast e.target to HTMLImageElement
              target.onerror = null; // Prevent infinite loop if fallback also fails
              target.src =
                "https://placehold.co/600x450/cccccc/333333?text=Image+Not+Found";
            }}
          />
        </div>
      </div>
    </section>
  );
}
