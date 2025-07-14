import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Smartphone, Wifi, Lightbulb, Tv, QrCode, Gift } from "lucide-react";

export default function ServicesOverview() {
  return (
    <section
      id="services"
      className="py-16 md:py-24 bg-[var(--color-light-bg)]"
    >
      <div className="container mx-auto px-6">
        {/* Top section with text and image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--color-dark-text)] mb-6">
              All Your Digital{" "}
              <span className="text-[var(--color-primary)]">Services</span> in
              One Place
            </h2>
            <p className="text-lg text-[var(--color-gray-text)] max-w-3xl lg:max-w-none mx-auto lg:mx-0">
              From airtime and data to electricity bills and cable TV
              subscriptions, we've got you covered with fast, secure, and
              reliable services.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            {/* Placeholder image mimicking the original site's services image */}
            <img
              src="https://placehold.co/600x400/D4EDDA/00A86B?text=Digital+Services+Platform"
              alt="Digital Services Platform"
              className="rounded-xl shadow-xl w-full max-w-md md:max-w-lg lg:max-w-full h-auto object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/600x400/cccccc/333333?text=Image+Not+Found";
              }}
            />
          </div>
        </div>

        {/* Grid of service cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Card 1: Airtime Top-up */}
          <Card className="rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-primary)] text-5xl mb-6">
                <Smartphone className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-text)] mb-3">
                Airtime Top-up
              </h3>
              <p className="text-gray-600">
                Instant airtime recharge for all networks in Nigeria. Quick,
                reliable, and secure.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[var(--color-primary)] hover:underline font-medium"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>

          {/* Service Card 2: Data Bundles */}
          <Card className="rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-secondary)] text-5xl mb-6">
                <Wifi className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-text)] mb-3">
                Data Bundles
              </h3>
              <p className="text-gray-600">
                Affordable data plans for all networks. Stay connected with the
                best rates.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[var(--color-secondary)] hover:underline font-medium"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>

          {/* Service Card 3: Electricity Bills */}
          <Card className="rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-accent-orange)] text-5xl mb-6">
                <Lightbulb className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-text)] mb-3">
                Electricity Bills
              </h3>
              <p className="text-gray-600">
                Pay your electricity bills instantly. Support for all major
                distribution companies.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[var(--color-accent-orange)] hover:underline font-medium"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>

          {/* Service Card 4: Cable TV */}
          <Card className="rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-accent-purple)] text-5xl mb-6">
                <Tv className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-text)] mb-3">
                Cable TV
              </h3>
              <p className="text-gray-600">
                Subscribe to DSTV, GOTV, and Startimes. Never miss your favorite
                shows.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[var(--color-accent-purple)] hover:underline font-medium"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>

          {/* Service Card 5: E-Pins */}
          <Card className="rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-primary)] text-5xl mb-6">
                <QrCode className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-text)] mb-3">
                E-Pins
              </h3>
              <p className="text-gray-600">
                Generate recharge pins for resale. Perfect for business.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[var(--color-primary)] hover:underline font-medium"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>

          {/* Service Card 6: Gift Cards */}
          <Card className="rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-secondary)] text-5xl mb-6">
                <Gift className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-[var(--color-dark-text)] mb-3">
                Gift Cards
              </h3>
              <p className="text-gray-600">
                Buy and sell gift cards easily. iTunes, Google Play, Amazon,
                etc.
              </p>
              <Link
                href="#"
                className="mt-4 inline-block text-[var(--color-secondary)] hover:underline font-medium"
              >
                Learn More
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
