import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";
import { services, packages } from "@/data/mockData";

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h1 className="font-display text-4xl font-bold">Simple, Transparent Pricing</h1>
            <p className="mx-auto mt-3 max-w-lg text-muted-foreground">
              Pay per session or save with our subscription plans.
            </p>
          </div>

          {/* Per-session pricing */}
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <div key={s.id} className={`relative flex flex-col rounded-xl border p-6 shadow-card ${i === 1 ? "border-primary bg-primary/5 shadow-elevated" : "border-border bg-card"}`}>
                {i === 1 && <span className="absolute -top-3 right-6 rounded-full bg-gradient-hero px-3 py-1 text-xs font-bold text-primary-foreground">Most Popular</span>}
                <span className="text-3xl">{s.icon}</span>
                <h3 className="mt-3 font-display text-lg font-bold">{s.name}</h3>
                <p className="mt-1 flex-1 text-sm text-muted-foreground">{s.description}</p>
                <div className="mt-4">
                  <span className="font-display text-3xl font-bold text-primary">AED {s.basePrice}</span>
                  <span className="text-sm text-muted-foreground"> / session</span>
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> {s.duration} service</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> Professional cleaners</li>
                  <li className="flex items-center gap-2"><Check className="h-4 w-4 text-accent" /> All supplies included</li>
                </ul>
                <Link to="/booking" className="mt-6">
                  <Button className={`w-full ${i === 1 ? "bg-gradient-hero text-primary-foreground" : ""}`} variant={i === 1 ? "default" : "outline"}>
                    Book Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ))}
          </div>

          {/* Packages */}
          <div className="mt-20 text-center">
            <h2 className="font-display text-2xl font-bold">Save with Packages</h2>
            <p className="mt-2 text-muted-foreground">Subscribe and save up to 20%</p>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {packages.map((pkg) => (
              <div key={pkg.id} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <div className="inline-flex rounded-full bg-accent/10 px-3 py-1 text-xs font-bold text-accent">
                  Save {pkg.discount}%
                </div>
                <h3 className="mt-3 font-display text-lg font-bold">{pkg.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{pkg.description}</p>
                <p className="mt-1 text-xs text-muted-foreground">Frequency: {pkg.frequency}</p>
                <Link to="/booking" className="mt-4 block">
                  <Button variant="outline" className="w-full">Get Started</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
