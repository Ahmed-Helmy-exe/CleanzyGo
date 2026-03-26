import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Award, MapPin, Sparkles } from "lucide-react";

const stats = [
  { icon: Users, value: "5,000+", label: "Happy Customers" },
  { icon: Award, value: "4.9/5", label: "Average Rating" },
  { icon: MapPin, value: "5", label: "Areas Covered" },
  { icon: Sparkles, value: "10,000+", label: "Cleanings Done" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-20">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-display text-4xl font-bold">About CleanzyGo</h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Founded in Abu Dhabi, CleanzyGo is on a mission to make professional cleaning accessible, 
              reliable, and perfectly timed. We use smart scheduling technology that matches cleaners 
              to your building, ensuring consistent quality and zero wasted time.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-card p-6 text-center shadow-card">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <p className="mt-3 font-display text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl space-y-6 text-muted-foreground">
            <h2 className="font-display text-2xl font-bold text-foreground">Our Story</h2>
            <p>
              We noticed that most cleaning services treat scheduling as an afterthought. Cleaners travel 
              across the city inefficiently, and customers can never find slots that work. We built 
              CleanzyGo differently.
            </p>
            <p>
              By organizing our operations around buildings and towers, we ensure our teams are already 
              nearby, prepared, and familiar with the space. This means better service, faster response 
              times, and lower costs for you.
            </p>
            <h2 className="font-display text-2xl font-bold text-foreground">Our Values</h2>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span><strong>Quality First</strong> – We hire and train the best cleaning professionals.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span><strong>Smart Scheduling</strong> – Technology that respects your time and ours.</span>
              </li>
              <li className="flex items-start gap-3">
                <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span><strong>Transparency</strong> – Upfront pricing, no hidden fees, honest communication.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
