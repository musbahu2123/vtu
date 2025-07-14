import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function CallToAction() {
  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-[var(--color-secondary)] text-white text-center"
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg md:text-xl mb-10 max-w-3xl mx-auto">
          Join thousands of satisfied customers and experience the convenience
          of MUSBAHDEV today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            asChild
            className="bg-white text-[var(--color-secondary)] hover:bg-gray-100 rounded-full px-8 py-4 text-lg font-semibold h-auto"
          >
            <Link href="/signup" className="flex items-center justify-center">
              Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-[var(--color-secondary)] rounded-full px-8 py-4 text-lg font-semibold h-auto"
          >
            <Link href="/login" className="flex items-center justify-center">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
