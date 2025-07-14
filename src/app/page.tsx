// Mark this component as a Client Component because it will have interactive elements
// like the mobile menu toggle and potentially client-side navigation.
"use client";

import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ServicesOverview from "@/components/ServicesOverview";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import CallToAction from "@/components/CallToAction";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header /> {/* The header will be sticky/fixed, so it's placed here */}
      <main className="flex-grow">
        <HeroSection />
        <StatsSection />
        <ServicesOverview />
        <WhyChooseUs />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
