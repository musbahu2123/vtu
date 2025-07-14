import { Card, CardContent } from "@/components/ui/card"; // Shadcn Card
import { Users, Repeat, Percent, Headset } from "lucide-react"; // Lucide icons

export default function StatsSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-dark-text)] mb-12">
          Numbers That Speak for Themselves
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {/* Stat Card 1 */}
          <Card className="p-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-primary)] text-5xl mb-4">
                <Users className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-4xl font-bold text-[var(--color-dark-text)]">
                500+
              </p>
              <p className="text-gray-600 mt-2">Happy Customers</p>
              <p className="text-sm text-gray-500">
                Trusted by thousands across Nigeria
              </p>
            </CardContent>
          </Card>

          {/* Stat Card 2 */}
          <Card className="p-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-secondary)] text-5xl mb-4">
                <Repeat className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-4xl font-bold text-[var(--color-dark-text)]">
                N10M+
              </p>
              <p className="text-gray-600 mt-2">Transactions Processed</p>
              <p className="text-sm text-gray-500">
                Hundreds in secure transactions
              </p>
            </CardContent>
          </Card>

          {/* Stat Card 3 */}
          <Card className="p-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-accent-purple)] text-5xl mb-4">
                <Percent className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-4xl font-bold text-[var(--color-dark-text)]">
                99.9%
              </p>
              <p className="text-gray-600 mt-2">Success Rate</p>
              <p className="text-sm text-gray-500">
                Reliable service you can count on
              </p>
            </CardContent>
          </Card>

          {/* Stat Card 4 */}
          <Card className="p-6 rounded-xl shadow-md transform hover:scale-105 transition duration-300">
            <CardContent className="p-0">
              <div className="text-[var(--color-accent-orange)] text-5xl mb-4">
                <Headset className="h-12 w-12 mx-auto" />
              </div>
              <p className="text-4xl font-bold text-[var(--color-dark-text)]">
                24/7
              </p>
              <p className="text-gray-600 mt-2">Support Available</p>
              <p className="text-sm text-gray-500">
                Always here when you need us
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
