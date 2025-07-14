import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function WhyChooseUs() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark-text)] mb-6">
            Why Choose MUSBAHDEV?
          </h2>
          <p className="text-[var(--color-gray-text)] text-lg mb-6">
            We're committed to providing the best digital services experience
            with unmatched reliability, security, and customer satisfaction.
          </p>
          <ul className="space-y-4 text-[var(--color-gray-text)] text-lg">
            <li className="flex items-center">
              <CheckCircle className="text-[var(--color-primary)] mr-3 h-6 w-6" />
              <span>Experienced and Vetted Professionals</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-[var(--color-primary)] mr-3 h-6 w-6" />
              <span>Transparent Pricing, No Hidden Fees</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-[var(--color-primary)] mr-3 h-6 w-6" />
              <span>24/7 Customer Support</span>
            </li>
            <li className="flex items-center">
              <CheckCircle className="text-[var(--color-primary)] mr-3 h-6 w-6" />
              <span>Satisfaction Guarantee</span>
            </li>
          </ul>
          <Button
            asChild
            className="mt-8 bg-[var(--color-primary)] hover:bg-[var(--color-primary-dark)] rounded-full px-8 py-4 text-lg font-semibold h-auto"
          >
            <Link href="#contact">Get Started Today</Link>
          </Button>
        </div>
        <div className="lg:w-1/2">
          {/* Placeholder Image for 'Why Choose Us' */}
          <img
            src="https://placehold.co/600x400/D4EDDA/00A86B?text=Quality+Service"
            alt="Quality Service"
            className="rounded-xl shadow-xl w-full h-auto object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found";
            }}
          />
        </div>
      </div>
    </section>
  );
}
