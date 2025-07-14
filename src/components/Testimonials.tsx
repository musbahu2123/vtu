import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[var(--color-light-bg)]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[var(--color-dark-text)] mb-12">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Testimonial Card 1 */}
          <Card className="rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <CardContent className="p-0 flex flex-col items-center">
              <Avatar className="w-20 h-20 mb-4 border-4 border-[var(--color-primary)]">
                <AvatarImage
                  src="https://placehold.co/80x80/00A86B/ffffff?text=AJ"
                  alt="Customer Avatar"
                />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="flex text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    strokeWidth={0}
                    className="h-5 w-5"
                  />
                ))}
              </div>
              <p className="text-[var(--color-gray-text)] italic mb-4">
                "MUSBAHDEV has made managing my business expenses so much
                easier. I can pay all my bills in one place!"
              </p>
              <p className="font-semibold text-[var(--color-dark-text)]">
                - Adebayo Johnson
              </p>
              <p className="text-sm text-gray-500">Small Business Owner</p>
            </CardContent>
          </Card>
          {/* Testimonial Card 2 */}
          <Card className="rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <CardContent className="p-0 flex flex-col items-center">
              <Avatar className="w-20 h-20 mb-4 border-4 border-[var(--color-secondary)]">
                <AvatarImage
                  src="https://placehold.co/80x80/1877F2/ffffff?text=FM"
                  alt="Customer Avatar"
                />
                <AvatarFallback>FM</AvatarFallback>
              </Avatar>
              <div className="flex text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    strokeWidth={0}
                    className="h-5 w-5"
                  />
                ))}
              </div>
              <p className="text-[var(--color-gray-text)] italic mb-4">
                "The data bundles are so affordable and the service is instant.
                Perfect for my studies!"
              </p>
              <p className="font-semibold text-[var(--color-dark-text)]">
                - Fatima Mohammed
              </p>
              <p className="text-sm text-gray-500">Student</p>
            </CardContent>
          </Card>
          {/* Testimonial Card 3 */}
          <Card className="rounded-xl shadow-lg p-8 flex flex-col items-center text-center">
            <CardContent className="p-0 flex flex-col items-center">
              <Avatar className="w-20 h-20 mb-4 border-4 border-[var(--color-primary)]">
                <AvatarImage
                  src="https://placehold.co/80x80/00A86B/ffffff?text=CO"
                  alt="Customer Avatar"
                />
                <AvatarFallback>CO</AvatarFallback>
              </Avatar>
              <div className="flex text-yellow-500 mb-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    fill="currentColor"
                    strokeWidth={0}
                    className="h-5 w-5"
                  />
                ))}
              </div>
              <p className="text-[var(--color-gray-text)] italic mb-4">
                "Best rates in the market and excellent customer service. Highly
                recommended!"
              </p>
              <p className="font-semibold text-[var(--color-dark-text)]">
                - Chinedu Okafor
              </p>
              <p className="text-sm text-gray-500">Entrepreneur</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
